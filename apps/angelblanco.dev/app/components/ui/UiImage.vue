<template>
  <NuxtImg
    :src="src"
    :width="width"
    :height="height"
    :style="{ backgroundImage: `url('${placeholder}')` }"
    class="bg-cover bg-center bg-no-repeat"
  />
</template>

<script lang="ts" setup>
const { src, width, height } = defineProps<{
  src: string;
  width: number;
  height: number;
}>();

const placeholder = useImage()(src, {
  width: 16,
  height: Math.round(16 * height / width),
  quality: 40,
  blur: 1,
});
</script>
