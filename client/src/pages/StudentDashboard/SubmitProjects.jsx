import React, { useState, useEffect } from "react";

export default function Projects() {
  const [githubLink, setGithubLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch existing projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Submit project
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!githubLink.trim() || !title.trim()) return;

    const newProject = { title, githubLink, description };

    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      if (res.ok) {
        const saved = await res.json();
        setProjects([...projects, saved]);
        setGithubLink("");
        setTitle("");
        setDescription("");
      } else {
        console.error("Failed to submit project");
      }
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-blue-300">Submit Your Project</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 outline-none"
          required
        />
        <input
          type="url"
          placeholder="GitHub Repository Link"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 outline-none"
          required
        />
        <textarea
          placeholder="Short Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 outline-none"
          rows="3"
        ></textarea>
        <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition w-full">
          Submit Project
        </button>
      </form>

      {/* Loading */}
      {loading ? (
        <p className="text-gray-400 text-center">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500 text-center">No projects submitted yet.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((p, idx) => (
            <li
              key={idx}
              className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition"
            >
              <h3 className="text-lg font-semibold text-blue-400">{p.title}</h3>
              {p.description && (
                <p className="text-gray-400 text-sm mt-1">{p.description}</p>
              )}
              <a
                href={p.githubLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline mt-2 block"
              >
                {p.githubLink}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
