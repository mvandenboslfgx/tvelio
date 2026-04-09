'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('tvelio_token');
    setToken(null);
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        return { ok: false, message: data?.error || 'Inloggen is mislukt.' };
      }

      localStorage.setItem('tvelio_token', data.token);
      setToken(data.token);
      setUser(data.user);
      return { ok: true };
    } catch {
      return { ok: false, message: 'Inloggen lukt nu niet. Probeer opnieuw.' };
    }
  };

  useEffect(() => {
    const restore = async () => {
      const savedToken = localStorage.getItem('tvelio_token');
      if (!savedToken) {
        setLoading(false);
        return;
      }

      setToken(savedToken);
      try {
        const res = await fetch('/api/me/preferences', {
          headers: {
            Authorization: `Bearer ${savedToken}`
          }
        });

        if (!res.ok) {
          logout();
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    restore();
  }, []);

  const value = useMemo(() => ({ user, token, loading, login, logout }), [user, token, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used in AuthProvider');
  return ctx;
}
