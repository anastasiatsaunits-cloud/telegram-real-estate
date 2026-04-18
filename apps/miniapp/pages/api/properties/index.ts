import type { NextApiRequest, NextApiResponse } from 'next';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = new URLSearchParams();
  if (typeof req.query.region === 'string') params.set('region', req.query.region);
  if (typeof req.query.budgetMin === 'string') params.set('budgetMin', req.query.budgetMin);
  if (typeof req.query.budgetMax === 'string') params.set('budgetMax', req.query.budgetMax);
  const query = params.toString();
  const url = query ? `${API_BASE_URL}/properties?${query}` : `${API_BASE_URL}/properties`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ items: [] });
  }
}
