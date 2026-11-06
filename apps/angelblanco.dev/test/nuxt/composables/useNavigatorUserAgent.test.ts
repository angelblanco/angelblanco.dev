import { mountSuspended } from '@nuxt/test-utils/runtime';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h } from 'vue';

const Probe = defineComponent({
  setup() {
    const { isAppleUserAgent } = useNavigatorUserAgent();
    return () => h('span', String(isAppleUserAgent.value));
  },
});

describe('composables: useNavigatorUserAgent', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each([
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)', 'true'],
    ['Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)', 'true'],
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'false'],
    ['Mozilla/5.0 (X11; Linux x86_64)', 'false'],
  ])('detects Apple devices from %s', async (userAgent, expected) => {
    vi.stubGlobal('navigator', { ...navigator, userAgent });

    const wrapper = await mountSuspended(Probe);

    expect(wrapper.text()).toBe(expected);
  });
});
