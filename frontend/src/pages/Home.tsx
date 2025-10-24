// src/pages/Home.tsx
import { lazy, Suspense } from "react";

// Lazy load components
const HeroSection = lazy(() => import("./HeroSection"));
const TechStack = lazy(() => import("./TechStack"));
const Testimonials = lazy(() => import("./Testimonials"));

// Loading component
const LoadingComponent = () => (
  <div className="flex justify-center items-center h-64">
    <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  return (
    <div className="flex flex-col" id="home">
      <Suspense fallback={<LoadingComponent />}>
        <HeroSection />
        <TechStack />
        <Testimonials />
      </Suspense>
    </div>
  );
};

export default Home