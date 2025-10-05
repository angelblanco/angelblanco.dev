<template>
  <div class="max-w-ui mx-auto mb-10">
    <div class="p-4">
      <p class="max-w-ui mx-auto  font-semibold text-3xl md:text-4xl lg:text-5xl tracking-tighter mb-4 flex flex-wrap gap-4">
        {{ $t('aboutTechStackTitle') }}
      </p>
      <div class="flex flex-wrap text-xs gap-2 lg:gap-4 mb-4 lg:mb-8">
        <button
          v-for="type in types" :key="type"
          class="font-mono cursor-pointer font-medium tracking-wide py-1 px-3 rounded-full transition"
          :class="selectedType === type ? 'bg-primary text-primary-content' : 'bg-neutral text-neutral-content'"
          @click="selectType(type)"
        >
          #{{ type }}
        </button>
      </div>

      <div class="flex flex-wrap gap-4 items-center text-base-content/85">
        <div
          v-for="(entry, index) in entries" :key="entry.title" class="border border-base-300 px-4 py-2 lg:py-4 transition hover:border-primary hover:drop-shadow hover:drop-shadow-primary hover:opacity-100 hover:blur-none bg-base-100/90 group
cursor-pointer" :class="selectedType && selectedType !== entry.type ? 'opacity-45 blur-xs' : ''"
          @click="selectType(entry.type)"
        >
          <div class="flex gap-4 items-center">
            <Icon
              class="transition size-6 lg:size-8 flex-none"
              :class="(index % 2) === 0 ? 'group-hover:rotate-15' : 'group-hover:-rotate-15'" :name="entry.icon"
              :title="entry.title"
            />
            <div>
              <div class="font-medium lg:text-lg">
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
