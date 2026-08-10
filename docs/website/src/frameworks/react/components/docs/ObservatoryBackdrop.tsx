import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../../../hooks/useReducedMotion';
import { currentPalette, observeTheme } from './theme';

export interface ObservatoryBackdropProps {
  /** Particles per megapixel of viewport — the density knob for quality tiers. */
  density?: number;
  /** Below this distance (px) two particles are joined by a constellation line. */
  linkDistance?: number;
  /** Clamp for `devicePixelRatio`; 2 is enough for a decorative field. */
  maxDpr?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: 0 | 1;
}

interface Ember {
  x: number;
  y: number;
  vy: number;
  vx: number;
  r: number;
  life: number;
  maxLife: number;
}

/**
 * Ambient Helios network field for the docs homepage: drifting luminous nodes
 * joined by constellation lines, teal dataflow pulses, and soft falling solar
 * embers (PMF-inspired motion, Hyperion palette).
 *
 * Decorative only (`aria-hidden`, `pointer-events: none`). Honours
 * prefers-reduced-motion, pauses while the tab is hidden, clamps DPR, and
 * scales particle count with viewport area.
 */
export function ObservatoryBackdrop({
  density = 26,
  linkDistance = 132,
  maxDpr = 2,
}: ObservatoryBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let context: CanvasRenderingContext2D | null = null;
    try {
      context = canvas.getContext('2d');
    } catch {
      // jsdom and other non-browser hosts do not implement canvas.
      return;
    }
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let clock = 0;
    let particles: Particle[] = [];
    let embers: Ember[] = [];

    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    function spawn(count: number): Particle[] {
      return Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.7,
        hue: (Math.random() < 0.62 ? 0 : 1) as 0 | 1,
      }));
    }

    function spawnEmbers(count: number): Ember[] {
      return Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: 0.28 + Math.random() * 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.5,
        life: Math.random(),
        maxLife: 0.55 + Math.random() * 0.45,
      }));
    }

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((width * height) / 1_000_000 * density * 4);
      particles = spawn(Math.max(28, Math.min(150, count)));
      embers = spawnEmbers(Math.max(10, Math.min(32, Math.round(count * 0.2))));
    }

    function draw() {
      const ctx = context!;
      const palette = currentPalette();
      const hues = [palette.accent, palette.accentAlt] as const;
      ctx.clearRect(0, 0, width, height);

      const buckets: Array<Path2D | null> = [null, null, null];
      const pulses = new Path2D();
      let hasPulse = false;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          if (Math.abs(dx) > linkDistance || Math.abs(dy) > linkDistance) continue;
          const distance = Math.hypot(dx, dy);
          if (distance > linkDistance) continue;
          const closeness = 1 - distance / linkDistance;
          const bucket = closeness > 0.66 ? 2 : closeness > 0.33 ? 1 : 0;
          const path = buckets[bucket] ?? (buckets[bucket] = new Path2D());
          path.moveTo(p.x, p.y);
          path.lineTo(q.x, q.y);

          if (closeness > 0.72) {
            const phase = (((clock * 0.00035 + (i * 7 + j * 13) * 0.017) % 1) + 1) % 1;
            const px = p.x + (q.x - p.x) * phase;
            const py = p.y + (q.y - p.y) * phase;
            pulses.moveTo(px + 1.3, py);
            pulses.arc(px, py, 1.3, 0, Math.PI * 2);
            hasPulse = true;
          }
        }
      }

      ctx.lineWidth = 1;
      buckets.forEach((path, index) => {
        if (!path) return;
        ctx.strokeStyle = `rgba(${palette.edge}, ${(0.05 + index * 0.04) * palette.intensity})`;
        ctx.stroke(path);
      });

      if (hasPulse) {
        ctx.fillStyle = `rgba(${palette.accentAlt}, ${0.42 * palette.intensity})`;
        ctx.fill(pulses);
      }

      for (let hue = 0; hue < 2; hue += 1) {
        const path = new Path2D();
        let drew = false;
        for (const p of particles) {
          if (p.hue !== hue) continue;
          path.moveTo(p.x + p.r, p.y);
          path.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          drew = true;
        }
        if (!drew) continue;
        ctx.fillStyle = `rgba(${hues[hue]}, ${0.5 * palette.intensity})`;
        ctx.fill(path);
      }

      for (const e of embers) {
        const alpha = (1 - e.life) * 0.32 * palette.intensity;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${palette.accent}, ${alpha})`;
        ctx.fill();
      }
    }

    function step(now: number) {
      frame = requestAnimationFrame(step);
      if (now - clock < 32) return;
      clock = now;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      for (const e of embers) {
        e.y += e.vy;
        e.x += e.vx + Math.sin(clock * 0.001 + e.y * 0.01) * 0.12;
        e.life += 0.004;
        if (e.y > height + 12 || e.life > e.maxLife) {
          e.y = -8;
          e.x = Math.random() * width;
          e.life = 0;
          e.vy = 0.28 + Math.random() * 0.5;
        }
      }

      draw();
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
      if (reducedMotion) draw();
      else draw();
    }

    resize();
    draw();
    start();

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    const unobserveTheme = observeTheme(draw);

    return () => {
      stop();
      unobserveTheme();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density, linkDistance, maxDpr, reducedMotion]);

  return (
    <div className="hy-backdrop" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default ObservatoryBackdrop;
