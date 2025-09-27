---
title: "From Svelte to Nuxt: Rebuilding My Portfolio in 2025"
date: '2025-09-27'
tags: ['nuxt', 'vue', 'svelte', 'turborepo', 'tailwindcss', 'daisyui']
post_id: 1
toc: true
share_tweet: "I've rebuilt my portfolio, moving from Svelte to a modern Nuxt, Tailwind CSS, and Turborepo stack. Here's a deep dive into the why and how."
---

It's 2025, and I've just rolled out a complete rebuild of my personal website. I've migrated from a [Svelte](https://svelte.dev/)/Sapper stack to a modern setup featuring [Nuxt](https://nuxt.com/), [Tailwind CSS](https://tailwindcss.com/), and a [Turborepo](https://turbo.build/repo). This wasn't just a cosmetic update; it was a strategic decision driven by five years of evolution in the frontend landscape and a desire to align my personal projects with my daily professional workflow.

## The 2020 Decision: Why Svelte?

Back in 2020, when I built the first version of this site, the Vue ecosystem was in a state of massive flux. Vue 3 had just been released, but the tooling was immature, and Nuxt wasn't yet ready for it. The migration path from Vue 2 was uncertain, and frankly, the future felt a bit shaky.

At that time, Svelte and its companion framework, Sapper, offered a compelling alternative. It was fast, simple, and provided a stable, forward-thinking developer experience. It was the right choice for its time.

## The Tipping Point: Ecosystem vs. DIY

Fast forward five years, and the tables have turned dramatically. While Svelte is still a fantastic framework, the Nuxt ecosystem has blossomed into a powerhouse. This was the primary driver for my migration.

With my old Sapper site, I had to build many features from scratch: SEO meta-tag generation, content management for the blog, and image optimization. While I learned a lot, maintaining that custom code became a chore. Furthermore, the migration from Sapper to SvelteKit proved to be a significant undertaking that I simply didn't have the spare time to manage.

Nuxt, on the other hand, offers a rich ecosystem of modules that handle these concerns out of the box:

- **[@nuxt/content](https://content.nuxt.com/):** For effortless, file-based content management.
- **[@nuxt/seo](https://nuxt.com/modules/seo):** For robust SEO and metadata handling.
- **[@nuxt/image](https://image.nuxt.com/):** For best-in-class image optimization.

This mature tooling allows me to focus on what matters most: creating content, not reinventing the wheel.

## Aligning with My Daily Workflow

My day job is centered around Vue 3, TypeScript, and the Composition API. It makes perfect sense for my personal platform to be built with the same technologies I use and love professionally. Working with Nuxt feels natural, simple, and incredibly powerful, allowing me to leverage my existing expertise.

## A Quick Look at the New Stack

- **[Nuxt](https://nuxt.com/):** The core of the application, providing a streamlined and powerful Vue-based framework.
- **[Tailwind CSS](https://tailwindcss.com/):** For utility-first styling, enabling rapid and consistent UI development.
- **[Turborepo](https://turbo.build/repo):** To manage the monorepo structure, which keeps the main app, shared configurations, and internal tools organized.

### From Bulma to Tailwind CSS & DaisyUI

In the previous version of my site, I used [Bulma](https://bulma.io/), and it's a truly great CSS library. However, my day-to-day workflow is deeply rooted in Tailwind CSS. I've found that using a predefined set of utilities from a framework I don't use daily was restricting my creativity.

Because I use Tailwind every single day, I've started to "think" in Tailwind when it comes to styling. The live-reload capabilities and the utility-first approach have become second nature. For this rebuild, I've paired it with [DaisyUI](https://daisyui.com/), which offers the best of both worlds. It allows me to opt-in for pre-styled components when I'm feeling lazy but lets me opt-out and go fully custom without sacrificing any of Tailwind's benefits. Plus, it comes with a fantastic theme system designed specifically for Tailwind.

## The Role of AI in Development

This rebuild was also an opportunity to experiment with the latest generation of AI coding assistants. I tried tools like the [**Gemini CLI**](https://ai.google.dev/docs/gemini_cli_quickstart), [**Aider**](https://github.com/paul-gauthier/aider), and [**GitHub Copilot**](https://github.com/features/copilot) throughout the process. Some days, they felt like superpowers, and others, they felt like a flu, but I plan to dive deeper into that experience in future posts.

## What's Next?

This new site is a foundation. I'm excited to start writing more, sharing what I learn, and continuing to explore the incredible tools available to developers today. Stay tuned.