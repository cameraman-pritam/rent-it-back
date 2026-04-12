import React, { Suspense, lazy } from "react";
import { Skeleton } from "primereact/skeleton";

const Card = lazy(() =>
  import("primereact/card").then((module) => ({ default: module.Card }))
);
const Divider = lazy(() =>
  import("primereact/divider").then((module) => ({ default: module.Divider }))
);
const Root = lazy(() => import("../structure/root"));

const AboutSkeleton = () => (
  <div className="flex flex-col gap-6 w-full">
    <Skeleton width="100%" height="5rem" borderRadius="12px" />
    <Skeleton width="100%" height="20rem" borderRadius="12px" />
    <Skeleton width="100%" height="8rem" borderRadius="12px" />
  </div>
);

const Header = () => {
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
    <Suspense fallback={<AboutSkeleton />}>
      <Root />
      <Card title={<Header />}>
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
    </Suspense>
  );
};

export default About;
