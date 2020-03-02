import React, { createContext, useState, useEffect } from "react";
import Client from "./Contentful";

const Context = createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  });

  const state = {
    rooms,
    sortedRooms,
    featuredRooms,
    loading,
    ...filters
  };

  const formatData = items => {
    let tempItems = items.map(item => {
      const { id } = item.sys;
      const images = item.fields.images.map(image => image.fields.file.url);
      const room = {
        ...item.fields,
        id,
        images
      };
      return room;
    });
    return tempItems;
  };

  useEffect(() => {
    // Client.getEntries({ content_type: "beachResortRoom" }).then(res =>
    //   console.log(res.items)
    // );
    const getData = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "beachResortRoom"
        });
        let rooms = formatData(res.items);
        const featured = rooms.filter(room => room.featured === true);
        setFeaturedRooms([...featured]);
        setRooms([...rooms]);
        setSortedRooms([...rooms]);
        const maxPriceVal = Math.max(...rooms.map(room => room.price));
        const maxSizeVal = Math.max(...rooms.map(room => room.size));
        setFilters({
          ...filters,
          price: maxPriceVal,
          maxPrice: maxPriceVal,
          maxSize: maxSizeVal
        });
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = e.target.name;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  useEffect(() => {
    filterRooms();
  }, [filters]);

  const filterRooms = () => {
    let { type, capacity, price, minSize, maxSize, breakfast, pets } = filters;
    let tempRooms = [...rooms];
    capacity = +capacity;
    price = +price;
    if (type !== "all") {
      tempRooms = rooms.filter(room => room.type === type);
    }
    if (capacity !== 1) {
      tempRooms = rooms.filter(room => room.capacity >= capacity);
    }
    tempRooms = tempRooms.filter(room => room.price <= price);
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast);
    }
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets);
    }
    setSortedRooms([...tempRooms]);
  };

  const getRoom = slug => {
    let tempItems = [...rooms];
    const room = tempItems.find(item => item.slug === slug);
    return room;
  };

  return (
    <Context.Provider value={{ state, getRoom, handleChange }}>
      {children}
    </Context.Provider>
  );
};

export { RoomProvider, Context };
