import GlowCard from "../Components/ui/spotlight-card";
import {
  Bot,
  Briefcase,
  MonitorSmartphone,
  Rocket,
  Settings,
  Smartphone,
  Stethoscope,
  Layers,
  Users,
  Cpu,
} from "lucide-react";
import { useLenis } from "../hooks/lenis";

const cardData = [
  {
    icon: Layers,
    title: "Scalable Systems",
    description: "Built to grow with your business needs.",
  },
  {
    icon: Users,
    title: "Human-Centered Design",
    description: "Crafted experiences your users will love.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Efficiency",
    description: "Smarter automation. Faster results.",
  },
];

const serviceData = [
  {
    title: "MVP Development",
    icon: Rocket,
    description:
      "From idea to launch, we rapidly build startup-ready MVPs that scale.",
    points: [
      "Idea to Prototype to Launch",
      "Startup-Focused Approach",
      "Speed + Scalability + Support",
    ],
  },
  {
    title: "Web & App Development",
    icon: Smartphone,
    description:
      "Custom websites and cross-platform apps tailored to your business.",
    points: [
      "Custom Websites",
      "Cross-Platform Mobile Apps",
      "Maintenance & Upgrades",
    ],
  },
  {
    title: "AI & Automation",
    icon: Bot,
    description:
      "AI integrations and automation solutions to optimize business operations.",
    points: [
      "AI Model Integration",
      "Chatbots & Assistants",
      "Process Automation",
    ],
  },
  {
    title: "SaaS Product Development",
    icon: Settings,
    description:
      "Complete SaaS architecture and development tailored to scale.",
    points: [
      "Complete SaaS Lifecycle",
      "Multi-Tenant Architecture",
      "Admin Panels & Billing Modules",
    ],
  },
  {
    title: "Dedicated Developer Team",
    icon: Users,
    description:
      "Hire skilled developers monthly or hourly for your tech needs.",
    points: [
      "Onsite/Remote Developers",
      "Monthly/Hourly Hiring",
      "Flutter, React, Node, Python, AI",
    ],
  },
  {
    title: "Business Software / ERP Development",
    icon: Briefcase,
    description:
      "Custom ERP and business software tailored for your operations.",
    points: [
      "Custom CRM, HRMS, POS",
      "Web + Windows Based",
      "End-to-End Deployment",
    ],
  },
  {
    title: "Medical Coding Services ✅ (New)",
    icon: Stethoscope,
    description: "Certified medical coders offering HIPAA-compliant solutions.",
    points: [
      "HIPAA-Compliant Processes",
      "CPT, ICD-10, HCPCS Coding",
      "Trained & Certified Coders",
    ],
  },
  {
    title: "IT Asset Management (Optional – if needed)",
    icon: MonitorSmartphone,
    description:
      "Track and manage all your digital assets with intelligent tools.",
    points: [
      "Windows-Based Stealth Tools",
      "Inventory & License Tracking",
      "Admin Portal & Logs",
    ],
  },
];

export const FeaturesSection = () => {
  useLenis();
  return (
    <div className="w-full flex justify-center py-10 px-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl">
        {cardData.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 text-white shadow-md sm:hover:scale-[1.03] sm:hover:bg-white/10 transition-all duration-500 ease-in-out flex flex-col items-center text-center"
              style={{
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <Icon className="text-yellow-400 w-10 h-10 mb-6 animate-soft-glow" />
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-gray-200">{card.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface Props {
  screenType: "mobile" | "tablet" | "laptop" | "desktop";
}
export const WhatWeProvide = ({ screenType }: Props) => {
  useLenis();
  const isMobile = screenType === "mobile";

  return (
    <div className="w-full flex justify-center py-10 px-4">
      <div
        className={`${
          isMobile
            ? "flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16"
        } max-w-6xl`}
      >
        {serviceData.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className={`${
                isMobile ? "min-w-[80%] snap-center shrink-0" : ""
              }`}
            >
              <GlowCard
                className={`flex flex-col justify-between p-4 sm:p-6 h-full transition-transform ${
                  isMobile ? "" : "hover:scale-105"
                }`}
              >
                {/* Top Icon */}
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-full bg-black border border-yellow-200 p-4 ${
                      isMobile ? "" : "animate-soft-glow"
                    }`}
                  >
                    <Icon className="text-yellow-300 w-6 h-6" />
                  </div>
                </div>

                {/* Title & Desc */}
                <div className="flex flex-col items-center text-center mb-4 flex-grow">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-300">{service.description}</p>
                </div>

                {/* Bullet Points */}
                <ul className="list-disc text-left text-sm text-white space-y-2 pl-5 mt-2">
                  {service.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </GlowCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};
