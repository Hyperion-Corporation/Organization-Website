import { defineConfig } from 'astro/config';

// Astro sources live under src/frameworks/astro (pages/, components/, *.astro).
// Output is a static island consumed by the Next host via iframe.
export default defineConfig({
  srcDir: './src/frameworks/astro',
  outDir: './public/astro-island',
  publicDir: './astro-public',
  // Match Next basePath: empty in local dev, /Organization-Website in production builds.
  base: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/astro-island`.replace(/\/{2,}/g, '/') || '/astro-island',
  vite: {
    css: {
      postcss: {},
    },
  },
});
