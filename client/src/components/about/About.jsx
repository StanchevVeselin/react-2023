import React from "react";
import "./about.css";
import {loremIpsum} from "lorem-ipsum";

const About = () => {
  const loremText = loremIpsum({ count: 2000 });

  return (
    <div className="about">
      <h1>About Us</h1>
      <p>{loremText}</p>
    </div>
  );
};

export default About;