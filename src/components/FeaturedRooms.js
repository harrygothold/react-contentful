import React, { useContext } from "react";
import { Context } from "../context";
import Loading from "./Loading";
import Title from "./Title";
import Room from "./Room";

const FeaturedRooms = () => {
  const context = useContext(Context);
  const {
    state: { loading, featuredRooms: rooms }
  } = context;
  if (loading) return <Loading />;
  return (
    <section className="featured-rooms">
      <Title title="Feature rooms" />
      <div className="featured-rooms-center">
        {rooms.map(room => (
          <Room key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedRooms;
