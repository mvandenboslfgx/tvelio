import { readSessionToken } from '@/lib/auth/session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';

  if (!token) {
    return NextResponse.json({ error: 'Geen geldige sessie.' }, { status: 401 });
  }

  const user = readSessionToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Sessie is verlopen. Log opnieuw in.' }, { status: 401 });
  }

  return NextResponse.json({
    user,
    preferences: {
      defaultMode: 'simple',
      highContrast: true,
      largeText: true
    }
  });
}
