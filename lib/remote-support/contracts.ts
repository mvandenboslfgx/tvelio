import { Channel } from '@/lib/types';

export type FamilySupportCommand =
  | { type: 'SET_FAVORITES'; payload: Channel[] }
  | { type: 'SET_MODE'; payload: 'simple' | 'advanced' }
  | { type: 'LOCK_SETTING'; payload: { key: string; enabled: boolean } };

export interface RemoteSupportTransport {
  send(command: FamilySupportCommand): Promise<void>;
  subscribe(handler: (command: FamilySupportCommand) => void): () => void;
}

export class NoopRemoteSupportTransport implements RemoteSupportTransport {
  async send(): Promise<void> {
    return;
  }
  subscribe(): () => void {
    return () => undefined;
  }
}
