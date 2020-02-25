import React, { createContext, useState, useEffect } from "react";
import items from "./data";

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
    type: filters.type,
    capacity: filters.capacity,
    price: filters.price,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    minSize: filters.minSize,
    maxSize: filters.maxPrice,
    breakfast: filters.breakfast,
    pets: filters.pets
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
    let rooms = formatData(items);
    const featured = rooms.filter(room => room.featured === true);
    setFeaturedRooms([...featured]);
    setRooms([...rooms]);
    setSortedRooms([...rooms]);
    const maxPriceVal = Math.max(...rooms.map(room => room.price));
    const maxSizeVal = Math.max(...rooms.map(room => room.size));
    setFilters({
      price: maxPriceVal,
      maxPrice: maxPriceVal,
      maxSize: maxSizeVal
    });
  }, []);

  const handleChange = e => {
    const { type, name, value } = e.target;
    console.log({ type, name, value });
  };

  const filterRooms = () => {
    console.log("hello");
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
