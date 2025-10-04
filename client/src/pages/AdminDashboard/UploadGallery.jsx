import React, { useState } from "react";

export default function UploadGallery() {
  const [imgUrl, setImgUrl] = useState("");
  const [gallery, setGallery] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imgUrl.trim()) {
      setGallery([...gallery, imgUrl]);
      setImgUrl("");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300">Upload Gallery</h2>
      <form onSubmit={handleSubmit} className="flex space-x-3 mb-6">
        <input
          type="url"
          placeholder="Enter Image URL"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700"
        />
        <button className="bg-blue-500 px-4 rounded-lg">Upload</button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="Gallery"
            className="w-full h-32 object-cover rounded-lg border-2 border-blue-400"
          />
        ))}
      </div>
    </div>
  );
}
