/**
 * Prefix an app path with NEXT_PUBLIC_BASE_PATH when set (production / GH Pages).
 * Use for plain <a href> and iframe src. Prefer next/link with root-relative
 * paths (`/content/about`) when possible — Link adds basePath automatically.
 */
export function appPath(path: string = '/'): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!path || path === '/') {
    return base || '/';
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
