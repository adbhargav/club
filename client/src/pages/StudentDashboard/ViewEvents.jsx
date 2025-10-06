import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-gray-400 text-center">Loading events...</p>;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-blue-300">Upcoming Events</h2>

      {events.length === 0 ? (
        <p className="text-gray-500 text-center">No upcoming events right now.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event._id}
              className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400">{event.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {event.date
                      ? new Date(event.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Date not set"}
                  </p>
                  {event.location && (
                    <p className="text-gray-500 text-sm">📍 {event.location}</p>
                  )}
                  {event.description && (
                    <p className="text-gray-300 mt-2">{event.description}</p>
                  )}
                </div>
                {event.imageURL && (
                  <img
                    src={event.imageURL}
                    alt={event.title}
                    className="w-32 h-32 object-cover rounded-xl mt-4 md:mt-0 border border-gray-700"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
