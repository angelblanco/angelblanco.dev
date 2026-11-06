import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { HomeHeroVortex } from '#components';

const mocks = await vi.hoisted(async () => {
  const { ref } = await import('vue');
  const isActive = ref(false);

  return {
    reducedMotion: ref<'reduce' | 'no-preference'>('no-preference'),
    isElementVisible: ref(true),
    documentVisibility: ref<DocumentVisibilityState>('visible'),
    isActive,
    pause: vi.fn(() => {
      isActive.value = false;
    }),
    resume: vi.fn(() => {
      isActive.value = true;
    }),
  };
});

mockNuxtImport('usePreferredReducedMotion', () => () => mocks.reducedMotion);
mockNuxtImport('useElementVisibility', () => () => mocks.isElementVisible);
mockNuxtImport('useDocumentVisibility', () => () => mocks.documentVisibility);
mockNuxtImport('useRafFn', () => () => ({ pause: mocks.pause, resume: mocks.resume, isActive: mocks.isActive }));
mockNuxtImport('onNuxtReady', () => (callback: () => void) => callback());

const wrappers: { unmount: () => void }[] = [];

const context = {
  fillRect: vi.fn(),
  setTransform: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
};

describe('components: HomeHeroVortex', () => {
  beforeAll(() => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context as unknown as CanvasRenderingContext2D);
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(1280);
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(800);
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.reducedMotion.value = 'no-preference';
    mocks.isElementVisible.value = true;
    mocks.documentVisibility.value = 'visible';
    mocks.isActive.value = false;
  });

  afterEach(() => {
    wrappers.splice(0).forEach(wrapper => wrapper.unmount());
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  async function mountVortex() {
    const wrapper = await mountSuspended(HomeHeroVortex, {
      props: { particleCount: 10 },
      slots: {
        default: () => 'Hello',
      },
    });
    wrappers.push(wrapper);
    await nextTick();
    return wrapper;
  }

  it('should render the slot over a decorative canvas', async () => {
    const wrapper = await mountVortex();

    expect(wrapper.text()).toContain('Hello');
    expect(wrapper.get('canvas').attributes('aria-hidden')).toBe('true');
  });

  it('should animate when motion is allowed and the hero is visible', async () => {
    const wrapper = await mountVortex();

    expect(mocks.resume).toHaveBeenCalledOnce();
    expect(wrapper.get('[data-testid="hero-vortex"]').attributes('data-state')).toBe('running');
    expect(context.setTransform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);
  });

  it('should draw a single static frame and never animate with reduced motion', async () => {
    mocks.reducedMotion.value = 'reduce';
    const wrapper = await mountVortex();

    expect(mocks.resume).not.toHaveBeenCalled();
    expect(context.fillRect).toHaveBeenCalledOnce();
    expect(context.stroke).toHaveBeenCalledTimes(10);
    expect(wrapper.get('[data-testid="hero-vortex"]').attributes('data-state')).toBe('static');
  });

  it('should stop animating when reduced motion is turned on', async () => {
    const wrapper = await mountVortex();

    mocks.reducedMotion.value = 'reduce';
    await nextTick();

    expect(mocks.pause).toHaveBeenCalled();
    expect(wrapper.get('[data-testid="hero-vortex"]').attributes('data-state')).toBe('static');
  });

  it('should pause when the hero leaves the viewport and resume when it comes back', async () => {
    const wrapper = await mountVortex();

    mocks.isElementVisible.value = false;
    await nextTick();
    expect(mocks.pause).toHaveBeenCalledOnce();
    expect(wrapper.get('[data-testid="hero-vortex"]').attributes('data-state')).toBe('paused');

    mocks.isElementVisible.value = true;
    await nextTick();
    expect(mocks.resume).toHaveBeenCalledTimes(2);
  });

  it('should pause when the tab is hidden', async () => {
    await mountVortex();

    mocks.documentVisibility.value = 'hidden';
    await nextTick();

    expect(mocks.pause).toHaveBeenCalledOnce();
  });

  it('should not start while the hero is offscreen', async () => {
    mocks.isElementVisible.value = false;
    await mountVortex();

    expect(mocks.resume).not.toHaveBeenCalled();
  });

  it('should pause on unmount', async () => {
    const wrapper = await mountVortex();
    wrappers.pop();

    wrapper.unmount();

    expect(mocks.pause).toHaveBeenCalled();
  });
});
