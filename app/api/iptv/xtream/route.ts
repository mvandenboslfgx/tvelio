import { getXtreamLive } from '@/lib/iptv/xtream';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const streams = await getXtreamLive(data);
    return NextResponse.json({ streams });
  } catch {
    return NextResponse.json({ error: 'Brongegevens kloppen niet of server is niet bereikbaar.' }, { status: 400 });
  }
}
