<template>
  <div class="mx-auto mb-10 max-w-ui">
    <div class="p-4">
      <p class="mx-auto mb-4  flex max-w-ui flex-wrap gap-4 text-3xl font-semibold tracking-tighter md:text-4xl lg:text-5xl">
        {{ $t('aboutTechStackTitle') }}
      </p>
      <div class="mb-4 flex flex-wrap gap-2 text-xs lg:mb-8 lg:gap-4">
        <button
          v-for="type in types" :key="type"
          class="cursor-pointer rounded-full px-3 py-1 font-mono font-medium tracking-wide transition"
          :class="selectedType === type ? 'bg-primary text-primary-content' : 'bg-neutral text-neutral-content'"
          @click="selectType(type)"
        >
          #{{ type }}
        </button>
      </div>

      <div class="flex flex-wrap items-center gap-4 text-base-content/85">
        <div
          v-for="(entry, index) in entries" :key="entry.title" class="group cursor-pointer border border-base-300 bg-base-100/90 px-4 py-2 transition hover:border-primary hover:opacity-100 hover:blur-none hover:drop-shadow hover:drop-shadow-primary
lg:py-4" :class="selectedType && selectedType !== entry.type ? 'opacity-45 blur-xs' : ''"
          @click="selectType(entry.type)"
        >
          <div class="flex items-center gap-4">
            <Icon
              class="size-6 flex-none transition lg:size-8"
              :class="(index % 2) === 0 ? 'group-hover:rotate-15' : 'group-hover:-rotate-15'" :name="entry.icon"
              :title="entry.title"
            />
            <div>
              <div class="font-medium lg:text-lg">
                {{ entry.title }}
              </div>
              <div class="font-mono text-xs">
                #{{ entry.type }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { technologies: entries, types } = useTechList();

const selectedType = ref<TechType | null>(null);

function selectType(type: TechType) {
  if (selectedType.value === type) {
    selectedType.value = null;
  }
  else {
    selectedType.value = type;
  }
}
</script>
