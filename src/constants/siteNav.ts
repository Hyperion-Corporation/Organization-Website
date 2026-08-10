/**
 * Primary site navigation — product org IA (not personal-portfolio sidebar).
 * Single source for Header (desktop + mobile) and Footer link columns.
 */
import type { LucideIcon } from 'lucide-react';
import {
  Home,
  User,
  Code,
  FileText,
  Wrench,
  PenTool,
  Tv,
  Folder,
} from 'lucide-react';

export interface SiteNavItem {
  href: string;
  label: string;
  slug: string;
  icon: LucideIcon;
  /** Short label for dense chrome */
  shortLabel?: string;
}

export const PRIMARY_NAV: SiteNavItem[] = [
  { href: '/', label: 'Home', slug: 'home', icon: Home },
  { href: '/content/about', label: 'About', slug: 'about', icon: User },
  { href: '/content/projects', label: 'Projects', slug: 'projects', icon: Code },
  { href: '/content/reports', label: 'Reports', slug: 'reports', icon: FileText },
  { href: '/content/tools', label: 'Tools', slug: 'tools', icon: Wrench },
  { href: '/content/posts', label: 'Updates', slug: 'posts', icon: PenTool, shortLabel: 'News' },
  { href: '/content/media', label: 'Media', slug: 'media', icon: Tv },
  { href: '/content/other', label: 'Other', slug: 'other', icon: Folder },
];

export function sectionFromPath(path: string | null): string {
  if (!path || path === '/') return 'home';
  const match = path.match(/^\/(?:content\/)?([a-z-]+)/);
  return match?.[1] ?? 'home';
}
