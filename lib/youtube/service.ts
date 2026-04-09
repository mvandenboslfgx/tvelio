import { cache } from '@/lib/cache/memory';
import { getServerEnv } from '@/lib/config/env';
import { YouTubeVideo } from '@/lib/types';

function mapItems(items: any[]): YouTubeVideo[] {
  return items.map((item) => ({
    id: item.id.videoId || item.id,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt
  }));
}

export async function getTrendingVideos(): Promise<YouTubeVideo[]> {
  const key = 'yt:trending';
  const cached = cache.get<YouTubeVideo[]>(key);
  if (cached) return cached;

  const { youtubeApiKey, youtubeRegionCode } = getServerEnv();
  const url = new URL('https://www.googleapis.com/youtube/v3/videos');
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('chart', 'mostPopular');
  url.searchParams.set('videoCategoryId', '0');
  url.searchParams.set('maxResults', '24');
  url.searchParams.set('regionCode', youtubeRegionCode);
  url.searchParams.set('safeSearch', 'strict');
  url.searchParams.set('key', youtubeApiKey);

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error('YouTube trending mislukt');
  const json = await res.json();
  const mapped = mapItems(json.items || []);
  cache.set(key, mapped);
  return mapped;
}

export async function searchVideos(query: string): Promise<YouTubeVideo[]> {
  const key = `yt:search:${query}`;
  const cached = cache.get<YouTubeVideo[]>(key);
  if (cached) return cached;

  const { youtubeApiKey } = getServerEnv();
  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('type', 'video');
  url.searchParams.set('maxResults', '24');
  url.searchParams.set('safeSearch', 'strict');
  url.searchParams.set('q', query);
  url.searchParams.set('key', youtubeApiKey);

  const res = await fetch(url, { next: { revalidate: 120 } });
  if (!res.ok) throw new Error('YouTube zoekopdracht mislukt');
  const json = await res.json();
  const mapped = mapItems(json.items || []);
  cache.set(key, mapped, 2 * 60 * 1000);
  return mapped;
}
