export type Region = {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
};

export async function getRegions(): Promise<Region[]> {
  const response = await fetch('/api/regions-proxy', {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to load regions');
  }

  const data = (await response.json()) as { items: Region[] };
  return data.items;
}
