import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { Trash2, Edit2, X } from "lucide-react";

export default function CreateEvent() {
  const [event, setEvent] = useState({ 
    title: "", 
    date: "", 
    description: "",
    location: ""
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch existing events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event.title.trim() || !event.date) {
      setError("Please enter event title and date");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (editingId) {
        // Update existing event
        const res = await api.put(`/events/${editingId}`, event);
        setEvents(events.map(ev => ev._id === editingId ? res.data : ev));
        setSuccess("Event updated successfully!");
        setEditingId(null);
      } else {
        // Create new event
        const res = await api.post("/events", event);
        setEvents([res.data, ...events]);
        setSuccess("Event created successfully!");
      }
      setEvent({ title: "", date: "", description: "", location: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (eventToEdit) => {
    setEvent({
      title: eventToEdit.title,
      date: eventToEdit.date ? new Date(eventToEdit.date).toISOString().slice(0, 16) : "",
      description: eventToEdit.description || "",
      location: eventToEdit.location || ""
    });
    setEditingId(eventToEdit._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEvent({ title: "", date: "", description: "", location: "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter(e => e._id !== id));
      setSuccess("Event deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete event");
    }
  };

  return (
    <div className="bg-gray-900 md:p-10 p-4 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <h2 className="md:text-3xl text-2xl font-semibold mb-6 text-blue-300 text-center">Create Event</h2>
      
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

      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        <input
          type="text"
          placeholder="Event Title"
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-base md:text-lg"
          required
        />
        <input
          type="datetime-local"
          value={event.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-base md:text-lg"
          required
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={event.location}
          onChange={(e) => setEvent({ ...event, location: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-base md:text-lg"
        />
        <textarea
          placeholder="Event Description"
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-base md:text-lg"
          rows="3"
        />
        <div className="flex gap-2">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg disabled:opacity-50 flex-1 md:flex-none"
          >
            {loading ? (editingId ? "Updating..." : "Creating...") : (editingId ? "Update Event" : "Create Event")}
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
        <h3 className="md:text-2xl text-lg font-semibold mb-3 text-blue-300 text-center">Existing Events</h3>
        {events.length === 0 ? (
          <p className="text-gray-500 text-center">No events created yet.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((e) => (
              <li key={e._id} className="p-4 bg-gray-800 rounded-lg flex flex-col">
                <p className="font-bold text-blue-400 text-lg md:text-xl">{e.title}</p>
                <p className="text-sm text-gray-500">
                  {new Date(e.date).toLocaleString()}
                </p>
                {e.location && (
                  <p className="text-sm text-gray-400 mt-1">📍 {e.location}</p>
                )}
                {e.description && <p className="text-gray-300 mt-2">{e.description}</p>}
                {e.imageURL && (
                  <img 
                    src={e.imageURL} 
                    alt={e.title}
                    className="w-full h-32 object-cover rounded-lg mt-2"
                  />
                )}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(e)}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-1"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(e._id)}
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