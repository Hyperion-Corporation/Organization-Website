import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ConvergenceSimulation from '../../../../src/frameworks/react/components/routes/ConvergenceSimulation';
import ReduxProvider from '../../../../src/libraries/redux/store/ReduxProvider';

describe('ConvergenceSimulation', () => {
  it('exposes the initial metrics as accessible text', () => {
    render(
      <ReduxProvider>
        <ConvergenceSimulation />
      </ReduxProvider>
    );
    // Iteration is rendered as dial value "1" + "/28" span (instrument layout).
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('/28')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Optimization convergence chart/ })).toHaveAccessibleDescription(
      /iteration 0/
    );
  });

  it('resets the selected scenario to its first iteration', async () => {
    const user = userEvent.setup();
    render(
      <ReduxProvider>
        <ConvergenceSimulation />
      </ReduxProvider>
    );
    await user.selectOptions(screen.getByLabelText('Search strategy'), 'intensified');
    await user.click(screen.getByRole('button', { name: 'Run simulation' }));
    await user.click(screen.getByRole('button', { name: /Reset/ }));
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('/28')).toBeInTheDocument();
  });
});
