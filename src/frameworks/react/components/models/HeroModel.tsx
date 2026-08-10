'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { VISUAL_EXPERIENCE } from '../../../../configs/visualExperience';
import { useReducedMotion } from '../../../../hooks/useReducedMotion';

type ThreeModule = typeof import('three');

/**
 * Helios product stage — a solar-network assembly (torus core + orbital nodes),
 * not the personal-site faceted icosahedron with cyan/violet materials.
 */
export default function HeroModel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ x: 0.28, y: -0.35 });
  const pausedRef = useRef(false);
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const [paused, setPaused] = useState(false);
  const [supported, setSupported] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const rotate = useCallback((delta: number) => {
    rotationRef.current.y += delta;
  }, []);

  const reset = useCallback(() => {
    rotationRef.current = { x: 0.28, y: -0.35 };
  }, []);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const targetCanvas: HTMLCanvasElement = canvasElement;
    let disposed = false;
    let frame = 0;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
    };

    targetCanvas.addEventListener('webglcontextlost', handleContextLost, false);

    let renderer: import('three').WebGLRenderer | undefined;
    let disposables: Array<{ dispose: () => void }> = [];
    let observer: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    let isVisible = false;

    async function mount() {
      let THREE: ThreeModule;
      try {
        THREE = await import('three');
        if (disposed) return;
        renderer = new THREE.WebGLRenderer({
          canvas: targetCanvas,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        });
      } catch {
        setSupported(false);
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0.35, 7.2);

      const root = new THREE.Group();
      scene.add(root);

      // Core: gold torus knot — “forge ring”, not an icosahedron.
      const coreGeo = new THREE.TorusKnotGeometry(1.05, 0.28, 128, 16, 2, 3);
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: '#f59e0b',
        emissive: '#92400e',
        emissiveIntensity: 0.45,
        metalness: 0.72,
        roughness: 0.28,
        clearcoat: 0.85,
        clearcoatRoughness: 0.2,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      root.add(core);
      disposables.push(coreGeo, coreMat);

      // Cobalt equatorial ring
      const ringGeo = new THREE.TorusGeometry(1.95, 0.035, 12, 96);
      const ringMat = new THREE.MeshStandardMaterial({
        color: '#2563eb',
        emissive: '#1e3a8a',
        emissiveIntensity: 0.55,
        metalness: 0.5,
        roughness: 0.35,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.4;
      root.add(ring);
      disposables.push(ringGeo, ringMat);

      // Teal second ring (tilted)
      const ring2Geo = new THREE.TorusGeometry(1.55, 0.028, 10, 80);
      const ring2Mat = new THREE.MeshStandardMaterial({
        color: '#14b8a6',
        emissive: '#115e59',
        emissiveIntensity: 0.5,
        metalness: 0.45,
        roughness: 0.4,
      });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.x = Math.PI / 1.7;
      ring2.rotation.y = 0.6;
      root.add(ring2);
      disposables.push(ring2Geo, ring2Mat);

      // Orbital graph nodes
      const nodeColors = ['#fbbf24', '#2dd4bf', '#60a5fa', '#ea580c', '#f59e0b', '#14b8a6'];
      const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
      disposables.push(nodeGeo);
      const nodes: import('three').Mesh[] = [];
      nodeColors.forEach((color, i) => {
        const mat = new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.35,
          metalness: 0.3,
          roughness: 0.4,
        });
        const node = new THREE.Mesh(nodeGeo, mat);
        const angle = (i / nodeColors.length) * Math.PI * 2;
        const r = 2.35;
        node.position.set(Math.cos(angle) * r, Math.sin(angle * 1.3) * 0.55, Math.sin(angle) * r);
        root.add(node);
        nodes.push(node);
        disposables.push(mat);
      });

      // Thin link segments between consecutive nodes
      const linkMat = new THREE.LineBasicMaterial({ color: '#fbbf24', transparent: true, opacity: 0.35 });
      disposables.push(linkMat);
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i].position;
        const b = nodes[(i + 1) % nodes.length].position;
        const pts = [a.clone(), b.clone()];
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        root.add(new THREE.Line(geo, linkMat));
        disposables.push(geo);
      }

      scene.add(new THREE.HemisphereLight('#fff7ed', '#0a1220', 1.6));
      const key = new THREE.PointLight('#fbbf24', 28, 16);
      key.position.set(3.2, 2.4, 3.5);
      scene.add(key);
      const fill = new THREE.PointLight('#14b8a6', 18, 14);
      fill.position.set(-2.8, -1.2, 2.5);
      scene.add(fill);

      const resize = () => {
        if (!renderer) return;
        const { clientWidth, clientHeight } = targetCanvas;
        const dpr = Math.min(
          window.devicePixelRatio,
          reducedMotion ? VISUAL_EXPERIENCE.reducedDevicePixelRatio : VISUAL_EXPERIENCE.maxDevicePixelRatio
        );
        renderer.setPixelRatio(dpr);
        renderer.setSize(clientWidth, clientHeight, false);
        camera.aspect = clientWidth / Math.max(clientHeight, 1);
        camera.updateProjectionMatrix();
      };
      resize();
      observer = new ResizeObserver(resize);
      observer.observe(targetCanvas);

      let t = 0;
      const render = () => {
        if (disposed || !renderer) return;
        if (isVisible && document.visibilityState === 'visible') {
          root.rotation.x = rotationRef.current.x;
          root.rotation.y = rotationRef.current.y;
          if (!pausedRef.current && !reducedMotion) {
            rotationRef.current.y += 0.003;
            t += 0.012;
            nodes.forEach((node, i) => {
              const base = (i / nodes.length) * Math.PI * 2;
              const r = 2.35 + Math.sin(t + i) * 0.08;
              node.position.set(
                Math.cos(base + t * 0.15) * r,
                Math.sin(base * 1.3 + t * 0.2) * 0.55,
                Math.sin(base + t * 0.15) * r
              );
            });
          }
          renderer.render(scene, camera);
        }
        frame = window.requestAnimationFrame(render);
      };
      render();

      return () => {
        observer?.disconnect();
      };
    }

    let disconnect: (() => void) | undefined;
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible && !renderer && !disposed) {
          mount().then((cleanup) => {
            disconnect = cleanup;
          });
        }
      },
      { rootMargin: '50px' }
    );
    intersectionObserver.observe(targetCanvas);

    return () => {
      disposed = true;
      disconnect?.();
      intersectionObserver?.disconnect();
      targetCanvas.removeEventListener('webglcontextlost', handleContextLost);
      window.cancelAnimationFrame(frame);
      disposables.forEach((d) => d.dispose());
      renderer?.dispose();
    };
  }, [reducedMotion]);

  return (
    <div
      className="forge-stage"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          rotate(
            event.key === 'ArrowLeft'
              ? -VISUAL_EXPERIENCE.modelRotationStep
              : VISUAL_EXPERIENCE.modelRotationStep
          );
        }
      }}
    >
      <div className="forge-stage__frame" aria-hidden="true">
        <span className="forge-stage__corner forge-stage__corner--tl" />
        <span className="forge-stage__corner forge-stage__corner--tr" />
        <span className="forge-stage__corner forge-stage__corner--bl" />
        <span className="forge-stage__corner forge-stage__corner--br" />
      </div>
      <div className="forge-stage__scan" aria-hidden="true" />
      {supported ? (
        <canvas
          ref={canvasRef}
          tabIndex={0}
          aria-label="Interactive Helios network model. Drag to inspect or use the arrow keys to rotate."
          onPointerDown={(event) => {
            dragRef.current = { x: event.clientX, y: event.clientY };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!dragRef.current) return;
            rotationRef.current.y += (event.clientX - dragRef.current.x) * 0.008;
            rotationRef.current.x += (event.clientY - dragRef.current.y) * 0.008;
            dragRef.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerUp={(event) => {
            dragRef.current = null;
            event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onPointerCancel={() => {
            dragRef.current = null;
          }}
        />
      ) : (
        <div className="forge-stage__fallback" role="img" aria-label="Helios network model static preview">
          ◎
        </div>
      )}
      <div className="forge-stage__hud">
        <p className="forge-stage__hud-label">Helios network · live</p>
        <p className="forge-stage__hud-meta">Drag · ← → · pause</p>
      </div>
      <div className="forge-stage__controls">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? 'Resume model rotation' : 'Pause model rotation'}
        >
          {paused ? <Play size={15} /> : <Pause size={15} />}
        </button>
        <button type="button" onClick={reset} aria-label="Reset model rotation">
          <RotateCcw size={15} />
        </button>
      </div>
    </div>
  );
}
