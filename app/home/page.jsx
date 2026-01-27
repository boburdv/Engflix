"use client";

import { useEffect, useState } from "react";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";
import Hero from "../components/Hero";
import Link from "next/link";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.slice(0, 10));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Hero />

      <div className="text-white max-w-7xl mx-auto px-4 pb-10">
        <p className="text-[var(--lime)] mt-10">ONLINE STREAMING</p>
        <h1 className="text-3xl mt-5 mb-10">The Best Movies</h1>

        <div className="grid grid-cols-5 gap-12">{loading ? Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />) : movies.map((movie) => <Card key={movie.id} movie={movie} />)}</div>
      </div>

      <Link href="/movies" className="flex justify-center">
        <button className="btn py-1.5 px-5">ALL MOVIES</button>
      </Link>
    </div>
  );
}
