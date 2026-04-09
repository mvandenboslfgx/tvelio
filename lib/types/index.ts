export type AppMode = 'simple' | 'advanced';

export interface Channel {
  id: string;
  name: string;
  group?: string;
  logo?: string;
  url: string;
  backupUrl?: string;
}

export interface EpgEvent {
  channelId: string;
  title: string;
  start: string;
  stop: string;
  description?: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}
