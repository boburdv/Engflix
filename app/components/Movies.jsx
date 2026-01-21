"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then(setMovies);
  }, []);

  return (
    <div className="text-white max-w-7xl mx-auto pb-10 px-4">
      <p className="text-[var(--lime)] mt-10">ONLINE STREAMING</p>
      <h1 className="mb-10 mt-5 text-3xl text-[var(--white)]">The Best Movies</h1>

      <div className="grid grid-cols-5 gap-12">
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
