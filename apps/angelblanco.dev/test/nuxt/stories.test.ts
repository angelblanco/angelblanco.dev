import type { composeStory } from '@storybook-vue/nuxt';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { composeStories } from '@storybook-vue/nuxt';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { h } from 'vue';
import annotations from '../../.storybook/annotations';

type StoryModule = Parameters<typeof composeStories>[0];
type ComposedStory = ReturnType<typeof composeStory>;

const modules = Object.entries(import.meta.glob<StoryModule>('../../app/**/*.stories.ts', { eager: true }));

beforeAll(() => {
  const context = new Proxy({}, {
    get: () => () => {},
  });
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context as CanvasRenderingContext2D);
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe('stories', () => {
  it('should find story files', () => {
    expect(modules.length).toBeGreaterThan(0);
  });
});

describe.each(modules)('stories: %s', (_path, module) => {
  const stories = (Object.entries(composeStories(module, annotations)) as [string, ComposedStory][]).filter(([, story]) => story.tags.includes('test'));

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it.each(stories)('should render %s and pass its play function', async (_name, Story) => {
    await Story.load?.();
    const canvasElement = document.createElement('div');
    document.body.appendChild(canvasElement);

    const wrapper = await mountSuspended({
      setup: () => () => h(Story),
    }, { attachTo: canvasElement });

    await vi.waitFor(() => expect(wrapper.html().trim()).not.toBe(''));
    await Story.play?.({ canvasElement } as Parameters<NonNullable<ComposedStory['play']>>[0]);
    wrapper.unmount();
  });
});
