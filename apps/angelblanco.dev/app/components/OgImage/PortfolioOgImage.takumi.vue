<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <section class="og" :data-len="titleSize" :data-layout="layout" :style="styles.root">
    <span class="stars" />
    <span class="grid-mask" :style="styles.grid">
      <span class="grid-fade" :style="styles.gridFade">
        <img class="grid-plane" :src="gridImage" alt="">
      </span>
    </span>

    <header class="brand" :style="styles.brand">
      <span class="dot" :style="styles.dot" />
      <span class="name">
        <span class="wordmark">angelblanco.dev</span>
        <span v-if="section" class="section" data-testid="og-section">/{{ section }}</span>
      </span>
    </header>

    <main class="copy" :style="styles.copy">
      <h1 class="title" data-testid="og-title" :style="styles.title">
        {{ title }}
      </h1>
      <p v-if="description" class="desc" data-testid="og-description" :style="styles.desc">
        {{ description }}
      </p>
      <span v-if="ctaLabel" class="cta" data-testid="og-cta" :style="styles.cta">
        {{ ctaLabel }}
        <svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 18l6-6M13 6l6 6" /></svg>
      </span>
    </main>

    <figure class="photo" :style="styles.photo">
      <img class="photo-img" :src="photo" alt="Ángel Blanco" data-testid="og-photo">
    </figure>
  </section>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import photo from '~/assets/images/ablanco.webp?inline';

type TitleSize = 's' | 'm' | 'l' | 'xl' | 'xxl';
type Layout = 'wide' | 'square';

const props = defineProps<{
  title: string;
  description?: string;
  cta?: string;
  section?: string;
  square?: boolean;
}>();

const titleSizes: Record<Layout, Record<TitleSize, number>> = {
  wide: { s: 92, m: 66, l: 56, xl: 48, xxl: 42 },
  square: { s: 88, m: 62, l: 54, xl: 50, xxl: 46 },
};

const titleSize = computed<TitleSize>(() => {
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

const layout = computed<Layout>(() => props.square ? 'square' : 'wide');

const gridSizes: Record<Layout, { width: number; height: number }> = {
  wide: { width: 840, height: 276 },
  square: { width: 640, height: 432 },
};

const gridImage = computed(() => perspectiveGridDataUri(gridSizes[layout.value]));

const ctaLabel = computed(() => props.cta?.replace(/\s*→\s*$/, '') ?? '');

const styles = computed<Record<string, CSSProperties>>(() => {
  const title = { fontSize: `${titleSizes[layout.value][titleSize.value]}px` };

  if (props.square) {
    return {
      root: {
        flexDirection: 'column-reverse',
        padding: '48px 56px',
        backgroundImage: [
          'radial-gradient(70% 50% at 80% 22%, rgba(140, 37, 120, 0.55), transparent 70%)',
          'radial-gradient(60% 50% at 0% 0%, rgba(68, 40, 130, 0.45), transparent 70%)',
          'linear-gradient(180deg, #030712 0%, #0d0a24 100%)',
        ].join(', '),
      },
      grid: {
        top: '0px',
        left: '-20%',
        width: '640px',
        height: '432px',
        maskImage: 'linear-gradient(to left, transparent 0%, #000 30%)',
      },
      gridFade: { maskImage: 'linear-gradient(to top, transparent 0%, #000 8%, transparent 70%)' },
      brand: {
        top: '52px',
        left: '56px',
        gap: '12px',
        fontSize: '22px',
      },
      dot: { width: '12px', height: '12px' },
      photo: { width: '336px', height: '336px', alignSelf: 'flex-end' },
      copy: { marginTop: '28px', gap: '18px' },
      title,
      desc: { fontSize: '26px' },
      cta: { padding: '13px 26px', fontSize: '24px' },
    };
  }

  return {
    root: {
      flexDirection: 'row',
      padding: '52px 56px 52px 64px',
      backgroundImage: [
        'radial-gradient(55% 85% at 85% 45%, rgba(140, 37, 120, 0.5), transparent 70%)',
        'radial-gradient(50% 60% at 0% 0%, rgba(68, 40, 130, 0.4), transparent 70%)',
        'linear-gradient(180deg, #030712 0%, #0d0a24 100%)',
      ].join(', '),
    },
    grid: {
      bottom: '0px',
      left: '40%',
      width: '840px',
      height: '276px',
      maskImage: 'linear-gradient(to right, transparent 0%, #000 35%)',
    },
    gridFade: { maskImage: 'linear-gradient(to top, #000 0%, transparent 85%)' },
    brand: {
      top: '52px',
      left: '64px',
      gap: '14px',
      fontSize: '28px',
    },
    dot: { width: '14px', height: '14px' },
    photo: { width: '440px', height: '100%', marginLeft: '48px' },
    copy: { gap: '22px' },
    title,
    desc: { fontSize: '27px' },
    cta: { marginTop: '4px', padding: '15px 30px', fontSize: '26px' },
  };
});
</script>

<style>
.og {
  position: relative;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  color: #f8fafc;
  font-family: 'Geist Variable', sans-serif;
  background-color: #030712;
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background-image:
    radial-gradient(circle 1.4px at 12% 22%, #fff, transparent),
    radial-gradient(circle 1px at 30% 9%, #fff, transparent),
    radial-gradient(circle 1.2px at 46% 18%, #fff, transparent),
    radial-gradient(circle 1px at 54% 5%, #fff, transparent),
    radial-gradient(circle 1.4px at 3% 62%, #fff, transparent),
    radial-gradient(circle 1px at 22% 4%, #fff, transparent),
    radial-gradient(circle 1.2px at 51% 46%, #fff, transparent),
    radial-gradient(circle 1px at 63% 12%, #fff, transparent), radial-gradient(circle 1px at 97% 8%, #fff, transparent),
    radial-gradient(circle 1.2px at 98% 72%, #fff, transparent);
}

.grid-mask {
  position: absolute;
  display: flex;
}

.grid-fade {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.grid-plane {
  width: 100%;
  height: 100%;
}

.brand {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  font-family: 'Geist Mono SemiBold', 'Geist Mono', monospace;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.dot {
  border-radius: 50%;
  background-color: #00d5be;
  box-shadow:
    0 0 0 4px rgba(0, 213, 190, 0.2),
    0 0 18px #00d5be;
}

.name {
  display: flex;
}

.arrow {
  width: 1em;
  height: 1em;
}

.wordmark {
  color: transparent;
  background-image: linear-gradient(90deg, #00d5be, #c27aff 55%, #f6339a);
  background-clip: text;
}

.section {
  color: #cbd2e1;
}

.copy {
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-end;
  min-width: 0;
}

.title {
  margin: 0;
  padding-bottom: 0.06em;
  font-weight: 900;
  line-height: 1.06;
  letter-spacing: -0.035em;
  text-wrap: balance;
  text-shadow: 0 2px 24px rgba(3, 7, 18, 0.8);
  line-clamp: 3;
}

.desc {
  margin: 0;
  color: #cbd2e1;
  font-weight: 500;
  line-height: 1.38;
  text-wrap: pretty;
  line-clamp: 2;
}

.cta {
  display: flex;
  align-self: flex-start;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  color: #030712;
  font-weight: 800;
  letter-spacing: -0.01em;
  background-image: linear-gradient(90deg, #f6339a, #c27aff);
  box-shadow:
    inset 0 0 0 2px rgba(255, 255, 255, 0.18),
    0 10px 40px -6px rgba(246, 51, 154, 0.75);
}

.photo {
  z-index: 2;
  display: flex;
  flex-shrink: 0;
  margin: 0;
  padding: 4px;
  border-radius: 36px;
  background-image: linear-gradient(160deg, #00d5be, #c27aff 50%, #f6339a);
  box-shadow:
    0 0 40px rgba(246, 51, 154, 0.55),
    0 0 90px rgba(194, 122, 255, 0.45),
    -20px 20px 120px rgba(0, 213, 190, 0.25);
  transform: rotate(2deg);
}

.photo-img {
  width: 100%;
  height: 100%;
  border-radius: 32px;
  object-fit: cover;
  object-position: 50% 18%;
}
</style>
