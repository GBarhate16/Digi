import { Instagram, Twitter, Linkedin, Mail, Phone } from 'lucide-react';

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
          
          {/* Contact Details */}
          <ul className="space-y-3 text-sm text-gray-400 mb-6">
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-yellow-400" />
              <a href="mailto:support@digitositsolutionpvtltd.com" className="text-white hover:text-yellow-400 transition-colors">
              support@digitositsolutionpvtltd.com
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-yellow-400" />
              <a href="tel:+919595669766" className="text-white hover:text-yellow-400 transition-colors">
                +91 7620195100
              </a>
            </li>
          </ul>

          {/* Social Media Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-yellow-300">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/digitos_it_solutions?igsh=Zzl3MGppZ2llZ2Nn&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>
              
              <a
                href="https://x.com/digitos_it?s=21"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>
              
              <a
                href="https://www.linkedin.com/company/digitos-it-solution/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mt-10 text-center border-t border-gray-800 pt-6">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Digitos Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
