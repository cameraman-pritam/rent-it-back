import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <footer className="w-full py-12 border-t border-slate-800 bg-[#080e1b] text-[#dde2f5]">
      <Container maxWidth="xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo/Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <Typography
              variant="h6"
              className="font-black opacity-50 tracking-tighter"
            >
              RENT BACK
            </Typography>
            <Typography className="text-xs text-slate-500 mt-1">
              Own less, live more.
            </Typography>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest font-medium">
            <Link
              to="/about"
              className="text-slate-400 hover:text-[#6dd9c3] transition-colors"
            >
              About
            </Link>
            <Link
              to="/browse"
              className="text-slate-400 hover:text-[#6dd9c3] transition-colors"
            >
              Browse
            </Link>
            <Link
              to="/contribute"
              className="text-slate-400 hover:text-[#6dd9c3] transition-colors"
            >
              Contribute
            </Link>
            <a
              href="#"
              className="text-slate-400 hover:text-[#6dd9c3] transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-[#6dd9c3] transition-colors"
            >
              Support
            </a>
          </div>

          {/* Copyright Section */}
          <div className="text-xs uppercase tracking-widest text-[#46b5a1] font-semibold">
            © {new Date().getFullYear()} Rent Back
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
