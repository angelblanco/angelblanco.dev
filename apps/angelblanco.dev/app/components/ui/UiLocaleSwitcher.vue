<template>
  <div class="relative">
    <ClientOnly>
      <button id="locale-switcher" class="inline-flex size-10 cursor-pointer items-center justify-center rounded-field transition-colors hover:bg-base-300" :class="{ 'text-primary': isOpen }" @click="handleClick">
        <Icon
          name="tabler:language"
          :class="iconSize"
        />
      </button>
    </ClientOnly>
    <OnClickOutside v-if="isOpen" @trigger="isOpen = false">
      <div class="absolute top-11 right-1/2 z-2 translate-x-1/2 rounded border border-base-300 bg-base-100 p-2 text-sm">
        <NuxtLink v-for="option in options" :key="option.locale" :to="$switchLocalePath(option.locale)" class="block px-4 py-2 hover:bg-base-300" active-class="bg-primary text-primary-content hover:bg-primary" :data-lang="option.locale" @click="isOpen = false">
          {{ option.title }}
        </NuxtLink>
      </div>
    </OnClickOutside>
  </div>
</template>

<script lang="ts" setup>
import { OnClickOutside } from '@vueuse/components';

const { iconSize = 'size-8' } = defineProps<{
  iconSize?: string;
}>();

const emit = defineEmits<{ click: [] }>();

const isOpen = ref(false);

function handleClick() {
  isOpen.value = true;
  emit('click');
}

const options: { locale: 'en' | 'es'; title: string }[] = [
  { locale: 'en', title: 'EN' },
  { locale: 'es', title: 'ES' },
];
</script>
