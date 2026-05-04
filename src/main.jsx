// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./utils/router";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { DbProvider } from "./context/dbContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <DbProvider>
        <App />
      </DbProvider>
    </AuthProvider>
  </React.StrictMode>
);
