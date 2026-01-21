"use client";

import React, { useEffect, useState } from "react";
import { movieMap } from "../movieMap";
import { useRouter } from "next/navigation";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("/api/bunny");
        const videos = await res.json();

        const movieData = await Promise.all(
          videos
            .filter((v) => movieMap[v.guid])
            .map(async (v) => {
              const tmdbRes = await fetch(`/api/tmdb?guid=${v.guid}`);
              const tmdb = await tmdbRes.json();

              // runtime ni soat va daqiqa formatiga o'giradi
              const runtime = tmdb.runtime;
              let duration = "N/A";
              if (runtime) {
                const hours = Math.floor(runtime / 60);
                const minutes = runtime % 60;
                duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
              }

              return {
                guid: v.guid,
                title: tmdb.title,
                year: tmdb.release_date ? tmdb.release_date.slice(0, 4) : "N/A",
                duration,
                rating: tmdb.vote_average ? tmdb.vote_average.toFixed(1) : "N/A",
                thumbnail: tmdb.poster_path ? `https://image.tmdb.org/t/p/w500${tmdb.poster_path}` : "",
              };
            })
        );

        setMovies(movieData);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
      {movies.map((m) => (
        <div key={m.guid} style={{ border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden", cursor: "pointer" }} onClick={() => router.push(`/watch/${m.guid}`)}>
          {m.thumbnail && <img src={m.thumbnail} alt={m.title} style={{ width: "100%", height: "400px", objectFit: "cover" }} />}
          <div style={{ padding: "1rem" }}>
            <h2>
              {m.title} ({m.year})
            </h2>
            <p>Duration: {m.duration}</p>
            <p>Rating: {m.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
