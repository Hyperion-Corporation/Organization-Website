import React from 'react';
import { render } from '@testing-library/react';
import ClientLayoutWrapper from '@/app/ClientLayoutWrapper';

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
  it('marks the Products nav item active when the pathname is /content/products', () => {
    currentPathname = '/content/products';

    const { container } = render(
      <ClientLayoutWrapper>
        <div>Products Page</div>
      </ClientLayoutWrapper>
    );

    const productsLink = container.querySelector('nav.forge-nav a[href="/content/products"]');
    expect(productsLink).toHaveClass('is-active');
    expect(productsLink).toHaveAttribute('aria-current', 'page');
  });

  it('does not mark Products active at the root path', () => {
    currentPathname = '/';

    const { container } = render(
      <ClientLayoutWrapper>
        <div>Home Page</div>
      </ClientLayoutWrapper>
    );

    const productsLink = container.querySelector('nav.forge-nav a[href="/content/products"]');
    expect(productsLink).not.toHaveClass('is-active');

    const reportsLink = container.querySelector('nav.forge-nav a[href="/content/reports"]');
    expect(reportsLink).not.toHaveClass('is-active');
  });
});
