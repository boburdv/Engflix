import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("https://video.bunnycdn.com/library/582908/videos", {
    headers: { AccessKey: process.env.BUNNY_API_KEY },
  });
  const data = await response.json();
  return NextResponse.json(data.items);
}
