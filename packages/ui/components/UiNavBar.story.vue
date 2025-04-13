<template>
  <Story>
    <NavBar logo="#" :menu-items="menuItems" :right-items="rightItems">
      <template #logo>
        <span class="text-xl font-bold">MySite</span>
      </template>
    </NavBar>
  </Story>
</template>

<script setup lang="ts">
import NavBar from './UiNavBar.vue';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

const rightItems = [
  { label: 'Login', href: '/login' },
  { icon: 'i-heroicons-magnifying-glass' },
  { icon: 'i-heroicons-bell' },
];
</script>
