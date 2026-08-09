import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ResearchConstellation from '../../../../src/frameworks/react/components/graph/ResearchConstellation';

describe('ResearchConstellation', () => {
  it('describes the initially selected research node', () => {
    render(<ResearchConstellation />);
    expect(
      screen.getAllByText(
        'Software that optimizes human work across development, design, and production pipelines.'
      )[0]
    ).toBeInTheDocument();
  });

  it('updates the explanation when a visitor selects a node', async () => {
    const user = userEvent.setup();
    render(<ResearchConstellation />);
    await user.click(screen.getByRole('button', { name: /Graph & metrics visualization:/ }));
    expect(
      screen.getAllByText(
        '2D/3D views of modules, assets, storyboards, and the relationships between them.'
      )[0]
    ).toBeInTheDocument();
  });

  it('exposes a relevant destination for linked nodes', async () => {
    const user = userEvent.setup();
    render(<ResearchConstellation />);
    await user.click(screen.getByRole('button', { name: /Visual Graph Programming:/ }));
    expect(screen.getByRole('link', { name: /Explore this thread/ })).toHaveAttribute(
      'href',
      '/content/projects'
    );
  });
});
