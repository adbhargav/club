import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { Trash2, Edit2, X } from "lucide-react";

export default function CreateTeamMember() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    branch: "",
    year: "",
    contact: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing team members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/team");
        setMembers(res.data);
      } catch (err) {
        console.error("Error fetching team members:", err);
      }
    };
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("role", form.role);
      data.append("branch", form.branch);
      data.append("year", form.year);
      data.append("contact", form.contact);
      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      if (editingId) {
        const res = await api.put(`/team/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMembers(members.map(m => m._id === editingId ? res.data : m));
        setSuccess("Team member updated successfully!");
        setEditingId(null);
      } else {
        const res = await api.post("/team", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMembers([res.data, ...members]);
        setSuccess("Team member created successfully!");
      }
      
      setForm({ name: "", role: "", branch: "", year: "", contact: "" });
      setProfileImage(null);
      setImagePreview(null);
    } catch (error) {
      setError(error.response?.data?.message || "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setForm({
      name: member.name,
      role: member.role,
      branch: member.branch || "",
      year: member.year || "",
      contact: member.contact || "",
    });
    setImagePreview(member.profileImageURL);
    setEditingId(member._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", role: "", branch: "", year: "", contact: "" });
    setProfileImage(null);
    setImagePreview(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team member?")) return;

    try {
      await api.delete(`/team/${id}`);
      setMembers(members.filter(m => m._id !== id));
      setSuccess("Team member deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete team member");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-blue-300 text-center">
        {editingId ? "Edit Team Member" : "Create Team Member"}
      </h2>

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

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="flex flex-col items-center mb-4">
          <label className="text-gray-400 mb-2 text-sm">Profile Picture</label>
          <div className="flex items-center gap-4">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-400"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center">
                <span className="text-gray-500 text-xs">No Image</span>
              </div>
            )}
            <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition">
              Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
        />

        <input
          type="text"
          name="role"
          placeholder="Role (e.g., Faculty Coordinator, President)"
          value={form.role}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
        />

        <input
          type="text"
          name="branch"
          placeholder="Branch (optional)"
          value={form.branch}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
        />

        <input
          type="text"
          name="year"
          placeholder="Year (optional)"
          value={form.year}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact (optional)"
          value={form.contact}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg disabled:opacity-50 flex-1"
            disabled={loading}
          >
            {loading ? (editingId ? "Updating..." : "Creating...") : (editingId ? "Update Member" : "Create Member")}
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

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">Team Members</h3>
        {members.length === 0 ? (
          <p className="text-gray-500 text-center">No team members yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {members.map((member) => (
              <div key={member._id} className="p-4 bg-gray-800 rounded-lg flex items-start gap-4">
                {member.profileImageURL && (
                  <img
                    src={member.profileImageURL}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-bold text-blue-400">{member.name}</h4>
                  <p className="text-gray-300 text-sm">{member.role}</p>
                  {member.branch && <p className="text-gray-400 text-xs">{member.branch}</p>}
                  {member.year && <p className="text-gray-400 text-xs">{member.year}</p>}
                  {member.contact && <p className="text-gray-400 text-xs">{member.contact}</p>}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded text-xs flex items-center gap-1"
                    >
                      <Edit2 size={12} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}