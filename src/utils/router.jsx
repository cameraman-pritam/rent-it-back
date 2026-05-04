import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Skeleton } from "@mui/material";

// Standard import for Layout so the app shell (nav/footer) doesn't flash on route changes
import Layout from "../layout/Layout";

// Lazy load all route components to split the bundle size
const Home = lazy(() => import("../pages/home.jsx"));
const About = lazy(() => import("../pages/about"));
const Browse = lazy(() => import("../pages/items/browse"));
const Contribute = lazy(() => import("../pages/contribute"));
const NotFound = lazy(() => import("../pages/notfound"));
const SignUp = lazy(() => import("../pages/auth/signup"));
const SignIn = lazy(() => import("../pages/auth/signin"));
const Profile = lazy(() => import("../pages/auth/profile"));
const Index = lazy(() => import("../pages/items"));
const AddItems = lazy(() => import("../pages/items/addItems"));

// Fallback UI using MUI Skeleton, mapped to your Tailwind v4 theme variables
const SuspenseFallback = () => (
  <div className="flex h-screen w-full flex-col items-center justify-center bg-surface p-6">
    <Skeleton
      variant="rectangular"
      width="100%"
      height="70vh"
      className="max-w-4xl rounded-xl bg-surface-container ghost-border"
      animation="wave"
    />
    <Skeleton
      variant="text"
      width="40%"
      height={40}
      className="mt-4 bg-surface-container-high"
      animation="wave"
    />
  </div>
);

// Helper function to wrap lazy components in Suspense, keeping the router map clean
// eslint-disable-next-line no-unused-vars
const Loadable = ({ Component }) => (
  <Suspense fallback={<SuspenseFallback />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Loadable Component={Home} /> },
      {
        path: "items",
        children: [
          { index: true, element: <Loadable Component={Index} /> },
          { path: "browse", element: <Loadable Component={Browse} /> },
          { path: "add", element: <Loadable Component={AddItems} /> },
        ],
      },
      { path: "about", element: <Loadable Component={About} /> },
      { path: "contribute", element: <Loadable Component={Contribute} /> },
      { path: "*", element: <Loadable Component={NotFound} /> },
      {
        path: "auth",
        children: [
          { path: "signup", element: <Loadable Component={SignUp} /> },
          { path: "signin", element: <Loadable Component={SignIn} /> },
          { path: "profile", element: <Loadable Component={Profile} /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
