/** @type {import('next').NextConfig} */
// Next.js surface for the docs website (React analogue of PMF stack/nuxt).
// The primary product is Docusaurus; this config supports multi-framework
// experiments and optional Next-based tooling under the same package.

// GitHub Pages sub-path. Production builds use this; local `next dev` omits
// it so http://localhost:3000/ works. Override with NEXT_PUBLIC_BASE_PATH.
const REPO_BASE = '/Organization-Website/docs-site';
const fromEnv = process.env.NEXT_PUBLIC_BASE_PATH;
const basePath =
  fromEnv !== undefined
    ? fromEnv
    : process.env.NODE_ENV === 'development'
      ? ''
      : REPO_BASE;

const nextConfig = {
  basePath,
  output: 'export',
  // This package has its own lockfile nested under the repo root's, which
  // makes Next.js guess the wrong monorepo root for output file tracing.
  outputFileTracingRoot: __dirname + '/../..',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  typescript: {
    // Keep tsconfig.json (Docusaurus/Storybook's "typecheck" target) free of
    // Pages-Router-only options that Next.js otherwise auto-injects into it.
    tsconfigPath: 'tsconfig.next.json',
  },
};

module.exports = nextConfig;
