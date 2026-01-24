"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { movieMap } from "@/app/movieMap";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState(""); // qidiruv input
  const [filteredMovies, setFilteredMovies] = useState([]);
  const API = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  // TMDB dan movieMap dagi filmlarni olish
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const tmdbIds = Object.values(movieMap);
        const promises = tmdbIds.map((id) => fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API}`).then((res) => res.json()));

        const moviesData = await Promise.all(promises);
        setMovies(moviesData);
        setFilteredMovies(moviesData); // dastlab filtr yo‘q
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  // qidiruv filtrini yangilash
  useEffect(() => {
    if (!search) {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()));
      setFilteredMovies(filtered);
    }
  }, [search, movies]);

  if (!movies.length) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      {/* ===== SEARCH INPUT ===== */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <h1 className="text-4xl font-bold mb-6">Available Movies</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredMovies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <div className="rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform">
              {movie.poster_path && <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="w-full h-auto" />}
              <h3 className="mt-2 text-sm font-medium">{movie.title}</h3>
            </div>
          </Link>
        ))}
        {filteredMovies.length === 0 && <p className="text-gray-400">No movies found.</p>}
      </div>
    </div>
  );
}
