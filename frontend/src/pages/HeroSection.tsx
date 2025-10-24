// src/pages/HeroSection.tsx
import type { FC } from "react";
import { memo } from "react";
import ButtonColorful from "../Components/ui/button-colorful";
import DarkVeil from "../Components/ui/darkveil";
import { FeaturesSection } from "./cards";

const HeroSection: FC = () => {
  return (
    <section
      id="home"
      className="relative w-full bg-black text-white overflow-hidden"
    >
      {/* Background Visual Effect */}
      <div className="absolute inset-0 z-0 w-full h-full ">
        <DarkVeil />
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center 
    px-4 sm:px-6 lg:px-8
    pt-20 sm:pt-24 md:pt-28 lg:pt-32
    pb-8 sm:pb-10 md:pb-12 lg:pb-16
    text-center max-w-7xl mx-auto space-y-10 sm:space-y-12"
      >
        {/* Button */}
        <ButtonColorful
          label="✨Next-Generation AI Solutions"
          className="px-5 py-2.5 text-base sm:text-lg font-semibold rounded-full"
        />

        {/* Heading */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Your <span className="text-yellow-500 animate-pulse">Business</span>
            <br />
            <span className="block mt-1 sm:mt-2">Our Mission</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We believe in combining{" "}
            <span className="text-yellow-500">
              innovative design, sustainable practices,
            </span>
            and exceptional craftsmanship to bring your vision to life.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8">
          {[
            { title: "12+", desc: "Projects Delivered" },
            { title: "5+", desc: "Industries Served" },
            { title: "90%", desc: "Avg Accuracy" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center border border-gray-700 px-6 py-4 rounded-xl hover:bg-gray-800 transition w-full sm:w-auto"
            >
              <h3 className="text-2xl sm:text-3xl font-bold">{stat.title}</h3>
              <p className="text-yellow-400 font-semibold mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="w-full mt-4 sm:mt-6 md:mt-8">
          <FeaturesSection />
        </div>
      </div>
    </section>
  );
};

export default memo(HeroSection);