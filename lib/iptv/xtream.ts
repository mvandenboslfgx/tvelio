import { z } from 'zod';

const XtreamInput = z.object({
  server: z.string().url(),
  username: z.string().min(1),
  password: z.string().min(1)
});

export async function getXtreamLive(input: unknown) {
  const { server, username, password } = XtreamInput.parse(input);
  const url = `${server}/player_api.php?username=${username}&password=${password}&action=get_live_streams`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error('Xtream bron reageert niet');
  return res.json();
}
