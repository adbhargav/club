import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // token saved on login
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p className="text-gray-400 text-center">Loading profile...</p>;
  }

  if (!user) {
    return <p className="text-red-400 text-center">Unable to load profile.</p>;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">My Profile</h2>
      <p>
        <span className="font-bold">Name:</span> {user.name}
      </p>
      <p>
        <span className="font-bold">Email:</span> {user.email}
      </p>
      <p>
        <span className="font-bold">Branch:</span> {user.branch || "N/A"}
      </p>
      <p>
        <span className="font-bold">Register Number:</span>{" "}
        {user.registerNumber || "N/A"}
      </p>
      <p>
        <span className="font-bold">Role:</span> {user.role}
      </p>
    </div>
  );
}
