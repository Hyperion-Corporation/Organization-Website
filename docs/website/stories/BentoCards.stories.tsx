import type { Meta, StoryObj } from '@storybook/react-vite';
import BentoCards from '../src/frameworks/react/components/docs/BentoCards';
import { HOME_NAV_CARDS } from '../src/constants/navCards';

const meta = {
    title: 'Docs dashboard/BentoCards',
    component: BentoCards,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Bento grid of the documentation surfaces. Each card tracks the pointer and exposes it as ' +
                    '`--hy-mx`/`--hy-my` for the CSS spotlight; the highlight also appears on :focus-visible, ' +
                    'and the cards are ordinary links regardless.',
            },
        },
    },
    argTypes: {
        cards: { control: false, description: 'Card model (see src/constants/navCards.ts).' },
        resolveHref: { control: false, description: 'Maps a site-relative `to` onto a real href.' },
    },
} satisfies Meta<typeof BentoCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleCard: Story = {
    args: { cards: HOME_NAV_CARDS.slice(0, 1) },
};
