'use client';

import { useEffect, useMemo, useState } from 'react';
import { Pause, Play, RotateCcw, Activity } from 'lucide-react';
import { createSimulationController } from '../../../../simulations/context/createSimulationController';
import { getSimulationScenario, SIMULATION_SCENARIOS } from '../../../../simulations/scenarios/scenarios';
import type { SimulationSnapshot } from '../../../../simulations/repository/types';
import { useReducedMotion } from '../../../../hooks/useReducedMotion';
import { useAppDispatch } from '../../../../libraries/redux/store/hooks';
import { setActiveSimulation } from '../../../../libraries/redux/actions/appActions';

/**
 * Metrics board — dual-column instrument layout (dials + chart).
 * Not the personal-site full-width dark simulation-panel slab.
 */
export default function ConvergenceSimulation() {
  const [scenarioId, setScenarioId] = useState('balanced');
  const dispatch = useAppDispatch();
  const controller = useMemo(
    () => createSimulationController(getSimulationScenario(scenarioId)),
    [scenarioId]
  );
  const [snapshot, setSnapshot] = useState<SimulationSnapshot>(controller.initial);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    dispatch(setActiveSimulation(scenarioId));
  }, [dispatch, scenarioId]);

  useEffect(() => setSnapshot(controller.initial), [controller]);

  useEffect(() => {
    if (snapshot.status !== 'running') return;
    const timer = window.setInterval(
      () => setSnapshot((value) => controller.advance(value)),
      reducedMotion ? 300 : 120
    );
    return () => window.clearInterval(timer);
  }, [controller, reducedMotion, snapshot.status]);

  const visible = snapshot.points.slice(0, snapshot.cursor + 1);
  const current = visible[visible.length - 1];
  const chartWidth = 640;
  const chartHeight = 220;
  const max = Math.max(...snapshot.points.map((point) => point.incumbent));
  const min = Math.min(...snapshot.points.map((point) => point.lowerBound));
  const gapPct = (((current.incumbent - current.lowerBound) / current.incumbent) * 100).toFixed(1);

  const toPath = (key: 'incumbent' | 'lowerBound') =>
    visible
      .map((point, index) => {
        const x = (point.iteration / (snapshot.points.length - 1)) * chartWidth;
        const y = chartHeight - ((point[key] - min) / (max - min)) * chartHeight;
        return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

  const runLabel =
    snapshot.status === 'running' ? 'Pause' : snapshot.status === 'complete' ? 'Replay' : 'Run';

  return (
    <section className="forge-metrics" aria-labelledby="simulation-title">
      <div className="forge-metrics__intro">
        <p className="forge-kicker">
          <Activity size={14} className="inline" aria-hidden /> Live metrics board
        </p>
        <h2 id="simulation-title" className="forge-metrics__title">
          Watch the gap close.
        </h2>
        <p className="forge-metrics__lede">
          Deterministic demo of incumbent quality versus a lower bound—instrument chrome for how
          tooling can surface progress on hard structure problems, not a research notebook chart.
        </p>
      </div>

      <div className="forge-metrics__board">
        <div className="forge-metrics__dials" aria-live="polite">
          <div className="forge-metrics__dial">
            <span className="forge-metrics__dial-label">Iteration</span>
            <strong className="forge-metrics__dial-value">
              {current.iteration + 1}
              <span>/{snapshot.points.length}</span>
            </strong>
          </div>
          <div className="forge-metrics__dial forge-metrics__dial--gold">
            <span className="forge-metrics__dial-label">Incumbent</span>
            <strong className="forge-metrics__dial-value">{current.incumbent}</strong>
          </div>
          <div className="forge-metrics__dial forge-metrics__dial--teal">
            <span className="forge-metrics__dial-label">Lower bound</span>
            <strong className="forge-metrics__dial-value">{current.lowerBound}</strong>
          </div>
          <div className="forge-metrics__dial forge-metrics__dial--gap">
            <span className="forge-metrics__dial-label">Gap</span>
            <strong className="forge-metrics__dial-value">
              {gapPct}
              <span>%</span>
            </strong>
            <div className="forge-metrics__gap-bar" aria-hidden>
              <i style={{ width: `${Math.min(100, Number(gapPct))}%` }} />
            </div>
          </div>

          <label className="forge-metrics__strategy">
            Search strategy
            <select
              value={scenarioId}
              onChange={(event) => setScenarioId(event.target.value)}
            >
              {SIMULATION_SCENARIOS.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </select>
          </label>

          <div className="forge-metrics__actions">
            <button
              type="button"
              className="forge-metrics__run"
              onClick={() =>
                setSnapshot((value) =>
                  value.status === 'complete'
                    ? { ...controller.reset(), status: 'running' }
                    : { ...value, status: value.status === 'running' ? 'idle' : 'running' }
                )
              }
              aria-label={
                snapshot.status === 'running' ? 'Pause simulation' : 'Run simulation'
              }
            >
              {snapshot.status === 'running' ? <Pause size={16} /> : <Play size={16} />}
              {runLabel}
            </button>
            <button type="button" className="forge-metrics__reset" onClick={() => setSnapshot(controller.reset())}>
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>

        <div className="forge-metrics__chart-wrap">
          <div className="forge-metrics__chart-head">
            <span>Incumbent</span>
            <span className="forge-metrics__swatch forge-metrics__swatch--gold" />
            <span>Lower bound</span>
            <span className="forge-metrics__swatch forge-metrics__swatch--teal" />
          </div>
          <div className="forge-metrics__chart">
            <svg
              viewBox={`-12 -12 ${chartWidth + 24} ${chartHeight + 24}`}
              role="img"
              aria-labelledby="simulation-chart-title"
              aria-describedby="simulation-chart-description"
            >
              <title id="simulation-chart-title">Optimization convergence chart</title>
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <line
                  key={ratio}
                  x1="0"
                  x2={chartWidth}
                  y1={chartHeight * ratio}
                  y2={chartHeight * ratio}
                  className="forge-metrics__grid"
                />
              ))}
              <path d={toPath('lowerBound')} className="forge-metrics__line forge-metrics__line--bound" />
              <path d={toPath('incumbent')} className="forge-metrics__line forge-metrics__line--incumbent" />
            </svg>
            <p id="simulation-chart-description" className="sr-only">
              At iteration {current.iteration}, the incumbent cost is {current.incumbent} and lower
              bound is {current.lowerBound}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
