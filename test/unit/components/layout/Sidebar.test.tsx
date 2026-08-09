import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '@/src/frameworks/react/components/layout/Sidebar';

// Mock next/image since Sidebar uses import profilePic
vi.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

// Mock asset import
vi.mock('@/assets/icons/Hyperion-mark.png', () => ({
    default: {
        src: '/mock-image.jpg',
        height: 128,
        width: 128,
    },
}));

describe('Sidebar', () => {
    const defaultProps = {
        activeSection: 'home',
        darkMode: false,
        toggleTheme: vi.fn(),
        isCollapsed: false,
        toggleCollapse: vi.fn(),
    };

    it('renders navigation items', () => {
        render(<Sidebar {...defaultProps} />);
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('renders profile info when not collapsed', () => {
        render(<Sidebar {...defaultProps} />);
        expect(screen.getByText('Creative systems software')).toBeInTheDocument();
    });

    it('hides profile info when collapsed', () => {
        render(<Sidebar {...defaultProps} isCollapsed={true} />);
        expect(screen.queryByText('Creative systems software')).not.toBeInTheDocument();
    });

    it('calls toggleCollapse when button is clicked', () => {
        render(<Sidebar {...defaultProps} />);
        const button = screen.getByLabelText('Collapse Sidebar');
        fireEvent.click(button);
        expect(defaultProps.toggleCollapse).toHaveBeenCalled();
    });
});
