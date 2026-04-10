import React from "react";
import { Card } from "primereact/card";
import icon from "../../assets/icon.png";
import NavBar from "../navbar";
import { Divider } from "primereact/divider";

const Root = () => {
  return (
    <>
      <div className="flex items-stretch gap-2 justify-between">
        <Card title={NavBar} className="md:w-25rem w-8/10"></Card>
        <Divider layout="vertical" />
        <div className="w-2/10">
          <img src={icon} className="rounded-3xl" />
        </div>
      </div>
      <Divider />
    </>
  );
};

export default Root;
