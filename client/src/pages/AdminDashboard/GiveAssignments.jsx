import React, { useState } from "react";

export default function GiveAssignments() {
  const [assignment, setAssignment] = useState({ title: "", description: "" });
  const [assignments, setAssignments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (assignment.title) {
      setAssignments([...assignments, assignment]);
      setAssignment({ title: "", description: "" });
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">Give Assignments</h2>
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Assignment Title"
          value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />
        <textarea
          placeholder="Description"
          value={assignment.description}
          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />
        <button className="bg-blue-500 px-4 py-2 rounded-lg">Assign</button>
      </form>

      <ul className="space-y-3">
        {assignments.map((a, idx) => (
          <li key={idx} className="p-3 bg-gray-800 rounded-lg">
            <p className="font-bold">{a.title}</p>
            <p>{a.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
