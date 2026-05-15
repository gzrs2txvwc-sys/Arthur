"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";

const CITY_HALOS = [
  { latlng: [35.6762, 139.6503] as [number, number], rgb: [233, 69, 96], r: 190 },   // Tokyo
  { latlng: [34.9671, 135.7727] as [number, number], rgb: [201, 169, 110], r: 145 }, // Kyoto
  { latlng: [34.6937, 135.5023] as [number, number], rgb: [255, 107, 53], r: 165 },  // Osaka
];

interface MapAtmosphereProps {
  mapRef: { current: LeafletMap | null };
}

export function MapAtmosphere({ mapRef }: MapAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const t0 = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
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

      for (let i = 0; i < CITY_HALOS.length; i++) {
        const city = CITY_HALOS[i];
        const breathe = Math.sin(t * 0.62 + i * 1.45);

        let x = canvas.width / 2;
        let y = canvas.height / 2;
        try {
          const pt = map.latLngToContainerPoint(city.latlng);
          x = pt.x;
          y = pt.y;
        } catch {
          // map not ready
        }

        const radius = city.r * (1 + breathe * 0.17);
        const alpha = 0.09 + breathe * 0.03;

        const [r, g, b] = city.rgb;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0,    `rgba(${r},${g},${b},${(alpha).toFixed(3)})`);
        grad.addColorStop(0.38, `rgba(${r},${g},${b},${(alpha * 0.48).toFixed(3)})`);
        grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
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
