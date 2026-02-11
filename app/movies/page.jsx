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
  }, [API]);

  useEffect(() => {
    if (!search) setFilteredMovies(movies);
    else setFilteredMovies(movies.filter((movie) => (movie.title || "").toLowerCase().includes(search.toLowerCase())));
  }, [search, movies]);

  return (
    <div className="text-white max-w-7xl mx-auto px-4 mt-24 sm:mt-28 md:mt-32">
      {/* Title + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl">All Movies</h1>

        <div className="flex items-center gap-3 py-2 px-4 sm:px-5 w-full sm:w-80 rounded-full border-2 border-[var(--lime)] bg-transparent focus-within:ring-2 focus-within:ring-[var(--lime)] transition-all duration-300">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-[var(--white)] placeholder-[var(--second-dark)] focus:outline-none text-sm sm:text-base"
          />
          <img src="/search-icon.svg" alt="Search" className="w-4 h-4 sm:w-5 sm:h-5 opacity-80" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 mb-10">
        {loading ? Array.from({ length: Object.values(movieMap).length }).map((_, i) => <CardSkeleton key={i} />) : filteredMovies.map((movie) => <Card key={movie.id} movie={movie} />)}

        {!loading && filteredMovies.length === 0 && <p className="text-gray-400 col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-5 text-center">No movies found.</p>}
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <Link href="/order">
          <button className="btn py-1.5 px-5">TO ORDER</button>
        </Link>
      </div>
    </div>
  );
}
