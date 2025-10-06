import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const location = useLocation();

  const dashboardBase = "/student-dashboard"; // change this if your dashboard route is different

  // Dashboard cards
  const navLinks = [
    { path: "profile", label: "View Profile", color: "bg-violet-500" },
    { path: "assignments", label: "Take Assignments", color: "bg-blue-500" },
    { path: "notices", label: "View Notices", color: "bg-cyan-500" },
    { path: "events", label: "View Events", color: "bg-indigo-500" },
    { path: "projects", label: "Submit Projects", color: "bg-teal-500" },
    { path: "stats", label: "Stats & Progress", color: "bg-purple-500" },
  ];

  // If on base dashboard route, show cards
  const isOnDashboardRoot =
    location.pathname === dashboardBase ||
    location.pathname === dashboardBase + "/";

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-950 via-violet-900 to-cyan-900 text-white font-sans flex flex-col items-center justify-center">
      <main className="w-full max-w-5xl mx-auto md:p-10 p-4">
        {isOnDashboardRoot ? (
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-violet-300">
              Student Dashboard
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`flex flex-col items-center justify-center ${link.color} bg-opacity-90 hover:bg-opacity-100 p-8 rounded-2xl shadow-lg transition-all duration-200 focus:ring-2 focus:ring-white`}
                  style={{ minHeight: "140px" }}
                >
                  <span className="text-xl md:text-2xl font-semibold mb-2 text-white">
                    {link.label}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <footer className="mt-10 text-xs text-cyan-200 text-center">
        &copy; {new Date().getFullYear()} RGMCET AI Club Student
      </footer>
    </div>
  );
}