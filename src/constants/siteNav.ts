/**
 * Corporate site navigation for Hyperion Corporation.
 * Product org IA — not a personal portfolio sidebar clone.
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

/** Primary chrome (top nav) — keep dense labels short. */
export const PRIMARY_NAV: SiteNavItem[] = [
  { href: '/', label: 'Home', slug: 'home', icon: Home },
  { href: '/content/about', label: 'About', slug: 'about', icon: Building2 },
  { href: '/content/products', label: 'Products', slug: 'products', icon: Package },
  { href: '/content/projects', label: 'Projects', slug: 'projects', icon: FolderKanban },
  { href: '/content/reports', label: 'Research', slug: 'reports', icon: FileText, shortLabel: 'Research' },
  { href: '/content/posts', label: 'News', slug: 'posts', icon: Newspaper },
  { href: '/content/faq', label: 'FAQ', slug: 'faq', icon: HelpCircle },
  { href: '/content/contact', label: 'Contact', slug: 'contact', icon: Mail },
];

/**
 * Extra destinations linked from footer / in-page.
 * Careers is intentionally omitted until a real opening exists.
 */
export const SECONDARY_NAV: SiteNavItem[] = [
  { href: '/content/press', label: 'Press kit', slug: 'press', icon: Megaphone },
];

export function sectionFromPath(path: string | null): string {
  if (!path || path === '/') return 'home';
  const match = path.match(/^\/(?:content\/)?([a-z-]+)/);
  return match?.[1] ?? 'home';
}
