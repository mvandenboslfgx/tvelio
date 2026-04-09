'use client';

import { Channel } from '@/lib/types';
import { useAppState } from '@/lib/state/app-state';

export function ChannelGrid({ channels, onPlay }: { channels: Channel[]; onPlay: (channel: Channel) => void }) {
  const { favorites, toggleFavorite } = useAppState();

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {channels.map((channel) => {
        const fav = favorites.some((item) => item.id === channel.id);
        return (
          <div key={channel.id} className="rounded-xl bg-tv-card p-4">
            <button data-focusable="true" onClick={() => onPlay(channel)} className="w-full text-left text-2xl font-semibold">
              {channel.name}
            </button>
            <button
              data-focusable="true"
              onClick={() => toggleFavorite(channel)}
              className="mt-2 rounded bg-slate-700 px-3 py-2"
            >
              {fav ? 'Verwijder uit Mijn Zenders' : 'Zet in Mijn Zenders'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
