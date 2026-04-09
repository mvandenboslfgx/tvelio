import { parseXmlTv } from '@/lib/iptv/epg';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { xml } = await req.json();
  if (!xml || typeof xml !== 'string') {
    return NextResponse.json({ error: 'Geen EPG data gevonden.' }, { status: 400 });
  }
  return NextResponse.json({ events: parseXmlTv(xml) });
}
