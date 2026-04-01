import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Auth from "./components/pages/auth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
