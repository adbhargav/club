import React, { useState } from "react";

export default function ViewStudents() {
  const [students] = useState([
    { name: "John Doe", email: "john@email.com", branch: "CSE" },
    { name: "Priya Gupta", email: "priya@email.com", branch: "ECE" },
  ]);

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">View Students</h2>
      <table className="w-full border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Branch</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, idx) => (
            <tr key={idx} className="border-t border-gray-700">
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.email}</td>
              <td className="p-3">{s.branch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
