import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Column 1: About */}
        <div>
          <h2 className="text-xl font-bold text-cyan-400 mb-4">AI Club</h2>
          <p className="text-sm leading-relaxed">
            Empowering students to explore Artificial Intelligence through projects, 
            workshops, and research. Join us in shaping the future of technology.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-cyan-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-cyan-400">About</Link></li>
            <li><Link to="/team" className="hover:text-cyan-400">Team</Link></li>
            <li><Link to="/contact" className="hover:text-cyan-400">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">Resources</h2>
          <ul className="space-y-2">
            <li><Link to="/events" className="hover:text-cyan-400">Events</Link></li>
            <li><Link to="/projects" className="hover:text-cyan-400">Projects</Link></li>
            <li><Link to="/assignments" className="hover:text-cyan-400">Assignments</Link></li>
            <li><Link to="/notices" className="hover:text-cyan-400">Notices</Link></li>
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">Connect With Us</h2>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-cyan-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-cyan-400"><FaTwitter /></a>
            <a href="#" className="hover:text-cyan-400"><FaInstagram /></a>
            <a href="#" className="hover:text-cyan-400"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AI Club RGMCET. All rights reserved.
      </div>
    </footer>
  );
}
