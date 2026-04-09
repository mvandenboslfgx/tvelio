import { Channel } from '@/lib/types';

export function parseM3U(content: string): Channel[] {
  const lines = content.split(/\r?\n/);
  const channels: Channel[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (!line?.startsWith('#EXTINF:')) continue;
    const url = lines[i + 1]?.trim();
    if (!url || url.startsWith('#')) continue;

    const name = line.split(',').pop()?.trim() || 'Onbekend kanaal';
    const tvgLogo = line.match(/tvg-logo="([^"]+)"/)?.[1];
    const group = line.match(/group-title="([^"]+)"/)?.[1];
    const id = line.match(/tvg-id="([^"]+)"/)?.[1] || `${name}-${i}`;

    channels.push({ id, name, group, logo: tvgLogo, url });
  }

  return channels;
}
