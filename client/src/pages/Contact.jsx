import { useState } from "react";

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
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" }); // clear form
      } else {
        setStatus(`❌ ${data.error || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("❌ Server error. Please try again later.");
    }
  };

  return (
    <div className="bg-black text-white pt-24 px-6 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-5"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">
          Contact Us
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none"
        ></textarea>

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl w-full font-semibold shadow-lg transition disabled:opacity-50"
          disabled={status === "Sending..."}
        >
          {status === "Sending..." ? "Sending..." : "Send Message"}
        </button>

        {status && (
          <p className="text-center text-sm text-cyan-300 mt-3">{status}</p>
        )}
      </form>
    </div>
  );
}
