// Server-only session boundary. No live session store is configured.
export const sessionCookie = '__Host-ploos-session';
export const sessionCookieOptions = {
  path: '/',
  secure: true,
  httpOnly: true,
  sameSite: 'lax' as const,
  maxAge: 1800
};

export type Session = {
  issuer: string;
  subject: string;
  accessToken: string;
  expiresAt: number;
};

export interface SessionStore {
  find(id: string): Promise<Session | null>;
  revoke(id: string): Promise<void>;
}

export async function resolveSession(id: string | undefined, store?: SessionStore): Promise<Session | null> {
  if (!store || !id || !/^[A-Za-z0-9_-]{43}$/.test(id)) return null;
  const session = await store.find(id);
  if (!session || !session.issuer || !session.subject || !session.accessToken ||
      !Number.isFinite(session.expiresAt) || session.expiresAt <= Date.now()) return null;
  return session;
}
