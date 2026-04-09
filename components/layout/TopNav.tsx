'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  ['Home', '/advanced'],
  ['Live TV', '/live-tv'],
  ['Movies', '/movies'],
  ['Series', '/series'],
  ['Apps', '/apps'],
  ['Favorites', '/favorites'],
  ['Settings', '/settings']
] as const;

export function TopNav() {
  const pathname = usePathname();
  return (
    <nav className="mb-6 flex flex-wrap gap-3" aria-label="Hoofdmenu">
      {tabs.map(([label, href]) => (
        <Link
          key={href}
          href={href}
          className={`rounded-lg px-4 py-3 text-lg ${pathname === href ? 'bg-tv-focus text-black' : 'bg-tv-card'}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
