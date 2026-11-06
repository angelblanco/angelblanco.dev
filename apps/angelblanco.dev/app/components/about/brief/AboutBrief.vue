<template>
  <div class="relative w-full overflow-hidden">
    <AboutBriefBackground
      :squares="aboutBriefSquares"
      :class-name="aboutBriefBackgroundClass"
    />

    <div class="relative z-1">
      <AboutBriefResume :locale="locale" />
    </div>
  </div>
</template>

<script lang="ts">
export const aboutBriefSquares: [number, number][] = [
  [4, 4],
  [5, 1],
  [8, 2],
  [5, 3],
  [5, 5],
  [10, 10],
  [12, 15],
  [15, 10],
  [10, 15],
  [15, 10],
  [10, 15],
  [15, 10],
];

export const aboutBriefBackgroundClass = 'z-0 skew-y-12 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)] ';
</script>

<script setup lang="ts">
const { locale } = useI18n();
</script>
