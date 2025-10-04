import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-400 mb-6">Student Dashboard</h2>
        <nav className="space-y-4">
          <NavLink to="profile" className="block hover:text-blue-400">View Profile</NavLink>
          <NavLink to="assignments" className="block hover:text-blue-400">Take Assignments</NavLink>
          <NavLink to="notices" className="block hover:text-blue-400">View Notices</NavLink>
          <NavLink to="events" className="block hover:text-blue-400">View Events</NavLink>
          <NavLink to="projects" className="block hover:text-blue-400">Submit Projects</NavLink>
          <NavLink to="stats" className="block hover:text-blue-400">Stats & Progress</NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
