// src/pages/Home.tsx
import HeroSection from "./HeroSection";
// import Services from "./Services";
// import Industries from "./Industries";
import TechStack from "./TechStack";
import Testimonials from "./Testimonials";
const Home = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      {/* <Services />
      <Industries /> */}
      <TechStack />
      <Testimonials />
    </div>
  );
};

export default Home;
