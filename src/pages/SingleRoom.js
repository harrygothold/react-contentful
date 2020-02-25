import React, { useContext } from "react";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { Context } from "../context";
import Loading from "../components/Loading";
import StyledHero from "../components/StyledHero";

const SingleRoom = ({ match }) => {
  const { slug } = match.params;
  const context = useContext(Context);
  const { getRoom } = context;
  const room = getRoom(slug);
  if (!room) return <Loading />;
  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images
  } = room;
  const [mainImage, ...defaultImg] = images;
  return (
    <>
      <StyledHero img={mainImage}>
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className="single-room">
        <div className="single-room-images">
          {defaultImg.map(image => (
            <img key={image} src={image} alt="" />
          ))}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : ${size} SQFT</h6>
            <h6>
              max capacity:{" "}
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
            <h6>{breakfast && "free breakfast included"}</h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <h6>extras</h6>
        <ul className="extras">
          {extras.map(extra => (
            <li key={extra}>- {extra}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default SingleRoom;
