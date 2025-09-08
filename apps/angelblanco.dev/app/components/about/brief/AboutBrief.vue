<template>
  <div class="relative w-full overflow-hidden">
    <AboutBriefBackground
      :squares="squares"
      class-name="z-0 skew-y-12 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)] "
    />

    <div class="relative z-1">
      <AboutBriefResume />
    </div>
  </div>
</template>

<script setup lang="ts">
const squares: [number, number][] = [
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
</script>
