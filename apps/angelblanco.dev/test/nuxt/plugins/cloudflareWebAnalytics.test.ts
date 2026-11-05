import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import cloudflareWebAnalytics from '~/plugins/cloudflare-web-analytics.client';

const { useScriptCloudflareWebAnalyticsMock, onNuxtReadyMock } = vi.hoisted(() => ({
  useScriptCloudflareWebAnalyticsMock: vi.fn(),
  onNuxtReadyMock: vi.fn((callback: () => void) => callback()),
}));

mockNuxtImport('useScriptCloudflareWebAnalytics', () => useScriptCloudflareWebAnalyticsMock);
mockNuxtImport('onNuxtReady', () => onNuxtReadyMock);

const TOKEN = '0123456789abcdef0123456789abcdef';

async function runPlugin(token: string) {
  useRuntimeConfig().public.scripts.cloudflareWebAnalytics.token = token;
  const nuxtApp = useNuxtApp();
  await nuxtApp.runWithContext(() => cloudflareWebAnalytics(nuxtApp));
}

describe('plugins: cloudflare-web-analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not load the beacon without a token', async () => {
    await runPlugin('');

    expect(onNuxtReadyMock).not.toHaveBeenCalled();
    expect(useScriptCloudflareWebAnalyticsMock).not.toHaveBeenCalled();
  });

  it('loads the beacon once the app is ready when a token is set', async () => {
    await runPlugin(TOKEN);

    expect(onNuxtReadyMock).toHaveBeenCalledOnce();
    expect(useScriptCloudflareWebAnalyticsMock).toHaveBeenCalledExactlyOnceWith({
      token: TOKEN,
      scriptOptions: { bundle: false },
    });
  });

  it('registers Cloudflare Web Analytics instead of Google Analytics', () => {
    const scripts = useRuntimeConfig().public.scripts;

    expect(scripts).toHaveProperty('cloudflareWebAnalytics');
    expect(scripts).not.toHaveProperty('googleAnalytics');
  });
});
