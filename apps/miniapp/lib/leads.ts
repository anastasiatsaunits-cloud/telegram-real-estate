export type CreateLeadPayload = {
  sessionId: string;
  phone: string;
  regionInterest?: string;
  budgetRange?: string;
  purchaseTerm?: string;
  source?: string;
  propertySlug?: string;
};

export async function submitLead(payload: CreateLeadPayload) {
  const response = await fetch('/api/leads-proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? 'Lead submit failed');
  }

  return data;
}
