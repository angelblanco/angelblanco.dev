import type { Decorator } from '@storybook-vue/nuxt';
import { h, onBeforeUnmount } from 'vue';

export function withNavigatorLanguage(language: string): Decorator {
  return story => ({
    setup() {
      Object.defineProperty(navigator, 'language', {
        configurable: true,
        get: () => language,
      });
      onBeforeUnmount(() => Reflect.deleteProperty(navigator, 'language'));

      return () => h(story());
    },
  });
}
