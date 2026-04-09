'use client';

import { YouTubeGrid } from '@/components/youtube/YouTubeGrid';
import { YouTubePlayer } from '@/components/player/YouTubePlayer';
import { YouTubeVideo } from '@/lib/types';
import { fetchJson } from '@/lib/utils/fetchJson';
import { useEffect, useState } from 'react';

export default function AppsPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [active, setActive] = useState<YouTubeVideo | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchJson<{ items: YouTubeVideo[] }>('/api/youtube/trending').then((res) => setVideos(res.items)).catch(() => setVideos([]));
  }, []);

  const onSearch = async () => {
    const res = await fetchJson<{ items: YouTubeVideo[] }>(`/api/youtube/search?q=${encodeURIComponent(query)}`);
    setVideos(res.items);
  };

  return (
    <main className="p-6">
      <h1 className="mb-4 text-4xl font-bold">Video&apos;s</h1>
      <div className="mb-4 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zoek video"
          className="w-full rounded-lg bg-slate-800 p-3 text-lg"
        />
        <button onClick={onSearch} className="rounded-lg bg-tv-focus px-4 py-2 text-black">Zoek</button>
      </div>
      {active ? <YouTubePlayer videoId={active.id} /> : null}
      <div className="mt-4">
        <YouTubeGrid videos={videos} onPick={setActive} />
      </div>
    </main>
  );
}
