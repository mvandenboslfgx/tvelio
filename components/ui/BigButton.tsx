import clsx from 'clsx';
import React from 'react';

export function BigButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      data-focusable="true"
      className={clsx(
        'rounded-2xl bg-tv-card px-8 py-6 text-2xl font-semibold text-white shadow-lg transition hover:brightness-125 focus-visible:ring-4 focus-visible:ring-tv-focus',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
