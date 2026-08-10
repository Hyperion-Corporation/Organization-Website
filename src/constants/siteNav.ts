/**
 * Corporate site navigation for Hyperion Corporation.
 *
 * Inspired by sparse product navs (HydraDB / Cerebrium): few top-level links,
 * primary CTA separate, secondary destinations in the footer—not a tag wall.
 */
import type { LucideIcon } from 'lucide-react';
import {
  Home,
  Building2,
  Package,
  FolderKanban,
  FileText,
  Newspaper,
  HelpCircle,
  Mail,
  Megaphone,
} from 'lucide-react';

export interface SiteNavItem {
  href: string;
  label: string;
  slug: string;
  icon: LucideIcon;
  shortLabel?: string;
}

/** Sparse primary rail — avoid Neuromantix-style overcrowding. */
export const PRIMARY_NAV: SiteNavItem[] = [
  { href: '/', label: 'Home', slug: 'home', icon: Home },
  { href: '/content/about', label: 'About', slug: 'about', icon: Building2 },
  { href: '/content/products', label: 'Products', slug: 'products', icon: Package },
  { href: '/content/projects', label: 'Projects', slug: 'projects', icon: FolderKanban },
  { href: '/content/reports', label: 'Research', slug: 'reports', icon: FileText },
  { href: '/content/posts', label: 'News', slug: 'posts', icon: Newspaper },
];

/** Footer / secondary only. */
export const SECONDARY_NAV: SiteNavItem[] = [
  { href: '/content/faq', label: 'FAQ', slug: 'faq', icon: HelpCircle },
  { href: '/content/contact', label: 'Contact', slug: 'contact', icon: Mail },
  { href: '/content/press', label: 'Press kit', slug: 'press', icon: Megaphone },
];

/** Header primary CTA (Cerebrium-style action, not another nav link). */
export const NAV_CTA = {
  href: '/content/products',
  label: 'See products',
} as const;

export function sectionFromPath(path: string | null): string {
  if (!path || path === '/') return 'home';
  const match = path.match(/^\/(?:content\/)?([a-z-]+)/);
  return match?.[1] ?? 'home';
}
