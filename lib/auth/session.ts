import crypto from 'crypto';

export interface SessionUser {
  id: string;
  email: string;
  name: string;
}

interface SessionPayload {
  user: SessionUser;
  exp: number;
}

const TTL_SECONDS = 60 * 60 * 24 * 7;

function getSecret() {
  return process.env.AUTH_SECRET || 'dev-only-change-me';
}

function encode(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', getSecret()).update(body).digest('base64url');
  return `${body}.${sig}`;
}

function decode(token: string): SessionPayload | null {
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = crypto.createHmac('sha256', getSecret()).update(body).digest('base64url');
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;

  try {
    const parsed = JSON.parse(Buffer.from(body, 'base64url').toString()) as SessionPayload;
    if (!parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function createSessionToken(user: SessionUser): string {
  return encode({ user, exp: Math.floor(Date.now() / 1000) + TTL_SECONDS });
}

export function readSessionToken(token: string): SessionUser | null {
  const payload = decode(token);
  return payload?.user || null;
}
