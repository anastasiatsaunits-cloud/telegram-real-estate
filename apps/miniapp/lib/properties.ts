export type PropertyListItem = {
  id: string;
  title: string;
  slug: string;
  city: string | null;
  priceFrom: string | null;
  currency: string | null;
  region: {
    id: string;
    name: string;
    slug: string;
  };
};

export type PropertyDetails = {
  id: string;
  title: string;
  slug: string;
  city: string | null;
  address: string | null;
  priceFrom: string | null;
  priceTo: string | null;
  currency: string | null;
  areaFrom: string | null;
  areaTo: string | null;
  propertyType: string | null;
  status: string | null;
  description: string | null;
  purchaseOptionsJson: string[] | null;
  region: {
    id: string;
    name: string;
    slug: string;
  };
  metrics: {
    rentalYield: string | null;
    shortTermYield: string | null;
    annualGrowth: string | null;
    roi5y: string | null;
    roi10y: string | null;
    alternativeTotal: string | null;
  } | null;
};

export async function getProperties(): Promise<PropertyListItem[]> {
  const response = await fetch('/api/properties');
  const data = await response.json();
  return data.items ?? [];
}

export async function getPropertyBySlug(slug: string): Promise<PropertyDetails> {
  const response = await fetch(`/api/properties/${slug}`);
  const data = await response.json();
  return data.item;
}
