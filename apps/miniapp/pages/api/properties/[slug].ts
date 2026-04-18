import type { NextApiRequest, NextApiResponse } from 'next';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug;

  if (typeof slug !== 'string') {
    res.status(400).json({ message: 'Invalid slug' });
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/properties/${slug}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch {
    res.status(500).json({ message: 'Property load failed' });
  }
}
