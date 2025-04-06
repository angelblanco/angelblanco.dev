# Base Code Conventions

## General Guidelines
- Use **Nuxt's default configuration** whenever possible to keep the project simple and maintainable.
- Prefer building **simple Vue components** instead of installing external libraries unless absolutely necessary.
- Follow **TypeScript** best practices for type safety and maintainability.
- Use **Tailwind CSS v4** for styling and avoid inline styles unless dynamic styling is required.


## Folder Structure
- Place reusable components in the `packages/ui/components` folder.
- The components in `package/ui/components` are preloaded without import with the preffix `Ui`. For example `UiButton` corresponds to `package/ui/components/Button.vue`.
- Keep shared configurations in the `packages/tsconfig` and `packages/tailwind` folders.

## Vue Component Guidelines
- Use the `<script setup lang="ts">` syntax for simplicity and better performance.
- Always use **Typescript** if you want to create composables or auxiliary files.
- Keep components small and focused on a single responsibility.
- Use Tailwind's utility-first classes for styling.
- Define shared styles in the `packages/tailwind/index.css` using tailwind V.4 conventions. Do not recommend any tailwind v3 or earlier config as this repo is on v4.

