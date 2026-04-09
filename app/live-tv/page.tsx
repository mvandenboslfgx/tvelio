'use client';

import { ChannelGrid } from '@/components/iptv/ChannelGrid';
import { StreamPlayer } from '@/components/player/StreamPlayer';
import { Channel } from '@/lib/types';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const demoChannels: Channel[] = [
  { id: '1', name: 'NPO 1', group: 'NL', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  { id: '2', name: 'Nieuws 24', group: 'Nieuws', url: 'https://test-streams.mux.dev/test_001/stream.m3u8' },
  { id: '3', name: 'Muziek TV', group: 'Muziek', url: 'https://test-streams.mux.dev/dai-discontinuity-deltatre/manifest.m3u8' }
];

export default function LiveTvPage() {
  const [active, setActive] = useState<Channel | null>(demoChannels[0]);
  const index = useMemo(() => demoChannels.findIndex((c) => c.id === active?.id), [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && index > 0) setActive(demoChannels[index - 1]);
      if (e.key === 'ArrowDown' && index < demoChannels.length - 1) setActive(demoChannels[index + 1]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  return (
    <main className="p-6">
      <div className="mb-4 flex gap-3">
        <Link href="/simple" className="rounded bg-slate-700 px-4 py-2">Home</Link>
        <Link href="/onboarding" className="rounded bg-slate-700 px-4 py-2">Terug</Link>
      </div>
      <h1 className="mb-4 text-4xl font-bold">TV Kijken</h1>
      {active ? <StreamPlayer src={active.url} backupSrc={active.backupUrl} /> : null}
      <h2 className="my-4 text-2xl font-bold">Zenders</h2>
      <ChannelGrid channels={demoChannels} onPlay={setActive} />
    </main>
  );
}
