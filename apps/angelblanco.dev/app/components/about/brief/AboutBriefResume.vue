<template>
  <div class="my-6 p-4 lg:my-32">
    <p class="mx-auto mb-4 flex max-w-ui flex-wrap gap-4 text-3xl font-semibold text-pretty md:text-4xl">
      {{ $t('aboutResumeTitle') }}
    </p>

    <div class="mx-auto grid max-w-ui grid-cols-1 gap-8 leading-relaxed text-pretty md:grid-cols-5">
      <div class="md:col-span-3">
        <div class="space-y-3 md-bold-styled">
          <p v-for="(paragraph, i) in paragraphs" :key="i">
            <template v-for="(part, j) in paragraph" :key="j">
              <strong v-if="part.bold" :class="`strong-child-${part.strongIndex % 3 + 1}`">{{ part.text }}</strong>
              <template v-else>
                {{ part.text }}
              </template>
            </template>
          </p>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-4">
          <a :href="githubSocial.url" class="btn btn-neutral">{{ githubSocial.name }}</a>
          <a :href="linkedinSocial.url" class="btn btn-neutral">{{ linkedinSocial.name }}</a>
        </div>
      </div>
      <div class="order-first flex flex-col items-center md:order-last md:col-span-2">
        <div class="border-8 border-base-200 bg-base-200 shadow-2xl">
          <NuxtImg
            src="/ablanco_2025_profile.webp"
            alt="Ángel Blanco"
            :width="384"
            :height="384"
            sizes="336px md:384px"
            densities="x1 x2"
            placeholder
            class="w-full max-w-84 md:max-w-full"
          />
          <div class="p-2 text-center text-sm text-base-content/80">
            {{ $t('aboutCaption') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getSocialByName } = useSocials();
const { t } = useI18n();

const githubSocial = getSocialByName(SocialName.GitHub);
const linkedinSocial = getSocialByName(SocialName.LinkedIn);

function calculateExperience() {
  return new Date().getFullYear() - 2016;
}

const hospitalityYears = ref(calculateExperience());

const paragraphs = computed(() => {
  let strongIndex = 0;

  return boldParagraphs(t('aboutResumeMd')).map(paragraph => paragraph.map(part => ({
    ...part,
    strongIndex: part.bold
      ? strongIndex++
      : -1,
  })));
});

onMounted(() => {
  hospitalityYears.value = calculateExperience();
});
</script>
