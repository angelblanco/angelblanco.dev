<template>
  <div class="contents">
    <button
      type="button"
      data-testid="blog-search-button"
      class="inline-flex size-10 cursor-pointer items-center justify-center rounded-field transition-colors hover:bg-base-300"
      :aria-label="$t('searchOpen')"
      :title="`${$t('searchOpen')} (${shortcut})`"
      aria-haspopup="dialog"
      aria-keyshortcuts="Meta+K Control+K"
      @click="open = true"
    >
      <Icon name="tabler:search" :class="iconSize" />
    </button>
    <LazyBlogSearchDialog
      v-if="activated"
      v-model:open="open"
      :data="data ?? undefined"
      :status="status"
    />
  </div>
</template>

<script lang="ts" setup>
const { iconSize = 'size-5' } = defineProps<{
  iconSize?: string;
}>();

const open = ref(false);
const activated = ref(false);
const { locale } = useI18n();

const { data, status, execute } = useLazyFetch<BlogSearchData>(() => `/api/search/${locale.value}.json`, {
  server: false,
  immediate: false,
});
const { isAppleUserAgent } = useNavigatorUserAgent();
const shortcut = computed(() => isAppleUserAgent.value ? '⌘ K' : 'Ctrl K');

watch(open, (value) => {
  if (value && !activated.value) {
    activated.value = true;
    execute();
  }
});

useEventListener('keydown', (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    open.value = !open.value;
  }
});
</script>
