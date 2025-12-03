import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Result = ({ movie, isFav, toggleFavorite }) => {
  const imageSrc = movie.Poster !== "N/A" ? movie.Poster : "/no-image.png";

  return (
    <div className="relative bg-[#1C1C1C] border border-[#292929] rounded-xl shadow-lg overflow-hidden hover:scale-[1.03] transition-transform duration-300">
      {/* Heart */}
      <div
        className="absolute top-3 right-3 cursor-pointer bg-black/60 backdrop-blur-md p-2 rounded-full hover:bg-black/80 transition"
        onClick={() => toggleFavorite(movie)}
      >
        {isFav ? (
          <FaHeart className="text-[#E50914] text-xl" />
        ) : (
          <FaRegHeart className="text-white text-xl" />
        )}
      </div>

      <img
        src={imageSrc}
        alt={movie.Title}
        className="w-full h-64 object-cover"
      />

      <p className="text-white text-center font-semibold p-4">{movie.Title}</p>
    </div>
  );
};

export default Result;
