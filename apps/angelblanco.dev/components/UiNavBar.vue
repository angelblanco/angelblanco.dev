<template>
  <div class="sticky top-0 z-30">
    <nav class="navbar bg-base-100 border-b border-base-300 h-">
      <div class="max-w-ui mx-auto gap-2 flex-1 flex items-center">
        <div class="flex-grow md:flex-grow-0">
          <NuxtLink to="/" class="btn btn-ghost text-lg lg:text-xl font-mono">
            angelblanco.dev
          </NuxtLink>
        </div>

        <div class="hidden flex-1 md:flex gap-8 justify-center font-medium text-sm">
          <NuxtLink v-for="menuEntry in menuEntries" :key="menuEntry.to" :to="menuEntry.to" class="hover:text-primary">
            {{ menuEntry.label }}
          </NuxtLink>
        </div>

        <UiThemeSwitcher :icon-size="iconSize" />

        <NuxtLink class="inline-flex btn btn-ghost btn-square" to="https://github.com/angelblanco/angelblanco.dev" target="_blank">
          <Icon name="codicon:github-alt" class="fill-current" :class="iconSize" />
        </NuxtLink>

        <label class="swap swap-rotate btn btn-ghost btn-square md:hidden" @click="toggleMenu">
          <Icon name="heroicons:bars-3" class="fill-current " :class="[isMenuOpen ? 'swap-on' : 'swap-off', iconSize]" />
          <Icon name="heroicons:x-mark" class="fill-current " :class="[isMenuOpen ? 'swap-off' : 'swap-on', iconSize]" />
        </label>
      </div>
    </nav>
  </div>

  <teleport v-if="isMenuOpen" to="body">
    <div class="fixed inset-0 top-16 z-50 bg-base-200 md:hidden p-4 shadow-sm overflow-y-auto">
      <div class="divide-y divide-base-300">
        <NuxtLink v-for="menuEntry in menuEntries" :key="menuEntry.to" class="flex p-2 gap-2" :to="menuEntry.to">
          <Icon :name="menuEntry.icon" class="fill-current" :class="iconSize" />
          <span>{{ menuEntry.label }}</span>
        </NuxtLink>
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

interface MenuEntry {
  to: string;
  label: string;
  icon: string;
}

const menuEntries: MenuEntry[] = [
  {
    to: '/blog',
    label: t('Blog'),
    icon: 'heroicons:book-open',
  },
  {
    to: '/projects',
    label: t('Projects'),
    icon: 'heroicons:code-bracket',
  },

  {
    to: '/about',
    label: t('Me'),
    icon: 'heroicons:identification',
  },
  {
    to: '/contact',
    label: t('Contact'),
    icon: 'heroicons:qr-code',
  },
];
</script>
☺
