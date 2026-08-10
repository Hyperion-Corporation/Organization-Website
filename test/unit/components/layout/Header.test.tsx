import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/src/frameworks/react/components/layout/Header';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('@/assets/icons/Hyperion-mark.png', () => ({
  default: { src: '/mock-image.jpg', height: 36, width: 36 },
}));

describe('Header', () => {
  const mockToggleTheme = vi.fn();

  it('renders brand and primary navigation items', () => {
    render(<Header darkMode={false} toggleTheme={mockToggleTheme} />);
    expect(screen.getByText('Hyperion')).toBeInTheDocument();
    expect(screen.getByText('Corporation')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /products/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /see products/i }).length).toBeGreaterThan(0);
  });

  it('opens the mobile menu and exposes navigation', () => {
    render(<Header darkMode={false} toggleTheme={mockToggleTheme} />);
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByRole('dialog', { name: /site menu/i })).toBeInTheDocument();
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
  });
});
