import type { NextApiRequest, NextApiResponse } from 'next';
import { proxyJson } from '../../lib/server-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const result = await proxyJson('/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  });

  if (!result.ok) {
    res.status(result.status).json(result.data);
    return;
  }

  res.status(result.status).json(result.data);
}
