import type { Fetcher } from '../src/blog/links.ts';
import { describe, expect, it } from 'vitest';
import { checkUrl, checkUrls } from '../src/blog/links.ts';

function response(status: number, url = '', redirected = false): Response {
  return { status, url, redirected } as Response;
}

describe('checkUrl', () => {
  it('reports the status of a HEAD request', async () => {
    const fetcher: Fetcher = async () => response(404);

    expect(await checkUrl('https://a.dev/x', fetcher)).toEqual({ url: 'https://a.dev/x', status: 404, finalUrl: undefined });
  });

  it('retries with GET when HEAD is rejected', async () => {
    const methods: string[] = [];
    const fetcher: Fetcher = async (_url, init) => {
      methods.push(init.method!);
      return response(init.method === 'HEAD'
        ? 405
        : 200);
    };

    expect((await checkUrl('https://a.dev', fetcher)).status).toBe(200);
    expect(methods).toEqual(['HEAD', 'GET']);
  });

  it('reports redirects to a different URL', async () => {
    const fetcher: Fetcher = async () => response(200, 'https://b.dev/', true);

    expect((await checkUrl('https://a.dev', fetcher)).finalUrl).toBe('https://b.dev/');
  });

  it('ignores redirects that only append to the path', async () => {
    const fetcher: Fetcher = async () => response(200, 'https://nodejs.org/en', true);

    expect((await checkUrl('https://nodejs.org/', fetcher)).finalUrl).toBeUndefined();
  });

  it('reports network errors instead of throwing', async () => {
    const fetcher: Fetcher = async () => {
      throw new Error('ENOTFOUND');
    };

    expect(await checkUrl('https://a.dev', fetcher)).toEqual({ url: 'https://a.dev', error: 'ENOTFOUND' });
  });
});

describe('checkUrls', () => {
  it('requests each URL once and sorts the results', async () => {
    const requested: string[] = [];
    const fetcher: Fetcher = async (url) => {
      requested.push(url);
      return response(200);
    };

    const results = await checkUrls(['https://b.dev', 'https://a.dev', 'https://b.dev'], fetcher);

    expect(results.map(result => result.url)).toEqual(['https://a.dev', 'https://b.dev']);
    expect(requested).toHaveLength(2);
  });
});
