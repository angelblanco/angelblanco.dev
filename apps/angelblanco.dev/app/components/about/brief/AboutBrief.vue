<template>
  <div class="relative w-full overflow-hidden">
    <AboutBriefBackground
      :squares="aboutBriefSquares"
      :class-name="aboutBriefBackgroundClass"
    />

    <div class="relative z-1">
      <AboutBriefResume />
    </div>
  </div>
</template>

<script setup lang="ts">
import { aboutBriefBackgroundClass, aboutBriefSquares } from './aboutBrief';
</script>
