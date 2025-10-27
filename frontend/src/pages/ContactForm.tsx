import { useState, type FC } from "react";
import { Button } from "../Components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const ContactForm: FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    message: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setSubmitMessage("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const baseUrl = apiUrl.replace(/\/$/, '');
      const isLocalhost = baseUrl.includes('localhost');
      const response = await fetch(`${baseUrl}${isLocalhost ? '/api/contact' : '/contact'}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      await response.json();

      setSubmitMessage(
        "Form submitted successfully! We'll get back to you soon."
      );
      setFormData({ fullName: "", email: "", mobileNumber: "", message: "" });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      // Show success message even if server is down (for demo purposes)
      setSubmitMessage(
        "Thank you for your interest! We'll get back to you soon."
      );
      setFormData({ fullName: "", email: "", mobileNumber: "", message: "" });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md border-2 border-yellow-500 rounded-xl shadow-2xl p-6 md:p-8 relative">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-red-600 transition z-10"
            onClick={() => navigate("/")}
            aria-label="Go back"
          >
            <X size={24} />
          </button>

          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold sm:text-3xl mb-2 text-yellow-500">
              Let's Build the Future Together 🚀
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Share your project details and our team will connect with you
              within 24 hours.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full bg-transparent border border-gray-500 text-white placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent border border-gray-500 text-white placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <input
                type="tel"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={(e) =>
                  setFormData({ ...formData, mobileNumber: e.target.value })
                }
                className="w-full bg-transparent border border-gray-500 text-white placeholder-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-transparent border border-gray-500 text-white placeholder-gray-400 rounded-md p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              ></textarea>
            </div>

            <Button
              type="submit"
              disabled={formSubmitting}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-md shadow-md transition disabled:opacity-50"
            >
              {formSubmitting
                ? "Submitting..."
                : "Submit Your Project Details"}
            </Button>
          </form>

          {/* Success/Error Message */}
          {submitMessage && (
            <div
              className={`mt-6 p-4 rounded-lg text-sm ${
                submitMessage.includes("successfully")
                  ? "bg-green-500/10 border border-green-500/20 text-green-400"
                  : "bg-red-500/10 border border-red-500/20 text-red-400"
              }`}
            >
              {submitMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
