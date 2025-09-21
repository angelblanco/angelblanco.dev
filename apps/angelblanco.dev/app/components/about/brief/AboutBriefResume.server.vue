<template>
  <div class="p-4 my-32">
    <p class="max-w-ui mx-auto text-4xl lg:text-5xl tracking-tighter mb-8 flex flex-wrap gap-4">
      {{ $t('aboutResumeTitle') }}
    </p>

    <div class="max-w-ui mx-auto text-pretty gap-8 leading-relaxed grid md:grid-cols-5 grid-cols-1">
      <div class="md:col-span-3">
        <MDC :value="mdResume" class="md-bold-styled md:col-span-3 space-y-3" />

        <div class="grid grid-cols-2 gap-4 mt-4">
          <a :href="githubSocial.url" class="btn">{{ githubSocial.name }}</a>
          <a :href="linkedinSocial.url" class="btn">{{ linkedinSocial.name }}</a>
        </div>
      </div>
      <div class="md:col-span-2 order-first md:order-last flex flex-col items-center">
        <div class="shadow-2xl border-8 bg-base-200 border-base-200">
          <img src="/ablanco_2025_profile.webp" alt="Ángel Blanco" class="w-full max-w-84 md:max-w-full">
          <div class="text-center p-2 text-base-content/80 text-sm">
            {{ $t('aboutCaption') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ locale: string }>(); // Locale is not used but forces the reload of server

const { getSocialByName } = useSocials();
const { t } = useI18n();

const githubSocial = getSocialByName(SocialName.GitHub);
const linkedinSocial = getSocialByName(SocialName.LinkedIn);

function calculateExperience() {
  return new Date().getFullYear() - 2016;
}

const hospitalityYears = ref(calculateExperience());

const mdResume = computed(() => t('aboutResumeMd'));

onMounted(() => {
  hospitalityYears.value = calculateExperience();
});
</script>
