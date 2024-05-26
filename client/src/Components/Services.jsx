import React from "react";
import birthday from "../Images/birthday.jpg";
import anniversary from "../Images/anniversary.jpg";
import camping from "../Images/camping.jpg";
import gamenight from "../Images/gamenight.jpg";
import party from "../Images/party.jpg";
import wedding from "../Images/wedding.jpg";

const Services = () => {
  const services = [
    {
      id: 1,
      url: birthday,
      title: "Birthday Planning",
    },
    {
      id: 2,
      url: anniversary,
      title: "Anniversary Planning",
    },
    {
      id: 3,
      url: camping,
      title: "Camping Trip Planning",
    },
    {
      id: 4,
      url: gamenight,
      title: "Game Night Planning",
    },
    {
      id: 5,
      url: party,
      title: "Party Planning",
    },
    {
      id: 6,
      url: wedding,
      title: "Wedding Planning",
    },
  ];

  return (
    <>
      <div className="services container">
        <h2>OUR SERVICES</h2>
        <div className="banner">
          {services.map((element) => {
            return (
              <div className="item" key={element.id}>
                <h3>{element.title}</h3>
                <img src={element.url} alt={element.title} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Services;