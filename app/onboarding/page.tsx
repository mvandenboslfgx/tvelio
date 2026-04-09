'use client';

import { BigButton } from '@/components/ui/BigButton';
import { useAppState } from '@/lib/state/app-state';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const { setMode } = useAppState();

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-5xl font-bold">Kies uw weergave</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <BigButton onClick={() => { setMode('simple'); router.push('/simple'); }}>Eenvoudig</BigButton>
        <BigButton onClick={() => { setMode('advanced'); router.push('/advanced'); }}>Uitgebreid</BigButton>
      </div>
    </main>
  );
}
