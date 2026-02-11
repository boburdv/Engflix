import { movieMap } from "../../movieMap";
import { NextResponse } from "next/server";

export async function GET() {
  const movies = await Promise.all(
    Object.values(movieMap).map(async (id) => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
      return res.json();
    })
  );

  return NextResponse.json(movies);
}
