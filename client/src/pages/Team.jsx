import React, { useState, useEffect } from "react";

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/team");
        const data = await res.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="text-gray-400">Loading team members...</p>
      </div>
    );
  }

  const faculty = members.filter((m) =>
    m.role.toLowerCase().includes("faculty")
  );
  const coreTeam = members.filter(
    (m) =>
      !m.role.toLowerCase().includes("faculty") &&
      !m.role.toLowerCase().includes("coordinator")
  );

  return (
    <div className="bg-black text-white min-h-screen px-6 py-12">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400">
          Meet Our Team
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          The AI Club is powered by passionate faculty and students working
          together to build innovation, collaboration, and learning opportunities.
        </p>
      </section>

      {/* Faculty Coordinators */}
      {faculty.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-300">
            Faculty Coordinators
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faculty.map((person, idx) => (
              <div
                key={idx}
                className="bg-gray-900 p-6 rounded-2xl shadow-lg text-center"
              >
                <img
                  src={person.profileImageURL}
                  alt={person.name}
                  className="w-40 h-40 mx-auto rounded-full object-cover mb-4 border-4 border-blue-400"
                />
                <h3 className="text-xl font-semibold">{person.name}</h3>
                <p className="text-gray-400">{person.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Core Team */}
      {coreTeam.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-300">
            Core Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {coreTeam.map((person, idx) => (
              <div
                key={idx}
                className="bg-gray-900 p-6 rounded-2xl shadow-lg text-center"
              >
                <img
                  src={person.profileImageURL}
                  alt={person.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-2 border-blue-400"
                />
                <h3 className="text-lg font-semibold">{person.name}</h3>
                <p className="text-gray-400">{person.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
