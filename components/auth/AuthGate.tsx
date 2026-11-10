'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PUBLIC_PATHS = ['/', '/login', '/shop', '/checkout'];
const isPublic = (pathname: string) =>
  PUBLIC_PATHS.some(path => pathname === path || (path !== '/' && pathname.startsWith(path + '/')));

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const publicPage = isPublic(pathname);

  useEffect(() => {
    if (!loading && !publicPage && !user) router.replace('/login');
  }, [loading, user, publicPage, router]);

  if (publicPage) return <>{children}</>;
  if (loading) return <main className="p-8 text-2xl">Even laden...</main>;
  if (!user) return <main className="p-8 text-2xl">U gaat naar inloggen...</main>;
  return <>{children}</>;
}
