import React, { useContext } from "react";
import RoomsFilter from "./RoomsFilter";
import RoomList from "./RoomList";
import { Context } from "../context";
import Loading from "../components/Loading";

const RoomsContainer = () => {
  const context = useContext(Context);
  if (!context) return <Loading />;
  const {
    state: { loading, sortedRooms, rooms }
  } = context;
  if (loading) return <Loading />;
  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </>
  );
};

export default RoomsContainer;
