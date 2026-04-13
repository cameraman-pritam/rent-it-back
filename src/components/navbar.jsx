import React, { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { Skeleton } from "primereact/skeleton";

const Menubar = lazy(() =>
  import("primereact/menubar").then((module) => ({
    default: module.Menubar,
  }))
);

const Button = lazy(() =>
  import("primereact/button").then((module) => ({
    default: module.Button,
  }))
);

const NavBar = () => {
  const navigate = useNavigate();
  const { user, userData } = useAuth();

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      label: "Browse Items",
      icon: "pi pi-search",
      command: () => navigate("/browse"),
    },
    {
      label: "About",
      icon: "pi pi-info-circle",
      command: () => navigate("/about"),
    },
    {
      label: "List Items",
      icon: "pi pi-cart-plus",
      command: () => navigate("/add"),
    },
  ];

  const start = (
    <div
      className="flex align-items-center cursor-pointer mr-4"
      onClick={() => navigate("/")}
    >
      <span className="text-xl font-bold transition-all duration-150 ease-out hover:scale-110 hover:text-blue-500 hover:rotate-2">
        Rent-Back
      </span>
    </div>
  );

  const end = (
    <div className="flex align-items-center gap-3">
      {user ? (
        <>
          <span className="font-medium text-gray-700 hidden sm:inline">
            Hi, {userData?.name ? userData.name.split(" ")[0] : "User"}!
          </span>
          <Button
            label="My Profile"
            icon="pi pi-user"
            className="p-button-outlined p-button-info"
            onClick={() => navigate("/auth")}
          />
        </>
      ) : (
        <Button
          label="Sign Up | Sign In"
          className="p-button-raised p-button-info"
          onClick={() => navigate("/auth")}
        />
      )}
    </div>
  );

  return (
    <div className="card mb-4 shadow-1">
      <Suspense
        fallback={<Skeleton width="100%" height="4.5rem" borderRadius="8px" />}
      >
        <Menubar
          model={items}
          start={start}
          end={end}
          className="border-none px-4"
        />
      </Suspense>
    </div>
  );
};

export default NavBar;
