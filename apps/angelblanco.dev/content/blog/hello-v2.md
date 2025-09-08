---
title: 'Rebuilding my dev portfolio in 2025'
date: '2025-10-01'
tags: ['nuxt', 'vue', 'svelte']
post_id: 1
---

On 2020, the day after Vue 3 was realeased, I started coding my first webpage with Svelte and Sapper (now renamed as Svelte Kit). The following years and months were a total madness in Vue ecosystem: many existing repos went legacy, the migration from Vue 2 to Vue 3 was a bing pain, and I wasn't really sure if the framework was going to survive or not. At that time, it made sense to go on and try Svelte.

But 5 years are gone, and now the Vue 3 ecosystem is **amazing**, composition API, Typescript and tooling are robust and AI is about to take all developer jobs in the planet. So after the first release of [angelblanco.dev](https://angelblanco.dev) it's time to rebuild my own page from scratch.

## Rebuliding goals

Building my web again, means a technical-rebuild and a brain-rebuild. It's almost like a brain game.

- Include a dark mode.
- Evalaute different AI tools without worrying about time comsumption, quality of output, privacy, etc.
- Experiment with monrepos, and the [turborepo tool](https://turborepo.com/).
- Find cool frontend libraries and trends.
- Learn VIM motions and get a fully functional [Neovim](https://neovim.io/) setup.

```js [file.js]{2} meta-info=val
const hello = {};

const b = 2 + 3;

function wow() {
  const wow = 2;
}
```

```vue
<template>
  <div>
    Hello
  </div>
</template>

<script lang="ts" setup>
const a = 123;

function hello() {
  // hello comment
  console.log('hello');
}

hello(); // EOF
</script>
```

## Choices

### Pnpm over Yarn or Npm

I choose `pnpm` over `yarn` mainly to try a different package manager. I don't really fell any remarkable advantage of one over another for most scenarios.

During development, when CI wasn't done I experimented a couple of inconsistencies when working with two different computers, even when I have a lock file. Similar problems had happened to me using `yarn` over the years, so it's not a big call!

### Tailwind and DaisyUI over Bulma CSS or others

Tailwind 4 is brand new, and DaisyUI already supports it. The decission was a no-brainer. Once it's setup the experience is great, however, good luck with LLMs trying to assist you on the migration to Tailwind 4.

- DaisyUI adds the theming and let me opt-in to certain components.
- I want to have full control of the UI of my page and create custom variations without forcing myself to use premade CSS or think about other people variables.
- I also want to have the choice to opt-in for certain pre-made utilities that will do the trick in most scenarios like buttons, swaps, etc.

Back in 2020, I choose Bulma CSS, an awesome CSS framework, but right now styling without TailwindCSS makes me slower at coding, reducing the amount of time given to my creative process.

### Why not Svelte Kit?

I really like Svelte, it's fast, it's simple and many of the ideas of the framework where then merged into Vue and viceversa. However the amount of already made plugins for nuxt and the ease of development (once you have everything installed and configured) cannot be easily achieved.

One clear example about this is [Nuxt Content](https://content.nuxt.com/), with Svelte, to achieve a similar thing you will probably need to code this logic into your server by your own. I learned a lot doing that on the first version, however i don't relly want to mantain that on my spare time, because that will stop me from actually writing posts in the blog.

### Why Nuxt?

I mainly code with [Vue](https://vuejs.org/), [Typescript](https://www.typescriptlang.org/) and [Laravel](https://laravel.com/) at my job. Altough I've tested Nuxt several times, I've never completed a whole project. It's time to learn.

## Did AI help in the creation of this page?

Yes, of course! But it also stole a lot of time. I love [Aider](https://aider.chat/) and have spent quite sometime trying to make it work in my own development process. However, I set up the pilars for developing onto this project myself.

## What's next?

I'm planning to document
