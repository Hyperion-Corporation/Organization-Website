import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayoutWrapper from './ClientLayoutWrapper';
import nextConfig from '../next.config.js';

const inter = Inter({ subsets: ['latin'] });

const basePath = nextConfig.basePath || '';

/** Production site origin + basePath (no trailing slash). */
const siteOrigin = 'https://hyperion-corporation.github.io';
const siteUrl = `${siteOrigin}${basePath || ''}`;

export const metadata: Metadata = {
  // Absolute URLs for OG/icons resolve against this (must include basePath for GH Pages).
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: 'Hyperion Corporation',
    template: '%s · Hyperion Corporation',
  },
  description:
    'Hyperion Corporation builds software that optimizes the work of developers, artists, and designers for games, simulations, and related computer systems—including Visual Graph Programming.',
  applicationName: 'Hyperion Corporation',
  authors: [{ name: 'Hyperion Corporation', url: 'https://github.com/Hyperion-Corporation' }],
  keywords: [
    'Hyperion Corporation',
    'Visual Graph Programming',
    'game development tools',
    'simulation tools',
    'developer tools',
  ],
  openGraph: {
    title: 'Hyperion Corporation',
    description:
      'Software that optimizes creative and engineering work for games, simulations, and related systems.',
    url: './',
    siteName: 'Hyperion Corporation',
    type: 'website',
    images: [
      {
        url: `${basePath}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Hyperion Corporation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hyperion Corporation',
    description:
      'Software that optimizes creative and engineering work for games, simulations, and related systems.',
    images: [`${basePath}/og-image.jpg`],
  },
  // Always prefix with basePath. Leading-slash paths alone resolve to the
  // domain root and 404 on GitHub Pages project sites / local basePath.
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico` },
      { url: `${basePath}/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { url: `${basePath}/icon-512.png`, sizes: '512x512', type: 'image/png' },
    ],
    apple: `${basePath}/icon-192.png`,
  },
};

/**
 * Minimal layout CSS inlined so a missing/blocked external stylesheet cannot
 * leave the shell as unstyled document flow (sidebar stacked over content).
 * Full design still comes from globals.css + Tailwind.
 */
const criticalShellCss = `
html,body{margin:0;padding:0;}
body{font-family:Inter,system-ui,sans-serif;background:#070b14;color:#e2e8f0;}
.shell-root,.forge-shell{position:relative;z-index:2;display:flex;flex-direction:column;min-height:100vh;}
.shell-main,.forge-shell__main{flex:1;min-width:0;overflow:auto;}
.forge-shell__content{width:100%;max-width:72rem;margin:0 auto;padding:1.25rem 1.25rem 3rem;}
@media (min-width:1024px){
  .forge-shell__content{padding:2rem 2rem 4rem;}
}
.forge-topbar{border-bottom:1px solid rgba(148,163,184,.16);background:rgba(7,11,20,.82);}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <style dangerouslySetInnerHTML={{ __html: criticalShellCss }} />
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
