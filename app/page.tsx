import Link from 'next/link';
import { catalog, formatEuro } from '@/lib/shop/catalog';

export const metadata = {
  title: 'Tvelio | Streaming, abonnementen & shop',
  description: 'Ontdek de abonnementen en winkel van Tvelio. Bekijk prijzen en bestel eenvoudig online.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070b17] text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
        <Link href="/" className="text-2xl font-black tracking-[-.08em]">TVELIO<span className="text-violet-400">.</span></Link>
        <nav aria-label="Hoofdnavigatie" className="flex items-center gap-5 text-sm text-slate-300">
          <Link href="/shop" className="hover:text-white">Shop</Link>
          <Link href="/login" className="hover:text-white">Mijn Tvelio</Link>
        </nav>
      </header>
      <section className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-24 lg:grid-cols-2 lg:items-center">
        <div className="absolute right-0 top-10 -z-0 h-80 w-80 rounded-full bg-violet-600/20 blur-[110px]" aria-hidden="true" />
        <div className="relative z-10">
          <p className="mb-6 inline-block rounded-full border border-violet-300/30 bg-violet-400/10 px-4 py-2 text-xs font-semibold tracking-[.18em] text-violet-200">WELKOM BIJ TVELIO</p>
          <h1 className="max-w-2xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">Entertainment begint bij <span className="text-violet-400">eenvoud.</span></h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-slate-300">Ontdek Tvelio-abonnementen, vergelijk pakketten en vind straks ook geschikte streamingapparaten en accessoires in onze shop.</p>
          <div className="mt-10 flex flex-wrap gap-4"><Link href="/shop" className="rounded-xl bg-violet-500 px-7 py-4 font-semibold text-white transition hover:bg-violet-400">Bekijk de shop →</Link><Link href="/login" className="rounded-xl border border-white/20 px-7 py-4 font-semibold hover:bg-white/10">Mijn account</Link></div>
        </div>
        <div className="relative z-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/25 via-slate-900 to-slate-950 p-7 shadow-2xl shadow-violet-950/50">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#0c1225] p-7">
            <div className="mb-10 flex items-center justify-between"><span className="text-sm text-violet-200">TVELIO EXPERIENCE</span><span className="h-3 w-3 rounded-full bg-violet-400" /></div>
            <div className="grid grid-cols-3 gap-3">{['Films', 'Series', 'Live'].map((t, i) => <div key={t} className={`flex h-32 items-end rounded-xl p-3 text-sm font-semibold ${['bg-gradient-to-br from-indigo-400 to-blue-950','bg-gradient-to-br from-fuchsia-500 to-purple-950','bg-gradient-to-br from-cyan-500 to-slate-900'][i]}`}>{t}</div>)}</div>
            <div className="mt-6 h-3 w-3/4 rounded-full bg-white/15" /><div className="mt-3 h-3 w-1/2 rounded-full bg-white/10" />
          </div>
        </div>
      </section>
      <section className="border-t border-white/10 bg-white/[.025] px-6 py-20"><div className="mx-auto max-w-7xl">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-widest text-violet-300">Ons aanbod</p><h2 className="mt-3 text-4xl font-semibold">Vind jouw pakket</h2></div><Link href="/shop" className="text-violet-300 hover:text-white">Alles bekijken →</Link></div>
        <div className="grid gap-5 md:grid-cols-3">{catalog.map(item => <article key={item.id} className="flex flex-col rounded-3xl border border-white/10 bg-[#11182b] p-7"><p className="text-xs font-semibold uppercase tracking-widest text-violet-300">{item.category === 'digital' ? 'Digitaal' : 'Hardware'}</p><h3 className="mt-5 text-2xl font-semibold">{item.name}</h3><p className="mt-3 flex-1 text-sm leading-6 text-slate-300">{item.description}</p><div className="mt-7 text-3xl font-bold">{item.priceCents === null ? 'Binnenkort' : formatEuro(item.priceCents)}</div><Link href="/shop" className="mt-6 rounded-xl border border-white/20 px-5 py-3 text-center font-semibold hover:bg-white/10">Bekijk aanbod</Link></article>)}</div>
      </div></section>
      <footer className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-6 py-10 text-sm text-slate-400"><span>© {new Date().getFullYear()} Tvelio</span><span>Controleer altijd de productvoorwaarden vóór aankoop.</span></footer>
    </main>
  );
}
