// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://q-anvo.github.io',
  outDir: 'dist',
  base: '/',
  publicDir: 'ressources',
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['test.anvo.online'],
    },
  },
});
