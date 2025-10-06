import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        const res = await api.get("/auth/profile");
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUser(null);
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
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-blue-300 text-center">My Profile</h2>
      
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        {user.profileImageURL ? (
          <img
            src={user.profileImageURL}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 shadow-lg"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-blue-400 flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold text-blue-400">
              {user.name ? user.name.charAt(0).toUpperCase() : "?"}
            </span>
          </div>
        )}
      </div>

      {/* Profile Details */}
      <div className="space-y-3">
        <p className="text-gray-300">
          <span className="font-bold text-white">Name:</span> {user.name || "N/A"}
        </p>
        <p className="text-gray-300">
          <span className="font-bold text-white">Email:</span> {user.email || "N/A"}
        </p>
        <p className="text-gray-300">
          <span className="font-bold text-white">Branch:</span> {user.branch || "N/A"}
        </p>
        <p className="text-gray-300">
          <span className="font-bold text-white">Year:</span> {user.year || "N/A"}
        </p>
        <p className="text-gray-300">
          <span className="font-bold text-white">Register Number:</span> {user.registerNumber || "N/A"}
        </p>
        <p className="text-gray-300">
          <span className="font-bold text-white">Role:</span> 
          <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
            user.role === "admin" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          }`}>
            {user.role || "N/A"}
          </span>
        </p>
      </div>
    </div>
  );
}
