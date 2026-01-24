"use client";
import Link from "next/link";

export default function Card({ movie }) {
  return (
    <Link href={`/watch/${movie.id}`}>
      <div className="cursor-pointer">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full max-h-72 object-cover" />

        <div className="mt-7 flex flex-col gap-4">
          <div className="flex justify-between">
            <h5 className="line-clamp-1 text-white">{movie.title}</h5>
            <span className="text-[var(--lime)]">{new Date(movie.release_date).getFullYear()}</span>
          </div>

          <div className="flex justify-between">
            <img src="/hd.svg" />

            <div className="text-[12px] flex gap-5">
              <p className="flex items-center gap-1">
                <img src="/time-icon.svg" width={15} />
                {movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "-"}
              </p>

              <p className="flex gap-1">
                <img src="/star.svg" width={13} />
                {movie.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
