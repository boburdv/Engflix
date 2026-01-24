"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { movieMap } from "@/app/movieMap";

export default function Watch() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null); // Bunny video

  const API = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    // TMDB data fetch
    const fetchMovieData = async () => {
      try {
        const [movieRes, castRes, videosRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API}`),
        ]);

        const movieData = await movieRes.json();
        const castData = await castRes.json();
        const videosData = await videosRes.json();

        setMovie(movieData);
        setCast(castData.cast.slice(0, 6));

        const trailerVideo = videosData.results.find((v) => v.type === "Trailer");
        if (trailerVideo) setTrailer(trailerVideo.key);
      } catch (err) {
        console.error("TMDB fetch error:", err);
      }
    };

    fetchMovieData();

    // Bunny video fetch
    const fetchBunnyVideo = async () => {
      try {
        const bunnyId = Object.keys(movieMap).find((key) => movieMap[key] == id);
        if (!bunnyId) {
          setVideo(null);
          return;
        }

        const res = await fetch("/api/bunny");
        const videos = await res.json();
        const matchedVideo = videos.find((v) => v.guid === bunnyId) || null;
        setVideo(matchedVideo);
      } catch (err) {
        console.error("Bunny fetch error:", err);
        setVideo(null);
      }
    };

    fetchBunnyVideo();
  }, [id]);

  if (!movie) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="text-white max-w-6xl mx-auto p-6">
      {/* ===== TMDB FULL INFO ===== */}
      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

      {movie.backdrop_path && <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="rounded-xl mb-6" alt={movie.title} />}
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />

      <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-4">
        <span>⭐ {movie.vote_average?.toFixed(1)}</span>
        {movie.runtime != null && (
          <span>
            ⏱ {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
          </span>
        )}
        <span>📅 {movie.release_date}</span>
        <span>🌍 {movie.production_countries?.[0]?.name}</span>
      </div>

      {/* GENRES */}
      {movie.genres?.length > 0 && (
        <div className="flex gap-2 mb-6">
          {movie.genres.map((g) => (
            <span key={g.id} className="px-3 py-1 bg-neutral-800 rounded-full text-xs">
              {g.name}
            </span>
          ))}
        </div>
      )}

      {/* OVERVIEW */}
      {movie.overview && <p className="text-gray-300 max-w-3xl mb-8">{movie.overview}</p>}

      {/* TRAILER */}
      {trailer && (
        <div className="mb-10">
          <h2 className="text-2xl mb-4">🎬 Trailer</h2>
          <iframe className="w-full aspect-video rounded" src={`https://www.youtube.com/embed/${trailer}`} allowFullScreen />
        </div>
      )}

      {/* CAST */}
      {cast.length > 0 && (
        <div>
          <h2 className="text-2xl mb-4">🎭 Cast</h2>
          <div className="grid grid-cols-6 gap-4">
            {cast.map((actor) => (
              <div key={actor.id}>
                {actor.profile_path && <img src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`} className="rounded mb-2" alt={actor.name} />}
                <p className="text-sm">{actor.name}</p>
                <p className="text-xs text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== 🎥 BUNNY VIDEO ===== */}
      {video && (
        <div className="mt-10">
          <h2 className="text-2xl mb-4">▶ Watch Movie</h2>
          <iframe src={`https://iframe.mediadelivery.net/embed/582908/${video.guid}`} className="w-full aspect-video rounded-xl" allowFullScreen />
        </div>
      )}
    </div>
  );
}
