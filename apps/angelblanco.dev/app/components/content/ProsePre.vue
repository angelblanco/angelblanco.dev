<template>
  <div data-code-block class="relative mb-4 overflow-hidden rounded border border-base-content/10 bg-base-100 text-base-content">
    <div
      v-if="filename"
      class="flex h-12 items-center gap-2 border-b border-base-content/10 bg-base-200 p-2 pr-12 text-base-content/80"
    >
      <Icon v-if="languageIcon" :name="languageIcon" class="size-5 flex-none" />
      <span class="truncate text-sm font-medium tracking-wider">{{ filename }}</span>
    </div>

    <div class="relative">
      <span
        v-if="!filename && language"
        aria-hidden="true"
        class="pointer-events-none absolute top-2 right-12 p-2 font-mono text-sm text-base-content/70"
      >
        {{ language }}
      </span>
      <pre :class="cls" class="m-0! rounded-none! bg-base-100 p-6! leading-5.5!"><slot /></pre>
    </div>

    <button
      v-if="isCopyable"
      type="button"
      data-testid="code-copy"
      data-code-copy
      class="btn absolute top-2 right-2 btn-square border border-base-content/10 btn-sm"
      :class="{
        'btn-success': copiedState === 'success',
        'btn-error': copiedState === 'error',
      }"
      :data-state="copiedState"
      :aria-label="t('codeCopy')"
      @click="doCopy"
    >
      <Icon
        :name="copiedState === 'success' ? 'tabler:copy-check' : 'tabler:copy'"
        class="size-5"
        aria-hidden="true"
      />
    </button>
    <span class="sr-only" role="status" aria-live="polite">{{ statusMessage }}</span>
  </div>
</template>

<script setup lang="ts">
interface CodeBlockProps {
  code?: string;
  language?: string | null;
  filename?: string | null;
  highlights?: number[];
  meta?: string | null;
  class?: string | null;
}

const props = defineProps<CodeBlockProps>();
const { t } = useI18n();

const cls = computed(() => props.class ?? '');
const copyText = computed(() => stripCodeNotations(props.code ?? ''));

const isCopyable = computed(() => !!copyText.value.trim());
const copiedState = ref<'idle' | 'success' | 'error'>('idle');

const statusMessage = computed(() => {
  if (copiedState.value === 'success')
    return t('codeCopied');
  if (copiedState.value === 'error')
    return t('codeCopyFailed');
  return '';
});

const { start: resetLater } = useTimeoutFn(() => (copiedState.value = 'idle'), 2000, { immediate: false });

async function doCopy() {
  try {
    await navigator.clipboard.writeText(copyText.value);
    copiedState.value = 'success';
  }
  catch {
    copiedState.value = 'error';
  }
  resetLater();
}

const LANGUAGE_ICONS: Partial<Record<string, string>> = {
  vue: 'vscode-icons:file-type-vue',
  typescript: 'vscode-icons:file-type-typescript',
  ts: 'vscode-icons:file-type-typescript',
  javascript: 'vscode-icons:file-type-js',
  js: 'vscode-icons:file-type-js',
  php: 'vscode-icons:file-type-php',
  bash: 'vscode-icons:file-type-shell',
  sh: 'vscode-icons:file-type-shell',
  shell: 'vscode-icons:file-type-shell',
  json: 'vscode-icons:file-type-json',
  yaml: 'vscode-icons:file-type-yaml',
  css: 'vscode-icons:file-type-css',
  html: 'vscode-icons:file-type-html',
  md: 'vscode-icons:file-type-markdown',
};

const languageIcon = computed(() => props.language
  ? LANGUAGE_ICONS[props.language] ?? null
  : null);
</script>

<style scoped>
[data-code-block] {
  --code-add: #40a02b;
  --code-remove: #d20f39;
  --code-highlight: #7287fd;
  --code-warning: #df8e1d;
}

:root[data-theme='dark'] [data-code-block] {
  --code-add: #a6e3a1;
  --code-remove: #f38ba8;
  --code-highlight: #b4befe;
  --code-warning: #f9e2af;
}

@media (hover: hover) and (pointer: fine) {
  [data-code-copy] {
    opacity: 0;
    transition-property: opacity, background-color, border-color, color;
  }

  [data-code-block]:hover [data-code-copy],
  [data-code-block]:focus-within [data-code-copy],
  [data-code-copy]:focus-visible,
  [data-code-copy]:not([data-state='idle']) {
    opacity: 1;
  }
}

pre :deep(code) {
  display: block;
  width: max-content;
  min-width: 100%;
}

pre :deep(.line) {
  position: relative;
  display: block;
  margin-inline: -1.5rem;
  padding-inline: 1.5rem;
}

pre :deep(.line.highlight),
pre :deep(.line.highlighted) {
  background-color: color-mix(in oklab, var(--code-highlight) 14%, transparent);
  box-shadow: inset 3px 0 var(--code-highlight);
}

pre :deep(.line.highlighted.error) {
  background-color: color-mix(in oklab, var(--code-remove) 14%, transparent);
  box-shadow: inset 3px 0 var(--code-remove);
}

pre :deep(.line.highlighted.warning) {
  background-color: color-mix(in oklab, var(--code-warning) 16%, transparent);
  box-shadow: inset 3px 0 var(--code-warning);
}

pre :deep(.line.diff) {
  display: block;
  width: auto;
  overflow: visible;
  container-type: normal;
  user-select: text;
}

pre :deep(.line.diff.add) {
  background-color: color-mix(in oklab, var(--code-add) 14%, transparent);
}

pre :deep(.line.diff.remove) {
  background-color: color-mix(in oklab, var(--code-remove) 14%, transparent);
}

pre :deep(.line.diff.remove > span) {
  opacity: 0.7;
}

pre :deep(.line.diff::before) {
  position: absolute;
  left: 0.5rem;
  font-weight: 600;
}

pre :deep(.line.diff.add::before) {
  content: '+';
  color: var(--code-add);
}

pre :deep(.line.diff.remove::before) {
  content: '-';
  color: var(--code-remove);
}

pre.has-focused :deep(.line:not(.focused)) {
  opacity: 0.45;
  filter: blur(0.6px);
  transition:
    opacity 0.3s,
    filter 0.3s;
}

pre.has-focused:hover :deep(.line:not(.focused)) {
  opacity: 1;
  filter: none;
}
</style>
