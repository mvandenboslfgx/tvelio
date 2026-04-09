import './globals.css';
import { AppStateProvider } from '@/lib/state/app-state';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { AuthGate } from '@/components/auth/AuthGate';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <AuthProvider>
          <AuthGate>
            <AppStateProvider>{children}</AppStateProvider>
          </AuthGate>
        </AuthProvider>
      </body>
    </html>
  );
}
