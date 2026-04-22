import React from "react";
import { NavLink, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  Info as InfoIcon,
  VolunteerActivism as ContributeIcon,
} from "@mui/icons-material";
import { logoNavbar } from "../assets/assets.js";

const Navbar = () => {
  const navClass = "bg-[#0f172a] border-b border-teal-900/30";

  const linkStyles = ({ isActive }) =>
    `flex items-center gap-1 px-4 py-2 transition-colors duration-200 ${
      isActive
        ? "text-teal-400 border-b-2 border-teal-400"
        : "text-slate-300 hover:text-white"
    }`;

  return (
    <AppBar
      position="sticky"
      className={navClass}
      elevation={0}
      sx={{ backgroundColor: "#0f172a" }}
    >
      <Toolbar className="flex justify-between container mx-auto">
        {/* Logo Section */}
        <Typography variant="h6" className="font-bold tracking-tight">
          <Link to="/" className="text-white flex items-center gap-2">
            {/* Logo Image Placeholder */}
            <img
              src={logoNavbar}
              alt="Rent Back Logo"
              className="h-8 w-auto object-contain"
            />
            <span>Rent Back</span>
          </Link>
        </Typography>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-2">
          <NavLink to="/" className={linkStyles}>
            <HomeIcon fontSize="small" /> Home
          </NavLink>
          <NavLink to="/browse" className={linkStyles}>
            <ExploreIcon fontSize="small" /> Browse
          </NavLink>
          <NavLink to="/about" className={linkStyles}>
            <InfoIcon fontSize="small" /> About
          </NavLink>
          <NavLink to="/contribute" className={linkStyles}>
            <ContributeIcon fontSize="small" /> Contribute
          </NavLink>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            component={Link}
            to="/signin"
            variant="outlined"
            color="inherit"
            className="border-slate-500 text-slate-300 hover:border-teal-400 hover:text-teal-400"
          >
            Sign In
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            Sign Up
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
