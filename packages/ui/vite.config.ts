import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  test: {
    reporters: ['verbose'],
    include: ['tests/**/*.test.ts'],
    globals: true,
    environment: 'jsdom',
  },
  server: {
    // Allow importing from root directory
    fs: {
      allow: ['../../'],
    },
  },
})
