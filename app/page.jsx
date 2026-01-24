"use client";

import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Card from "./components/Card";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then(setMovies);
  }, []);

  return (
    <div>
      <Header />
      <Hero />

      <div className="text-white max-w-7xl mx-auto px-4 pb-10">
        <p className="text-[var(--lime)] mt-10">ONLINE STREAMING</p>
        <h1 className="text-3xl mt-5 mb-10">The Best Movies</h1>

        <div className="grid grid-cols-5 gap-12">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
