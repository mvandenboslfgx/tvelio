import { createSessionToken, SessionUser } from '@/lib/auth/session';
import { NextRequest, NextResponse } from 'next/server';

const demoUser: SessionUser = {
  id: 'demo-user',
  email: process.env.DEMO_LOGIN_EMAIL || 'demo@supertvhub.local',
  name: 'Demo Gebruiker'
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body?.email || '').toLowerCase().trim();
    const password = String(body?.password || '');

    const expectedEmail = (process.env.DEMO_LOGIN_EMAIL || 'demo@supertvhub.local').toLowerCase();
    const expectedPassword = process.env.DEMO_LOGIN_PASSWORD || 'demo1234';

    if (email !== expectedEmail || password !== expectedPassword) {
      return NextResponse.json({ error: 'E-mail of wachtwoord is niet juist.' }, { status: 401 });
    }

    const token = createSessionToken(demoUser);
    return NextResponse.json({ token, user: demoUser });
  } catch {
    return NextResponse.json({ error: 'Inloggen lukt nu even niet.' }, { status: 500 });
  }
}
