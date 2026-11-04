<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <section class="og" :data-len="titleSize">
    <span class="stars" />
    <span class="grid" />

    <header class="brand">
      <span class="dot" />
      <span class="name">
        <span class="wordmark">angelblanco.dev</span>
        <span v-if="section" class="section" data-testid="og-section">/{{ section }}</span>
      </span>
    </header>

    <main class="copy">
      <h1 class="title" data-testid="og-title">
        {{ title }}
      </h1>
      <p v-if="description" class="desc" data-testid="og-description">
        {{ description }}
      </p>
      <span v-if="ctaLabel" class="cta" data-testid="og-cta">
        {{ ctaLabel }}<span class="arrow">→</span>
      </span>
    </main>

    <figure class="photo">
      <img :src="photo" alt="Ángel Blanco" data-testid="og-photo">
    </figure>
  </section>
</template>

<script setup lang="ts">
import { geistMono600, interVariable } from '@angelblanco/fonts/og';
import photo from '~/assets/images/ablanco.webp?inline';
import styles from './PortfolioOgImage.css?raw';

const props = defineProps<{
  title: string;
  description?: string;
  cta?: string;
  section?: string;
}>();

const titleSize = computed(() => {
  const length = props.title.length;
  if (length <= 22)
    return 's';
  if (length <= 40)
    return 'm';
  if (length <= 56)
    return 'l';
  if (length <= 68)
    return 'xl';
  return 'xxl';
});

const ctaLabel = computed(() => props.cta?.replace(/\s*→\s*$/, '') ?? '');

useHead({
  style: [
    {
      key: 'portfolio-og-image',
      innerHTML: `
@font-face { font-family: 'OG Inter'; font-weight: 100 900; src: url('${interVariable}') format('woff2'); }
@font-face { font-family: 'OG Geist Mono'; font-weight: 600; src: url('${geistMono600}') format('woff2'); }
${styles}`,
    },
  ],
});
</script>
