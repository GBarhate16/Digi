// components/Industries.tsx
import type { FC } from "react";
import { Factory } from "lucide-react";
import FeaturesSectionWithHoverEffects from "../Components/ui/feature-section-with-hover-effects";
import { useLenis } from "../hooks/lenis";
import Threads from "../Components/ui/Threads";

const Industries: FC = () => {
  useLenis();
  return (
    <section
      id="industries"
      className="relative bg-black text-white  pt-12 sm:pt-14 md:pt-16 lg:pt-20
             pb-12 sm:pb-14 md:pb-16 lg:pb-20
             px-4 sm:px-6 md:px-10 lg:px-16"
    >
      {/* Header Content */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
        {/* Icon */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#1f2230] rounded-full shadow-lg">
          <div className="absolute w-full h-full rounded-full bg-purple-500 opacity-30 blur-md animate-ping" />
          <Factory className="w-6 h-6 sm:w-7 sm:h-7 text-purple-300 z-10" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          <span className="text-white">Industries Empowered by </span>
          <span className="bg-gradient-to-r from-purple-400 to-yellow-500 bg-clip-text text-transparent">
            Innovation
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-2 sm:px-6">
          Transforming businesses through intelligent automation and AI-driven
          strategies for scalable growth.
        </p>
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none h-full">
        <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
      </div>

      {/* Feature Section */}
      <div className="mt-12 sm:mt-14 md:mt-16 px-2 sm:px-4 md:px-6">
        <div className="max-w-7xl w-full mx-auto">
          <FeaturesSectionWithHoverEffects />
        </div>
      </div>
    </section>
  );
};

export default Industries;
