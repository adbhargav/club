import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { Trash2, Edit2, X } from "lucide-react";

export default function GiveAssignments() {
  const [assignment, setAssignment] = useState({ 
    title: "", 
    description: "", 
    dueDate: "",
    link: "" 
  });
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch existing assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get("/assignments");
        setAssignments(res.data);
      } catch (err) {
        console.error("Error fetching assignments:", err);
      }
    };
    fetchAssignments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!assignment.title.trim()) {
      setError("Please enter assignment title");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (editingId) {
        const res = await api.put(`/assignments/${editingId}`, assignment);
        setAssignments(assignments.map(a => a._id === editingId ? res.data : a));
        setSuccess("Assignment updated successfully!");
        setEditingId(null);
      } else {
        const res = await api.post("/assignments", assignment);
        setAssignments([res.data, ...assignments]);
        setSuccess("Assignment created successfully!");
      }
      setAssignment({ title: "", description: "", dueDate: "", link: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save assignment");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (assignmentToEdit) => {
    setAssignment({
      title: assignmentToEdit.title,
      description: assignmentToEdit.description || "",
      dueDate: assignmentToEdit.dueDate ? new Date(assignmentToEdit.dueDate).toISOString().slice(0, 16) : "",
      link: assignmentToEdit.link || ""
    });
    setEditingId(assignmentToEdit._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setAssignment({ title: "", description: "", dueDate: "", link: "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;

    try {
      await api.delete(`/assignments/${id}`);
      setAssignments(assignments.filter(a => a._id !== id));
      setSuccess("Assignment deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete assignment");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">Give Assignments</h2>
      
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-300 rounded-lg">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-900 border border-green-700 text-green-300 rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Assignment Title"
          value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          required
        />
        <textarea
          placeholder="Description"
          value={assignment.description}
          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          rows="3"
        />
        <input
          type="datetime-local"
          placeholder="Due Date"
          value={assignment.dueDate}
          onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
        />
        <input
          type="url"
          placeholder="Assignment Link (optional)"
          value={assignment.link}
          onChange={(e) => setAssignment({ ...assignment, link: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
        />
        <div className="flex gap-2">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg disabled:opacity-50 flex-1"
          >
            {loading ? (editingId ? "Updating..." : "Creating...") : (editingId ? "Update Assignment" : "Create Assignment")}
          </button>
          {editingId && (
            <button 
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-1"
            >
              <X size={18} /> Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-blue-300">Existing Assignments</h3>
        {assignments.length === 0 ? (
          <p className="text-gray-500">No assignments created yet.</p>
        ) : (
          <ul className="space-y-3">
            {assignments.map((a) => (
              <li key={a._id} className="p-3 bg-gray-800 rounded-lg">
                <p className="font-bold text-blue-400">{a.title}</p>
                {a.description && <p className="text-gray-300 mt-1">{a.description}</p>}
                {a.dueDate && (
                  <p className="text-sm text-gray-500 mt-1">
                    Due: {new Date(a.dueDate).toLocaleString()}
                  </p>
                )}
                {a.link && (
                  <a 
                    href={a.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm mt-1 block"
                  >
                    View Assignment Link
                  </a>
                )}
                {a.fileURL && (
                  <a 
                    href={a.fileURL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm mt-1 block"
                  >
                    Download File
                  </a>
                )}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(a)}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-1"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
