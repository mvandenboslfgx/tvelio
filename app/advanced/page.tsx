import { TopNav } from '@/components/layout/TopNav';

export default function AdvancedPage() {
  return (
    <main className="p-6">
      <TopNav />
      <section className="rounded-2xl bg-tv-card p-6">
        <h1 className="text-4xl font-bold">Welkom bij Super TV Hub</h1>
        <p className="mt-3 text-xl text-tv-muted">Alles wat u wilt kijken op één plek.</p>
      </section>
    </main>
  );
}
