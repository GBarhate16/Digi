import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import Lenis from "@studio-freight/lenis";
import { TestimonialsColumn } from "../Components/ui/testimonials-columns-1";
import { useLenis } from "../hooks/lenis";

const testimonials = [
  { text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.", image: "https://randomuser.me/api/portraits/women/1.jpg", name: "Briana Patton", role: "Operations Manager" },
  { text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.", image: "https://randomuser.me/api/portraits/men/2.jpg", name: "Bilal Ahmed", role: "IT Manager" },
  { text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.", image: "https://randomuser.me/api/portraits/women/3.jpg", name: "Saman Malik", role: "Customer Support Lead" },
  { text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.", image: "https://randomuser.me/api/portraits/men/4.jpg", name: "Omar Raza", role: "CEO" },
  { text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.", image: "https://randomuser.me/api/portraits/women/5.jpg", name: "Zainab Hussain", role: "Project Manager" },
  { text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.", image: "https://randomuser.me/api/portraits/women/6.jpg", name: "Aliza Khan", role: "Business Analyst" },
  { text: "Our business functions improved with a user-friendly design and positive customer feedback.", image: "https://randomuser.me/api/portraits/men/7.jpg", name: "Farhan Siddiqui", role: "Marketing Director" },
  { text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.", image: "https://randomuser.me/api/portraits/women/8.jpg", name: "Sana Sheikh", role: "Sales Manager" },
  { text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.", image: "https://randomuser.me/api/portraits/men/9.jpg", name: "Hassan Ali", role: "E-commerce Manager" }
];

const Testimonials = () => {
    useLenis();
  const [, setScreenType] = useState<'mobile' | 'tablet' | 'laptop' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenType('mobile');
      else if (width < 1024) setScreenType('tablet');
      else if (width < 1440) setScreenType('laptop');
      else setScreenType('desktop');
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section id="testimonials" className="bg-background py-20 px-4 scroll-smooth bg-black pt-5">
      <div className="max-w-7xl mx-auto text-white ">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative w-14 h-14 flex items-center justify-center bg-black rounded-full shadow-lg">
            <div className="absolute w-full h-full rounded-full bg-purple-500 opacity-30 blur-md animate-ping" />
            <MessageCircle className="w-7 h-7 text-purple-300 z-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-yellow-500 bg-clip-text text-transparent">
            Testimonials
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">What our users say</h2>
          <p className="text-lg md:text-xl opacity-75 max-w-2xl">
            See what our customers have to say about us.
          </p>
        </div>

        <div className="flex justify-center gap-6 mt-16 overflow-hidden max-h-[740px] [mask-image:linear-gradient(to_bottom,transparent,white_25%,white_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} className="text-white" duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block text-white" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block text-white" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;