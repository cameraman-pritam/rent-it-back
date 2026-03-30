import React from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import Root from "../structure/root";

const header = () => {
  return (
    <>
      <h3 className="font-bold">
        Why Use{" "}
        <span className="hover:text-blue-500 hover:underline hover:animate-pulse">
          RentBack?
        </span>
      </h3>
      <Divider />
    </>
  );
};

const About = () => {
  return (
    <>
      <Root />
      <Card title={header}>
        <p>
          Rent Back is a shopping experience for the new generation. Everytime
          you need a thing like a ladder, a drill or maybe a book you know you
          are not going to use again, or maybe you really want a guitar after
          you came to a new locality for vacations? RentBack got you covered.
        </p>
        <p>
          It is a revolutionary idea that utilises the usual economy of
          borrowing, selling, reselling or maybe simple "I dont need it
          anymore". It is useful, because people can put items for rent, so that
          people can keep utilising the same object.
        </p>
        <p>
          Also, together we can enhance the idea of reduce and reuse, and save
          the planet Earth.
        </p>
      </Card>{" "}
      <br />
      <Card title={<h3>Meet the Creator</h3>}>
        <p>
          Pritam Santra (
          <span className="italic underline-offset-2 underline hover:animate-bounce">
            <a href="https://www.github.com/cameraman-pritam">
              cameraman-pritam
            </a>
          </span>{" "}
          on github,{" "}
          <span className="italic underline-offset-2 underline hover:animate-bounce">
            <a href="https://www.instagram.com/cameraman.pritam">
              @cameraman.pritam
            </a>
          </span>{" "}
          on Instagram) is a tech newby, who really wanted to create something,
          so came up to this.
        </p>
      </Card>
    </>
  );
};

export default About;
