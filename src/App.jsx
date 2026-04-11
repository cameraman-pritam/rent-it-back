import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Auth from "./components/pages/auth";
import AddListing from "./components/pages/addlisting";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/add" element={<AddListing />} />
      </Routes>
    </>
  );
}

export default App;
