import { useCallback, useState, memo, useMemo } from "react";
import type { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";


const menuItems = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Tech Stack", href: "/#tech-stack" },
  { label: "Testimonials", href: "/#testimonials" },
];

// Memoized menu item component
const MenuItem = memo(({ item, handleItemClick, setIsOpen }: { 
  item: typeof menuItems[0]; 
  handleItemClick: (href: string) => void;
  setIsOpen: (open: boolean) => void;
}) => {
  return (
    <NavigationMenuItem key={item.label}>
      <NavigationMenuLink asChild>
        {item.href.startsWith("/#") ? (
          <button
            onClick={() => handleItemClick(item.href)}
            className="text-white text-sm sm:text-base font-semibold hover:text-yellow-400 transition-colors cursor-pointer"
          >
            {item.label}
          </button>
        ) : (
          <Link
            to={item.href}
            className="text-white text-sm sm:text-base font-semibold hover:text-yellow-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        )}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
});

// Memoized mobile menu item component
const MobileMenuItem = memo(({ item, handleItemClick, setIsOpen }: { 
  item: typeof menuItems[0]; 
  handleItemClick: (href: string) => void;
  setIsOpen: (open: boolean) => void;
}) => {
  return (
    <li key={item.label}>
      {item.href.startsWith("/#") ? (
        <button
          onClick={() => handleItemClick(item.href)}
          className="block w-full text-left text-white text-base font-semibold hover:text-yellow-400 transition py-1"
        >
          {item.label}
        </button>
      ) : (
        <Link
          to={item.href}
          onClick={() => setIsOpen(false)}
          className="block text-white text-base font-semibold hover:text-yellow-400 transition py-1"
        >
          {item.label}
        </Link>
      )}
    </li>
  );
});

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = useCallback((href: string) => {
    setIsOpen(false);
    
    if (href.startsWith("/#")) {
      const sectionId = href.substring(2);
      
      if (window.location.pathname !== "/") {
        navigate("/", { replace: true });
      }
      
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [navigate]);

  const handleGetStarted = useCallback(() => {
    navigate("/contact");
  }, [navigate]);

  // Memoize the desktop menu
  const desktopMenu = useMemo(() => (
    <div className="hidden lg:flex flex-1 justify-center">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-4 sm:gap-6">
          {menuItems.map((item) => (
            <MenuItem 
              key={item.label} 
              item={item} 
              handleItemClick={handleItemClick} 
              setIsOpen={setIsOpen} 
            />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ), [handleItemClick]);

  // Memoize the mobile menu
  const mobileMenu = useMemo(() => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden px-4 pb-4"
        >
          <div className="bg-gray-900 rounded-xl shadow-lg p-4 mt-1 border border-yellow-900">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <MobileMenuItem 
                  key={item.label} 
                  item={item} 
                  handleItemClick={handleItemClick} 
                  setIsOpen={setIsOpen} 
                />
              ))}
              <li>
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    handleGetStarted();
                  }}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-md shadow-md transition"
                  aria-label="Get Started"
                >
                  Get Started
                </Button>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  ), [isOpen, handleItemClick, handleGetStarted]);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 shadow-md">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 font-sans">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            {/* Logo Image */}
            <img
              src={logo}
              alt="Digitos Logo"
              className="h-8 w-auto sm:h-10 md:h-12 object-contain transition-transform duration-300 group-hover:scale-105"
              style={{ maxWidth: '120px' }}
            />
          </Link>

          {/* Hamburger - mobile only */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Menu */}
          {desktopMenu}

          {/* CTA button */}
          <div className="hidden lg:flex">
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 sm:px-6 py-2 rounded-md shadow-md transition"
              aria-label="Get Started"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu}
      </nav>
    </>
  );
};

export default memo(Navbar);