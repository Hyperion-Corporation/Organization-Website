/** @type {import('next').NextConfig} */

// GitHub Pages project site path. Production builds use this; local `next dev`
// omits it so http://localhost:3000/ works. Override with NEXT_PUBLIC_BASE_PATH.
const REPO_BASE = '/Organization-Website';
const fromEnv = process.env.NEXT_PUBLIC_BASE_PATH;
const basePath =
  fromEnv !== undefined
    ? fromEnv
    : process.env.NODE_ENV === 'development'
      ? ''
      : REPO_BASE;

const nextConfig = {
  basePath,
  // Required for static exports (e.g. GitHub Pages)
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
