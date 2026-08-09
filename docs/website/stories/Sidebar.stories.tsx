import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Sidebar from '../../../src/frameworks/react/components/layout/Sidebar';

// Sidebar imports the Hyperion mark (@/assets/icons/Hyperion-mark.png),
// aliased to a shim in .storybook/main.ts.
const meta = {
    title: 'Layout/Sidebar',
    component: Sidebar,
    tags: ['autodocs'],
    args: {
        toggleTheme: fn(),
        toggleCollapse: fn(),
    },
    argTypes: {
        activeSection: { control: 'text', description: 'Slug of the nav item to highlight (e.g. "reports", "home").' },
        darkMode: { control: 'boolean', description: 'Whether dark mode is active.' },
        isCollapsed: { control: 'boolean', description: 'Icon-only rail vs. full width with labels.' },
        toggleTheme: { description: 'Called when the theme toggle button is clicked.' },
        toggleCollapse: { description: 'Called when the collapse/expand button is clicked.' },
    },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
    args: {
        activeSection: 'reports',
        darkMode: false,
        isCollapsed: false,
    },
};

export const Collapsed: Story = {
    args: { ...Expanded.args, isCollapsed: true },
};

export const Dark: Story = {
    args: { ...Expanded.args, darkMode: true },
};
