import { cn } from "../../lib/utils";
import {
  IconSchool,
  IconStethoscope,
  IconBuildingSkyscraper,
  IconSettingsAutomation,
  IconShoppingCart,
  IconPlane,
  IconBolt,
  IconHeartHandshake,
} from "@tabler/icons-react";

const FeaturesSectionWithHoverEffects = () => {
  const features = [
    {
      title: "Education & Training",
      description:
        "Empowering institutions with digital solutions for seamless learning experiences.",
      icon: <IconSchool className="text-yellow-400" />,
    },
    {
      title: "Healthcare & Medical",
      description:
        "Revolutionizing patient care with AI diagnostics and health monitoring tools.",
      icon: <IconStethoscope className="text-yellow-400" />,
    },
    {
      title: "Real Estate & Infrastructure",
      description:
        "Modernizing property management, architecture, and urban planning.",
      icon: <IconBuildingSkyscraper className="text-yellow-400" />,
    },
    {
      title: "Manufacturing & Automation",
      description:
        "Optimizing operations with IoT, robotics, and intelligent supply chains.",
      icon: <IconSettingsAutomation className="text-yellow-400" />,
    },
    {
      title: "Retail & E-Commerce",
      description:
        "Enhancing customer engagement through personalized shopping experiences.",
      icon: <IconShoppingCart className="text-yellow-400" />,
    },
    {
      title: "Travel & Hospitality",
      description:
        "Reimagining travel planning, booking, and customer service with AI.",
      icon: <IconPlane className="text-yellow-400" />,
    },
    {
      title: "Energy & Utilities",
      description:
        "Driving sustainable practices with smart grids and renewable solutions.",
      icon: <IconBolt className="text-yellow-400" />,
    },
    {
      title: "Social Impact & Nonprofits",
      description:
        "Helping organizations maximize outreach and track real-time impact.",
      icon: <IconHeartHandshake className="text-yellow-400" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto text-white">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
};

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-15 relative group/feature bg-white/5 rounded-xl border-white/5 transition duration-300",
        "cursor-default sm:cursor-pointer", // Add this line
        "sm:hover:bg-yellow-100/20",
        (index === 0 || index === 4) && "lg:border-l border-white/20",
        index < 4 && "lg:border-b border-white/20"
      )}
    >
      <div className="mb-6 relative z-10 px-12 text-white text-3xl">{icon}</div>

      <div className="text-xl font-bold mb-3 relative z-10 px-12">
        <div className="absolute left-0 inset-y-0 h-6 sm:group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full sm:group-hover/feature:bg-yellow-400 transition-all duration-200 origin-center" />
        <span className="sm:group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
          {title}
        </span>
      </div>

      <p className="text-base text-white max-w-xs relative z-10 px-12">
        {description}
      </p>
    </div>
  );
};

export default FeaturesSectionWithHoverEffects;
