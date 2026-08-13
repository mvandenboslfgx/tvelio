'use client';

import { StreamPlayer } from '@/components/player/StreamPlayer';
import { parseM3U } from '@/lib/iptv/m3u';
import { Channel } from '@/lib/types';
import Link from 'next/link';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'tvelio.channels.v1';

export default function LiveTvPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [active, setActive] = useState<Channel | null>(null);
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('Alles');
  const [m3uText, setM3uText] = useState('');
  const [directUrl, setDirectUrl] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as Channel[];
      if (Array.isArray(parsed) && parsed.length) {
        setChannels(parsed);
        setActive(parsed[0]);
      }
    } catch {
      // Ignore invalid local storage data.
    }
  }, []);

  useEffect(() => {
    if (!channels.length) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(channels));
  }, [channels]);

  const groups = useMemo(() => {
    const values = Array.from(new Set(channels.map((channel) => channel.group).filter(Boolean) as string[]));
    return ['Alles', ...values.sort((a, b) => a.localeCompare(b))];
  }, [channels]);

  const filteredChannels = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return channels.filter((channel) => {
      const matchesGroup = group === 'Alles' || channel.group === group;
      const matchesSearch = !needle || channel.name.toLowerCase().includes(needle) || channel.group?.toLowerCase().includes(needle);
      return matchesGroup && matchesSearch;
    });
  }, [channels, group, query]);

  const importPlaylist = (content: string) => {
    const parsed = parseM3U(content);
    if (!parsed.length) {
      setNotice('Geen geldige zenders gevonden. Controleer of dit een M3U/M3U8-playlist is.');
      return;
    }
    setChannels(parsed);
    setActive(parsed[0]);
    setGroup('Alles');
    setQuery('');
    setNotice(`${parsed.length} zenders geladen.`);
  };

  const onFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const content = await file.text();
    setM3uText(content);
    importPlaylist(content);
  };

  const playDirect = () => {
    const url = directUrl.trim();
    if (!/^https?:\/\//i.test(url)) {
      setNotice('Vul een geldige http(s)-stream URL in.');
      return;
    }
    const channel: Channel = {
      id: `direct-${Date.now()}`,
      name: 'Directe stream',
      group: 'Direct',
      url
    };
    setActive(channel);
    setNotice('Directe stream geladen.');
  };

  const clearPlaylist = () => {
    setChannels([]);
    setActive(null);
    setM3uText('');
    setNotice('Playlist verwijderd uit dit apparaat.');
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#05070a]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400">Tvelio</p>
            <h1 className="text-2xl font-black md:text-3xl">Live TV Player</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/simple" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10">Home</Link>
            <Link href="/settings" className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-black hover:bg-emerald-400">Instellingen</Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[1.45fr_.75fr]">
        <section className="min-w-0">
          {active ? (
            <>
              <StreamPlayer src={active.url} backupSrc={active.backupUrl} />
              <div className="mt-4 flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">Nu kijken</p>
                  <h2 className="mt-1 text-xl font-bold">{active.name}</h2>
                  {active.group ? <p className="mt-1 text-sm text-white/55">{active.group}</p> : null}
                </div>
                {active.logo ? <img src={active.logo} alt="" className="h-12 w-20 object-contain" /> : null}
              </div>
            </>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-8 text-center">
              <div>
                <div className="text-5xl">📺</div>
                <h2 className="mt-4 text-2xl font-bold">Nog geen stream geladen</h2>
                <p className="mx-auto mt-2 max-w-xl text-white/55">Importeer je eigen legale M3U-playlist, of plak een directe HLS-stream URL.</p>
              </div>
            </div>
          )}

          <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold">Jouw playlist</h2>
                <p className="mt-1 text-sm text-white/50">Gegevens blijven lokaal in deze browser opgeslagen.</p>
              </div>
              <label className="cursor-pointer rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-black text-black hover:bg-emerald-400">
                M3U-bestand kiezen
                <input type="file" accept=".m3u,.m3u8,text/plain,application/vnd.apple.mpegurl" onChange={onFile} className="hidden" />
              </label>
            </div>

            <textarea
              value={m3uText}
              onChange={(event) => setM3uText(event.target.value)}
              placeholder="#EXTM3U\n#EXTINF:-1 group-title=\"Nieuws\",Voorbeeld\nhttps://.../stream.m3u8"
              className="mt-4 min-h-36 w-full rounded-xl border border-white/10 bg-black/30 p-3 font-mono text-xs text-white outline-none focus:border-emerald-500"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => importPlaylist(m3uText)} className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-black hover:bg-white/90">Playlist laden</button>
              <button onClick={clearPlaylist} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 hover:bg-white/5">Wissen</button>
            </div>

            <div className="my-5 h-px bg-white/10" />

            <label className="text-sm font-semibold text-white/70">Directe HLS / stream URL</label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                value={directUrl}
                onChange={(event) => setDirectUrl(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && playDirect()}
                placeholder="https://.../live/stream.m3u8"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-emerald-500"
              />
              <button onClick={playDirect} className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-black hover:bg-emerald-400">Afspelen</button>
            </div>
            {notice ? <p className="mt-3 text-sm text-emerald-300">{notice}</p> : null}
          </section>
        </section>

        <aside className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4 lg:max-h-[calc(100vh-8rem)] lg:overflow-hidden">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Zenders</h2>
              <p className="text-sm text-white/45">{filteredChannels.length} zichtbaar</p>
            </div>
          </div>

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Zoek zender…"
            className="mt-4 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-emerald-500"
          />

          {groups.length > 1 ? (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
              {groups.map((item) => (
                <button
                  key={item}
                  onClick={() => setGroup(item)}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${group === item ? 'bg-emerald-500 text-black' : 'bg-white/5 text-white/65'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          ) : null}

          <div className="mt-3 space-y-2 lg:max-h-[calc(100vh-16rem)] lg:overflow-y-auto lg:pr-1">
            {filteredChannels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setActive(channel)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${active?.id === channel.id ? 'border-emerald-500/60 bg-emerald-500/10' : 'border-white/5 bg-black/20 hover:bg-white/5'}`}
              >
                <div className="flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/5">
                  {channel.logo ? <img src={channel.logo} alt="" className="max-h-9 max-w-12 object-contain" /> : <span className="text-lg">▶</span>}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{channel.name}</p>
                  <p className="truncate text-xs text-white/45">{channel.group || 'Overig'}</p>
                </div>
              </button>
            ))}
            {!filteredChannels.length ? <p className="py-8 text-center text-sm text-white/40">Geen zenders gevonden.</p> : null}
          </div>
        </aside>
      </div>
    </main>
  );
}
