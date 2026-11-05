<template>
  <div ref="root" class="relative">
    <ClientOnly>
      <button
        id="locale-switcher"
        ref="toggle"
        type="button"
        class="inline-flex size-10 cursor-pointer items-center justify-center rounded-field transition-colors hover:bg-base-300 focus-visible:outline-2 focus-visible:outline-primary"
        :class="{ 'text-primary': isOpen }"
        :aria-label="t('a11yLanguage')"
        :aria-expanded="isOpen"
        aria-controls="locale-switcher-menu"
        @click="handleClick"
      >
        <Icon
          name="tabler:language"
          :class="iconSize"
        />
      </button>
    </ClientOnly>
    <div v-if="isOpen" id="locale-switcher-menu" class="absolute top-11 right-1/2 z-2 translate-x-1/2 rounded border border-base-300 bg-base-100 p-2 text-sm">
      <NuxtLink
        v-for="option in options"
        :key="option.locale"
        :to="$switchLocalePath(option.locale)"
        class="block px-4 py-2 hover:bg-base-300 focus-visible:outline-2 focus-visible:outline-primary"
        active-class="bg-primary text-primary-content hover:bg-primary"
        :lang="option.locale"
        :hreflang="option.locale"
        :aria-label="option.name"
        :data-lang="option.locale"
        @click="close"
      >
        {{ option.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { iconSize = 'size-8' } = defineProps<{
  iconSize?: string;
}>();

const emit = defineEmits<{ click: [] }>();

const { t } = useI18n();
const root = useTemplateRef('root');
const toggleButton = useTemplateRef('toggle');
const isOpen = ref(false);

function handleClick() {
  isOpen.value = !isOpen.value;
  emit('click');
}

function close() {
  isOpen.value = false;
}

onClickOutside(root, close);

onKeyStroke('Escape', () => {
  if (!isOpen.value)
    return;

  close();
  toggleButton.value?.focus();
});

const options: { locale: 'en' | 'es'; title: string; name: string }[] = [
  { locale: 'en', title: 'EN', name: 'English' },
  { locale: 'es', title: 'ES', name: 'Español' },
];
</script>
