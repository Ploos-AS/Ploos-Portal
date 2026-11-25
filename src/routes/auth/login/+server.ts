import { json } from '@sveltejs/kit';

export function GET() {
  return json({ error: 'Authentication is not enabled' }, {
    status: 503,
    headers: { 'Cache-Control': 'no-store' }
  });
}
