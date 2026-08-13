'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PUBLIC_PATHS = ['/', '/login'];

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (loading || isPublicPath) return;
    if (!user) {
      router.replace('/login');
    }
  }, [loading, user, isPublicPath, router]);

  if (isPublicPath) {
    return <>{children}</>;
  }

  if (loading) {
    return <main className="p-8 text-2xl">Even laden...</main>;
  }

  if (!user) {
    return <main className="p-8 text-2xl">U gaat naar inloggen...</main>;
  }

  return <>{children}</>;
}
