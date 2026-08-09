import type { Meta, StoryObj } from '@storybook/react-vite';
import KnowledgeGraph from '../src/frameworks/react/components/docs/KnowledgeGraph';
import { DOCS_GRAPH_EDGES, DOCS_GRAPH_NODES } from '../src/constants/docsGraph';

const meta = {
    title: 'Docs dashboard/KnowledgeGraph',
    component: KnowledgeGraph,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Zoomable, pannable SVG map of the documentation corpus. Drag to pan, scroll to zoom, ' +
                    'tab to reach any node, Enter/Space to select. The list below the map is the accessible ' +
                    'equivalent and is always rendered.',
            },
        },
    },
    argTypes: {
        nodes: { control: false, description: 'Graph nodes with hand-authored layout coordinates.' },
        edges: { control: false, description: 'Undirected edges referencing node ids.' },
        resolveHref: { control: false, description: 'Maps a site-relative `to` onto a real href.' },
        initialSelectedId: { control: 'text', description: 'Node selected on first render.' },
        label: { control: 'text', description: 'Accessible name for the SVG map.' },
    },
} satisfies Meta<typeof KnowledgeGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RoadmapSelected: Story = {
    args: { initialSelectedId: 'roadmap' },
};

/** A trimmed graph — the component takes any node/edge set, not just the site's. */
export const Minimal: Story = {
    args: {
        nodes: DOCS_GRAPH_NODES.filter((node) => ['home', 'architecture', 'roadmap', 'guides'].includes(node.id)),
        edges: DOCS_GRAPH_EDGES.filter((edge) => edge.from === 'home'),
    },
};
