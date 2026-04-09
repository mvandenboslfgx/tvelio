import { parseM3U } from '@/lib/iptv/m3u';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { content } = await req.json();
  if (!content || typeof content !== 'string') {
    return NextResponse.json({ error: 'Ongeldige playlist.' }, { status: 400 });
  }
  return NextResponse.json({ channels: parseM3U(content) });
}
