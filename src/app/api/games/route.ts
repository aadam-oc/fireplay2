// app/api/games/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://api.rawg.io/api/games');
  const data = await res.json();

  return NextResponse.json(data);
}
