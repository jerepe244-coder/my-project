'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface ObsidianSculptureProps {
  className?: string;
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Face {
  indices: number[];
  type: 'obsidian' | 'glass' | 'core-refract';
  tint?: string;
}

/**
 * Posición del Activo Escultórico:
 * Elemento central 3D (objeto de obsidiana facetada y vidrio con refracción)
 * anclado en la parte inferior, que se solapa sobre la línea de división inferior
 * para romper la bidimensionalidad de la pantalla.
 */
export const ObsidianSculpture: React.FC<ObsidianSculptureProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [dispersionMode, setDispersionMode] = useState<'obsidian' | 'prismatic'>('obsidian');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = 300;
    const height = 270;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Brutalist Architectural Polyhedron: Inner Faceted Obsidian Monolith + Outer Refractive Glass Shell
    const baseVertices: Vec3[] = [
      // Outer Refractive Glass Octahedral-Monolith Vertices (0..9)
      { x: 0, y: -1.18, z: 0 },       // 0: Top apex
      { x: -0.78, y: -0.38, z: 0.62 }, // 1: Upper front-left
      { x: 0.74, y: -0.44, z: 0.58 },  // 2: Upper front-right
      { x: 0.86, y: -0.28, z: -0.56 }, // 3: Upper back-right
      { x: -0.72, y: -0.32, z: -0.66 },// 4: Upper back-left
      { x: -0.58, y: 0.54, z: 0.76 },  // 5: Lower front-left bevel
      { x: 0.62, y: 0.48, z: 0.72 },   // 6: Lower front-right bevel
      { x: 0.68, y: 0.58, z: -0.62 },  // 7: Lower back-right bevel
      { x: -0.64, y: 0.52, z: -0.58 }, // 8: Lower back-left bevel
      { x: 0.04, y: 1.24, z: 0.08 },   // 9: Bottom chisel apex (overlaps divider line)

      // Inner Faceted Volcanic Obsidian Core Vertices (10..15)
      { x: 0, y: -0.82, z: 0 },        // 10: Core top
      { x: -0.46, y: -0.1, z: 0.42 },  // 11: Core front-left
      { x: 0.48, y: -0.14, z: 0.38 },  // 12: Core front-right
      { x: 0.44, y: 0.08, z: -0.44 },  // 13: Core back-right
      { x: -0.45, y: 0.04, z: -0.42 }, // 14: Core back-left
      { x: 0.02, y: 0.88, z: 0.04 },   // 15: Core bottom
    ];

    const faces: Face[] = [
      // Inner Obsidian Core Faces
      { indices: [10, 11, 12], type: 'obsidian' },
      { indices: [10, 12, 13], type: 'obsidian' },
      { indices: [10, 13, 14], type: 'obsidian' },
      { indices: [10, 14, 11], type: 'obsidian' },
      { indices: [15, 12, 11], type: 'obsidian' },
      { indices: [15, 13, 12], type: 'obsidian' },
      { indices: [15, 14, 13], type: 'obsidian' },
      { indices: [15, 11, 14], type: 'obsidian' },

      // Internal Refractive Planes (connecting core to outer glass)
      { indices: [0, 10, 2], type: 'core-refract' },
      { indices: [1, 11, 5], type: 'core-refract' },
      { indices: [6, 12, 9], type: 'core-refract' },

      // Outer Refractive Glass Facets
      { indices: [0, 1, 2], type: 'glass' },
      { indices: [0, 2, 3], type: 'glass' },
      { indices: [0, 3, 4], type: 'glass' },
      { indices: [0, 4, 1], type: 'glass' },
      { indices: [1, 5, 6, 2], type: 'glass' },
      { indices: [2, 6, 7, 3], type: 'glass' },
      { indices: [3, 7, 8, 4], type: 'glass' },
      { indices: [4, 8, 5, 1], type: 'glass' },
      { indices: [9, 6, 5], type: 'glass' },
      { indices: [9, 7, 6], type: 'glass' },
      { indices: [9, 8, 7], type: 'glass' },
      { indices: [9, 5, 8], type: 'glass' },
    ];

    let rotY = 0.42;
    let rotX = -0.18;
    let targetRotY = 0.42;
    let targetRotX = -0.18;
    let rafId = 0;

    const rotatePoint = (v: Vec3, rx: number, ry: number): Vec3 => {
      // Rotate around Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = v.x * cosY - v.z * sinY;
      const z1 = v.z * cosY + v.x * sinY;

      // Rotate around X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = v.y * cosX - z1 * sinX;
      const z2 = z1 * cosX + v.y * sinX;

      return { x: x1, y: y2, z: z2 };
    };

    const computeNormal = (a: Vec3, b: Vec3, c: Vec3): Vec3 => {
      const ux = b.x - a.x;
      const uy = b.y - a.y;
      const uz = b.z - a.z;
      const vx = c.x - a.x;
      const vy = c.y - a.y;
      const vz = c.z - a.z;
      const nx = uy * vz - uz * vy;
      const ny = uz * vx - ux * vz;
      const nz = ux * vy - uy * vx;
      const len = Math.hypot(nx, ny, nz) || 1;
      return { x: nx / len, y: ny / len, z: nz / len };
    };

    const renderFrame = (time: number) => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        const autoDriftY = Math.sin(time * 0.0007) * 0.22;
        const autoDriftX = Math.cos(time * 0.0005) * 0.08;
        rotY += (targetRotY + autoDriftY - rotY) * 0.06;
        rotX += (targetRotX + autoDriftX - rotX) * 0.06;
      }

      const cx = width * 0.5;
      const cy = height * 0.52;
      const scale = 92;

      // 1. Draw Ground Contact Shadow & Caustic Refraction Halo overlapping the bottom divider
      const shadowGrad = ctx.createRadialGradient(cx, height - 22, 4, cx, height - 22, 92);
      shadowGrad.addColorStop(0, 'rgba(10, 10, 12, 0.42)');
      shadowGrad.addColorStop(0.45, 'rgba(10, 10, 12, 0.16)');
      shadowGrad.addColorStop(1, 'rgba(10, 10, 12, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(cx, height - 22, 88, 15, 0, 0, Math.PI * 2);
      ctx.fill();

      // Subtle Caustic Light Line across the base
      const causticGrad = ctx.createLinearGradient(cx - 58, height - 22, cx + 58, height - 22);
      causticGrad.addColorStop(0, 'rgba(255, 59, 48, 0)');
      causticGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.45)');
      causticGrad.addColorStop(0.65, dispersionMode === 'prismatic' ? 'rgba(255, 59, 48, 0.55)' : 'rgba(220, 230, 242, 0.38)');
      causticGrad.addColorStop(1, 'rgba(255, 59, 48, 0)');
      ctx.strokeStyle = causticGrad;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx - 56, height - 21);
      ctx.lineTo(cx + 56, height - 21);
      ctx.stroke();

      // Transform vertices
      const transformed = baseVertices.map((v) => rotatePoint(v, rotX, rotY));
      const projected = transformed.map((v) => {
        const perspective = 3.6 / (3.6 - v.z * 0.55);
        return {
          x: cx + v.x * scale * perspective,
          y: cy + v.y * scale * perspective,
          z: v.z,
        };
      });

      // Primary studio key light + rim light
      const keyLight: Vec3 = { x: -0.52, y: -0.68, z: 0.51 };
      const rimLight: Vec3 = { x: 0.74, y: 0.25, z: -0.62 };

      // Sort faces back-to-front (Painter's algorithm with obsidian core priority)
      const sortedFaces = faces
        .map((face, idx) => {
          const pts3d = face.indices.map((i) => transformed[i]);
          const avgZ = pts3d.reduce((acc, p) => acc + p.z, 0) / pts3d.length;
          const normal = computeNormal(pts3d[0], pts3d[1], pts3d[2]);
          const typeBias = face.type === 'obsidian' ? -0.15 : face.type === 'core-refract' ? -0.05 : 0;
          return { face, idx, avgZ: avgZ + typeBias, normal };
        })
        .sort((a, b) => a.avgZ - b.avgZ);

      for (const item of sortedFaces) {
        const { face, normal } = item;
        const pts2d = face.indices.map((i) => projected[i]);

        const dotKey = Math.max(0, normal.x * keyLight.x + normal.y * keyLight.y + normal.z * keyLight.z);
        const dotRim = Math.max(0, normal.x * rimLight.x + normal.y * rimLight.y + normal.z * rimLight.z);
        const fresnel = Math.pow(1 - Math.min(1, Math.abs(normal.z)), 2.2);

        ctx.beginPath();
        ctx.moveTo(pts2d[0].x, pts2d[0].y);
        for (let i = 1; i < pts2d.length; i++) {
          ctx.lineTo(pts2d[i].x, pts2d[i].y);
        }
        ctx.closePath();

        if (face.type === 'obsidian') {
          // Dense Volcanic Obsidian Facet (#0A0A0C to #23262E)
          const lum = Math.round(10 + dotKey * 36 + dotRim * 18);
          const grad = ctx.createLinearGradient(pts2d[0].x, pts2d[0].y, pts2d[2].x, pts2d[2].y);
          grad.addColorStop(0, `rgb(${lum}, ${lum + 1}, ${lum + 4})`);
          grad.addColorStop(1, 'rgb(8, 9, 11)');
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.strokeStyle = `rgba(239, 239, 234, ${0.14 + dotKey * 0.25})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        } else if (face.type === 'core-refract') {
          // Internal Optical Refraction Plane
          const refractGrad = ctx.createLinearGradient(pts2d[0].x, pts2d[0].y, pts2d[2].x, pts2d[2].y);
          refractGrad.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
          refractGrad.addColorStop(
            0.5,
            dispersionMode === 'prismatic'
              ? 'rgba(255, 59, 48, 0.28)'
              : 'rgba(180, 195, 210, 0.14)'
          );
          refractGrad.addColorStop(1, 'rgba(10, 10, 12, 0.35)');
          ctx.fillStyle = refractGrad;
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        } else {
          // Outer Refractive Glass Facet (backface vs frontface optical density)
          const isFront = normal.z >= -0.05;
          const spec = Math.pow(dotKey, 5) * 0.68;
          const glassGrad = ctx.createLinearGradient(
            pts2d[0].x,
            pts2d[0].y,
            pts2d[pts2d.length - 1].x,
            pts2d[pts2d.length - 1].y
          );

          if (isFront) {
            glassGrad.addColorStop(0, `rgba(255, 255, 255, ${0.12 + spec * 0.55 + fresnel * 0.2})`);
            glassGrad.addColorStop(0.48, `rgba(28, 30, 36, ${0.28 + (1 - dotKey) * 0.22})`);
            glassGrad.addColorStop(
              1,
              dispersionMode === 'prismatic'
                ? `rgba(255, 59, 48, ${0.12 + fresnel * 0.22})`
                : `rgba(216, 214, 206, ${0.16 + fresnel * 0.25})`
            );
          } else {
            glassGrad.addColorStop(0, 'rgba(14, 15, 18, 0.44)');
            glassGrad.addColorStop(1, 'rgba(74, 77, 82, 0.18)');
          }

          ctx.fillStyle = glassGrad;
          ctx.fill();

          // Sharp Chiseled Refractive Bevel Edge
          ctx.strokeStyle = isFront
            ? `rgba(255, 255, 255, ${0.32 + spec * 0.45 + fresnel * 0.25})`
            : 'rgba(216, 214, 206, 0.18)';
          ctx.lineWidth = isFront ? 1.05 : 0.55;
          ctx.stroke();

          // Chromatic dispersion micro-bevel on high-Fresnel front edges
          if (isFront && (fresnel > 0.32 || dispersionMode === 'prismatic')) {
            ctx.strokeStyle =
              dispersionMode === 'prismatic'
                ? 'rgba(255, 59, 48, 0.55)'
                : 'rgba(255, 59, 48, 0.24)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(pts2d[0].x + 0.9, pts2d[0].y - 0.6);
            ctx.lineTo(pts2d[1].x + 0.9, pts2d[1].y - 0.6);
            ctx.stroke();
          }
        }
      }

      // Draw Internal Geometric Datum Axis through the Crystal
      const topApex = projected[0];
      const botApex = projected[9];
      ctx.save();
      ctx.setLineDash([2, 2]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.lineWidth = 0.65;
      ctx.beginPath();
      ctx.moveTo(topApex.x, topApex.y);
      ctx.lineTo(botApex.x, botApex.y);
      ctx.stroke();
      ctx.restore();

      ctx.restore();

      if (!prefersReducedMotion) {
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame(0);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relX = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth * 0.5);
      const relY = (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight * 0.5);
      targetRotY = 0.42 + relX * 0.65;
      targetRotX = -0.18 + relY * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion, dispersionMode]);

  return (
    <div
      ref={containerRef}
      onClick={() =>
        setDispersionMode((prev) => (prev === 'obsidian' ? 'prismatic' : 'obsidian'))
      }
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setDispersionMode((prev) => (prev === 'obsidian' ? 'prismatic' : 'obsidian'));
        }
      }}
      aria-label="Interactive 3D Faceted Obsidian and Refractive Glass Sculpture — Click to toggle optical dispersion"
      className={`relative flex flex-col items-center justify-end select-none cursor-pointer group rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF3B30] ${className}`}
    >
      {/* Refractive Backdrop Glass Prism Layer that distorts underlying grid lines */}
      <div
        aria-hidden="true"
        style={{
          clipPath: 'polygon(50% 4%, 88% 28%, 78% 76%, 51% 98%, 22% 74%, 14% 26%)',
        }}
        className="pointer-events-none absolute bottom-3 w-[196px] h-[220px] backdrop-blur-[2.5px] bg-white/[0.03] dark:bg-white/[0.02]"
      />

      {/* 3D Faceted Obsidian & Glass Canvas */}
      <canvas
        ref={canvasRef}
        width={300}
        height={270}
        className="relative z-20 w-[240px] sm:w-[276px] h-[216px] sm:h-[248px] block pointer-events-none"
      />

      {/* Subtle Technical Refraction Caption anchored beside the overlapping apex */}
      <span className="sr-only">
        3D Faceted Obsidian and Refractive Glass Monolith ({dispersionMode})
      </span>
    </div>
  );
};
