'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { catalog, formatEuro } from '@/lib/shop/catalog';

type Cart = Record<string, number>;
const STORAGE_KEY = 'tvelio-cart-v2';

export default function ShopPage() {
  const [cart, setCart] = useState<Cart>({});
  const [ready, setReady] = useState(false);
  const [category, setCategory] = useState<'all' | 'digital' | 'physical'>('all');
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data: unknown = JSON.parse(saved);
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          const cleaned: Cart = {};
          for (const product of catalog) {
            const amount = (data as Record<string, unknown>)[product.id];
            if (product.available && typeof amount === 'number' && Number.isInteger(amount) && amount > 0) cleaned[product.id] = Math.min(amount, 10);
          }
          setCart(cleaned);
        }
      }
    } catch { /* invalid stored cart: start empty */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }, [cart, ready]);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = catalog.reduce((sum, item) => sum + (item.priceCents ?? 0) * (cart[item.id] ?? 0), 0);
  function change(id: string, delta: number) {
    setCart(current => {
      const next = { ...current, [id]: Math.max(0, Math.min(10, (current[id] ?? 0) + delta)) };
      if (!next[id]) delete next[id];
      return next;
    });
  }
  return <main className="min-h-screen bg-[#070b17] text-white">
    <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-7"><Link href="/" className="text-2xl font-black tracking-tighter">TVELIO<span className="text-violet-400">.</span></Link><nav className="flex gap-6 text-sm"><Link href="/">Home</Link><Link href="/login">Mijn Tvelio</Link><a href="#winkelwagen">Winkelwagen ({ready ? count : 0})</a></nav></header>
    <section className="mx-auto max-w-7xl px-6 pb-12 pt-16"><p className="text-xs font-bold uppercase tracking-[.2em] text-violet-300">Tvelio shop</p><h1 className="mt-4 text-5xl font-semibold tracking-tight">Alles voor jouw entertainment.</h1><p className="mt-5 max-w-2xl leading-7 text-slate-300">Kies een digitaal pakket. Het hardwareassortiment volgt zodra beschikbaarheid en prijzen bevestigd zijn.</p></section>
    <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section><div className="mb-7 flex flex-wrap gap-3">{([['all','Alles'],['digital','Abonnementen'],['physical','Apparaten']] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={category===value} onClick={() => setCategory(value)} className={`rounded-full border px-5 py-2 text-sm ${category===value ? 'border-violet-400 bg-violet-500 text-white' : 'border-white/20 text-slate-300'}`}>{label}</button>)}</div>
      <div className="grid gap-5 md:grid-cols-2">{catalog.filter(item => category === 'all' || item.category === category).map(item => <article key={item.id} className="flex flex-col rounded-3xl border border-white/10 bg-[#12192d] p-7"><span className="text-xs font-semibold uppercase tracking-widest text-violet-300">{item.category === 'digital' ? 'Digitaal abonnement' : 'Fysiek product'}</span><h2 className="mt-5 text-2xl font-bold">{item.name}</h2><p className="mt-3 flex-1 text-sm leading-6 text-slate-300">{item.description}</p><ul className="mt-5 space-y-2 text-sm text-slate-200">{item.highlights.map(x => <li key={x}>✓ {x}</li>)}</ul><p className="mt-7 text-3xl font-semibold">{item.priceCents === null ? 'Prijs volgt' : formatEuro(item.priceCents)}</p>{item.available ? <button type="button" onClick={() => change(item.id, 1)} className="mt-5 rounded-xl bg-violet-500 px-5 py-3 font-semibold hover:bg-violet-400">Toevoegen aan winkelwagen</button> : <span className="mt-5 rounded-xl border border-white/10 px-5 py-3 text-center text-slate-400">Binnenkort beschikbaar</span>}</article>)}</div></section>
      <aside id="winkelwagen" className="h-fit rounded-3xl border border-white/10 bg-[#12192d] p-7 lg:sticky lg:top-6"><h2 className="text-2xl font-semibold">Winkelwagen</h2>{count===0 ? <p className="mt-6 text-sm text-slate-300">Je winkelwagen is nog leeg.</p> : <div className="mt-6 space-y-5">{catalog.filter(item => cart[item.id]).map(item => <div key={item.id} className="border-b border-white/10 pb-4"><p className="font-semibold">{item.name}</p><p className="mt-1 text-sm text-slate-400">{formatEuro(item.priceCents ?? 0)} per stuk</p><div className="mt-3 flex items-center gap-3"><button aria-label={`Verwijder één ${item.name}`} onClick={()=>change(item.id,-1)} className="rounded-lg border border-white/20 px-3 py-1">−</button><span>{cart[item.id]}</span><button aria-label={`Voeg één ${item.name} toe`} onClick={()=>change(item.id,1)} className="rounded-lg border border-white/20 px-3 py-1">+</button></div></div>)}</div>}<div className="mt-7 flex justify-between border-t border-white/10 pt-5 font-semibold"><span>Totaal</span><span>{formatEuro(total)}</span></div><p className="mt-3 text-xs leading-5 text-slate-400">Prijzen en pakketvoorwaarden worden bevestigd vóór betaling.</p><Link aria-disabled={count===0} href={count ? '/checkout' : '#winkelwagen'} className={`mt-6 block rounded-xl px-5 py-3 text-center font-semibold ${count ? 'bg-violet-500 hover:bg-violet-400' : 'cursor-not-allowed bg-white/10 text-slate-500'}`}>Verder naar bestellen →</Link></aside>
    </div>
  </main>;
}
