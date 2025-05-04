<template>
  <svg aria-hidden="true" :class="svgClass">
    <defs>
      <pattern id="grid-pattern" :width="width" :height="height" patternUnits="userSpaceOnUse" :x="x" :y="y">
        <path :d="patternPath" fill="none" :stroke-dasharray="strokeDasharray" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" stroke-width="0" fill="url(#grid-pattern)" />
    <svg v-if="squares" :x="x" :y="y" class="overflow-visible">
      <rect
        v-for="[sqX, sqY] in squares" :key="`${sqX}-${sqY}`" stroke-width="0" :width="width - 1"
        :height="height - 1" :x="sqX * width + 1" :y="sqY * height + 1"
      />
    </svg>
  </svg>
</template>

<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { computed, defineProps } from 'vue';

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: [number, number][];
  strokeDasharray?: string;
  className?: string;
}

const props = defineProps<GridPatternProps>();

const {
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = '0',
  squares,
  className,
} = props;

const patternPath = computed(() => `M.5 ${height}V.5H${width}`);
const svgClass = computed(() =>
  cn(
    'pointer-events-none absolute inset-0 h-full w-full fill-base-300 stroke-base-300',
    className,
  ),
);
</script>
