type ProxyJsonResult<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; data: Record<string, unknown> };

const DEFAULT_API_BASE_URL = 'http://localhost:4000/api';
const REQUEST_TIMEOUT_MS = 8000;

function normalizeBaseUrl(value?: string | null) {
  const normalized = (value ?? '').trim().replace(/\/$/, '');
  return normalized || DEFAULT_API_BASE_URL;
}

export function getApiBaseUrl() {
  return normalizeBaseUrl(process.env.API_URL ?? process.env.BACKEND_API_URL ?? process.env.NEXT_PUBLIC_API_URL);
}

export async function proxyJson<T>(path: string, init?: RequestInit): Promise<ProxyJsonResult<T>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      ...init,
      headers: {
        Accept: 'application/json',
        ...(init?.headers ?? {}),
      },
      signal: controller.signal,
      cache: 'no-store',
    });

    const raw = await response.text();
    const data = raw ? JSON.parse(raw) : {};

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        data: {
          message: 'Upstream request failed',
          upstreamStatus: response.status,
          ...(typeof data === 'object' && data ? data : { raw }),
        },
      };
    }

    return { ok: true, status: response.status, data: data as T };
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === 'AbortError';

    return {
      ok: false,
      status: isTimeout ? 504 : 502,
      data: {
        message: isTimeout ? 'Upstream request timed out' : 'Upstream request failed',
        apiBaseUrl: getApiBaseUrl(),
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}
