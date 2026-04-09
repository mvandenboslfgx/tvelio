'use client';

import { YouTubeVideo } from '@/lib/types';
import Image from 'next/image';

export function YouTubeGrid({ videos, onPick }: { videos: YouTubeVideo[]; onPick: (video: YouTubeVideo) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      {videos.map((video) => (
        <button key={video.id} data-focusable="true" onClick={() => onPick(video)} className="rounded-xl bg-tv-card p-3 text-left">
          <Image src={video.thumbnail} alt={video.title} width={480} height={360} className="h-40 w-full rounded object-cover" />
          <p className="mt-2 line-clamp-2 text-lg font-semibold">{video.title}</p>
          <p className="text-sm text-tv-muted">{video.channelTitle}</p>
        </button>
      ))}
    </div>
  );
}
