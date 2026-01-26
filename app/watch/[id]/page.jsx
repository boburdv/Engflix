"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { movieMap } from "@/app/movieMap";
import Link from "next/link";

export default function Watch() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [openTrailer, setOpenTrailer] = useState(false);

  const API = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchAll = async () => {
      const [m, c, v] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API}`).then((r) => r.json()),
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API}`).then((r) => r.json()),
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API}`).then((r) => r.json()),
      ]);

      setMovie(m);
      setCast(c.cast.slice(0, 8));

      const t = v.results.find((x) => x.type === "Trailer");
      if (t) setTrailer(t.key);

      const bunnyId = Object.keys(movieMap).find((k) => movieMap[k] == id);
      if (bunnyId) {
        const res = await fetch("/api/bunny");
        const vids = await res.json();
        setVideo(vids.find((x) => x.guid === bunnyId));
      }
    };

    fetchAll();
  }, [id]);

  if (!movie) return <div className="text-white p-10">Loading...</div>;

  const firstTwo = movie.title.split(" ").slice(0, 2).join(" ");
  const rest = movie.title.split(" ").slice(2).join(" ");

  return (
    <div className="text-[var(--white)] max-w-5xl mx-auto">
      <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="absolute inset-0 w-full h-full object-cover brightness-20 z-0" alt={movie.title} />
      <div className="relative h-screen flex items-center">
        <div className="relative z-10 flex gap-16">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="relative w-72 z-10" alt={movie.title} />

          <div className="relative z-10 flex flex-col gap-7 mt-5">
            <h1 className="text-4xl">
              <span className="text-white">{firstTwo}</span> <span className="text-[var(--lime)]">{rest}</span>
            </h1>

            <div className="flex items-center gap-5 text-[var(--white)]">
              <img src="/hd.svg" alt="HD icon" />
              <span>
                {movie.genres
                  ?.slice(0, 3)
                  .map((g) => g.name)
                  .join(", ")}
              </span>
              <span>{movie.release_date?.slice(0, 4)}</span>
              <p className="flex items-center gap-1">
                <img src="/time-icon.svg" width={15} />
                {movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "-"}
              </p>
              <p className="flex gap-2 items-center">
                <img src="/star.svg" width={15} />
                {movie.vote_average.toFixed(1)}
              </p>
            </div>

            <p className="text-sm md:text-base text-[var(--white)] max-w-lg">{movie.overview}</p>

            <div className="flex gap-5">
              <button className="inline-flex items-center gap-3 py-1.5 px-5 rounded-full border-2 border-[var(--lime)] text-[var(--white)] bg-[var(--dark96)] btn">
                <img src="/play-icon.svg" alt="Play" className="w-4 h-4" />
                WATCH MOVIE
              </button>
              {trailer && (
                <button onClick={() => setOpenTrailer(true)} className="inline-flex items-center gap-3 py-1.5 px-5 rounded-full border-2 border-[var(--lime)] text-[var(--white)] btn">
                  <img src="/play-icon.svg" alt="Play" className="w-4 h-4" />
                  TRAILER
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {video && <iframe src={`https://iframe.mediadelivery.net/embed/582908/${video.guid}`} className="w-full aspect-video mt-20 rounded-2xl bg-neutral-900 p-0.5" allowFullScreen />}

      {cast.length > 0 && (
        <div className="mt-20 mb-10">
          <h2 className="text-2xl mb-6">Cast</h2>
          <div className="flex gap-6">
            {cast.map((a) => (
              <div key={a.id} className="w-36">
                {a.profile_path && <img src={`https://image.tmdb.org/t/p/w300${a.profile_path}`} className="mb-2" />}
                <p className="text-sm">{a.name}</p>
                <p className="text-xs text-gray-400">{a.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link href="/movies" className="flex justify-center">
        <button className="py-1.5 px-5 rounded-full border-2 border-[var(--lime)] text-[var(--white)] btn">ALL MOVIES</button>
      </Link>

      {openTrailer && (
        <div onClick={() => setOpenTrailer(false)} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <iframe src={`https://www.youtube.com/embed/${trailer}`} className="w-[900px] aspect-video rounded-xl" allowFullScreen />
        </div>
      )}
    </div>
  );
}
