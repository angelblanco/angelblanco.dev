import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import useThemeTransition, { THEME_TRANSITION_CLASS, themeRevealClipPath } from '~/composables/useThemeTransition';

describe('composables: useThemeTransition', () => {
  afterEach(() => {
    Reflect.deleteProperty(document, 'startViewTransition');
    useColorMode().preference = 'light';
  });

  it('should grow the reveal circle from the origin to the farthest corner', () => {
    expect(themeRevealClipPath({ x: 30, y: 40 }, { width: 330, height: 440 })).toEqual([
      'circle(0px at 30px 40px)',
      'circle(500px at 30px 40px)',
    ]);
  });

  it('should toggle the theme directly without view transitions support', async () => {
    const colorMode = useColorMode();
    colorMode.preference = 'light';
    await nextTick();

    await useThemeTransition().toggleTheme();

    expect(colorMode.preference).toBe('dark');
  });

  it('should toggle the theme inside a view transition scoped by a class', async () => {
    const colorMode = useColorMode();
    colorMode.preference = 'dark';
    await nextTick();
    const classDuringUpdate: boolean[] = [];
    const animate = vi.fn();
    document.documentElement.animate = animate;

    Object.assign(document, {
      startViewTransition: vi.fn((update: () => Promise<void>) => {
        classDuringUpdate.push(document.documentElement.classList.contains(THEME_TRANSITION_CLASS));
        const done = update();
        return { ready: done, finished: done };
      }),
    });

    await useThemeTransition().toggleTheme();

    expect(colorMode.preference).toBe('light');
    expect(classDuringUpdate).toEqual([true]);
    expect(animate).toHaveBeenCalledWith(
      {
        clipPath: expect.any(Array),
      },
      expect.objectContaining({ pseudoElement: '::view-transition-new(root)' }),
    );
    expect(document.documentElement.classList.contains(THEME_TRANSITION_CLASS)).toBe(false);
  });
});
