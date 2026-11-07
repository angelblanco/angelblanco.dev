<template>
  <dialog
    ref="dialog"
    data-testid="blog-search-dialog"
    class="modal modal-top sm:modal-middle"
    :aria-label="$t('searchOpen')"
    @close="open = false"
  >
    <div ref="box" class="relative modal-box flex h-dvh max-h-dvh w-full max-w-none flex-col overflow-hidden rounded-none p-0 pt-[env(safe-area-inset-top)] shadow-2xl ring-1 ring-base-content/10 sm:h-auto sm:max-h-[min(42rem,85dvh)] sm:max-w-2xl sm:rounded-box sm:pt-0">
      <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-70" aria-hidden="true" />

      <div class="flex flex-none items-center gap-3 border-b border-base-300 px-4 py-2">
        <Icon name="tabler:search" class="size-5 flex-none text-primary" />
        <div class="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
          <button
            v-for="tag in selectedTags"
            :key="tag"
            type="button"
            data-testid="blog-search-active-tag"
            class="inline-flex cursor-pointer items-center gap-1 rounded-full bg-primary py-1 pr-1.5 pl-2.5 font-mono text-xs text-primary-content transition hover:brightness-110"
            :aria-label="$t('searchRemoveTag', { tag })"
            @click="toggleTag(tag)"
          >
            #{{ tag }}
            <Icon name="tabler:x" class="size-3.5" />
          </button>
          <input
            ref="input"
            v-model="query"
            type="text"
            enterkeyhint="search"
            role="combobox"
            class="h-12 min-w-[10ch] flex-1 bg-transparent text-base outline-none placeholder:text-base-content/60 sm:text-lg"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            :placeholder="$t('searchPlaceholder')"
            :aria-label="$t('searchPlaceholder')"
            aria-autocomplete="list"
            aria-controls="blog-search-results"
            :aria-expanded="options.length > 0"
            :aria-activedescendant="options.length ? optionId(activeIndex) : undefined"
            @keydown.down.prevent="move(1)"
            @keydown.up.prevent="move(-1)"
            @keydown.enter.prevent="select(activeIndex)"
            @keydown.backspace="removeLastTag"
          >
        </div>
        <button
          v-if="query"
          type="button"
          class="btn btn-circle btn-ghost btn-sm"
          :aria-label="$t('searchClear')"
          @click="clearQuery"
        >
          <Icon name="tabler:x" class="size-4" />
        </button>
        <form method="dialog" class="flex-none">
          <button class="btn btn-ghost btn-sm sm:hidden">
            {{ $t('searchCancel') }}
          </button>
          <button class="btn hidden btn-ghost btn-sm sm:inline-flex" :aria-label="$t('searchClose')">
            <kbd class="kbd kbd-sm">esc</kbd>
          </button>
        </form>
      </div>

      <div
        v-if="filterTags.length"
        role="group"
        :aria-label="$t('searchFilterTags')"
        class="flex flex-none scrollbar-none gap-2 overflow-x-auto border-b border-base-300 mask-r-from-85% px-4 py-2.5 sm:flex-wrap sm:mask-none"
      >
        <button
          v-for="{ tag, count } in filterTags"
          :key="tag"
          type="button"
          data-testid="blog-search-tag-filter"
          class="inline-flex flex-none cursor-pointer items-center rounded-full border px-3 py-1.5 font-mono text-xs transition-colors sm:py-1"
          :class="selectedTags.includes(tag)
            ? 'border-primary bg-primary text-primary-content'
            : 'border-base-300 text-base-content/80 hover:border-primary hover:text-primary'"
          :aria-pressed="selectedTags.includes(tag)"
          :aria-label="`#${tag}, ${$t('blogArticleCount', count)}`"
          @click="toggleTag(tag)"
        >
          #{{ tag }}<sup class="ml-0.5 text-[0.7em] opacity-70">{{ count }}</sup>
        </button>
      </div>

      <div ref="list" class="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
        <p v-if="status === 'pending' || status === 'idle'" class="flex items-center gap-2 p-4 text-sm text-base-content/70">
          <span class="loading loading-sm loading-dots" aria-hidden="true" />
          {{ $t('searchLoading') }}
        </p>
        <p v-else-if="status === 'error'" class="p-4 text-sm text-error">
          {{ $t('searchError') }}
        </p>
        <div v-else-if="!options.length" data-testid="blog-search-empty" class="flex flex-col items-center gap-2 px-4 py-12 text-center">
          <Icon name="tabler:file-search" class="size-10 text-base-content/30" />
          <p class="font-medium">
            {{ $t('searchNoResults', { query: query.trim() || selectedTags.map(tag => `#${tag}`).join(' ') }) }}
          </p>
          <p class="text-sm text-base-content/70">
            {{ $t('searchNoResultsHint') }}
          </p>
          <button v-if="selectedTags.length" type="button" class="btn mt-2 btn-outline btn-sm" @click="selectedTags = []">
            {{ $t('searchClearFilters') }}
          </button>
        </div>

        <ul
          v-show="options.length"
          id="blog-search-results"
          role="listbox"
          class="space-y-3"
          :aria-label="$t('searchResults')"
        >
          <li v-if="results.hits.length" role="presentation">
            <p id="blog-search-group-posts" class="px-3 pt-1 pb-2 text-xs font-semibold tracking-wider text-base-content/70 uppercase">
              {{ isRecent ? $t('searchRecent') : $t('searchPosts') }}
            </p>
            <ul role="group" aria-labelledby="blog-search-group-posts" class="space-y-1">
              <template v-for="{ post, matched, sections } in results.hits" :key="post.path">
                <li
                  :id="optionId(indexOf(post.path))"
                  role="option"
                  :aria-selected="indexOf(post.path) === activeIndex"
                  data-testid="blog-search-post"
                  class="group flex cursor-pointer gap-3 rounded-field p-3 transition-colors aria-selected:bg-primary/10 aria-selected:ring-1 aria-selected:ring-primary/30 dark:aria-selected:bg-primary/20"
                  @click="select(indexOf(post.path))"
                  @mousemove="activeIndex = indexOf(post.path)"
                >
                  <span
                    class="grid size-10 flex-none place-items-center rounded-field border border-base-300 text-base-content/70 transition-colors group-aria-selected:border-primary group-aria-selected:bg-primary group-aria-selected:text-primary-content"
                    :class="{ 'opacity-60': !matched }"
                  >
                    <Icon name="tabler:file-text" class="size-5" />
                  </span>
                  <div class="min-w-0 flex-1">
                    <p class="font-semibold text-balance group-aria-selected:text-primary-content dark:group-aria-selected:text-primary">
                      <BlogSearchHighlight :text="post.title" :terms="results.terms" />
                    </p>
                    <p v-if="postSnippet(post)" class="mt-0.5 line-clamp-2 text-sm text-base-content/70">
                      <BlogSearchHighlight :text="postSnippet(post)" :terms="results.terms" />
                    </p>
                    <BlogPostMeta :post="post" class="mt-1.5 text-xs text-base-content/70">
                      <span class="hidden truncate font-mono sm:inline">
                        <span aria-hidden="true" class="mr-2">·</span>{{ post.tags.map(tag => `#${tag}`).join(' ') }}
                      </span>
                    </BlogPostMeta>
                  </div>
                  <Icon name="tabler:corner-down-left" class="hidden size-4 flex-none self-center text-primary opacity-0 transition-opacity group-aria-selected:opacity-100 sm:block" />
                </li>
                <li
                  v-for="section in sections"
                  :id="optionId(indexOf(section.id))"
                  :key="section.id"
                  role="option"
                  :aria-selected="indexOf(section.id) === activeIndex"
                  data-testid="blog-search-section"
                  class="group ml-8 flex cursor-pointer gap-3 rounded-r-field border-l-2 border-base-300 py-2 pr-3 pl-4 transition-colors aria-selected:border-primary aria-selected:bg-primary/10 sm:ml-7.5 dark:aria-selected:bg-primary/20"
                  @click="select(indexOf(section.id))"
                  @mousemove="activeIndex = indexOf(section.id)"
                >
                  <Icon name="tabler:hash" class="mt-0.5 size-4 flex-none text-base-content/70 group-aria-selected:text-primary-content dark:group-aria-selected:text-primary" />
                  <div class="min-w-0 flex-1">
                    <p v-if="breadcrumb(section, post)" class="truncate text-xs text-base-content/70">
                      {{ breadcrumb(section, post) }}
                    </p>
                    <p class="text-sm font-medium group-aria-selected:text-primary-content dark:group-aria-selected:text-primary">
                      <BlogSearchHighlight :text="section.title" :terms="results.terms" />
                    </p>
                    <p class="line-clamp-2 text-sm text-base-content/70">
                      <BlogSearchHighlight :text="searchSnippet(section.content, results.terms)" :terms="results.terms" />
                    </p>
                  </div>
                </li>
              </template>
            </ul>
          </li>

          <li v-if="results.tags.length" role="presentation">
            <p id="blog-search-group-topics" class="px-3 pt-1 pb-2 text-xs font-semibold tracking-wider text-base-content/70 uppercase">
              {{ $t('blogTopics') }}
            </p>
            <ul role="group" aria-labelledby="blog-search-group-topics" class="space-y-1 font-mono">
              <li
                v-for="{ tag, count } in results.tags"
                :id="optionId(indexOf(`tag:${tag}`))"
                :key="tag"
                role="option"
                :aria-selected="indexOf(`tag:${tag}`) === activeIndex"
                data-testid="blog-search-topic"
                class="group flex cursor-pointer items-baseline gap-3 rounded-field px-3 py-2.5 transition-colors aria-selected:bg-primary/10 aria-selected:text-primary-content aria-selected:ring-1 aria-selected:ring-primary/30 dark:aria-selected:bg-primary/20 dark:aria-selected:text-primary"
                @click="select(indexOf(`tag:${tag}`))"
                @mousemove="activeIndex = indexOf(`tag:${tag}`)"
              >
                <span class="text-lg font-semibold">
                  <span class="font-light text-primary-content dark:text-primary">#</span><BlogSearchHighlight :text="tag" :terms="results.terms" />
                </span>
                <span class="flex-1 border-b border-dotted border-base-content/25 group-aria-selected:border-primary/50" aria-hidden="true" />
                <span class="text-sm text-base-content/70 group-aria-selected:text-primary-content dark:group-aria-selected:text-primary">{{ $t('blogArticleCount', count) }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="flex flex-none items-center gap-4 border-t border-base-300 bg-base-200/50 px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-xs text-base-content/70">
        <span class="hidden items-center gap-1 sm:inline-flex"><kbd class="kbd kbd-xs">↑</kbd><kbd class="kbd kbd-xs">↓</kbd> {{ $t('searchHintNavigate') }}</span>
        <span class="hidden items-center gap-1 sm:inline-flex"><kbd class="kbd kbd-xs">↵</kbd> {{ $t('searchHintOpen') }}</span>
        <span class="hidden items-center gap-1 sm:inline-flex"><kbd class="kbd kbd-xs">#</kbd> {{ $t('searchHintTags') }}</span>
        <span class="hidden items-center gap-1 md:inline-flex"><kbd class="kbd kbd-xs">⌫</kbd> {{ $t('searchHintRemoveTag') }}</span>
        <span class="ml-auto tabular-nums" data-testid="blog-search-count" aria-live="polite">
          {{ status === 'success' ? $t('searchResultCount', options.length) : '' }}
        </span>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop backdrop-blur-sm">
      <button tabindex="-1">
        {{ $t('searchClose') }}
      </button>
    </form>
  </dialog>
</template>

<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';

const { data, status } = defineProps<{
  data?: BlogSearchData;
  status: AsyncDataRequestStatus;
}>();

const open = defineModel<boolean>('open', { required: true });

const { locale } = useI18n();
const localePath = useLocalePath();
const dialog = useTemplateRef('dialog');
const input = useTemplateRef('input');
const box = useTemplateRef('box');
const list = useTemplateRef('list');
const query = ref('');
const selectedTags = ref<string[]>([]);
const activeIndex = ref(0);

const emptyResults: BlogSearchResults = { terms: [], tags: [], hits: [] };

const index = computedAsync(
  () => data
    ? createBlogSearchIndex(data, locale.value === 'es'
        ? 'spanish'
        : 'english')
    : undefined,
  undefined,
);

const results = computedAsync(
  () => index.value
    ? searchBlog(index.value, query.value, { tags: selectedTags.value })
    : emptyResults,
  emptyResults,
);

const filterTags = computed(() => {
  const tags = index.value?.tags ?? [];
  const term = query.value.trimStart().startsWith('#')
    ? searchTerms(query.value).join(' ')
    : '';

  return term
    ? tags.filter(({ tag }) => selectedTags.value.includes(tag) || normalizeSearchText(tag).includes(term))
    : tags;
});

const isRecent = computed(() => !results.value.terms.length && !selectedTags.value.length);

interface SearchOption {
  key: string;
  to: string;
}

const options = computed<SearchOption[]>(() => [
  ...results.value.hits.flatMap(({ post, sections }) => [
    { key: post.path, to: post.path },
    ...sections.map(section => ({ key: section.id, to: section.id })),
  ]),
  ...results.value.tags.map(({ tag }) => ({
    key: `tag:${tag}`,
    to: localePath(`/blog/tags/${tag}`),
  })),
]);

const optionIndexes = computed(() => new Map(options.value.map((option, index) => [option.key, index])));

function indexOf(key: string) {
  return optionIndexes.value.get(key) ?? -1;
}

function optionId(index: number) {
  return `blog-search-option-${index}`;
}

function postSnippet(post: BlogSearchPost) {
  const { terms } = results.value;
  const visible = normalizeSearchText(`${post.title} ${post.description}`);

  if (terms.length && !terms.some(term => visible.includes(term)) && terms.some(term => normalizeSearchText(post.content).includes(term)))
    return searchSnippet(post.content, terms);

  return post.description;
}

function breadcrumb(section: BlogSearchSection, post: BlogSearchPost) {
  return section.titles.filter(title => title !== post.title).join(' › ');
}

watch(options, () => {
  activeIndex.value = 0;
});

function move(step: number) {
  if (!options.value.length)
    return;

  activeIndex.value = (activeIndex.value + step + options.value.length) % options.value.length;
  document.getElementById(optionId(activeIndex.value))?.scrollIntoView({ block: 'nearest' });
}

function toggleTag(tag: string) {
  selectedTags.value = selectedTags.value.includes(tag)
    ? selectedTags.value.filter(selected => selected !== tag)
    : [...selectedTags.value, tag];
  input.value?.focus();
}

function removeLastTag(event: KeyboardEvent) {
  if (query.value || !selectedTags.value.length)
    return;

  event.preventDefault();
  selectedTags.value = selectedTags.value.slice(0, -1);
}

function clearQuery() {
  query.value = '';
  input.value?.focus();
}

async function select(index: number) {
  const option = options.value[index];

  if (!option)
    return;

  open.value = false;
  await navigateTo(option.to);
}

async function sync(value: boolean) {
  if (value && !dialog.value?.open) {
    query.value = '';
    selectedTags.value = [];
    await nextTick();
    box.value?.scrollTo(0, 0);
    list.value?.scrollTo(0, 0);
    dialog.value?.showModal();
    input.value?.focus();
  }
  else if (!value && dialog.value?.open) {
    dialog.value.close();
  }
}

watch(open, sync);
onMounted(() => sync(open.value));
</script>
