import React, { useEffect, useState } from "react";

export default function Stats() {
  const [stats, setStats] = useState({
    assignments: 0,
    projects: 0,
    events: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch stats dynamically (from backend)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stats"); // Example endpoint
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          console.error("Failed to fetch stats");
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-center">
        <p className="text-gray-400">Loading stats...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-blue-300 text-center">
        Stats & Progress
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Assignments */}
        <div className="bg-gray-800 p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-bold text-blue-400">Assignments Completed</h3>
          <p className="text-4xl mt-2 font-semibold">{stats.assignments}</p>
        </div>

        {/* Projects */}
        <div className="bg-gray-800 p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-bold text-blue-400">Projects Submitted</h3>
          <p className="text-4xl mt-2 font-semibold">{stats.projects}</p>
        </div>

        {/* Events */}
        <div className="bg-gray-800 p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-bold text-blue-400">Events Attended</h3>
          <p className="text-4xl mt-2 font-semibold">{stats.events}</p>
        </div>
      </div>
    </div>
  );
}
