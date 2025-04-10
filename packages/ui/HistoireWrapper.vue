<script lang="ts" setup>
import { Story, Variant } from "histoire";
import { useStorage } from "@vueuse/core";
import { computed, watchEffect, ref } from "vue";

const props = defineProps<{
  story: Story;
  variant?: Variant;
}>();

const hasWrapper = computed(() => {
  return (
    props.story.meta?.wrapper !== false &&
    props.variant?.meta?.wrapper !== false
  );
});

const availableThemes = ref(["wireframe", "black"]);

const theme = useStorage<string>("histoire:theme", availableThemes[0]);

watchEffect(() => {
  if (!availableThemes.value.includes(theme.value)) {
    theme.value = availableThemes.value[0];
  }
});
</script>

<template>
  <div class="space-y-2" :data-theme="theme" data-patata="trtt">
    <div v-if="hasWrapper" class="p-4 flex justify-end">
      <select class="select" v-model="theme">
        <option v-for="option in availableThemes" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
