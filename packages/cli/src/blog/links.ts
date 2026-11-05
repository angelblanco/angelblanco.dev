export interface LinkStatus {
  url: string;
  status?: number;
  finalUrl?: string;
  error?: string;
}

export type Fetcher = (url: string, init: RequestInit) => Promise<Response>;

// Some sites (docs behind CDNs) reject HEAD or bot user agents, so fall back to GET once.
const RETRY_WITH_GET = new Set([403, 405, 429, 501]);
const TIMEOUT_MS = 10_000;
const CONCURRENCY = 8;

async function request(url: string, method: string, fetcher: Fetcher): Promise<Response> {
  return fetcher(url, {
    method,
    redirect: 'follow',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { 'user-agent': 'Mozilla/5.0 (compatible; angelblanco.dev link checker)' },
  });
}

export async function checkUrl(url: string, fetcher: Fetcher = fetch): Promise<LinkStatus> {
  try {
    let response = await request(url, 'HEAD', fetcher);

    if (RETRY_WITH_GET.has(response.status) || response.status >= 500)
      response = await request(url, 'GET', fetcher);

    // A redirect that only appends to the path (trailing slash, locale) is not worth updating.
    const finalUrl = response.redirected && !response.url.startsWith(url.replace(/#.*$/, '').replace(/\/$/, ''))
      ? response.url
      : undefined;

    return { url, status: response.status, finalUrl };
  }
  catch (error) {
    return { url, error: (error as Error).message };
  }
}

export async function checkUrls(urls: string[], fetcher: Fetcher = fetch): Promise<LinkStatus[]> {
  const queue = [
    ...new Set(urls),
  ];
  const results: LinkStatus[] = [];

  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    for (let url = queue.shift(); url; url = queue.shift())
      results.push(await checkUrl(url, fetcher));
  }));

  return results.sort((a, b) => a.url.localeCompare(b.url));
}
