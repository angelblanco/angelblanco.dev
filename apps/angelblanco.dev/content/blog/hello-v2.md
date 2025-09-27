---
title: "From Svelte to Nuxt: Rebuilding My Portfolio in 2025"
date: '2025-09-27'
tags: ['nuxt', 'vue', 'svelte', 'turborepo', 'tailwindcss', 'daisyui']
post_id: 1
toc: true
share_tweet: "I've rebuilt my portfolio, moving from Svelte to a modern Nuxt, Tailwind CSS, and Turborepo stack. Here's a deep dive into the why and how."
---

It's 2025, and I've just rolled out a complete rebuild of my personal website. I've migrated from a [Svelte Kit](https://svelte.dev/) stack to a modern setup featuring [Nuxt](https://nuxt.com/), [Tailwind CSS](https://tailwindcss.com/), and a [Turborepo](https://turbo.build/repo). This wasn't just a cosmetic update; it was a total overhaul, driven by five years of evolution in the frontend landscape and a desire to align my personal projects with my daily professional workflow.

## The 2020 Decision: Why Svelte?

Back in 2020, when I built the first version of this site, the Vue ecosystem was in a state of massive flux. Vue 3 was in beta, and it was released right after I had finished my website. The first two years of Vue 3 were painful, and Nuxt 3 didn't have full support until November 2022. The migration path from Vue 2 was uncertain, and frankly, the future felt a bit shaky.

At that time, Svelte and its companion framework, Sapper, offered a compelling alternative. It was fast, simple, and provided a stable, forward-thinking developer experience. It was the right choice for its time.

## The Tipping Point: Ecosystem vs. DIY

Fast forward five years, and the tables have turned dramatically. While Svelte is still a fantastic framework, the Nuxt ecosystem has blossomed into a powerhouse.

With my old Sapper site, I had to build many features from scratch: SEO meta-tag generation, content management for the blog, and image optimization. While I learned a lot, maintaining that custom code became a chore. Furthermore, the migration from Sapper to SvelteKit proved to be a significant undertaking that I simply didn't have the spare time to manage.

Nuxt, on the other hand, offers a rich ecosystem of modules that handle these concerns out of the box:

- **[@nuxt/content](https://content.nuxt.com/):** For effortless, file-based content management.
- **[@nuxt/seo](https://nuxt.com/modules/seo):** For robust SEO and metadata handling, with sensible defaults that work out of the box.
- **[@nuxt/image](https://image.nuxt.com/):** For best-in-class image optimization.
- **[@nuxt/icons](https://icons.nuxt.com/):** For using any icon set you want in an optimized way.

This mature tooling allows me to focus on what matters most: creating content.

## Aligning with My Daily Workflow

The frontend side of my day job is centered around Vue 3 with composition API and TypeScript alongside Tailwind. It makes perfect sense for my personal platform to be built with the same technologies I use and love professionally. Working with Nuxt feels natural, simple (once you get its philosophy), and incredibly powerful.

## A Quick Look at the New Stack

- **[Nuxt](https://nuxt.com/):** The core of the application, providing a streamlined and powerful Vue-based framework.
- **[Tailwind CSS](https://tailwindcss.com/):** For utility-first styling.
- **[DaisyUI](https://daisyui.com/):** As a component library to define the light/dark theme of the application.
- **[Turborepo](https://turbo.build/repo):** To manage the monorepo structure, which keeps the main app, shared configurations, and internal tools organized.

### From Bulma to Tailwind CSS & DaisyUI

In the previous version of my site, I used [Bulma](https://bulma.io/), and it's a truly great CSS library. However, my day-to-day workflow is deeply rooted in Tailwind CSS. Pivoting between the template and a separate CSS file now feels like double the work, as you rarely reuse classes in a `.vue` or `.svelte` component.

Because I use Tailwind every single day, I've started to "think" in Tailwind when it comes to styling. The utility-first approach has become second nature, and once you think that way, it's hard to go back. For this rebuild, I've paired it with [DaisyUI](https://daisyui.com/), which offers the best of both worlds. It allows me to opt-in for pre-styled components when I don't want to over-complicate things, but it also gives me the freedom to opt-out and go fully custom without sacrificing any of Tailwind's benefits. Plus, it comes with a fantastic theme system designed specifically for Tailwind.

## The Role of AI in Development

This rebuild was also an opportunity to experiment with the latest generation of AI coding assistants. I've tried (too many) tools like the [**Gemini CLI**](https://ai.google.dev/docs/gemini_cli_quickstart), [**Aider**](https://github.com/paul-gauthier/aider), and [**GitHub Copilot**](https://github.com/features/copilot) throughout the process. Some days, they felt like superpowers, and others, they felt like a flu. If I stick to my goal of writing more, I'll tell you more about each of them soon.

## What's Next?

I'm excited to start writing more, share some ideas I've been thinking about for a long time, and maybe even start contributing to an open-source project.

Thanks for reading,

See you around!
