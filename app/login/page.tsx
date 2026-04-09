'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('demo@supertvhub.local');
  const [password, setPassword] = useState('demo1234');
  const [message, setMessage] = useState('');

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await login(email, password);
    if (result.ok) {
      router.push('/onboarding');
    } else {
      setMessage(result.message || 'Inloggen mislukt');
    }
  };

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-4 text-4xl font-bold">Inloggen</h1>
      <form onSubmit={onSubmit} className="space-y-4 rounded-xl bg-tv-card p-6">
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded p-3 text-black" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded p-3 text-black" />
        <button className="w-full rounded bg-tv-focus px-4 py-3 text-black">Inloggen</button>
      </form>
      {message ? <p className="mt-4 text-yellow-300">{message}</p> : null}
    </main>
  );
}
