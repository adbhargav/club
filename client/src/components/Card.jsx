import React from "react";

export default function Card({ title, description, image }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden border border-white/10 hover:scale-[1.03] hover:border-cyan-400 hover:shadow-2xl transition-all duration-300">
      <div className="h-48 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover absolute inset-0 rounded-t-2xl"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className="text-white text-5xl font-extrabold z-10"
          style={{ display: image ? 'none' : 'flex' }}
        >
          {title.charAt(0)}
        </div>
      </div>
      <div className="p-7">
        <h3 className="text-2xl font-bold mb-2 text-cyan-300">{title}</h3>
        <p className="text-indigo-100 text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );
}