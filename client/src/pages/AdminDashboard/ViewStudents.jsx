import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { Trash2 } from "lucide-react";

export default function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/auth/users");
        setStudents(res.data);
        setError("");
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/auth/users/${id}`);
      setStudents(students.filter(s => s._id !== id));
      setSuccess("User deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">View Students</h2>
        <p className="text-gray-400 text-center">Loading students...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">Registered Students</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-300 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-900 border border-green-700 text-green-300 rounded-lg">
          {success}
        </div>
      )}

      {students.length === 0 ? (
        <p className="text-gray-500 text-center">No students registered yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 text-left text-blue-300">Name</th>
                <th className="p-3 text-left text-blue-300">Email</th>
                <th className="p-3 text-left text-blue-300">Branch</th>
                <th className="p-3 text-left text-blue-300">Year</th>
                <th className="p-3 text-left text-blue-300">Register Number</th>
                <th className="p-3 text-left text-blue-300">Role</th>
                <th className="p-3 text-left text-blue-300">Joined</th>
                <th className="p-3 text-left text-blue-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-t border-gray-700 hover:bg-gray-800 transition">
                  <td className="p-3 text-white">{student.name}</td>
                  <td className="p-3 text-gray-300">{student.email}</td>
                  <td className="p-3 text-gray-300">{student.branch || "N/A"}</td>
                  <td className="p-3 text-gray-300">{student.year || "N/A"}</td>
                  <td className="p-3 text-gray-300">{student.registerNumber || "N/A"}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      student.role === 'admin' 
                        ? 'bg-red-900 text-red-300' 
                        : 'bg-blue-900 text-blue-300'
                    }`}>
                      {student.role}
                    </span>
                  </td>
                  <td className="p-3 text-gray-400 text-sm">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
