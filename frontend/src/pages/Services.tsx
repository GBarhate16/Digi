import { Brain } from "lucide-react";
import { memo, type FC } from "react";
import { WhatWeProvide } from "./cards";
import { useState, useEffect } from "react";

const Services: FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [screenType, setScreenType] = useState<
    "mobile" | "tablet" | "laptop" | "desktop"
  >("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) setScreenType("mobile");
      else if (width < 768) setScreenType("tablet");
      else if (width < 1024) setScreenType("laptop");
      else setScreenType("desktop");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="services"
      className="bg-black text-white overflow-hidden
             pt-12 sm:pt-14 md:pt-16 lg:pt-20
             pb-12 sm:pb-14 md:pb-16 lg:pb-20
             px-4 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="flex flex-col items-center space-y-3 sm:space-y-4 max-w-3xl mx-auto text-center">
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#1f2230] rounded-full shadow-lg">
          <div className="absolute w-full h-full rounded-full bg-purple-500 opacity-30 blur-md animate-ping" />
          <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-purple-300 z-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Intelligent{" "}
          <span className="bg-gradient-to-r from-purple-400 to-yellow-500 bg-clip-text text-transparent">
            Digital Solutions
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-2 sm:px-6">
          Comprehensive technology services designed to accelerate digital
          transformation and drive measurable business outcomes for enterprise
          clients.
        </p>
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <WhatWeProvide screenType={screenType} />
        </div>
      </div>
    </section>
  );
};

export default memo(Services);