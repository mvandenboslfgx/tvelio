'use client';

import Hls from 'hls.js';
import { HUMAN_ERRORS } from '@/lib/errors/messages';
import { useEffect, useRef, useState } from 'react';

interface StreamPlayerProps {
  src: string;
  backupSrc?: string;
  autoFullscreen?: boolean;
}

export function StreamPlayer({ src, backupSrc, autoFullscreen = true }: StreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    let retries = 0;

    const attach = (url: string) => {
      if (Hls.isSupported()) {
        hls = new Hls({ lowLatencyMode: true });
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal && retries < 2) {
            retries += 1;
            setMessage(HUMAN_ERRORS.stream);
            hls?.startLoad();
          } else if (backupSrc) {
            attach(backupSrc);
          }
        });
      } else {
        video.src = url;
      }
    };

    attach(src);
    video.play().catch(() => setMessage(HUMAN_ERRORS.stream));
    if (autoFullscreen && document.fullscreenEnabled) video.requestFullscreen().catch(() => null);

    return () => {
      hls?.destroy();
    };
  }, [src, backupSrc, autoFullscreen]);

  return (
    <div>
      {message ? <p className="mb-2 text-lg text-yellow-300">{message}</p> : null}
      <video ref={videoRef} controls className="h-[60vh] w-full rounded-xl bg-black" />
    </div>
  );
}
