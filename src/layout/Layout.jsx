import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] text-slate-200">
      <Navbar />

      <main className="grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
