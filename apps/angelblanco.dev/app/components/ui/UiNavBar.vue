<template>
  <div class="sticky top-0 z-30">
    <nav id="ui-nav-bar" class="bg-base-100" :data-is-open="isMenuOpen ? 'true' : 'false'">
      <div class="mx-auto flex max-w-ui flex-1 items-center gap-2 p-4">
        <div class="grow md:grow-0">
          <NuxtLink data-testid="ui-navbar-link" to="/" class="btn btn-ghost p-2 font-mono text-lg lg:text-xl" @click="closeMenu()">
            angelblanco.dev
          </NuxtLink>
        </div>

        <div class="hidden flex-1 justify-center gap-8 text-sm font-semibold md:flex">
          <NuxtLinkLocale v-for="menuEntry in menuEntries" :key="menuEntry.to" :to="menuEntry.to" class="rounded-field p-2 hover:bg-primary/5 hover:text-primary" active-class="text-primary">
            {{ menuEntry.label }}
          </NuxtLinkLocale>
        </div>

        <UiThemeSwitcher :icon-size="iconSize" @click="closeMenu()" />
        <UiLocaleSwitcher :icon-size="iconSize" @click="closeMenu()" />

        <NuxtLink class="btn inline-flex btn-square btn-ghost" to="https://github.com/angelblanco/angelblanco.dev" target="_blank">
          <Icon name="codicon:github-alt" class="fill-current" :class="iconSize" />
        </NuxtLink>

        <label id="ui-navbar-toggle" class="btn swap btn-square swap-rotate btn-ghost md:hidden" @click="toggleMenu">
          <Icon name="heroicons:bars-3" class="fill-current " :class="[isMenuOpen ? 'swap-on' : 'swap-off', iconSize]" />
          <Icon name="heroicons:x-mark" class="fill-current " :class="[isMenuOpen ? 'swap-off' : 'swap-on', iconSize]" />
        </label>
      </div>
    </nav>
  </div>

  <teleport v-if="isMenuOpen" to="body">
    <div id="ui-nav-bar-menu" class="fixed inset-0 top-16 z-50 overflow-y-auto border-t border-base-300 bg-base-100 shadow-sm md:hidden ">
      <div class="divide-y divide-base-300">
        <div v-for="menuEntry in menuEntries" :key="menuEntry.to" class="py-2">
          <NuxtLinkLocale class="flex gap-2 rounded p-4 font-medium hover:bg-primary/10 hover:text-primary-content dark:hover:text-primary" :to="menuEntry.to" active-class="text-primary" @click="closeMenu()">
            <Icon :name="menuEntry.icon" class="fill-current" :class="iconSize" />
            <span>{{ menuEntry.label }}</span>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
const iconSize = 'size-6 lg:size-7';
const { t } = useI18n();

const isMenuOpen = ref(false);
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

interface MenuEntry {
  to: string;
  label: string;
  icon: string;
}

const menuEntries = computed<MenuEntry[]>(() => [
  {
    to: '/blog',
    label: t('Blog'),
    icon: 'heroicons:document-text',
  },
  {
    to: '/projects',
    label: t('Projects'),
    icon: 'heroicons:computer-desktop',
  },

  {
    to: '/about',
    label: t('Me'),
    icon: 'heroicons:user',
  },
]);
</script>
