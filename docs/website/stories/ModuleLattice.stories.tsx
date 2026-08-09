import type { Meta, StoryObj } from '@storybook/react-vite';
import ModuleLattice from '../src/frameworks/react/components/docs/ModuleLattice';

const meta = {
    title: 'Docs dashboard/ModuleLattice',
    component: ModuleLattice,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'The docs-site hero model: an icosahedral module lattice inside a satellite shell, drawn ' +
                    'with plain 2D canvas maths instead of a WebGL renderer so a documentation route pays no ' +
                    'three.js download. Drag to rotate; the controls pause and reset it, rotation stops while ' +
                    'the tab is hidden, and reduced motion renders a single static (still draggable) frame.',
            },
        },
    },
    argTypes: {
        height: { control: { type: 'range', min: 200, max: 600, step: 20 }, description: 'Canvas height in CSS pixels.' },
        spin: {
            control: { type: 'range', min: 0, max: 0.02, step: 0.0005 },
            description: 'Auto-rotation speed in radians per frame.',
        },
        maxDpr: { control: { type: 'range', min: 1, max: 3, step: 0.5 }, description: 'Device pixel ratio clamp.' },
    },
} satisfies Meta<typeof ModuleLattice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { height: 400 },
};

export const Still: Story = {
    args: { height: 400, spin: 0 },
};
