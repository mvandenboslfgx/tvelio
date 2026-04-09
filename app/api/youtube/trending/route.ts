import { getTrendingVideos } from '@/lib/youtube/service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const videos = await getTrendingVideos();
    return NextResponse.json({ items: videos });
  } catch {
    return NextResponse.json({ error: "Video's laden lukt nu niet." }, { status: 500 });
  }
}
