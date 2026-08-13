'use client';

import Hls from 'hls.js';
import { useEffect, useRef, useState } from 'react';

interface StreamPlayerProps {
  src: string;
  backupSrc?: string;
  autoPlay?: boolean;
}

export function StreamPlayer({ src, backupSrc, autoPlay = true }: StreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let hls: Hls | null = null;
    let usingBackup = false;
    setMessage('');
    setLoading(true);

    const cleanup = () => {
      hls?.destroy();
      hls = null;
      video.removeAttribute('src');
      video.load();
    };

    const playUrl = (url: string) => {
      hls?.destroy();
      hls = null;
      setLoading(true);

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
      } else if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90,
          maxBufferLength: 30
        });
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (autoPlay) video.play().catch(() => setMessage('Druk op afspelen om de stream te starten.'));
        });
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (!data.fatal) return;

          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            hls?.startLoad();
            return;
          }

          if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            hls?.recoverMediaError();
            return;
          }

          if (backupSrc && !usingBackup) {
            usingBackup = true;
            setMessage('Primaire stream niet beschikbaar. Backup wordt geprobeerd…');
            playUrl(backupSrc);
            return;
          }

          setLoading(false);
          setMessage('Deze stream kan niet worden afgespeeld. Controleer de URL, CORS of het streamformaat.');
        });
      } else {
        video.src = url;
      }

      if (autoPlay && video.canPlayType('application/vnd.apple.mpegurl')) {
        video.play().catch(() => setMessage('Druk op afspelen om de stream te starten.'));
      }
    };

    const onPlaying = () => {
      setLoading(false);
      setMessage('');
    };
    const onWaiting = () => setLoading(true);
    const onError = () => {
      setLoading(false);
      if (backupSrc && !usingBackup) {
        usingBackup = true;
        playUrl(backupSrc);
      } else {
        setMessage('Afspelen mislukt. Controleer of de stream online en browser-compatibel is.');
      }
    };

    video.addEventListener('playing', onPlaying);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('error', onError);
    playUrl(src);

    return () => {
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('error', onError);
      cleanup();
    };
  }, [src, backupSrc, autoPlay]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
      <video
        ref={videoRef}
        controls
        playsInline
        className="aspect-video w-full bg-black object-contain"
      />
      {loading ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent p-4 text-sm text-white/80">
          Stream laden…
        </div>
      ) : null}
      {message ? (
        <div className="border-t border-white/10 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">{message}</div>
      ) : null}
    </div>
  );
}
