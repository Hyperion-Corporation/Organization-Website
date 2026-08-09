'use client';

import { useEffect, useRef } from 'react';

/**
 * Canvas sketch of relationship paths between modules and assets.
 * Filename retained for import stability; copy is VGP-oriented.
 */
export default function StructureCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const draw = () => {
      const width = canvas.clientWidth * window.devicePixelRatio;
      const height = canvas.clientHeight * window.devicePixelRatio;
      canvas.width = width;
      canvas.height = height;
      context.clearRect(0, 0, width, height);
      context.lineWidth = 4 * window.devicePixelRatio;
      context.lineCap = 'round';

      // Two illustrative relationship polylines (module↔asset / board↔module)
      const paths = [
        [0.1, 0.75, 0.3, 0.25, 0.62, 0.58, 0.88, 0.18],
        [0.12, 0.28, 0.48, 0.48, 0.72, 0.25, 0.9, 0.7],
      ];
      paths.forEach((route, index) => {
        context.beginPath();
        context.moveTo(route[0] * width, route[1] * height);
        for (let i = 2; i < route.length; i += 2) {
          context.lineTo(route[i] * width, route[i + 1] * height);
        }
        context.strokeStyle = index ? '#a78bfa' : '#67e8f9';
        context.stroke();
      });

      (
        [
          [0.1, 0.75],
          [0.3, 0.25],
          [0.62, 0.58],
          [0.88, 0.18],
          [0.12, 0.28],
          [0.48, 0.48],
          [0.72, 0.25],
          [0.9, 0.7],
        ] as const
      ).forEach(([x, y]) => {
        context.fillStyle = '#f8fafc';
        context.beginPath();
        context.arc(x * width, y * height, 5 * window.devicePixelRatio, 0, Math.PI * 2);
        context.fill();
      });
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  return (
    <figure className="rounded-2xl border border-slate-200 bg-slate-950 p-4 dark:border-white/10">
      <canvas
        ref={canvasRef}
        className="h-56 w-full"
        aria-label="Illustrative graph edges connecting modules, assets, and storyboard nodes"
        role="img"
      />
      <figcaption className="mt-3 text-xs text-slate-400">
        Canvas sketch of Visual Graph Programming relationships; a structured table remains the accessible authority.
      </figcaption>
    </figure>
  );
}
