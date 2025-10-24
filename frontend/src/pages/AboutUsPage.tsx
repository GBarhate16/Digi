import { memo } from "react";
import LightRays from "../Components/ui/LightRays";
import { Sparkles } from "lucide-react";
import { FaqAccordion } from "../Components/ui/faq";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import type { Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(6px)",
    transition: {
      duration: 0.9,
      delay: 0.2,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0)",
    transition: {
      duration: 0.4,
      delay: 0.1,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.2,
    },
  },
};

const defaultData = [
  {
    id: 1,
    question: "Our History",
    answer:
      "Welcome to Digitos IT Solutions Pvt Ltd, a leading provider of IT-enabled Business Process Outsourcing (BPO) solutions...",
  },
  {
    id: 2,
    question: "Our Mission",
    answer:
      "At Digitos IT Solutions, our mission is to empower businesses to thrive in the digital age...",
  },
  {
    id: 3,
    question: "Our Vision",
    answer:
      "Our vision is to be the leading force in shaping the future of AI-driven revolutionary tools...",
  },
];

const AboutUsSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView]);

  return (
    <section
      id="aboutUs"
      className="relative w-full bg-black text-white overflow-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Animation */}
      <div className="absolute inset-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#FFFF00"
          raysSpeed={2.6}
          lightSpread={1.8}
          rayLength={1.2}
          followMouse={false}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="w-full h-full"
        />
      </div>

      {/* Main Content */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
        className="relative z-10 max-w-7xl mx-auto space-y-20"
      >
        {/* Header */}
        <motion.div className="flex flex-col items-center gap-6 text-center">
          <div className="relative w-14 h-14 flex items-center justify-center bg-[#1f2230] rounded-full shadow-lg">
            <div className="absolute w-full h-full rounded-full bg-purple-500 opacity-30 blur-md animate-ping" />
            <Sparkles className="w-7 h-7 text-purple-300 z-10" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-yellow-500 bg-clip-text text-transparent">
              About Us
            </span>
          </h1>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Description */}
          <motion.div className="rounded-lg bg-gradient-to-br  p-6 shadow-md">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              About Our Company
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-justify">
              <span className="text-yellow-400 font-bold">
                Digitos IT Solutions Pvt. Ltd.
              </span>{" "}
              founded in June 2024, is a nimble yet ambitious digital agency{" "}
              <span className="text-white font-semibold">
                headquartered in Aurangabad, Maharashtra.
              </span>{" "}
              We partner with startups, legal firms, SMBs, and growth-focused
              businesses to build scalable, secure, and cost-efficient digital
              products — all supercharged with AI and automation.
            </p>
          </motion.div>

          {/* Right FAQ */}
          <motion.div className="rounded-lg bg-gradient-to-br p-6 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              🧭 Who We Are
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-justify mb-6">
              We're a passionate team of developers, designers, and strategists
              who eat, sleep, and breathe digital innovation...
            </p>

            <FaqAccordion
              data={defaultData}
              className="bg-gradient-to-r from-black to-gray-900 border border-yellow-500 rounded-xl p-4"
              questionClassName="text-white font-semibold p-2"
              answerClassName="text-white p-2 leading-relaxed text-justify text-base"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default memo(AboutUsSection);