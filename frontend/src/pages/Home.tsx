// src/pages/Home.tsx
import { lazy, Suspense } from "react";

// Lazy load components
const HeroSection = lazy(() => import("./HeroSection"));
const TechStack = lazy(() => import("./TechStack"));
const Testimonials = lazy(() => import("./Testimonials"));

const Home = () => {
  return (
    <div className="flex flex-col" id="home">
      <Suspense fallback={<div></div>}>
        <HeroSection />
        <TechStack />
        <Testimonials />
      </Suspense>
    </div>
  );
};

export default Home