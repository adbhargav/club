import React from "react";

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-16">
      {/* Hero */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-400">
          About AI Club
        </h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed">
          The AI Club at RGMCET is a student-led initiative that empowers learners 
          to explore, innovate, and excel in Artificial Intelligence, Machine 
          Learning, and Data Science.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-12 mb-20 max-w-6xl mx-auto">
        <div className="bg-gray-900 p-10 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            To create an ecosystem where students can learn, build, and collaborate 
            on real-world AI projects while preparing for future careers in 
            technology and research.
          </p>
        </div>
        <div className="bg-gray-900 p-10 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed">
            To make RGMCET a hub of innovation by fostering AI-driven solutions that 
            contribute positively to society and industry.
          </p>
        </div>
      </section>

      {/* Activities */}
      <section className="mb-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-cyan-400">
          What We Do
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Workshops & Seminars",
              desc: "Hands-on sessions on AI, ML, and Data Science tools.",
            },
            {
              title: "Hackathons & Projects",
              desc: "Opportunities to solve real-world challenges in teams.",
            },
            {
              title: "Research & Collaboration",
              desc: "Encouraging research papers, projects, and collaborations.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-900 p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-cyan-300">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gradient-to-r from-pink-500 to-purple-600 py-12 rounded-2xl max-w-4xl mx-auto shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Want to be part of the AI Revolution?
        </h2>
        <a
          href="/signup"
          className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition"
        >
          Join the AI Club
        </a>
      </section>
    </div>
  );
}
