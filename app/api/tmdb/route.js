import { movieMap } from "../../movieMap";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const guid = searchParams.get("guid");
  const tmdbId = movieMap[guid];
  if (!tmdbId) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const response = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
  const data = await response.json();
  return NextResponse.json(data);
}
