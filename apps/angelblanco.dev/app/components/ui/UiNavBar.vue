<template>
  <header class="sticky top-0 z-30">
    <nav id="ui-nav-bar" class="bg-base-100" :aria-label="t('a11yMainNavigation')" :data-is-open="isMenuOpen ? 'true' : 'false'">
      <div class="mx-auto flex max-w-ui flex-1 items-center gap-2 p-2 max-[375px]:gap-1 max-[375px]:px-2 lg:p-4">
        <div class="grow md:grow-0">
          <NuxtLinkLocale data-testid="ui-navbar-link" to="/" class="btn btn-ghost p-2 font-mono text-lg max-[375px]:text-base lg:text-xl" @click="closeMenu()">
            angelblanco.dev
          </NuxtLinkLocale>
        </div>

        <div class="hidden flex-1 justify-center gap-8 text-sm font-semibold md:flex">
          <NuxtLinkLocale v-for="menuEntry in menuEntries" :key="menuEntry.to" :to="menuEntry.to" class="rounded-field p-2 transition-colors hover:bg-base-300 focus-visible:outline-2 focus-visible:outline-primary" active-class="text-primary-content dark:text-primary">
            {{ menuEntry.label }}
          </NuxtLinkLocale>
        </div>

        <BlogSearch :icon-size="iconSize" @click="closeMenu()" />
        <UiThemeSwitcher :icon-size="iconSize" @click="closeMenu()" />
        <UiLocaleSwitcher :icon-size="iconSize" @click="closeMenu()" />

        <NuxtLink class="inline-flex size-10 items-center justify-center rounded-field transition-colors hover:bg-base-300 focus-visible:outline-2 focus-visible:outline-primary" :to="repoUrl" target="_blank" rel="noopener" :aria-label="t('a11yGitHubRepo')">
          <Icon name="tabler:brand-github" :class="iconSize" />
        </NuxtLink>

        <button
          id="ui-navbar-toggle"
          ref="toggle"
          type="button"
          class="swap size-10 swap-rotate cursor-pointer rounded-field transition-colors hover:bg-base-300 focus-visible:outline-2 focus-visible:outline-primary md:hidden"
          :class="{ 'text-primary-content dark:text-primary': isMenuOpen }"
          :aria-label="t('a11yMenu')"
          :aria-expanded="isMenuOpen"
          aria-controls="ui-nav-bar-menu"
          @click="toggleMenu"
        >
          <Icon name="tabler:menu-2" :class="[isMenuOpen ? 'swap-on' : 'swap-off', iconSize]" />
          <Icon name="tabler:x" :class="[isMenuOpen ? 'swap-off' : 'swap-on', iconSize]" />
        </button>
      </div>
    </nav>

    <div v-if="isMenuOpen" id="ui-nav-bar-menu" class="fixed inset-0 top-16 z-50 overflow-y-auto border-t border-base-300 bg-base-100 shadow-sm md:hidden">
      <div class="divide-y divide-base-300">
        <div v-for="menuEntry in menuEntries" :key="menuEntry.to" class="p-2">
          <NuxtLinkLocale class="flex items-center gap-3 rounded p-4 font-medium transition-colors hover:bg-base-300 focus-visible:outline-2 focus-visible:outline-primary" :to="menuEntry.to" active-class="text-primary-content dark:text-primary" @click="closeMenu()">
            <Icon :name="menuEntry.icon" class="size-5 shrink-0" />
            <span>{{ menuEntry.label }}</span>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const iconSize = 'size-5 lg:size-6';
const { t } = useI18n();
const { repoUrl } = useSocials();

const toggleButton = useTemplateRef('toggle');
const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

onKeyStroke('Escape', () => {
  if (!isMenuOpen.value)
    return;

  closeMenu();
  toggleButton.value?.focus();
});

interface MenuEntry {
  to: string;
  label: string;
  icon: string;
}

const menuEntries = computed<MenuEntry[]>(() => [
  {
    to: '/blog',
    label: t('Blog'),
    icon: 'tabler:article',
  },
  {
    to: '/projects',
    label: t('Projects'),
    icon: 'tabler:code',
  },

  {
    to: '/about',
    label: t('Me'),
    icon: 'tabler:user',
  },
]);
</script>
