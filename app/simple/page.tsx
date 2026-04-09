import Link from 'next/link';

const options = [
  ['TV Kijken', '/live-tv'],
  ['Mijn Zenders', '/favorites'],
  ["Video's", '/apps?app=youtube'],
  ['Hulp', '/help']
];

export default function SimpleModePage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-5xl font-bold">Super TV Hub</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {options.map(([label, href]) => (
          <Link key={href} href={href} className="rounded-2xl bg-tv-card px-8 py-10 text-4xl font-bold">
            {label}
          </Link>
        ))}
      </div>
      <div className="mt-8 flex gap-4">
        <Link href="/onboarding" className="rounded-lg bg-slate-700 px-4 py-3">Home</Link>
        <Link href="/settings" className="rounded-lg bg-slate-700 px-4 py-3">Instellingen</Link>
      </div>
    </main>
  );
}
