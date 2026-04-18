import type { NextApiRequest, NextApiResponse } from 'next';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(`${API_BASE_URL}/regions`);
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ items: [] });
  }
}
