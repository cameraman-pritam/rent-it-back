import React, { Suspense, lazy } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";

const Home = lazy(() => import("./components/pages/home"));
const About = lazy(() => import("./components/pages/about"));
const Auth = lazy(() => import("./components/pages/auth"));
const AddListing = lazy(() => import("./components/pages/addlisting"));
const Browse = lazy(() => import("./components/pages/browse"));

const FallbackSkeleton = () => (
  <div className="min-h-screen bg-inherit p-6 md:p-12 w-full max-w-7xl mx-auto flex flex-col gap-6">
    <Skeleton width="100%" height="4rem" borderRadius="16px" className="mb-4" />
    <Skeleton width="40%" height="2rem" className="mb-2" />
    <Skeleton width="80%" height="1.5rem" className="mb-8" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Skeleton width="100%" height="20rem" borderRadius="24px" />
      <Skeleton width="100%" height="20rem" borderRadius="24px" />
    </div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<FallbackSkeleton />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/add" element={<AddListing />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </Suspense>
  );
}

export default App;
