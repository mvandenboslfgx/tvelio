'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user && pathname !== '/login') {
      router.replace('/login');
    }
  }, [loading, user, pathname, router]);

  if (loading) {
    return <main className="p-8 text-2xl">Even laden...</main>;
  }

  if (!user && pathname !== '/login') {
    return <main className="p-8 text-2xl">U gaat naar inloggen...</main>;
  }

  return <>{children}</>;
}
