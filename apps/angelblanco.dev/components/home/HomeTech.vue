<template>
  <div class="max-w-ui mx-auto p-10 lg:p-20 mb-10 text-base-content/85">
    <div class="flex flex-wrap gap-4 justify-center items-center">
      <div v-for="(entry, index) in entries" :key="entry.title" class="border border-base-300 p-4 hover:border-primary hover:drop-shadow hover:drop-shadow-primary bg-base-100/90 group cursor-pointer" :class="selectedType && selectedType !== entry.type ? 'opacity-45' : ''" @click="selectType(entry)">
        <div class="flex gap-4 items-center">
          <Icon class="transition size-8 flex-none" :class="(index % 2) === 0 ? 'group-hover:rotate-15' : 'group-hover:-rotate-15'" :name="entry.icon" :title="entry.title" />
          <div class="">
            <div class="font-medium text-lg">
              {{ entry.title }}
            </div>
            <div class="text-xs font-mono">
              #{{ entry.type }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { technologies: entries } = useTechList();

const selectedType = ref<TechType | null>(null);

function selectType(entry: TechEntry) {
  if (selectedType.value === entry.type) {
    selectedType.value = null;
  }
  else {
    selectedType.value = entry.type;
  }
}
</script>
