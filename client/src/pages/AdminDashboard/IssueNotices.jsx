import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { Trash2, Edit2, X } from "lucide-react";

export default function IssueNotices() {
  const [notice, setNotice] = useState({ title: "", description: "", date: "", link: "" });
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch existing notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get("/notices");
        setNotices(res.data);
      } catch (err) {
        console.error("Error fetching notices:", err);
      }
    };
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!notice.title.trim()) {
      setError("Please enter notice title");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (editingId) {
        const res = await api.put(`/notices/${editingId}`, notice);
        setNotices(notices.map(n => n._id === editingId ? res.data : n));
        setSuccess("Notice updated successfully!");
        setEditingId(null);
      } else {
        const res = await api.post("/notices", notice);
        setNotices([res.data, ...notices]);
        setSuccess("Notice created successfully!");
      }
      setNotice({ title: "", description: "", date: "", link: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save notice");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (noticeToEdit) => {
    setNotice({
      title: noticeToEdit.title,
      description: noticeToEdit.description || "",
      date: noticeToEdit.date ? new Date(noticeToEdit.date).toISOString().slice(0, 16) : "",
      link: noticeToEdit.link || ""
    });
    setEditingId(noticeToEdit._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNotice({ title: "", description: "", date: "", link: "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;

    try {
      await api.delete(`/notices/${id}`);
      setNotices(notices.filter(n => n._id !== id));
      setSuccess("Notice deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete notice");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">Issue Notices</h2>
      
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
          placeholder="Notice Title"
          value={notice.title}
          onChange={(e) => setNotice({ ...notice, title: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          required
        />
        <textarea
          placeholder="Notice Description"
          value={notice.description}
          onChange={(e) => setNotice({ ...notice, description: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          rows="3"
        />
        <input
          type="datetime-local"
          placeholder="Date (optional)"
          value={notice.date}
          onChange={(e) => setNotice({ ...notice, date: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
        />
        <input
          type="url"
          placeholder="Link (optional)"
          value={notice.link}
          onChange={(e) => setNotice({ ...notice, link: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
        />
        <div className="flex gap-2">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg disabled:opacity-50 flex-1"
          >
            {loading ? (editingId ? "Updating..." : "Creating...") : (editingId ? "Update Notice" : "Create Notice")}
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
        <h3 className="text-lg font-semibold mb-3 text-blue-300">Existing Notices</h3>
        {notices.length === 0 ? (
          <p className="text-gray-500">No notices created yet.</p>
        ) : (
          <ul className="space-y-3">
            {notices.map((n) => (
              <li key={n._id} className="p-3 bg-gray-800 rounded-lg">
                <p className="font-bold text-blue-400">{n.title}</p>
                {n.description && <p className="text-gray-300 mt-1">{n.description}</p>}
                {n.date && (
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(n.date).toLocaleString()}
                  </p>
                )}
                {n.link && (
                  <a href={n.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-sm block mt-1">
                    View Link
                  </a>
                )}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(n)}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-1"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(n._id)}
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
