import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../../../hooks/useReducedMotion';

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

const HUES = ['56, 189, 248', '139, 92, 246'] as const;

/**
 * Ambient "observatory" field: slow-drifting luminous particles joined by
 * constellation lines when they pass close to one another — the docs-site
 * counterpart to the main site's starfield island (UI4).
 *
 * It is decorative only (`aria-hidden`, `pointer-events: none`) and honours
 * the platform's motion and performance policy:
 *
 * - `prefers-reduced-motion: reduce` renders a single static frame and never
 *   starts an animation loop.
 * - The loop stops while the document is hidden, so a background tab costs
 *   nothing.
 * - Device pixel ratio is clamped and the particle count scales with viewport
 *   area rather than being a fixed number tuned for one screen size.
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
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let particles: Particle[] = [];

    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    function spawn(count: number): Particle[] {
      return Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.7,
        hue: (Math.random() < 0.68 ? 0 : 1) as 0 | 1,
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
      particles = spawn(Math.max(28, Math.min(160, count)));
    }

    function draw() {
      const ctx = context!;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${HUES[p.hue]}, 0.5)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distance = Math.hypot(dx, dy);
          if (distance > linkDistance) continue;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${HUES[p.hue]}, ${0.12 * (1 - distance / linkDistance)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    function step() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // Wrap rather than bounce: no visible edge behaviour to notice.
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }
      draw();
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
      if (reducedMotion) draw();
    }

    resize();
    draw();
    start();

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
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
