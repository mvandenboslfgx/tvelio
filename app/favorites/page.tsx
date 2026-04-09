'use client';

import { StreamPlayer } from '@/components/player/StreamPlayer';
import { useAppState } from '@/lib/state/app-state';
import { useState } from 'react';

export default function FavoritesPage() {
  const { favorites } = useAppState();
  const [active, setActive] = useState(favorites[0]);

  return (
    <main className="p-6">
      <h1 className="mb-4 text-4xl font-bold">Mijn Zenders</h1>
      {active ? <StreamPlayer src={active.url} /> : <p className="text-xl">Nog geen zenders gekozen.</p>}
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {favorites.map((channel) => (
          <button key={channel.id} onClick={() => setActive(channel)} className="rounded-lg bg-tv-card p-4 text-left text-xl">
            {channel.name}
          </button>
        ))}
      </div>
    </main>
  );
}
