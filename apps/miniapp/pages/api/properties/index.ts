import type { NextApiRequest, NextApiResponse } from 'next';
import { proxyJson } from '../../../lib/server-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = new URLSearchParams();
  if (typeof req.query.region === 'string') params.set('region', req.query.region);
  if (typeof req.query.budgetMin === 'string') params.set('budgetMin', req.query.budgetMin);
  if (typeof req.query.budgetMax === 'string') params.set('budgetMax', req.query.budgetMax);
  const query = params.toString();

  const result = await proxyJson<{ items: unknown[] }>(query ? `/properties?${query}` : '/properties');

  if (!result.ok) {
    res.status(result.status).json({ items: [], ...result.data });
    return;
  }

  res.status(result.status).json(result.data);
}
