import React, { useState } from "react";
import { FaShuttleVan, FaCocktail, FaHiking, FaBeer } from "react-icons/fa";
import Title from "./Title";

const Services = () => {
  const [services, setServices] = useState([
    {
      icon: <FaCocktail />,
      title: "free cocktails",
      info:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque, perspiciatis."
    },
    {
      icon: <FaHiking />,
      title: "endless hiking",
      info:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque, perspiciatis."
    },
    {
      icon: <FaShuttleVan />,
      title: "free shuttle",
      info:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque, perspiciatis."
    },
    {
      icon: <FaBeer />,
      title: "strongest beer",
      info:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque, perspiciatis."
    }
  ]);
  return (
    <section className="services">
      <Title title="services" />
      <div className="services-center">
        {services.map(service => (
          <article key={service.title} className="service">
            <span>{service.icon}</span>
            <h6>{service.title}</h6>
            <p>{service.info}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
