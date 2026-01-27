"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const MOVIES = [
  { id: 1087192, video: "/hero-video/your-dragon.mp4" },
  { id: 516729, video: "/hero-video/paddington-in-peru.mp4" },
  { id: 1011985, video: "/hero-video/kung-fu-panda-4.mp4" },
];

export default function Hero() {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    Promise.all(MOVIES.map(({ id }) => fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`).then((res) => res.json()))).then(setMovies);
  }, [API_KEY]);

  useEffect(() => {
    if (!movies.length) return;
    const interval = setInterval(() => setCurrent((c) => (c + 1) % movies.length), 43000);
    return () => clearInterval(interval);
  }, [movies]);

  // 🔹 FAQAT BITTA KATTA SKELETON
  if (!movies.length) {
    return <section className="h-[650px] w-full bg-gray-800 animate-pulse" />;
  }

  const movie = movies[current];
  const videoSrc = MOVIES[current].video;

  const firstTwo = movie.title.split(" ").slice(0, 2).join(" ");
  const rest = movie.title.split(" ").slice(2).join(" ");

  return (
    <section className="relative h-[650px] w-full overflow-hidden">
      <video ref={videoRef} src={videoSrc} autoPlay loop muted={muted} playsInline className="absolute inset-0 w-full h-full brightness-70 object-cover scale-120" />

      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-[30%]
               bg-gradient-to-t from-black to-transparent z-[1]"
      />

      <div className="relative z-10 h-full flex items-center">
        <div key={current} className="max-w-7xl mx-auto w-full px-4">
          <h1 className="text-4xl md:text-5xl font-semibold animate-slide-top delay-300">
            <span className="text-[var(--white)]">{firstTwo}</span> <span className="text-[var(--lime)]">{rest}</span>
          </h1>

          <p className="mt-7 text-sm md:text-base text-[var(--white)] max-w-lg line-clamp-3 animate-slide-top delay-500">{movie.overview}</p>

          <div className="mt-9 flex items-center gap-5 text-[var(--white)] animate-slide-top delay-500">
            <img src="/movie.svg" alt="movie icon" />
            <img src="/hd.svg" alt="HD icon" />
            <span>
              {movie.genres
                ?.slice(0, 2)
                .map((g) => g.name)
                .join(", ")}
            </span>
            <span>{movie.release_date?.slice(0, 4)}</span>
          </div>

          <div className="mt-11 flex flex-col md:flex-row gap-4 md:gap-0 justify-between max-w-6xl">
            <Link href={`/watch/${movie.id}`}>
              <button className="btn bg-[var(--dark96)] py-1.5 px-5">
                <img src="/play-icon.svg" alt="Play" className="w-4 h-4" />
                PLAY NOW
              </button>
            </Link>

            <button
              onClick={() => {
                if (!videoRef.current) return;
                videoRef.current.muted = !videoRef.current.muted;
                setMuted(videoRef.current.muted);
              }}
              className="btn bg-[var(--dark96)] py-2 px-2.5"
            >
              {muted ? <img src="/mute.png" alt="mute" /> : <img src="/volume.png" alt="volume" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
