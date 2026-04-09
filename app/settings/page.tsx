'use client';

import { useAppState } from '@/lib/state/app-state';

export default function SettingsPage() {
  const { mode, setMode } = useAppState();

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-4xl font-bold">Instellingen</h1>
      <div className="rounded-xl bg-tv-card p-6">
        <h2 className="mb-3 text-2xl font-semibold">Weergave</h2>
        <div className="flex gap-3">
          <button onClick={() => setMode('simple')} className={`rounded px-4 py-3 ${mode === 'simple' ? 'bg-tv-focus text-black' : 'bg-slate-700'}`}>
            Eenvoudig
          </button>
          <button onClick={() => setMode('advanced')} className={`rounded px-4 py-3 ${mode === 'advanced' ? 'bg-tv-focus text-black' : 'bg-slate-700'}`}>
            Uitgebreid
          </button>
        </div>
      </div>
    </main>
  );
}
