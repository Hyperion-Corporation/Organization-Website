import React from 'react';
import { render } from '@testing-library/react';
import ClientLayoutWrapper from '@/app/ClientLayoutWrapper';

// Product top-nav: active section should mark the matching header link.
// Query primary nav links (not mobile-only) via aria-current.

let currentPathname = '/';
vi.mock('next/navigation', () => ({
  usePathname: () => currentPathname,
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

vi.mock('@/assets/icons/Hyperion-mark.png', () => ({
  default: { src: '/mock-image.jpg', height: 100, width: 100 },
}));

describe('active section integration', () => {
  it('marks the Reports nav item active when the pathname is /content/reports', () => {
    currentPathname = '/content/reports';

    const { container } = render(
      <ClientLayoutWrapper>
        <div>Reports Page</div>
      </ClientLayoutWrapper>
    );

    const reportsLink = container.querySelector('nav.forge-nav a[href="/content/reports"]');
    expect(reportsLink).toHaveClass('is-active');
    expect(reportsLink).toHaveAttribute('aria-current', 'page');
  });

  it('marks the Home nav item active at the root path', () => {
    currentPathname = '/';

    const { container } = render(
      <ClientLayoutWrapper>
        <div>Home Page</div>
      </ClientLayoutWrapper>
    );

    const homeLink = container.querySelector('nav.forge-nav a[href="/"]');
    expect(homeLink).toHaveClass('is-active');

    const reportsLink = container.querySelector('nav.forge-nav a[href="/content/reports"]');
    expect(reportsLink).not.toHaveClass('is-active');
  });
});
