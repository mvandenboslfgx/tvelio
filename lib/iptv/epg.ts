import { EpgEvent } from '@/lib/types';

export function parseXmlTv(xml: string): EpgEvent[] {
  const programmes = [...xml.matchAll(/<programme\s+start="([^"]+)"\s+stop="([^"]+)"\s+channel="([^"]+)"[\s\S]*?<title[^>]*>([\s\S]*?)<\/title>([\s\S]*?)<\/programme>/g)];
  return programmes.map((match) => ({
    start: match[1],
    stop: match[2],
    channelId: match[3],
    title: decodeXml(match[4]),
    description: decodeXml(match[5].match(/<desc[^>]*>([\s\S]*?)<\/desc>/)?.[1] || '')
  }));
}

function decodeXml(input: string) {
  return input.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
}
