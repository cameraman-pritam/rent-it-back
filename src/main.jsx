// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./utils/router"; // Import the App function you just showed me
import "./index.css"; // Make sure Tailwind is imported here!

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
