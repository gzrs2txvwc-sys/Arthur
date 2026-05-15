"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";

// ── City + neighborhood halos ──────────────────────
const HALOS = [
  // Major cities — large breathing radii
  { latlng: [35.6762, 139.6503] as [number, number], rgb: [233, 69, 96],  r: 190, base: true },
  { latlng: [34.9671, 135.7727] as [number, number], rgb: [201, 169, 110], r: 145, base: true },
  { latlng: [34.6937, 135.5023] as [number, number], rgb: [255, 107, 53], r: 165, base: true },
  // Tokyo neighborhoods — emotional cluster points
  { latlng: [35.6897, 139.7005] as [number, number], rgb: [233, 69, 96],  r: 80,  base: false }, // Shinjuku
  { latlng: [35.6580, 139.7016] as [number, number], rgb: [233, 69, 96],  r: 68,  base: false }, // Shibuya
  { latlng: [35.6614, 139.6682] as [number, number], rgb: [78, 205, 196], r: 58,  base: false }, // Shimokitazawa
  // Kyoto + Osaka neighborhoods
  { latlng: [35.0037, 135.7772] as [number, number], rgb: [201, 169, 110], r: 52,  base: false }, // Gion
  { latlng: [34.6687, 135.5013] as [number, number], rgb: [255, 107, 53], r: 62,  base: false }, // Namba
];

// ── Animated train routes (canvas polylines) ───────
const TRAIN_ROUTES = [
  {
    // Yamanote Line — Tokyo loop
    coords: [
      [35.6897, 139.7005], [35.6961, 139.6905],
      [35.6580, 139.7016], [35.6285, 139.7387],
      [35.6812, 139.7671], [35.7141, 139.7774],
      [35.7295, 139.7109], [35.6897, 139.7005],
    ] as [number, number][],
    rgb: [233, 69, 96] as [number, number, number],
    opacity: 0.13,
  },
  {
    // Osaka Loop Line
    coords: [
      [34.7025, 135.4960], [34.6962, 135.5149],
      [34.6687, 135.5013], [34.6459, 135.5139],
      [34.6553, 135.5352], [34.6836, 135.5261],
      [34.7025, 135.4960],
    ] as [number, number][],
    rgb: [255, 107, 53] as [number, number, number],
    opacity: 0.13,
  },
];

// ── Ambient particle system ────────────────────────
interface Particle {
  x: number; y: number;
  size: number; speed: number;
  drift: number; opacity: number; phase: number;
}

function makeParticles(w: number, h: number): Particle[] {
  return Array.from({ length: 55 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: 0.5 + Math.random() * 1.1,
    speed: 0.07 + Math.random() * 0.11,
    drift: (Math.random() - 0.5) * 0.05,
    opacity: 0.1 + Math.random() * 0.18,
    phase: Math.random() * Math.PI * 2,
  }));
}

interface MapAtmosphereProps {
  mapRef: { current: LeafletMap | null };
}

export function MapAtmosphere({ mapRef }: MapAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const t0 = useRef(Date.now());
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = makeParticles(canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const map = mapRef.current;
      if (!map || !canvas.width || !canvas.height) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = (Date.now() - t0.current) / 1000;

      // ── City + neighborhood halos ──────────────
      for (let i = 0; i < HALOS.length; i++) {
        const h = HALOS[i];
        const breathe = Math.sin(t * 0.62 + i * 1.45);
        const baseAlpha = h.base ? 0.09 : 0.055;
        const alpha = baseAlpha + breathe * (h.base ? 0.03 : 0.018);
        const radius = h.r * (1 + breathe * 0.15);

        let x = canvas.width / 2, y = canvas.height / 2;
        try {
          const pt = map.latLngToContainerPoint(h.latlng);
          x = pt.x; y = pt.y;
        } catch { /* map not ready */ }

        const [r, g, b] = h.rgb;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0,   `rgba(${r},${g},${b},${alpha.toFixed(3)})`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${(alpha * 0.44).toFixed(3)})`);
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Animated train routes ──────────────────
      for (const route of TRAIN_ROUTES) {
        ctx.save();
        ctx.setLineDash([3, 13]);
        ctx.lineDashOffset = -(t * 7) % 16;
        const [r, g, b] = route.rgb;
        ctx.strokeStyle = `rgba(${r},${g},${b},${route.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        let first = true;
        for (const coord of route.coords) {
          try {
            const pt = map.latLngToContainerPoint(coord);
            if (first) { ctx.moveTo(pt.x, pt.y); first = false; }
            else ctx.lineTo(pt.x, pt.y);
          } catch { /* skip */ }
        }
        ctx.stroke();
        ctx.restore();
      }

      // ── Ambient particle drift ─────────────────
      for (const p of particlesRef.current) {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -4) {
          p.y = canvas.height + 4;
          p.x = Math.random() * canvas.width;
        }
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(t * 1.1 + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,184,154,${alpha.toFixed(3)})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [mapRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 3, mixBlendMode: "screen" }}
    />
  );
}
