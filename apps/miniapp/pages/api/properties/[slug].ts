import type { NextApiRequest, NextApiResponse } from 'next';
import { proxyJson } from '../../../lib/server-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug;

  if (typeof slug !== 'string') {
    res.status(400).json({ message: 'Invalid slug' });
    return;
  }

  const result = await proxyJson(`/properties/${encodeURIComponent(slug)}`);

  if (!result.ok) {
    res.status(result.status).json(result.data);
    return;
  }

  res.status(result.status).json(result.data);
}
