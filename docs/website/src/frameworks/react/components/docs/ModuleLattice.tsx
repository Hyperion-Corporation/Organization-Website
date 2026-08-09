import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../../../hooks/useReducedMotion';
import { currentPalette, observeTheme } from './theme';

export interface ModuleLatticeProps {
  /** Drawing height in CSS pixels. */
  height?: number;
  /** Auto-rotation speed in radians per frame. */
  spin?: number;
  /** Clamp for `devicePixelRatio`. */
  maxDpr?: number;
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

const PHI = (1 + Math.sqrt(5)) / 2;

/** Icosahedron vertices — the lattice core. */
const CORE: Vec3[] = [
  { x: 0, y: 1, z: PHI },
  { x: 0, y: -1, z: PHI },
  { x: 0, y: 1, z: -PHI },
  { x: 0, y: -1, z: -PHI },
  { x: 1, y: PHI, z: 0 },
  { x: -1, y: PHI, z: 0 },
  { x: 1, y: -PHI, z: 0 },
  { x: -1, y: -PHI, z: 0 },
  { x: PHI, y: 0, z: 1 },
  { x: PHI, y: 0, z: -1 },
  { x: -PHI, y: 0, z: 1 },
  { x: -PHI, y: 0, z: -1 },
];

/** Edges are the vertex pairs at the icosahedron's edge length (exactly 2). */
const EDGES: Array<[number, number]> = (() => {
  const pairs: Array<[number, number]> = [];
  for (let i = 0; i < CORE.length; i += 1) {
    for (let j = i + 1; j < CORE.length; j += 1) {
      const dx = CORE[i].x - CORE[j].x;
      const dy = CORE[i].y - CORE[j].y;
      const dz = CORE[i].z - CORE[j].z;
      if (Math.abs(Math.hypot(dx, dy, dz) - 2) < 0.001) pairs.push([i, j]);
    }
  }
  return pairs;
})();

/** Satellites: a Fibonacci-sphere shell of module nodes around the core. */
const SATELLITES: Vec3[] = Array.from({ length: 46 }, (_, index) => {
  const t = index / 46;
  const inclination = Math.acos(1 - 2 * t);
  const azimuth = Math.PI * (1 + Math.sqrt(5)) * index;
  const r = 3.1;
  return {
    x: r * Math.sin(inclination) * Math.cos(azimuth),
    y: r * Math.sin(inclination) * Math.sin(azimuth),
    z: r * Math.cos(inclination),
  };
});

function rotate(point: Vec3, rx: number, ry: number): Vec3 {
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x1 = point.x * cosY - point.z * sinY;
  const z1 = point.x * sinY + point.z * cosY;
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y2 = point.y * cosX - z1 * sinX;
  const z2 = point.y * sinX + z1 * cosX;
  return { x: x1, y: y2, z: z2 };
}

/**
 * Dependency-free 3D module lattice — the docs-site hero model.
 *
 * The main site's hero uses three.js (src/frameworks/react/components/models/
 * HeroModel.tsx); the docs dashboard renders the same idea with plain 2D canvas
 * maths instead, because a documentation route should not pay a WebGL
 * renderer's download and memory cost just to have a hero visual (see the
 * per-route budgets in docs/moon/ROADMAP.md).
 *
 * Interaction contract: drag to rotate, buttons to pause/reset, auto-rotation
 * stops while the tab is hidden, and `prefers-reduced-motion: reduce` renders a
 * single static frame that is still draggable.
 */
export function ModuleLattice({ height = 400, spin = 0.0028, maxDpr = 2 }: ModuleLatticeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef({ x: 0.42, y: -0.55 });
  const dragRef = useRef<{ id: number; x: number; y: number } | null>(null);
  const pausedRef = useRef(false);
  const renderRef = useRef<() => void>(() => {});
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let width = 0;
    let frame = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    function resize() {
      if (!canvas) return;
      width = canvas.clientWidth || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function project(point: Vec3) {
      const perspective = 9 / (9 - point.z);
      const scale = Math.min(width, height) / 9.2;
      return {
        x: width / 2 + point.x * scale * perspective,
        y: height / 2 + point.y * scale * perspective,
        depth: perspective,
      };
    }

    function render() {
      const ctx = context!;
      const palette = currentPalette();
      const { x: rx, y: ry } = rotationRef.current;
      ctx.clearRect(0, 0, width, height);

      const core = CORE.map((point) => project(rotate(point, rx, ry)));

      // Satellites first so the core lattice reads as the foreground.
      for (const satellite of SATELLITES) {
        const p = project(rotate(satellite, rx, ry));
        const alpha = Math.max(0.06, Math.min(0.6, (p.depth - 0.7) * 0.9));
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4 * p.depth, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${palette.accentAlt}, ${alpha * palette.intensity})`;
        ctx.fill();
      }

      for (const [a, b] of EDGES) {
        const from = core[a];
        const to = core[b];
        const alpha = Math.max(0.08, Math.min(0.55, ((from.depth + to.depth) / 2 - 0.75) * 1.1));
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(${palette.accent}, ${alpha * palette.intensity})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      for (const p of core) {
        const alpha = Math.max(0.25, Math.min(1, (p.depth - 0.65) * 1.4));
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.4 * p.depth, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${palette.accent}, ${alpha})`;
        ctx.shadowColor = `rgba(${palette.accent}, 0.85)`;
        ctx.shadowBlur = 12 * p.depth;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    renderRef.current = render;

    function step() {
      if (!pausedRef.current && !dragRef.current) rotationRef.current.y += spin;
      render();
      frame = requestAnimationFrame(step);
    }

    function start() {
      if (reducedMotion || frame) return;
      frame = requestAnimationFrame(step);
    }

    function stop() {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    function onResize() {
      resize();
      render();
    }

    resize();
    render();
    start();

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    const unobserveTheme = observeTheme(render);

    return () => {
      stop();
      unobserveTheme();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [height, maxDpr, reducedMotion, spin]);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    rotationRef.current.y += (event.clientX - drag.x) * 0.006;
    rotationRef.current.x += (event.clientY - drag.y) * 0.006;
    dragRef.current = { ...drag, x: event.clientX, y: event.clientY };
    // Keep dragging responsive even when the animation loop is stopped.
    renderRef.current();
  }, []);

  const endDrag = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragRef.current?.id !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const reset = useCallback(() => {
    rotationRef.current = { x: 0.42, y: -0.55 };
    renderRef.current();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height, cursor: 'grab', touchAction: 'none' }}
        role="img"
        aria-label="Rotating lattice of connected modules — a decorative model of the Visual Graph Programming module graph"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      />
      <div className="hy-stage__controls">
        <button
          type="button"
          className="hy-icon-button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          aria-label={paused ? 'Resume rotation' : 'Pause rotation'}
        >
          {paused ? '▶' : '❚❚'}
        </button>
        <button type="button" className="hy-icon-button" onClick={reset} aria-label="Reset orientation">
          ⟳
        </button>
      </div>
    </div>
  );
}

export default ModuleLattice;
