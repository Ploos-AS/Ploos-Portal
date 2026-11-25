type Organization = { id: string; display_name: string; kind: string; role: string };
type Plan = { id: string; product: string; provider: string; code: string; seat_limit: number | null };
type Subscription = { id: string; plan_id: string; status: string };

export function coreClient(base: string, token: string, transport: typeof fetch = fetch) {
  const origin = new URL(base);
  if (origin.protocol !== 'https:' || origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) {
    throw new Error('Invalid Core API origin');
  }
  if (!token || /\s/.test(token)) throw new Error('Invalid access token');

  async function read<T>(path: string): Promise<T[]> {
    const response = await transport(new URL(path, origin), {
      headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
      redirect: 'error',
      cache: 'no-store',
      signal: AbortSignal.timeout(5000)
    });
    if (!response.ok) throw new Error('Core API request failed');
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error('Invalid Core API response');
    return data as T[];
  }

  return {
    organizations: () => read<Organization>('/api/v1/organizations'),
    catalog: () => read<Plan>('/api/v1/catalog'),
    subscriptions: (organizationID: string) => {
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(organizationID)) {
        throw new Error('Invalid organization ID');
      }
      return read<Subscription>('/api/v1/organizations/' + organizationID + '/subscriptions');
    }
  };
}
