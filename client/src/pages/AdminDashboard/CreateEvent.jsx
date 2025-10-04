import React, { useState } from "react";

export default function CreateEvent() {
  const [event, setEvent] = useState({ title: "", date: "", description: "" });
  const [events, setEvents] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (event.title && event.date) {
      setEvents([...events, event]);
      setEvent({ title: "", date: "", description: "" });
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Event Title"
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />
        <input
          type="date"
          value={event.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />
        <textarea
          placeholder="Description"
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />
        <button className="bg-blue-500 px-4 py-2 rounded-lg">Create</button>
      </form>

      <ul className="space-y-3">
        {events.map((e, idx) => (
          <li key={idx} className="p-3 bg-gray-800 rounded-lg">
            <p className="font-bold">{e.title}</p>
            <p className="text-sm text-gray-400">{e.date}</p>
            <p>{e.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
