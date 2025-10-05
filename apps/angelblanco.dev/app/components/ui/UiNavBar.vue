<template>
  <div class="sticky top-0 z-30">
    <nav id="ui-nav-bar" class="bg-base-100" :data-is-open="isMenuOpen ? 'true' : 'false'">
      <div class="p-4 max-w-ui mx-auto gap-2 flex-1 flex items-center">
        <div class="flex-grow md:flex-grow-0">
          <NuxtLink data-testid="ui-navbar-link" to="/" class="btn btn-ghost p-2 text-lg lg:text-xl font-mono" @click="closeMenu()">
            angelblanco.dev
          </NuxtLink>
        </div>

        <div class="hidden flex-1 md:flex gap-8 justify-center font-semibold text-sm">
          <NuxtLinkLocale v-for="menuEntry in menuEntries" :key="menuEntry.to" :to="menuEntry.to" class="hover:text-primary hover:bg-primary/5 rounded-field p-2" active-class="text-primary">
            {{ menuEntry.label }}
          </NuxtLinkLocale>
        </div>

        <UiThemeSwitcher :icon-size="iconSize" @click="closeMenu()" />
        <UiLocaleSwitcher :icon-size="iconSize" @click="closeMenu()" />

        <NuxtLink class="inline-flex btn btn-ghost btn-square" to="https://github.com/angelblanco/angelblanco.dev" target="_blank">
          <Icon name="codicon:github-alt" class="fill-current" :class="iconSize" />
        </NuxtLink>

        <label id="ui-navbar-toggle" class="swap swap-rotate btn btn-ghost btn-square md:hidden" @click="toggleMenu">
          <Icon name="heroicons:bars-3" class="fill-current " :class="[isMenuOpen ? 'swap-on' : 'swap-off', iconSize]" />
          <Icon name="heroicons:x-mark" class="fill-current " :class="[isMenuOpen ? 'swap-off' : 'swap-on', iconSize]" />
        </label>
      </div>
    </nav>
  </div>

  <teleport v-if="isMenuOpen" to="body">
    <div id="ui-nav-bar-menu" class="fixed inset-0 top-16 z-50 bg-base-100 md:hidden shadow-sm overflow-y-auto border-t border-base-300 ">
      <div class="divide-y divide-base-300">
        <div v-for="menuEntry in menuEntries" :key="menuEntry.to" class="py-2">
          <NuxtLinkLocale class="flex p-4 gap-2 rounded hover:bg-primary/10 hover:text-primary-content dark:hover:text-primary font-medium" :to="menuEntry.to" active-class="text-primary" @click="closeMenu()">
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
