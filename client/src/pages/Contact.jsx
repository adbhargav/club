import { useState } from "react";
import api from "../api/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await api.post("/contact", form);
      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      setStatus(`❌ ${error.response?.data?.message || "Server error. Please try again later."}`);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-indigo-900 via-purple-900 to-blue-950 text-white pt-24 px-4 min-h-screen flex justify-center items-center font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-lg space-y-7 border border-white/10"
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center text-cyan-300 drop-shadow">
          Contact Us
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl bg-gray-900 text-white border border-indigo-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition-all duration-200 placeholder:text-indigo-300"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl bg-gray-900 text-white border border-indigo-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition-all duration-200 placeholder:text-indigo-300"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl bg-gray-900 text-white border border-indigo-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition-all duration-200 placeholder:text-indigo-300"
        ></textarea>

        <button
          type="submit"
          className="bg-cyan-400 hover:bg-cyan-500 text-indigo-900 font-bold px-6 py-4 rounded-xl w-full shadow-xl transition disabled:opacity-50"
          disabled={status === "Sending..."}
        >
          {status === "Sending..." ? "Sending..." : "Send Message"}
        </button>

        {status && (
          <p className="text-center text-base text-cyan-300 mt-3">{status}</p>
        )}
      </form>
    </div>
  );
}