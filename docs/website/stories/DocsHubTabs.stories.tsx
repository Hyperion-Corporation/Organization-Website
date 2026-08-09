import type { Meta, StoryObj } from '@storybook/react-vite';
import DocsHubTabs from '../src/frameworks/react/components/docs/DocsHubTabs';
import { DOCS_HUB_TABS } from '../src/constants/docsHub';

const meta = {
    title: 'Docs dashboard/DocsHubTabs',
    component: DocsHubTabs,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Tabbed documentation hub following the WAI-ARIA tabs pattern with manual activation: ' +
                    'arrow keys move focus along the strip, Enter/Space (or a click) activates the panel.',
            },
        },
    },
    argTypes: {
        tabs: { control: false, description: 'Panel content model (see src/constants/docsHub.ts).' },
        resolveHref: { control: false, description: 'Maps a site-relative `to` onto a real href.' },
        initialTabId: {
            control: 'select',
            options: DOCS_HUB_TABS.map((tab) => tab.id),
            description: 'Tab selected on first render.',
        },
    },
} satisfies Meta<typeof DocsHubTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EvidencePanel: Story = {
    args: { initialTabId: 'evidence' },
};
