<template>
  <div class="max-w-ui mx-auto p-6 mt-16">
    <h1 class="text-8xl text-content tracking-tight text-balance font-black">
      Hello.
    </h1>

    <h2 class="text-4xl tracking-tighter mt-4">
      My name is <a href="#">Ángel Blanco.</a>
    </h2>

    <p>
      <a href="#">Ángel Blanco.</a>
    </p>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'empty',
});
</script>

<style>
 a {
  text-decoration: none;
  white-space: nowrap;
  color: #121314;
  position: relative;
}
a:after {
  content: '';
  position: absolute;
  z-index: -1;
  top: 66%;
  left: -0.1em;
  right: -0.1em;
  bottom: 0;
  transition: top 200ms cubic-bezier(0, 0.8, 0.13, 1);
  background-color: rgba(79, 192, 141, 0.5);
}
a:hover:after {
  top: 0%;
}
</style>
