import React, { useContext } from "react";
import { Context } from "../context";
import Title from "../components/Title";

const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};

const RoomsFilter = ({ rooms }) => {
  const context = useContext(Context);
  const {
    handleChange,
    state: {
      type,
      capacity,
      price,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      breakfast,
      pets
    }
  } = context;
  let types = getUnique(rooms, "type");
  types = ["all", ...types];
  const people = getUnique(rooms, "capacity");
  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/* select type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            className="form-control"
            name="type"
            id="type"
            value={type}
            onChange={e => handleChange(e)}
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {/* end of select type */}
        {/* guests */}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select
            className="form-control"
            name="capacity"
            id="capacity"
            value={capacity}
            onChange={e => handleChange(e)}
          >
            {people.map(person => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>
        {/* end guests */}
        {/* room price */}
        <div className="form-group">
          <label htmlFor="price">room price ${price}</label>
          <input
            type="range"
            name="price"
            id="price"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* end room price */}
        {/* size */}
        <div className="form-group">
          <label htmlFor="size">room size</label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              id="size"
              value={minSize}
              onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              id="size"
              value={maxSize}
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
        {/* end of size */}
        {/* extras */}
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor="pets">Pets</label>
          </div>
        </div>
        {/* end of extras */}
      </form>
    </section>
  );
};

export default RoomsFilter;
