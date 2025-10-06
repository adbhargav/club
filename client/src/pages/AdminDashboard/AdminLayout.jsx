import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { to: "create-event", label: "Create Event" },
    { to: "give-assignments", label: "Give Assignments" },
    { to: "issue-notices", label: "Issue Notices" },
    { to: "upload-gallery", label: "Upload Gallery" },
    { to: "create-team", label: "Create Team" },
    { to: "view-projects", label: "View Projects" },
    { to: "view-students", label: "View Students" },
    { to: "view-contacts", label: "View Contacts" },
  ];

  const isOnChildRoute = navLinks.some(link =>
    location.pathname.includes(link.to)
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-blue-950 text-white font-sans">
      {/* Mobile Sidebar Toggle */}
      {!sidebarOpen && (
        <button
          className="fixed top-4 left-4 z-50 bg-indigo-900 p-3 rounded-xl text-cyan-300 shadow-lg md:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <span className="text-2xl font-bold">☰</span>
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full z-40 bg-white/10 backdrop-blur-lg p-8 flex flex-col shadow-xl border-r border-white/10
        transition-all duration-300
        ${sidebarOpen ? "w-64" : "w-0"} md:w-72
        ${sidebarOpen ? "block" : "hidden"} md:block`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-cyan-300 tracking-tight drop-shadow">
            Admin Dashboard
          </h2>
          {/* Close button for mobile sidebar */}
          <button
            className="text-white text-2xl md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>
        <nav className="space-y-5 flex-1">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-400 to-blue-400 text-indigo-900 shadow-lg"
                    : "hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 hover:text-cyan-300"
                }`
              }
              onClick={() => setSidebarOpen(false)} // close sidebar on mobile link click
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-8 text-xs text-indigo-200 text-center">
          &copy; {new Date().getFullYear()} RGMCET AI Club Admin
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 md:p-10 p-4 flex items-center justify-center overflow-y-auto">
        <div className="w-full">
          <Outlet />
          {!isOnChildRoute && (
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <div className="mb-6">
                <svg width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="80" height="80" rx="16" fill="#67E8F9" fillOpacity="0.15"/>
                  <path d="M50 30H30C28.8954 30 28 30.8954 28 32V48C28 49.1046 28.8954 50 30 50H50C51.1046 50 52 49.1046 52 48V32C52 30.8954 51.1046 30 50 30Z" stroke="#38BDF8" strokeWidth="2"/>
                  <path d="M34 34V46" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M46 34V46" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M38 38H42" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-cyan-300 mb-3 text-center">Welcome to Admin Dashboard</h2>
              <p className="text-lg text-indigo-100 text-center max-w-md">
                Select an option from the sidebar to manage events, assignments, gallery, and more for the AI Club. This page will show the content of the selected section.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}