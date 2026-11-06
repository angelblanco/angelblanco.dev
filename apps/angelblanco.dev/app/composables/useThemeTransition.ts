export const THEME_TRANSITION_CLASS = 'theme-transition';

export function themeRevealClipPath(origin: { x: number; y: number }, viewport: { width: number; height: number }): [string, string] {
  const radius = Math.hypot(
    Math.max(origin.x, viewport.width - origin.x),
    Math.max(origin.y, viewport.height - origin.y),
  );

  return [
    `circle(0px at ${origin.x}px ${origin.y}px)`,
    `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
  ];
}

export default function useThemeTransition() {
  const colorMode = useColorMode();
  const reducedMotion = usePreferredReducedMotion();

  async function applyTheme(theme: 'light' | 'dark') {
    colorMode.preference = theme;
    await nextTick();
  }

  async function toggleTheme(event?: Event) {
    const nextTheme = colorMode.value === 'light'
      ? 'dark'
      : 'light';

    if (!document.startViewTransition || reducedMotion.value === 'reduce') {
      await applyTheme(nextTheme);
      return;
    }

    const target = event?.currentTarget instanceof Element
      ? event.currentTarget
      : null;
    const rect = target?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : { x: window.innerWidth / 2, y: 0 };

    const root = document.documentElement;
    root.classList.add(THEME_TRANSITION_CLASS);

    const transition = document.startViewTransition(() => applyTheme(nextTheme));

    try {
      await transition.ready;
      root.animate(
        {
          clipPath: themeRevealClipPath(origin, { width: window.innerWidth, height: window.innerHeight }),
        },
        { duration: 450, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' },
      );
    }
    catch {}

    await transition.finished.catch(() => {});
    root.classList.remove(THEME_TRANSITION_CLASS);
  }

  return { toggleTheme };
}
