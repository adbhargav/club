import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "student" or "admin"

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user"); // optional
    navigate("/signin");
  };

  // Determine dashboard link based on role
  const dashboardLink = role === "admin" ? "/admin" : "/student-dashboard";

  // Menu items for both desktop and mobile
  const menuItems = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Gallery", to: "/gallery" },
    { name: "Contact", to: "/contact" },
    { name: "Team", to: "/team" },
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-700 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-white rounded-full p-1 shadow-lg">
            <img
              src="/rgmcet-logo.jpg"
              alt="AI Club Logo"
              className="h-10 w-10 object-contain rounded-full"
            />
          </div>
          <span className="text-2xl font-bold tracking-wide text-cyan-300 hidden sm:inline drop-shadow">
            AI Club
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-lg font-medium items-center">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="hover:text-cyan-300 transition-colors"
            >
              {item.name}
            </Link>
          ))}

          {token ? (
            <>
              <Link
                to={dashboardLink}
                className="hover:text-cyan-300 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="hover:text-cyan-300 transition-colors"
            >
              Sign In / Up
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cyan-300 focus:outline-none text-3xl"
          aria-label="Menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-800 text-center space-y-4 py-6 shadow-lg">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="block hover:text-cyan-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {token ? (
            <>
              <Link
                to={dashboardLink}
                className="block hover:text-cyan-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg transition w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="block hover:text-cyan-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign In / Up
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
