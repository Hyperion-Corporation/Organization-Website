import type { Meta, StoryObj } from '@storybook/react-vite';
import RoadmapTimeline from '../src/frameworks/react/components/docs/RoadmapTimeline';
import { ROADMAP_PHASES } from '../src/constants/roadmapPhases';

const meta = {
    title: 'Docs dashboard/RoadmapTimeline',
    component: RoadmapTimeline,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'The R0–R8 phase gates as a vertical timeline. Phases reveal on scroll via ' +
                    'IntersectionObserver; the reveal is only armed once that observer is attached, so the ' +
                    'list is readable without JavaScript and under prefers-reduced-motion.',
            },
        },
    },
    argTypes: {
        phases: { control: false, description: 'Phase list (see src/constants/roadmapPhases.ts).' },
        resolveHref: { control: false, description: 'Maps a site-relative `to` onto a real href.' },
    },
} satisfies Meta<typeof RoadmapTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** One phase per status, to check the chip and marker treatments side by side. */
export const StatusVariants: Story = {
    args: {
        phases: [
            ROADMAP_PHASES.find((phase) => phase.status === 'done')!,
            ROADMAP_PHASES.find((phase) => phase.status === 'active')!,
            ROADMAP_PHASES.find((phase) => phase.status === 'planned')!,
        ],
    },
};
