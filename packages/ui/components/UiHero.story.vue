<template>
  <Story title="UiHero">
    <Variant title="Default">
      <UiHero
        title="Welcome to Our Platform"
        description="This is a description of our platform."
        callToAction="Get Started"
      />
    </Variant>
    <Variant title="Custom Call to Action">
      <UiHero
        title="Welcome to Our Platform"
        description="This is a description of our platform."
        callToAction="Sign Up"
      />
    </Variant>
    <Variant title="Different Description">
      <UiHero
        title="Welcome to Our Platform"
        description="Explore our platform and see what it can do for you."
        callToAction="Get Started"
      />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import UiHero from './UiHero.vue';
</script>
