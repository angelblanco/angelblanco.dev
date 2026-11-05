<template>
  <section v-if="enabled" id="blog-comments" class="mt-16 border-t border-base-300 pt-8" aria-labelledby="blog-comments-title">
    <h2 id="blog-comments-title" class="mb-6 text-2xl font-semibold tracking-tight">
      {{ $t('blogComments') }}
    </h2>
    <div ref="container" class="min-h-48" />
  </section>
</template>

<script lang="ts" setup>
const { term } = defineProps<{
  term: string;
}>();

const GISCUS_ORIGIN = 'https://giscus.app';

const { giscus } = useAppConfig();
const { locale } = useI18n();
const colorMode = useColorMode();
const container = useTemplateRef('container');

const enabled = computed(() => Boolean(giscus.repo && giscus.repoId && giscus.category && giscus.categoryId));
const theme = computed(() => colorMode.value === 'dark'
  ? 'catppuccin_mocha'
  : 'catppuccin_latte');

function loadGiscus(element: HTMLElement) {
  const attributes: Record<string, string> = {
    'src': `${GISCUS_ORIGIN}/client.js`,
    'data-repo': giscus.repo,
    'data-repo-id': giscus.repoId,
    'data-category': giscus.category,
    'data-category-id': giscus.categoryId,
    'data-mapping': 'specific',
    'data-term': term,
    'data-strict': '1',
    'data-reactions-enabled': '1',
    'data-emit-metadata': '0',
    'data-input-position': 'top',
    'data-theme': theme.value,
    'data-lang': locale.value,
    'data-loading': 'lazy',
    'crossorigin': 'anonymous',
  };

  const script = document.createElement('script');
  script.async = true;

  for (const [name, value] of Object.entries(attributes))
    script.setAttribute(name, value);

  element.append(script);
}

const { stop } = useIntersectionObserver(container, ([entry]) => {
  if (!entry?.isIntersecting || !container.value)
    return;

  stop();
  loadGiscus(container.value);
}, { rootMargin: '400px' });

watch(theme, (value) => {
  container.value
    ?.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
    ?.contentWindow
    ?.postMessage({
      giscus: {
        setConfig: { theme: value },
      },
    }, GISCUS_ORIGIN);
});
</script>
