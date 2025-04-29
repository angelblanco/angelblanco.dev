<template>
  <div class="text-center">
    <p
      class="max-w-ui overflow-hidden mx-auto text-4xl font-bold tracking-wide p-8 flex flex-col lg:flex-row flex-wrap items-center gap-4
justify-center"
    >
      {{ $t('HomeTech.engineerManager') }} <Icon name="heroicons:arrow-path" class="size-12 animate-spin-slow text-base-content" /> {{ $t('HomeTech.fullStackDeveloper') }}
    </p>
  </div>

  <div class="max-w-ui mx-auto text-pretty leading-relaxed">
    <p class="mb-8">
      {{ $t('HomeTech.paragraph1Start') }}<span class="font-extrabold gradient-text-alt2">{{ $t('HomeTech.web') }}</span>{{ $t('HomeTech.paragraph1Middle') }}<span class="font-bold gradient-text-alt">{{ $t('HomeTech.teamLeadership') }}</span>{{ $t('HomeTech.paragraph1End') }}<span class="font-extrabold gradient-text">{{ $t('HomeTech.bigData') }}</span>{{ $t('HomeTech.paragraph1End2') }}
    </p>

    <p>
      {{ $t('HomeTech.paragraph2') }}
    </p>
  </div>

  <div class="max-w-ui mx-auto p-10 lg:p-20 mb-10 text-base-content/85">
    <div class="flex flex-wrap justify-center items-center text-xs gap-4 mb-4">
      <button
        v-for="type in types" :key="type"
        class="font-mono cursor-pointer font-medium tracking-wide py-1 px-3 rounded-full transition"
        :class="selectedType === type ? 'bg-primary text-primary-content' : 'bg-neutral text-neutral-content'"
        @click="selectType(type)"
      >
        #{{ type }}
      </button>
    </div>

    <div class="flex flex-wrap gap-4 justify-center items-center">
      <div
        v-for="(entry, index) in entries"
        :key="entry.title"
        class="border border-base-300 p-4 transition hover:border-primary hover:drop-shadow hover:drop-shadow-primary bg-base-100/90 group
cursor-pointer"
        :class="selectedType && selectedType !== entry.type ? 'opacity-45' : ''"
        @click="selectType(entry.type)"
      >
        <div class="flex gap-4 items-center">
          <Icon
            class="transition size-8 flex-none"
            :class="(index % 2) === 0 ? 'group-hover:rotate-15' : 'group-hover:-rotate-15'"
            :name="entry.icon"
            :title="entry.title"
          />
          <div>
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
const { technologies: entries, types } = useTechList();

const selectedType = ref<TechType | null>(null);

function calculateExperience() {
  return new Date().getFullYear() - 2016;
}

const hospitalityYears = ref(calculateExperience());

onMounted(() => {
  hospitalityYears.value = calculateExperience();
});

function selectType(type: TechType) {
  if (selectedType.value === type) {
    selectedType.value = null;
  }
  else {
    selectedType.value = type;
  }
}
</script>
