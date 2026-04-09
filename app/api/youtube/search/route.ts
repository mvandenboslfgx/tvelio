import { searchVideos } from '@/lib/youtube/service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('q') || '';
    if (query.trim().length < 2) return NextResponse.json({ items: [] });
    const items = await searchVideos(query);
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: 'Zoeken lukt nu niet.' }, { status: 500 });
  }
}
