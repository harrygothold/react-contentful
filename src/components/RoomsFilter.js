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
            onChange={handleChange}
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {/* end of select type */}
      </form>
    </section>
  );
};

export default RoomsFilter;
