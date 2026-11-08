'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'motion/react';
import * as THREE from 'three';

interface ObsidianSculptureProps {
  className?: string;
}

/**
 * Constantes físicas y ópticas de Fase 3 (Hero 3D WebGL & Motion):
 * - Interpolación inercial al movimiento del cursor: lerp = 0.05
 * - Límites seguros de inclinación: ±15° en eje X y ±25° en eje Y
 * - Cristal óptico en Three.js: ior = 2.42, transmission = 1.0, roughness = 0.03 + dispersión cáustica en aristas
 * - Núcleo de obsidiana negra pulida (#0A0A0C) de alta reflectancia
 * - Levitación pasiva en reposo: frecuencia 0.4 Hz y amplitud de 6 px
 * - Rotación pasiva en reposo o táctil: 0.15 rad/s
 * - Limitador de FPS (FPS Throttle): conmutación automática a material estático optimizado bajo 50 FPS
 */
export const SCULPTURE_PHYSICS_CONFIG = {
  lerp: 0.05,
  maxTiltXDeg: 15,
  maxTiltYDeg: 25,
  crystalOptical: {
    ior: 2.42,
    transmission: 1.0,
    roughness: 0.03,
    thickness: 1.85,
  },
  obsidianCoreColor: '#0A0A0C',
  levitationFrequencyHz: 0.4,
  levitationAmplitudePx: 6,
  passiveRotationRadPerSec: 0.15,
  fpsThrottleThreshold: 50,
} as const;

export const ObsidianSculpture: React.FC<ObsidianSculptureProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const kineticStageRef = useRef<HTMLDivElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const [fpsThrottled, setFpsThrottled] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stageEl = kineticStageRef.current;
    const shadowEl = shadowRef.current;
    if (!canvas || !stageEl) return;

    // Respeto estricto a prefers-reduced-motion: sin rotación 3D ni oscilación continua
    if (prefersReducedMotion) {
      stageEl.style.transform = 'perspective(900px) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)';
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(268, 268, false);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
    } catch {
      // Fallback limpio en entornos sin contexto WebGL disponible (p.ej. tests headless sin GPU)
      renderer = null;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    // Iluminación de estudio direccional + rim light para dispersión cáustica
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(3.2, 4.5, 3.8);

    const rimLight = new THREE.DirectionalLight(0xdbeafe, 2.1);
    rimLight.position.set(-3.5, -2.0, 2.2);

    const warmCausticLight = new THREE.PointLight(0xff3b30, 0.65, 8);
    warmCausticLight.position.set(2.0, -2.2, 2.5);

    scene.add(ambientLight, keyLight, rimLight, warmCausticLight);

    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // 1. Núcleo de obsidiana negra pulida (#0A0A0C) con propiedades ópticas (ior: 2.42, transmission: 1.0, roughness: 0.03)
    // Sin geometría OctahedronGeometry ni LineSegments(edgesGeometry) superpuestos para evitar el rombo fantasma sobre la imagen 2K
    const obsidianGeometry = new THREE.IcosahedronGeometry(0.68, 0);
    const obsidianMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(SCULPTURE_PHYSICS_CONFIG.obsidianCoreColor),
      ior: SCULPTURE_PHYSICS_CONFIG.crystalOptical.ior,
      transmission: SCULPTURE_PHYSICS_CONFIG.crystalOptical.transmission,
      roughness: SCULPTURE_PHYSICS_CONFIG.crystalOptical.roughness,
      thickness: SCULPTURE_PHYSICS_CONFIG.crystalOptical.thickness,
      metalness: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
      transparent: true,
      opacity: 0,
    });

    // Material estático optimizado para el FPS Throttle (< 50 FPS)
    const staticOptimizedMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(SCULPTURE_PHYSICS_CONFIG.obsidianCoreColor),
      roughness: 0.12,
      metalness: 0.25,
      transparent: true,
      opacity: 0,
    });

    const obsidianMesh = new THREE.Mesh<
      THREE.IcosahedronGeometry,
      THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial
    >(obsidianGeometry, obsidianMaterial);
    obsidianMesh.position.set(0, 0, 0);
    sculptureGroup.add(obsidianMesh);

    // Estado cinemático de rotación e inercia (lerp: 0.05, ±15° X, ±25° Y)
    const maxTiltXRad = THREE.MathUtils.degToRad(SCULPTURE_PHYSICS_CONFIG.maxTiltXDeg);
    const maxTiltYRad = THREE.MathUtils.degToRad(SCULPTURE_PHYSICS_CONFIG.maxTiltYDeg);

    let targetTiltXDeg = 0;
    let targetTiltYDeg = 0;
    let currentTiltXDeg = 0;
    let currentTiltYDeg = 0;
    let passiveAngleRad = 0;
    const isTouchDevice =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches;

    // Monitor de FPS para el FPS Throttle (< 50 FPS)
    let frameCount = 0;
    let fpsWindowStart = performance.now();
    let isThrottledLocal = false;
    let rafId = 0;
    let prevFrameTime = performance.now();
    const startTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.5;

      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth * 0.45)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight * 0.45)));

      // Restricción estricta a ±15° en eje X y ±25° en eje Y
      targetTiltXDeg = Math.max(
        -SCULPTURE_PHYSICS_CONFIG.maxTiltXDeg,
        Math.min(SCULPTURE_PHYSICS_CONFIG.maxTiltXDeg, -normY * SCULPTURE_PHYSICS_CONFIG.maxTiltXDeg)
      );
      targetTiltYDeg = Math.max(
        -SCULPTURE_PHYSICS_CONFIG.maxTiltYDeg,
        Math.min(SCULPTURE_PHYSICS_CONFIG.maxTiltYDeg, normX * SCULPTURE_PHYSICS_CONFIG.maxTiltYDeg)
      );
    };

    const handleMouseLeave = () => {
      targetTiltXDeg = 0;
      targetTiltYDeg = 0;
    };

    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    const animate = (now: number) => {
      const dt = Math.min((now - prevFrameTime) / 1000, 0.1);
      prevFrameTime = now;
      const elapsedSec = (now - startTime) / 1000;

      // 1. Medición de tasa de refresco (FPS Throttle < 50 FPS)
      frameCount += 1;
      const windowElapsed = now - fpsWindowStart;
      if (windowElapsed >= 1000 && frameCount >= 15) {
        const currentFps = (frameCount * 1000) / windowElapsed;
        if (!isThrottledLocal && currentFps < SCULPTURE_PHYSICS_CONFIG.fpsThrottleThreshold) {
          isThrottledLocal = true;
          obsidianMesh.material = staticOptimizedMaterial;
          setFpsThrottled(true);
        }
        frameCount = 0;
        fpsWindowStart = now;
      }

      // 2. Balanceo inercial mediante interpolación suave (lerp: 0.05)
      currentTiltXDeg += (targetTiltXDeg - currentTiltXDeg) * SCULPTURE_PHYSICS_CONFIG.lerp;
      currentTiltYDeg += (targetTiltYDeg - currentTiltYDeg) * SCULPTURE_PHYSICS_CONFIG.lerp;

      // 3. Rotación continua ininterrumpida (0.15 rad/s) + oscilación armónica en forma de ocho (curva de Lissajous)
      passiveAngleRad += SCULPTURE_PHYSICS_CONFIG.passiveRotationRadPerSec * dt;

      const t = elapsedSec * Math.PI * 2 * SCULPTURE_PHYSICS_CONFIG.levitationFrequencyHz;
      const levitationX =
        Math.cos(t * 0.5) * (SCULPTURE_PHYSICS_CONFIG.levitationAmplitudePx * 0.85);
      const levitationY =
        Math.sin(t) * SCULPTURE_PHYSICS_CONFIG.levitationAmplitudePx;
      const levitationZ =
        Math.cos(t * 0.5) * (SCULPTURE_PHYSICS_CONFIG.levitationAmplitudePx * 1.5);

      // Aplicación a la escena WebGL de Three.js (ejes X, Y y Z con curva de Lissajous)
      const clampedRotX = THREE.MathUtils.clamp(
        THREE.MathUtils.degToRad(currentTiltXDeg),
        -maxTiltXRad,
        maxTiltXRad
      );
      const clampedRotY = THREE.MathUtils.clamp(
        THREE.MathUtils.degToRad(currentTiltYDeg),
        -maxTiltYRad,
        maxTiltYRad
      );

      sculptureGroup.rotation.x = clampedRotX + Math.cos(t * 0.5) * 0.12;
      sculptureGroup.rotation.y = clampedRotY + passiveAngleRad;
      sculptureGroup.rotation.z = Math.sin(t * 0.5) * 0.06;
      sculptureGroup.position.x = (levitationX / 268) * 1.4;
      sculptureGroup.position.y = (levitationY / 268) * 1.4;
      sculptureGroup.position.z = (levitationZ / 268) * 1.4;

      if (renderer) {
        renderer.render(scene, camera);
      }

      // Aplicación sincronizada 3D al contenedor óptico 2K y su sombra de contacto
      const passiveTiltXDeg = Math.cos(passiveAngleRad * 0.75) * 6.5;
      const passiveTiltYDeg = Math.sin(passiveAngleRad) * 12.0;
      const passiveRollZDeg = Math.cos(t * 0.5) * 2.8;

      const totalRotX = Math.max(
        -SCULPTURE_PHYSICS_CONFIG.maxTiltXDeg,
        Math.min(SCULPTURE_PHYSICS_CONFIG.maxTiltXDeg, currentTiltXDeg + passiveTiltXDeg)
      );
      const totalRotY = Math.max(
        -SCULPTURE_PHYSICS_CONFIG.maxTiltYDeg,
        Math.min(SCULPTURE_PHYSICS_CONFIG.maxTiltYDeg, currentTiltYDeg + passiveTiltYDeg)
      );

      stageEl.style.transform = `perspective(950px) translate3d(${levitationX.toFixed(
        2
      )}px, ${levitationY.toFixed(2)}px, ${levitationZ.toFixed(
        2
      )}px) rotateX(${totalRotX.toFixed(2)}deg) rotateY(${totalRotY.toFixed(
        2
      )}deg) rotateZ(${passiveRollZDeg.toFixed(2)}deg)`;

      if (shadowEl) {
        const shadowShiftX =
          levitationX * 0.65 + (-totalRotY / SCULPTURE_PHYSICS_CONFIG.maxTiltYDeg) * 6;
        const shadowScale =
          1 - (levitationY / SCULPTURE_PHYSICS_CONFIG.levitationAmplitudePx) * 0.06;
        shadowEl.style.transform = `translate3d(${shadowShiftX.toFixed(2)}px, 0px, 0px) scaleX(${shadowScale.toFixed(3)})`;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    // 4. Limpieza estricta de memoria WebGL y eventos al abandonar la página
    return () => {
      window.cancelAnimationFrame(rafId);
      if (!isTouchDevice) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
      obsidianGeometry.dispose();
      obsidianMaterial.dispose();
      staticOptimizedMaterial.dispose();
      scene.clear();
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      data-hero-sculpture="optical-center"
      data-lerp={SCULPTURE_PHYSICS_CONFIG.lerp}
      data-tilt-limits="x:15deg,y:25deg"
      data-optical-ior={SCULPTURE_PHYSICS_CONFIG.crystalOptical.ior}
      data-levitation="0.4Hz-6px"
      data-passive-rotation="0.15rad/s"
      data-fps-mode={fpsThrottled ? 'throttled-static' : 'caustic-physical'}
      aria-label="Fig. 01 — High-definition 2K volcanic obsidian and optical crystal 3D WebGL sculpture"
      className={`relative w-full max-w-[230px] sm:max-w-[275px] lg:max-w-[310px] flex flex-col items-center justify-center select-none rounded-none ${className}`}
    >
      {/* Escenario 3D Híbrido: Activo Fotográfico 2K + Shaders WebGL de Cristal (IOR 2.42) y Obsidiana (#0A0A0C) */}
      <div
        ref={kineticStageRef}
        className="relative z-10 w-[195px] h-[195px] sm:w-[235px] sm:h-[235px] lg:w-[268px] lg:h-[268px] flex items-center justify-center will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Image
          src="/images/obsidian-crystal-2k.webp"
          alt="Fig. 01 — Escultura monolítica de roca volcánica de obsidiana negra brillante y cristal óptico traslúcido facetado"
          width={2048}
          height={2048}
          priority
          sizes="(max-width: 640px) 195px, (max-width: 1024px) 235px, 268px"
          className="relative z-10 w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_18px_28px_rgba(10,10,12,0.22)]"
        />

        {/* Canvas WebGL de Three.js sincronizado sin malla OctahedronGeometry ni aristas de alambre superpuestas */}
        <canvas
          ref={canvasRef}
          width={268}
          height={268}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 w-full h-full opacity-0"
        />
      </div>

      {/* Sombra de contacto de estudio + Línea cáustica de refracción óptica */}
      <div
        ref={shadowRef}
        aria-hidden="true"
        className="relative z-0 -mt-3 w-[150px] sm:w-[176px] h-[9px] flex flex-col items-center justify-center pointer-events-none will-change-transform"
      >
        <div
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(10, 10, 12, 0.46) 0%, rgba(10, 10, 12, 0.18) 58%, rgba(10, 10, 12, 0) 100%)',
          }}
          className="w-full h-[7px] dark:opacity-85"
        />
        <div
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.72) 45%, rgba(210,225,245,0.55) 78%, rgba(255,255,255,0) 100%)',
          }}
          className="w-[74px] h-[1px] -mt-[4px] ml-8 opacity-85 dark:opacity-50"
        />
      </div>
    </div>
  );
};
