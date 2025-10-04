import React, { useState } from "react";

export default function ViewProjects() {
  const [projects] = useState([
    { student: "John Doe", link: "https://github.com/john/project1" },
    { student: "Sneha Reddy", link: "https://github.com/sneha/project2" },
  ]);

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">View Projects</h2>
      <ul className="space-y-3">
        {projects.map((p, idx) => (
          <li key={idx} className="p-3 bg-gray-800 rounded-lg flex justify-between">
            <span>{p.student}</span>
            <a href={p.link} target="_blank" rel="noreferrer" className="text-blue-400 underline">
              {p.link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
