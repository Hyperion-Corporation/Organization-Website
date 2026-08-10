'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../../../hooks/useReducedMotion';

export interface NetworkFieldBackdropProps {
  /** Nodes per megapixel of viewport — density knob for quality tiers. */
  density?: number;
  /** Below this distance (px) two nodes are joined by an edge. */
  linkDistance?: number;
  /** Clamp for `devicePixelRatio`. */
  maxDpr?: number;
}

interface FieldNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** 0 = gold, 1 = teal, 2 = cobalt */
  hue: 0 | 1 | 2;
}

interface Ember {
  x: number;
  y: number;
  vy: number;
  vx: number;
  r: number;
  life: number;
  maxLife: number;
  hue: 0 | 1;
}

/**
 * Helios Forge ambient backdrop for the main Organization site.
 *
 * A drifting network field (inspired by VGP's GraphFieldBackdrop) plus soft
 * falling solar embers (inspired by PMF's blossom canvas) — but painted in
 * gold / cobalt / teal so the site never reads as the cyan-violet-pink
 * "observatory" template it was seeded from.
 *
 * Decorative only (`aria-hidden`, `pointer-events: none`). Honours
 * `prefers-reduced-motion`, pauses while the tab is hidden, clamps DPR, and
 * scales node count with viewport area.
 */
export function NetworkFieldBackdrop({
  density = 24,
  linkDistance = 138,
  maxDpr = 2,
}: NetworkFieldBackdropProps) {
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

    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    let width = 0;
    let height = 0;
    let frame = 0;
    let clock = 0;
    let nodes: FieldNode[] = [];
    let embers: Ember[] = [];

    const isDark = () => document.documentElement.classList.contains('dark');

    function palette() {
      // rgb triples for rgba() strings — intensity higher in light mode so
      // gold/teal still read on warm paper.
      if (isDark()) {
        return {
          gold: '245, 158, 11',
          teal: '45, 212, 191',
          cobalt: '96, 165, 250',
          edge: '245, 158, 11',
          intensity: 1,
        };
      }
      return {
        gold: '180, 83, 9',
        teal: '15, 118, 110',
        cobalt: '29, 78, 216',
        edge: '37, 99, 235',
        intensity: 1.15,
      };
    }

    function spawnNodes(count: number): FieldNode[] {
      return Array.from({ length: count }, () => {
        const roll = Math.random();
        const hue: 0 | 1 | 2 = roll < 0.5 ? 0 : roll < 0.78 ? 1 : 2;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: Math.random() * 1.5 + 0.7,
          hue,
        };
      });
    }

    function spawnEmbers(count: number): Ember[] {
      return Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: 0.25 + Math.random() * 0.55,
        vx: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        life: Math.random(),
        maxLife: 0.6 + Math.random() * 0.4,
        hue: (Math.random() < 0.7 ? 0 : 1) as 0 | 1,
      }));
    }

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(((width * height) / 1_000_000) * density * 4);
      nodes = spawnNodes(Math.max(26, Math.min(140, count)));
      embers = spawnEmbers(Math.max(12, Math.min(36, Math.round(count * 0.22))));
    }

    function draw() {
      const ctx = context!;
      const p = palette();
      const hues = [p.gold, p.teal, p.cobalt] as const;
      ctx.clearRect(0, 0, width, height);

      // Batch edges into closeness buckets (same technique as VGP GraphField).
      const buckets: Array<Path2D | null> = [null, null, null];
      const pulses = new Path2D();
      let hasPulse = false;

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          if (Math.abs(dx) > linkDistance || Math.abs(dy) > linkDistance) continue;
          const distance = Math.hypot(dx, dy);
          if (distance > linkDistance) continue;
          const closeness = 1 - distance / linkDistance;
          const bucket = closeness > 0.66 ? 2 : closeness > 0.33 ? 1 : 0;
          const path = buckets[bucket] ?? (buckets[bucket] = new Path2D());
          path.moveTo(node.x, node.y);
          path.lineTo(other.x, other.y);

          if (closeness > 0.72) {
            const phase = (((clock * 0.00032 + (i * 7 + j * 13) * 0.017) % 1) + 1) % 1;
            const px = node.x + (other.x - node.x) * phase;
            const py = node.y + (other.y - node.y) * phase;
            pulses.moveTo(px + 1.35, py);
            pulses.arc(px, py, 1.35, 0, Math.PI * 2);
            hasPulse = true;
          }
        }
      }

      ctx.lineWidth = 1;
      buckets.forEach((path, index) => {
        if (!path) return;
        ctx.strokeStyle = `rgba(${p.edge}, ${(0.045 + index * 0.04) * p.intensity})`;
        ctx.stroke(path);
      });

      if (hasPulse) {
        ctx.fillStyle = `rgba(${p.teal}, ${0.42 * p.intensity})`;
        ctx.fill(pulses);
      }

      for (let hue = 0; hue < 3; hue += 1) {
        const path = new Path2D();
        let drew = false;
        for (const node of nodes) {
          if (node.hue !== hue) continue;
          path.moveTo(node.x + node.r, node.y);
          path.arc(node.x, node.y, node.r, 0, Math.PI * 2);
          drew = true;
        }
        if (!drew) continue;
        ctx.fillStyle = `rgba(${hues[hue]}, ${0.48 * p.intensity})`;
        ctx.fill(path);
      }

      // Falling solar embers (PMF-like ambient motion, Hyperion palette).
      for (const e of embers) {
        const alpha = (1 - e.life) * 0.35 * p.intensity;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${e.hue === 0 ? p.gold : p.teal}, ${alpha})`;
        ctx.fill();
      }
    }

    function step(now: number) {
      frame = requestAnimationFrame(step);
      // ~30fps is plenty for a decorative layer.
      if (now - clock < 32) return;
      clock = now;

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }

      for (const e of embers) {
        e.y += e.vy;
        e.x += e.vx + Math.sin(clock * 0.001 + e.y * 0.01) * 0.15;
        e.life += 0.004;
        if (e.y > height + 12 || e.life > e.maxLife) {
          e.y = -8;
          e.x = Math.random() * width;
          e.life = 0;
          e.vy = 0.25 + Math.random() * 0.55;
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
      draw();
    }

    function onTheme() {
      draw();
    }

    resize();
    draw();
    start();

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    const observer = new MutationObserver(onTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density, linkDistance, maxDpr, reducedMotion]);

  return (
    <div className="helios-network-field" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default NetworkFieldBackdrop;
