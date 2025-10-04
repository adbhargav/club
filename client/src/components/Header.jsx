import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo / Club Name */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-cyan-400">
          AI Club
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link to="/about" className="hover:text-cyan-400 transition">About</Link>
          <Link to="/gallery" className="hover:text-cyan-400 transition">Gallery</Link>
          <Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link>
          <Link to="/team" className="hover:text-cyan-400 transition">Team</Link>
          <Link to="/signin" className="hover:text-cyan-400 transition">Sign In / Up</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cyan-400 focus:outline-none"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 text-center space-y-4 py-6">
          <Link to="/" className="block hover:text-cyan-400">Home</Link>
          <Link to="/about" className="block hover:text-cyan-400">About</Link>
          <Link to="/gallery" className="block hover:text-cyan-400">Gallery</Link>
          <Link to="/contact" className="block hover:text-cyan-400">Contact</Link>
          <Link to="/team" className="block hover:text-cyan-400">Team</Link>
          <Link to="/signin" className="block hover:text-cyan-400">Sign In / Up</Link>
        </div>
      )}
    </header>
  );
}
