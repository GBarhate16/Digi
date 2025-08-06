import { useCallback, useState } from "react";
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


const menuItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Testimonials", href: "#testimonials" },
];


const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    message: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleItemClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(
          "Form submitted successfully! We'll get back to you soon."
        );
        setFormData({ fullName: "", email: "", mobileNumber: "", message: "" });
        setTimeout(() => {
          setIsFormOpen(false);
          setSubmitMessage("");
        }, 3000);
      } else {
        setSubmitMessage(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      setSubmitMessage("Network error. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/10 shadow-md">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 font-sans">
          {/* Logo */}
          <div className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight font-mono">
            <span className="text-yellow-500">Digitos</span>
          </div>

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
          <div className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-4 sm:gap-6">
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink
                      href={item.href}
                      className="text-white text-sm sm:text-base font-semibold hover:text-yellow-400 transition-colors"
                      onClick={handleItemClick}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA button */}
          <div className="hidden lg:flex">
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 sm:px-6 py-2 rounded-md shadow-md transition"
              aria-label="Get Started"
              onClick={() => setIsFormOpen(true)}
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
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
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={handleItemClick}
                        className="block text-white text-base font-semibold hover:text-yellow-400 transition py-1"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <Button
                      onClick={() => {
                        handleItemClick();
                        setIsFormOpen(true);
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
      </nav>

      {/* Modal Form */}
      {/* Modal Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-black text-white border-2 border-yellow-500 rounded-xl shadow-2xl w-[90%] max-w-md p-6 relative"
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-white hover:text-red-600 transition"
                onClick={() => setIsFormOpen(false)}
                aria-label="Close form"
              >
                <X size={20} />
              </button>

              {/* Form Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold sm:text-3xl mb-2 text-yellow-500">
                  Let’s Build the Future Together 🚀
                </h2>
                <p className="text-sm sm:text-base text-white">
                  Share your project details and our team will connect with you
                  within 24 hours.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full bg-transparent border border-white-500 text-white placeholder-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-transparent border border-white-500 text-white placeholder-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNumber: e.target.value })
                  }
                  className="w-full bg-transparent border border-white-500 text-white placeholder-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white-500"
                  required
                />
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-transparent border border-white-500 text-white placeholder-gray-300 rounded-md p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-white-500"
                  required
                ></textarea>
                <Button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-md shadow-md transition disabled:opacity-50"
                >
                  {formSubmitting
                    ? "Submitting..."
                    : "Submit Your Project Details"}
                </Button>
              </form>

              {/* Success/Error Message */}
              {submitMessage && (
                <div
                  className={`mt-4 p-3 rounded-lg text-sm ${
                    submitMessage.includes("successfully")
                      ? "bg-green-500/10 border border-green-500/20 text-green-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}
                >
                  {submitMessage}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
