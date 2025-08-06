import SpotlightCard from "../Components/ui/spotlight-card";
import {
  SiMysql,
  SiPostgresql,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiPython,
  SiSpringboot,
  SiAngular,
  SiMongodb,
  SiN8N,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { Code2 } from "lucide-react";
import { useLenis } from "../hooks/lenis";

const techStack = [
  { name: "MySQL", icon: <SiMysql size={40} className="text-blue-600" /> },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql size={40} className="text-blue-400" />,
  },
  { name: "n8n", icon: <SiN8N size={40} className="text-orange-500" /> },
  { name: "React", icon: <SiReact size={40} className="text-cyan-400" /> },
  { name: "Next.js", icon: <SiNextdotjs size={40} className="text-white" /> },
  {
    name: "Node.js",
    icon: <SiNodedotjs size={40} className="text-green-600" />,
  },
  {
    name: "TypeScript",
    icon: <SiTypescript size={40} className="text-blue-500" />,
  },
  { name: "Python", icon: <SiPython size={40} className="text-yellow-400" /> },
  { name: "Java", icon: <DiJava size={40} className="text-red-600" /> },
  {
    name: "Spring Boot",
    icon: <SiSpringboot size={40} className="text-green-700" />,
  },
  { name: "Angular", icon: <SiAngular size={40} className="text-red-500" /> },
  { name: "MongoDB", icon: <SiMongodb size={40} className="text-green-500" /> },
];

const TechStack = () => {
  useLenis();

  return (
    <div
      id="tech-stack"
      className="w-full px-4 py-12 bg-black scroll-mt-24 pt-0"
    >
      <div className="flex flex-col items-center space-y-4 max-w-3xl mx-auto">
        <div className="relative w-14 h-14 flex items-center justify-center bg-[#1f2230] rounded-full shadow-lg">
          <div className="absolute w-full h-full rounded-full bg-purple-500 opacity-30 blur-md animate-ping" />
          <Code2 className="w-7 h-7 text-purple-300 z-10" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
          <span className="text-white">Technology </span>
          <span className="bg-gradient-to-r from-purple-400 to-yellow-500 bg-clip-text text-transparent">
            Stack
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 px-4 mt-2 leading-relaxed text-center">
          Engineering excellence with a stack designed for flexibility,
          performance, and growth.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-16">
        {techStack.map((tech, index) => (
          <SpotlightCard
            key={index}
            className="h-60 w-full text-white text-xl font-semibold shadow-lg bg-gradient-to-br border border-yellow-400 text-center"
            glowColor="yellow"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-3">
              <div>{tech.icon}</div>
              <span>{tech.name}</span>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
