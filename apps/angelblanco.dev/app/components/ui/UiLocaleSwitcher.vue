<template>
  <div class="relative">
    <ClientOnly>
      <button class="btn btn-ghost btn-square" :class="isOpen ? 'btn-active' : ''" @click="handleClick">
        <Icon
          name="heroicons:language"
          class="fill-current"
          :class="iconSize"
        />
      </button>
    </ClientOnly>
    <OnClickOutside v-if="isOpen" @trigger="isOpen = false">
      <div class="bg-base-100 z-2 text-sm border border-base-300 rounded absolute top-11 right-1/2 translate-x-1/2 p-2">
        <NuxtLink v-for="option in options" :key="option.locale" :to="$switchLocalePath(option.locale)" class="py-2 px-4 block hover:bg-base-200" active-class="bg-primary text-primary-content hover:bg-primary" @click="isOpen = false">
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
