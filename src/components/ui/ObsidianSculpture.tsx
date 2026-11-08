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

    // 1. Núcleo de obsidiana negra pulida (#0A0A0C) de alta reflectancia
    const obsidianGeometry = new THREE.IcosahedronGeometry(0.68, 0);
    const obsidianMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(SCULPTURE_PHYSICS_CONFIG.obsidianCoreColor),
      roughness: 0.06,
      metalness: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
    });
    const obsidianMesh = new THREE.Mesh(obsidianGeometry, obsidianMaterial);
    obsidianMesh.position.set(-0.14, -0.06, -0.05);
    sculptureGroup.add(obsidianMesh);

    // 2. Prisma envolvente de cristal óptico (ior: 2.42, transmission: 1.0, roughness: 0.03)
    const crystalGeometry = new THREE.OctahedronGeometry(1.06, 0);
    const crystalPhysicalMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f8fafc'),
      ior: SCULPTURE_PHYSICS_CONFIG.crystalOptical.ior,
      transmission: SCULPTURE_PHYSICS_CONFIG.crystalOptical.transmission,
      roughness: SCULPTURE_PHYSICS_CONFIG.crystalOptical.roughness,
      thickness: SCULPTURE_PHYSICS_CONFIG.crystalOptical.thickness,
      iridescence: 0.48,
      iridescenceIOR: 2.42,
      specularIntensity: 1.0,
      reflectivity: 1.0,
      transparent: true,
      opacity: 0.42,
    });

    // Material estático optimizado para el FPS Throttle (< 50 FPS)
    const staticOptimizedMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e2e8f0'),
      roughness: 0.12,
      metalness: 0.25,
      transparent: true,
      opacity: 0.28,
    });

    const crystalMesh = new THREE.Mesh<
      THREE.OctahedronGeometry,
      THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial
    >(crystalGeometry, crystalPhysicalMaterial);
    crystalMesh.position.set(0.12, 0.05, 0.12);
    sculptureGroup.add(crystalMesh);

    // 3. Shader de dispersión cáustica en aristas (prismática RGB IOR 2.42)
    const edgesGeometry = new THREE.EdgesGeometry(crystalGeometry, 12);
    const causticUniforms = {
      uTime: { value: 0 },
      uIor: { value: SCULPTURE_PHYSICS_CONFIG.crystalOptical.ior },
    };
    const causticEdgeMaterial = new THREE.ShaderMaterial({
      uniforms: causticUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uIor;
        varying vec3 vPos;
        void main() {
          float phase = dot(vPos, vec3(1.8, 2.2, 1.4)) * (uIor * 0.4) + uTime * 1.2;
          vec3 causticRgb = vec3(
            0.78 + 0.22 * sin(phase),
            0.85 + 0.15 * sin(phase + 1.05),
            0.96 + 0.04 * sin(phase + 2.10)
          );
          gl_FragColor = vec4(causticRgb, 0.52);
        }
      `,
    });
    const causticEdges = new THREE.LineSegments(edgesGeometry, causticEdgeMaterial);
    causticEdges.position.copy(crystalMesh.position);
    sculptureGroup.add(causticEdges);

    // Estado cinemático de rotación e inercia (lerp: 0.05, ±15° X, ±25° Y)
    const maxTiltXRad = THREE.MathUtils.degToRad(SCULPTURE_PHYSICS_CONFIG.maxTiltXDeg);
    const maxTiltYRad = THREE.MathUtils.degToRad(SCULPTURE_PHYSICS_CONFIG.maxTiltYDeg);

    let targetTiltXDeg = 0;
    let targetTiltYDeg = 0;
    let currentTiltXDeg = 0;
    let currentTiltYDeg = 0;
    let passiveAngleRad = 0;
    let lastPointerMoveTime = 0;
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
      lastPointerMoveTime = performance.now();
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
          crystalMesh.material = staticOptimizedMaterial;
          causticEdges.visible = false;
          setFpsThrottled(true);
        }
        frameCount = 0;
        fpsWindowStart = now;
      }

      // 2. Balanceo inercial mediante interpolación suave (lerp: 0.05)
      currentTiltXDeg += (targetTiltXDeg - currentTiltXDeg) * SCULPTURE_PHYSICS_CONFIG.lerp;
      currentTiltYDeg += (targetTiltYDeg - currentTiltYDeg) * SCULPTURE_PHYSICS_CONFIG.lerp;

      // 3. Levitación pasiva (0.4 Hz, amplitud 6 px) y rotación pasiva (0.15 rad/s) en reposo o táctil
      const isCursorIdle = isTouchDevice || now - lastPointerMoveTime > 180;
      if (isCursorIdle) {
        passiveAngleRad += SCULPTURE_PHYSICS_CONFIG.passiveRotationRadPerSec * dt;
      }

      const levitationY =
        Math.sin(elapsedSec * Math.PI * 2 * SCULPTURE_PHYSICS_CONFIG.levitationFrequencyHz) *
        SCULPTURE_PHYSICS_CONFIG.levitationAmplitudePx;

      // Aplicación a la escena WebGL de Three.js
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

      sculptureGroup.rotation.x = clampedRotX;
      sculptureGroup.rotation.y = clampedRotY + passiveAngleRad;
      sculptureGroup.position.y = (levitationY / 268) * 1.4;

      if (!isThrottledLocal) {
        causticUniforms.uTime.value = elapsedSec;
      }

      if (renderer) {
        renderer.render(scene, camera);
      }

      // Aplicación sincronizada al contenedor óptico 2K y su sombra de contacto
      const passiveTiltDeg = Math.sin(passiveAngleRad) * 3.2;
      const totalRotY = Math.max(
        -SCULPTURE_PHYSICS_CONFIG.maxTiltYDeg,
        Math.min(SCULPTURE_PHYSICS_CONFIG.maxTiltYDeg, currentTiltYDeg + passiveTiltDeg)
      );

      stageEl.style.transform = `perspective(950px) translate3d(0px, ${levitationY.toFixed(
        2
      )}px, 0px) rotateX(${currentTiltXDeg.toFixed(2)}deg) rotateY(${totalRotY.toFixed(2)}deg)`;

      if (shadowEl) {
        const shadowShiftX = (-totalRotY / SCULPTURE_PHYSICS_CONFIG.maxTiltYDeg) * 6;
        const shadowScale = 1 - (levitationY / SCULPTURE_PHYSICS_CONFIG.levitationAmplitudePx) * 0.05;
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
      crystalGeometry.dispose();
      crystalPhysicalMaterial.dispose();
      staticOptimizedMaterial.dispose();
      edgesGeometry.dispose();
      causticEdgeMaterial.dispose();
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

        {/* Canvas WebGL de Three.js con refracción IOR 2.42, transmisión 1.0 y dispersión cáustica en aristas */}
        <canvas
          ref={canvasRef}
          width={268}
          height={268}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 w-full h-full mix-blend-screen opacity-85"
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
