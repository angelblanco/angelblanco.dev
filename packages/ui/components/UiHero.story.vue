<template>
  <Story title="UiHero">
    <Variant title="Single button">
      <UiHero
        title="Single button"
        description="This is a description of our platform."
      >
        <template #callToAction>
          <button class="btn btn-primary">
            Get Started
          </button>
        </template>
      </UiHero>
    </Variant>
    <Variant title="Multi button">
      <UiHero
        title="Welcome to Our Platform"
        description="This is a description of our platform."
        call-to-action="Sign Up"
      >
        <template #callToAction>
          <button class="btn">
            Btn 1
          </button>
          <button class="btn btn-primary">
            Btn 2
          </button>
          <button class="btn btn-error">
            Btn 3
          </button>
        </template>
      </UiHero>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import UiHero from './UiHero.vue';
</script>
