'use client';

import { AppMode, Channel } from '@/lib/types';
import React, { createContext, useContext, useMemo, useState } from 'react';

type AppState = {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  favorites: Channel[];
  toggleFavorite: (channel: Channel) => void;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AppMode>('simple');
  const [favorites, setFavorites] = useState<Channel[]>([]);

  const toggleFavorite = (channel: Channel) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === channel.id);
      return exists ? prev.filter((f) => f.id !== channel.id) : [...prev, channel];
    });
  };

  const value = useMemo(() => ({ mode, setMode, favorites, toggleFavorite }), [mode, favorites]);
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
}
