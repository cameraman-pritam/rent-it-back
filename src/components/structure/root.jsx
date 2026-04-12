import React, { Suspense, lazy } from "react";
import icon from "../../assets/icon.png";
import { Skeleton } from "primereact/skeleton";

const Card = lazy(() =>
  import("primereact/card").then((module) => ({
    default: module.Card,
  }))
);

const Divider = lazy(() =>
  import("primereact/divider").then((module) => ({
    default: module.Divider,
  }))
);

const NavBar = lazy(() => import("../navbar"));

const RootSkeleton = () => (
  <>
    <div className="flex items-stretch gap-2 justify-between">
      <div className="md:w-25rem w-8/10">
        <Skeleton width="100%" height="5rem" borderRadius="12px" />
      </div>
      <div className="flex justify-center items-center px-3">
        <Skeleton width="2px" height="5rem" />
      </div>
      <div className="w-2/10">
        <Skeleton width="100%" height="5rem" borderRadius="1.5rem" />
      </div>
    </div>
    <div className="mt-4">
      <Skeleton width="100%" height="2px" />
    </div>
  </>
);

const Root = () => {
  return (
    <Suspense fallback={<RootSkeleton />}>
      <div className="flex items-stretch gap-2 justify-between">
        <Card title={<NavBar />} className="md:w-25rem w-8/10"></Card>
        <Divider layout="vertical" />
        <div className="w-2/10">
          <img src={icon} className="rounded-3xl" alt="App Icon" />
        </div>
      </div>
      <Divider />
    </Suspense>
  );
};

export default Root;
