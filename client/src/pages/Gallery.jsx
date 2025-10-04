import React, { useState, useEffect } from "react";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/gallery");
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen px-6 py-12">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400">
          Gallery
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Explore the memorable moments from our AI Club events, workshops, and hackathons.
        </p>
      </section>

      {/* Image Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((item, idx) => (
          <div
            key={idx}
            className="cursor-pointer transform hover:scale-105 transition duration-300"
            onClick={() => setSelectedImage(item.imageURL)}
          >
            <img
              src={item.imageURL}
              alt={item.title || `Gallery Image ${idx + 1}`}
              className="rounded-2xl shadow-lg w-full h-60 object-cover"
            />
            {item.title && (
              <p className="text-center mt-2 text-gray-300 text-sm">{item.title}</p>
            )}
          </div>
        ))}
      </section>

      {/* Modal Preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-3xl max-h-[80vh] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
