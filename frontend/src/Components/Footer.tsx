const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-12 px-6 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            Digitos Solutions
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Revolutionizing industries with next-gen AI, smart automation, and custom-built software solutions for a future-ready digital ecosystem.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-300">Services</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>N8N Automation</li>
            <li>SaaS Development</li>
            <li>Mobile & Web Apps</li>
            <li>Open Source Integration</li>
          </ul>
        </div>

        {/* Industries */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-300">Industries</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Healthcare</li>
            <li>Construction</li>
            <li>Finance</li>
            <li>Education</li>
            <li>Travel</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-300">Stay Connected</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              Email:{" "}
              <a href="mailto:hr@digitos.com" className="text-white hover:underline underline-offset-4">
                admin@digitos.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+919595669766" className="text-white hover:underline underline-offset-4">
                +91 9021117452
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-xs text-gray-500 border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} Digitos Solutions. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
