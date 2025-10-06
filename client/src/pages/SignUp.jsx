import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "",
    year: "",
    registerNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("branch", formData.branch);
      data.append("year", formData.year);
      data.append("registerNumber", formData.registerNumber);
      data.append("password", formData.password);
      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      const res = await api.post("/auth/signup", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Account created successfully!");
      setError("");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Server error. Try again later.");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Sign Up
        </h2>

        {error && <p className="text-red-400 mb-4">{error}</p>}
        {success && <p className="text-green-400 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-4">
            <label className="text-gray-400 mb-2 text-sm">Profile Picture (Optional)</label>
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
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />

          <input
            type="text"
            name="branch"
            placeholder="Branch (e.g. CSE, ECE)"
            value={formData.branch}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />

          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

          <input
            type="text"
            name="registerNumber"
            placeholder="Register Number"
            value={formData.registerNumber}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
