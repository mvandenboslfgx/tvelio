'use client';

import React, { useEffect, useRef } from 'react';

export function FocusGrid({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const first = ref.current?.querySelector<HTMLElement>('[data-focusable="true"]');
    first?.focus();
  }, []);

  return (
    <div ref={ref} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}
