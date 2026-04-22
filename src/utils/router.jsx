import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "../pages/about";
import Layout from "../layout/Layout";
import Home from "../pages/home.jsx";
import Browse from "../pages/browse";
import Contribute from "../pages/contribute";
import NotFound from "../pages/notfound";
import SignUp from "../pages/auth/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // This is where your Navbar lives
    children: [
      { index: true, element: <Home /> },
      { path: "browse", element: <Browse /> },
      { path: "about", element: <About /> },
      { path: "contribute", element: <Contribute /> },
      { path: "*", element: <NotFound /> },
      { path: "auth", children: [{ path: "signup", element: <SignUp /> }] },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
