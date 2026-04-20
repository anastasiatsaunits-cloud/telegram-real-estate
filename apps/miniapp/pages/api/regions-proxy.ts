import type { NextApiRequest, NextApiResponse } from 'next';
import { proxyJson } from '../../lib/server-api';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const result = await proxyJson<{ items: unknown[] }>('/regions');

  if (!result.ok) {
    res.status(result.status).json({ items: [], ...result.data });
    return;
  }

  res.status(result.status).json(result.data);
}
