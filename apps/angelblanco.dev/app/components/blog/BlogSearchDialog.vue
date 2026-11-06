<template>
  <dialog
    ref="dialog"
    data-testid="blog-search-dialog"
    class="modal modal-top sm:modal-middle"
    :aria-label="$t('searchOpen')"
    @close="open = false"
  >
    <div class="modal-box max-w-xl border border-base-300 p-0 motion-reduce:transition-none">
      <div class="flex items-center gap-3 border-b border-base-300 px-4">
        <Icon name="tabler:search" class="size-5 flex-none text-base-content/60" />
        <input
          ref="input"
          v-model="query"
          type="text"
          enterkeyhint="search"
          role="combobox"
          class="h-14 min-w-0 flex-1 bg-transparent outline-none"
          autocomplete="off"
          :placeholder="$t('searchPlaceholder')"
          :aria-label="$t('searchPlaceholder')"
          aria-autocomplete="list"
          aria-controls="blog-search-results"
          :aria-expanded="results.length > 0"
          :aria-activedescendant="results.length ? `blog-search-result-${activeIndex}` : undefined"
          @keydown.down.prevent="move(1)"
          @keydown.up.prevent="move(-1)"
          @keydown.enter.prevent="select(activeIndex)"
        >
        <form method="dialog">
          <button class="btn btn-ghost btn-sm" :aria-label="$t('searchClose')">
            <kbd class="kbd kbd-sm">esc</kbd>
          </button>
        </form>
      </div>

      <div class="max-h-[60dvh] overflow-y-auto p-2" aria-live="polite">
        <p v-if="status === 'pending'" class="p-4 text-sm text-base-content/60">
          {{ $t('searchLoading') }}
        </p>
        <p v-else-if="status === 'error'" class="p-4 text-sm text-error">
          {{ $t('searchError') }}
        </p>
        <p v-else-if="query.trim() && !results.length" class="p-4 text-sm text-base-content/60">
          {{ $t('searchNoResults', { query: query.trim() }) }}
        </p>
        <ul v-show="results.length" id="blog-search-results" role="listbox" :aria-label="$t('searchResults')">
          <li
            v-for="(result, index) in results"
            :id="`blog-search-result-${index}`"
            :key="result.id"
            role="option"
            :aria-selected="index === activeIndex"
            class="cursor-pointer rounded-field px-3 py-2"
            :class="{ 'bg-base-300': index === activeIndex }"
            @click="select(index)"
            @mousemove="activeIndex = index"
          >
            <div v-if="result.titles.length" class="truncate text-xs text-base-content/60">
              {{ result.titles.join(' › ') }}
            </div>
            <div class="font-semibold" :class="{ 'text-primary': index === activeIndex }">
              {{ result.title }}
            </div>
            <div v-if="result.snippet" class="line-clamp-2 text-sm text-base-content/70">
              {{ result.snippet }}
            </div>
          </li>
        </ul>
      </div>

      <div class="hidden items-center gap-4 border-t border-base-300 px-4 py-2 text-xs text-base-content/60 sm:flex">
        <span><kbd class="kbd kbd-xs">↑</kbd> <kbd class="kbd kbd-xs">↓</kbd> {{ $t('searchHintNavigate') }}</span>
        <span><kbd class="kbd kbd-xs">↵</kbd> {{ $t('searchHintOpen') }}</span>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button tabindex="-1">
        {{ $t('searchClose') }}
      </button>
    </form>
  </dialog>
</template>

<script lang="ts" setup>
const open = defineModel<boolean>('open', { required: true });

const { locale } = useI18n();
const dialog = useTemplateRef('dialog');
const input = useTemplateRef('input');
const query = ref('');
const activeIndex = ref(0);

const { data: sections, status } = useLazyFetch(() => `/api/search/${locale.value}.json`, { server: false });

const results = computed(() => searchSections(sections.value ?? [], query.value));

watch(results, () => {
  activeIndex.value = 0;
});

function move(step: number) {
  if (!results.value.length)
    return;

  activeIndex.value = (activeIndex.value + step + results.value.length) % results.value.length;
  document.getElementById(`blog-search-result-${activeIndex.value}`)?.scrollIntoView({ block: 'nearest' });
}

async function select(index: number) {
  const result = results.value[index];

  if (!result)
    return;

  open.value = false;
  await navigateTo(result.id);
}

function sync(value: boolean) {
  if (value && !dialog.value?.open) {
    dialog.value?.showModal();
    input.value?.select();
  }
  else if (!value && dialog.value?.open) {
    dialog.value.close();
  }
}

watch(open, sync);
onMounted(() => sync(open.value));
</script>
