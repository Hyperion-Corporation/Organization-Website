import type { Meta, StoryObj } from '@storybook/react-vite';
import DocsHero from '../src/frameworks/react/components/docs/DocsHero';
import ModuleLattice from '../src/frameworks/react/components/docs/ModuleLattice';

const meta = {
    title: 'Docs dashboard/DocsHero',
    component: DocsHero,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Editorial hero for the documentation dashboard: kicker, headline with a gradient accent ' +
                    'clause, summary, actions, headline metrics, and a slot for the live visual.',
            },
        },
    },
    argTypes: {
        kicker: { control: 'text', description: 'Small uppercase label above the headline.' },
        badge: { control: 'text', description: 'Optional pill with a status pulse.' },
        title: { control: 'text', description: 'Plain leading half of the headline.' },
        titleAccent: { control: 'text', description: 'Trailing half, rendered in the brand gradient.' },
        summary: { control: false, description: 'Body copy; accepts rich nodes.' },
        actions: { control: false, description: 'Primary/secondary call-to-action links.' },
        metrics: { control: false, description: 'Headline numbers rendered as a definition list.' },
        stage: { control: false, description: 'The framed live visual on the right.' },
        stageLabel: { control: 'text', description: 'Eyebrow shown inside the stage frame.' },
    },
} satisfies Meta<typeof DocsHero>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
    badge: 'Documentation dashboard',
    kicker: 'Hyperion Corporation',
    title: 'The system behind',
    titleAccent: 'the surface.',
    summary:
        'Architecture, decision records, roadmaps, generated API reference, and a live component library for the organization site.',
    actions: [
        { label: 'Read the architecture', href: '#', variant: 'primary' as const },
        { label: 'Open Storybook', href: '#' },
    ],
    metrics: [
        { label: 'Workstreams', value: '9 roadmaps' },
        { label: 'Phase gates', value: 'R0 → R8' },
        { label: 'Delivery', value: 'Static export' },
    ],
};

export const Default: Story = {
    args: {
        ...baseArgs,
        stageLabel: 'Live · module lattice',
        stage: <ModuleLattice height={360} />,
    },
};

/** Copy-only variant — the stage is a slot, so the hero works without a canvas. */
export const WithoutStage: Story = {
    args: baseArgs,
};
