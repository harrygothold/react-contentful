import React from "react";
import Room from "../components/Room";

const RoomList = ({ rooms }) => {
  return (
    <section className="room-list">
      {rooms.length === 0 ? (
        <div className="empty-search">
          <h3>unfortunately no rooms matched your search parameters</h3>
        </div>
      ) : (
        <div className="roomslist-center">
          {rooms.map(room => (
            <Room key={room.id} room={room} />
          ))}
        </div>
      )}
    </section>
  );
};

export default RoomList;
