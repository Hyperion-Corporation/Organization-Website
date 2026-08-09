import React from 'react';
import { render } from '@testing-library/react';
import ClientLayoutWrapper from '@/app/ClientLayoutWrapper';

// Exercises ClientLayoutWrapper's getActiveSection logic together with the
// Sidebar/SidebarItem it feeds: a pathname change should flow through to
// the correct nav item being visually marked active. Query `aside nav a`
// so the brand home link is not confused with the Home nav item.

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
    it('marks the Reports sidebar item active when the pathname is /content/reports', () => {
        currentPathname = '/content/reports';

        const { container } = render(
            <ClientLayoutWrapper>
                <div>Reports Page</div>
            </ClientLayoutWrapper>
        );

        const reportsLink = container.querySelector('aside nav a[href="/content/reports"]');
        expect(reportsLink).toHaveClass('bg-blue-50');
    });

    it('marks the Home sidebar item active at the root path', () => {
        currentPathname = '/';

        const { container } = render(
            <ClientLayoutWrapper>
                <div>Home Page</div>
            </ClientLayoutWrapper>
        );

        const homeLink = container.querySelector('aside nav a[href="/"]');
        expect(homeLink).toHaveClass('bg-blue-50');

        const reportsLink = container.querySelector('aside nav a[href="/content/reports"]');
        expect(reportsLink).not.toHaveClass('bg-blue-50');
    });
});
