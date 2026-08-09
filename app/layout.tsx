import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayoutWrapper from './ClientLayoutWrapper';
import nextConfig from '../next.config.js';

const inter = Inter({ subsets: ['latin'] });

const basePath = nextConfig.basePath || '';

export const metadata: Metadata = {
  metadataBase: new URL('https://hyperion-corporation.github.io/Organization-Website'),
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
    url: '/',
    siteName: 'Hyperion Corporation',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
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
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icon-192.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
