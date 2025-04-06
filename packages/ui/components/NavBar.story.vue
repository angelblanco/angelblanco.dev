<script setup lang="ts">
import NavBar from "./NavBar.vue";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const rightItems = [
  { label: "Login", href: "/login" },
  { icon: "i-heroicons-magnifying-glass" },
  { icon: "i-heroicons-bell" },
];
</script>

<template>
  <Story>
    <NavBar logo="#" :menu-items="menuItems" :right-items="rightItems">
      <template #logo>
        <span class="text-xl font-bold">MySite</span>
      </template>
    </NavBar>
  </Story>
</template>
