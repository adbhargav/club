import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get("/assignments");
        setAssignments(res.data);
      } catch (err) {
        console.error("Error fetching assignments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  if (loading) {
    return <p className="text-gray-400 text-center">Loading assignments...</p>;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">Assignments</h2>
      {assignments.length === 0 ? (
        <p className="text-gray-500">No assignments available right now.</p>
      ) : (
        <ul className="space-y-3">
          {assignments.map((a) => (
            <li
              key={a._id}
              className="p-3 bg-gray-800 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{a.title}</p>
                {a.description && (
                  <p className="text-gray-400 text-sm">{a.description}</p>
                )}
                {a.dueDate && (
                  <p className="text-gray-500 text-xs">
                    Due: {new Date(a.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              {a.link ? (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg text-sm"
                >
                  Start
                </a>
              ) : (
                <button
                  disabled
                  className="bg-gray-600 px-3 py-1 rounded-lg text-sm cursor-not-allowed"
                >
                  No Link
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
