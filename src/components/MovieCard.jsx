import React from "react";

function MovieCard({ title, genre, year, rating, onAdd }) {
  return (
    <div className="movie-card" 
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>{title}</h2>
      <p>Genre: {genre}</p>
      <p>Year: {year}</p>
      <p>⭐ Rating: {rating}</p>
      <button onClick={onAdd}>Add to Watchlist </button>
    </div>
  );
}
export default MovieCard;
