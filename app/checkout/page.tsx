'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { catalog, formatEuro } from '@/lib/shop/catalog';

export default function CheckoutPage() {
  const [items, setItems] = useState<{ name: string; qty: number; total: number }[]>([]);
  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem('tvelio-cart-v2') || '{}');
      if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return;
      setItems(catalog.filter(x => x.available && x.priceCents !== null).flatMap(product => {
        const n = (stored as Record<string, unknown>)[product.id];
        const qty = typeof n === 'number' && Number.isInteger(n) ? Math.max(0, Math.min(10, n)) : 0;
        return qty ? [{name: product.name, qty, total: qty * (product.priceCents ?? 0)}] : [];
      }));
    } catch { /* ignore invalid cart */ }
  }, []);
  const total = items.reduce((s, item) => s + item.total, 0);
  return <main className="min-h-screen bg-[#070b17] px-6 py-12 text-white"><div className="mx-auto max-w-2xl"><Link href="/shop" className="text-sm text-violet-300">← Terug naar shop</Link><h1 className="mt-10 text-4xl font-semibold">Je bestelling</h1><div className="mt-8 rounded-3xl border border-white/10 bg-[#12192d] p-8">{items.length===0 ? <p>Je winkelwagen is leeg. <Link className="underline" href="/shop">Bekijk de shop</Link>.</p> : <>{items.map(item => <div key={item.name} className="flex justify-between gap-4 border-b border-white/10 py-4"><span>{item.qty} × {item.name}</span><span>{formatEuro(item.total)}</span></div>)}<div className="mt-6 flex justify-between text-xl font-semibold"><span>Totaal</span><span>{formatEuro(total)}</span></div><div role="status" className="mt-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm leading-6 text-amber-100">Online afrekenen wordt geactiveerd zodra de beveiligde betaal- en orderregistratie is gekoppeld en getest. Er wordt nu geen betaling gestart of bestelling geplaatst.</div><Link href="/shop" className="mt-6 inline-block rounded-xl bg-violet-500 px-6 py-3 font-semibold hover:bg-violet-400">Verder winkelen</Link></>}</div></div></main>;
}
