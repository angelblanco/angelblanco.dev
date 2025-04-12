<script setup lang="ts">
import { ref } from 'vue'

interface MenuItem {
  label: string
  href: string
}

interface RightItem {
  label?: string
  href?: string
  icon?: string
}

const props = defineProps<{
  logo?: string
  menuItems?: MenuItem[]
  rightItems?: RightItem[]
}>()

const isOpen = ref(false)
</script>

<template>
  <nav class="font-sans flex items-center justify-between flex-wrap p-4 border-b border-gray-200 dark:border-gray-700">
    <!-- Logo -->
    <div class="flex items-center flex-shrink-0 mr-6">
      <a :href="props.logo" class="text-xl font-bold">
        <slot name="logo">Logo</slot>
      </a>
    </div>

    <!-- Hamburger -->
    <div class="block lg:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-400 hover:text-gray-900 hover:border-gray-600 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:border-gray-300"
        @click="isOpen = !isOpen"
      >
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20">
          <path
            d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
          />
        </svg>
      </button>
    </div>

    <!-- Menu -->
    <div
      class="w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block"
      :class="{ hidden: !isOpen, block: isOpen }"
    >
      <div class="text-sm lg:flex-grow">
        <a
          v-for="item in props.menuItems"
          :key="item.href"
          :href="item.href"
          class="block mt-4 lg:inline-block lg:mt-0 mr-4 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          {{ item.label }}
        </a>
      </div>

      <div class="flex space-x-4 mt-4 lg:mt-0">
        <a
          v-for="item in props.rightItems"
          :key="item.href || item.label"
          :href="item.href"
          class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <span v-if="item.icon">
            <i :class="item.icon" />
          </span>
          <span v-else>
            {{ item.label }}
          </span>
        </a>
      </div>
    </div>
  </nav>
</template>
