import React from "react";

export default function About() {
  return (
    <div className="bg-gradient-to-tl from-indigo-900 via-purple-900 to-indigo-800 min-h-screen px-4 py-20 text-white font-sans">
      {/* Banner Section: Left image, right description */}
      <section className="flex flex-col md:flex-row items-center justify-center mb-20 max-w-5xl mx-auto gap-8">
        {/* Left Side Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/4.jpg" // <-- Your image path or URL here
            alt="AI Club Banner"
            className="w-full max-w-md h-64 object-cover rounded-3xl shadow-2xl border-4 border-cyan-300"
          />
        </div>
        {/* Right Side Description */}
        <div className="w-full md:w-1/2">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-8 shadow-xl">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-cyan-300 drop-shadow">
              About AI Club
            </h1>
            <p className="text-xl max-w-2xl text-indigo-100 leading-relaxed font-medium">
              The AI Club at RGMCET is a student-driven community dedicated to
              fostering curiosity, collaboration, and excellence in Artificial Intelligence,
              Machine Learning, and Data Science.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-12 mb-20 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-indigo-700 to-purple-700 p-10 rounded-3xl shadow-2xl hover:scale-[1.03] transition-all duration-300">
          <h2 className="text-3xl font-bold mb-4 text-cyan-300">Our Mission</h2>
          <p className="text-indigo-100 leading-relaxed text-lg">
            To build an ecosystem where students actively learn, innovate, and collaborate
            on real-world AI projects—preparing for impactful careers in technology and research.
          </p>
        </div>
        <div className="bg-gradient-to-br from-indigo-700 to-purple-700 p-10 rounded-3xl shadow-2xl hover:scale-[1.03] transition-all duration-300">
          <h2 className="text-3xl font-bold mb-4 text-cyan-300">Our Vision</h2>
          <p className="text-indigo-100 leading-relaxed text-lg">
            To establish RGMCET as a center of innovation by nurturing AI-driven solutions
            that positively influence society and industry.
          </p>
        </div>
      </section>

      {/* Activities */}
      <section className="mb-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-cyan-300 drop-shadow">
          What We Do
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Workshops & Seminars",
              desc: "Interactive sessions on the latest AI, ML, and Data Science tools and techniques.",
            },
            {
              title: "Hackathons & Projects",
              desc: "Team-based challenges and projects tackling real-world problems.",
            },
            {
              title: "Research & Collaboration",
              desc: "Promoting research, publications, and cross-disciplinary collaborations.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-xl text-center border border-white/10 hover:scale-105 hover:border-cyan-400 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-cyan-200">{item.title}</h3>
              <p className="text-indigo-100 text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gradient-to-r from-pink-500 to-indigo-600 py-14 rounded-3xl max-w-3xl mx-auto shadow-2xl mt-12">
        <h2 className="text-3xl font-extrabold mb-6 text-white drop-shadow">
          Want to be part of the AI Revolution?
        </h2>
        <a
          href="/signup"
          className="inline-block bg-cyan-300 text-indigo-900 font-bold px-8 py-4 rounded-full shadow-xl hover:bg-white hover:text-purple-700 transition-all duration-300"
        >
          Join the AI Club
        </a>
      </section>
    </div>
  );
}