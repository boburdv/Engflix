"use client";

import { useEffect, useState } from "react";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";
import { movieMap } from "../movieMap";
import Link from "next/link";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const tmdbIds = Object.values(movieMap);

        const moviesData = await Promise.all(tmdbIds.map((id) => fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API}`).then((res) => res.json())));

        setMovies(moviesData);
        setFilteredMovies(moviesData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase())));
    }
  }, [search, movies]);

  return (
    <div className="text-white max-w-7xl mx-auto px-4 mt-34">
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl">All Movies</h1>

        <div className="flex items-center gap-3 py-2 px-5 w-80 rounded-full border-2 border-[var(--lime)] bg-transparent focus-within:ring-2 focus-within:ring-[var(--lime)] transition-all duration-300">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-[var(--white)] placeholder-[var(--second-dark)] focus:outline-none"
          />
          <img src="/search-icon.svg" alt="Search" className="w-5 h-5 opacity-80" />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-12 mb-10">
        {loading ? Array.from({ length: Object.values(movieMap).length }).map((_, i) => <CardSkeleton key={i} />) : filteredMovies.map((movie) => <Card key={movie.id} movie={movie} />)}

        {!loading && filteredMovies.length === 0 && <p className="text-gray-400 col-span-5 text-center">No movies found.</p>}
      </div>

      <Link href="/order" className="flex justify-center">
        <button className="btn py-1.5 px-5">TO ORDER</button>
      </Link>
    </div>
  );
}
