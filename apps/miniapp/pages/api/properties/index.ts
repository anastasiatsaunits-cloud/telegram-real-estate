import type { NextApiRequest, NextApiResponse } from 'next';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const region = typeof req.query.region === 'string' ? req.query.region : '';
  const url = region ? `${API_BASE_URL}/properties?region=${encodeURIComponent(region)}` : `${API_BASE_URL}/properties`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ items: [] });
  }
}
