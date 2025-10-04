import React, { useState } from "react";

export default function IssueNotices() {
  const [notice, setNotice] = useState("");
  const [notices, setNotices] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (notice.trim()) {
      setNotices([...notices, notice]);
      setNotice("");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">Issue Notices</h2>
      <form onSubmit={handleSubmit} className="flex space-x-3 mb-6">
        <input
          type="text"
          placeholder="Enter notice"
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700"
        />
        <button className="bg-blue-500 px-4 rounded-lg">Post</button>
      </form>

      <ul className="space-y-3">
        {notices.map((n, idx) => (
          <li key={idx} className="p-3 bg-gray-800 rounded-lg">{n}</li>
        ))}
      </ul>
    </div>
  );
}
