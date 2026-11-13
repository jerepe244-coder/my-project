'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as THREE from 'three';

export type SomaViewerMode = 'miron' | 'uv' | 'refill';

interface SomaProductViewer3DProps {
  mode: SomaViewerMode;
  language: 'es' | 'en';
}

function createSomaLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Raw filter paper background (#EFECE4)
  ctx.fillStyle = '#EFECE4';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle mineral paper grain
  for (let i = 0; i < 4200; i++) {
    const x = (i * 73) % canvas.width;
    const y = (i * 137) % canvas.height;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(10, 10, 12, 0.025)' : 'rgba(200, 125, 85, 0.025)';
    ctx.fillRect(x, y, 2, 2);
  }

  // Top and bottom hairline perimeter borders
  ctx.strokeStyle = '#0A0A0C';
  ctx.lineWidth = 3;
  ctx.strokeRect(38, 38, canvas.width - 76, canvas.height - 76);

  // Center the main front typography around X = 768 (u = 0.5 -> +Z facing camera)
  const cx = canvas.width / 2;

  // Top metadata line
  ctx.fillStyle = '#52504A';
  ctx.font = '500 22px "Geist", "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('FORM-01/REG  ·  LOTE N° 08  ·  MIRON VIOLETGLAS', cx, 118);

  // Horizontal divider under metadata
  ctx.strokeStyle = 'rgba(10, 10, 12, 0.22)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(220, 152);
  ctx.lineTo(canvas.width - 220, 152);
  ctx.stroke();

  // Monumental Brand Title: SŌMA
  ctx.fillStyle = '#0A0A0C';
  ctx.font = '800 132px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('SŌMA', cx, 308);

  // Required editorial line: SŌMA · 01 — Cellular Serum 30ml
  ctx.fillStyle = '#8E4E2E';
  ctx.font = 'italic 44px Georgia, "Times New Roman", serif';
  ctx.fillText('SŌMA · 01 — Cellular Serum 30ml', cx, 386);

  // Horizontal divider
  ctx.strokeStyle = 'rgba(10, 10, 12, 0.22)';
  ctx.beginPath();
  ctx.moveTo(220, 434);
  ctx.lineTo(canvas.width - 220, 434);
  ctx.stroke();

  // Bioactive formulation matrix
  ctx.fillStyle = '#0A0A0C';
  ctx.font = '500 25px "Geist", "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Phyto-Peptide Tri-Complex', 260, 496);
  ctx.fillText('Olive Squalane (ECOCERT)', 260, 542);
  ctx.fillText('Wild Commiphora Myrrha', 260, 588);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#8E4E2E';
  ctx.fillText('4.8%', canvas.width - 260, 496);
  ctx.fillStyle = '#0A0A0C';
  ctx.fillText('Pure Base', canvas.width - 260, 542);
  ctx.fillText('30 ml / 1.0 fl. oz.', canvas.width - 260, 588);

  // Bottom bar
  ctx.fillStyle = '#52504A';
  ctx.font = '500 21px "Geist", "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Apotecario Celular  ·  Basilea / Patagonia', cx, 678);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function createBrushedMetalTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#888888';
    ctx.fillRect(0, 0, 512, 512);
    for (let y = 0; y < 512; y++) {
      const shade = 110 + Math.floor(((Math.sin(y * 1.9) + Math.cos(y * 4.3)) * 0.5 + 0.5) * 48);
      ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
      ctx.fillRect(0, y, 512, 1);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 3);
  tex.needsUpdate = true;
  return tex;
}

function createKnurledCollarTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#404040';
    ctx.fillRect(0, 0, 512, 128);
    const ribs = 64;
    const step = 512 / ribs;
    for (let i = 0; i < ribs; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#d8d8d8' : '#262626';
      ctx.fillRect(i * step, 0, step * 0.5, 128);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

function createStudioEnvMap(renderer: THREE.WebGLRenderer): THREE.WebGLRenderTarget {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x0b0a10);

  const softboxGeo = new THREE.PlaneGeometry(8, 10);
  const keyMat = new THREE.MeshBasicMaterial({ color: 0xf8f6f0, side: THREE.DoubleSide });
  const fillMat = new THREE.MeshBasicMaterial({ color: 0xd8d6e8, side: THREE.DoubleSide });
  const warmMat = new THREE.MeshBasicMaterial({ color: 0xe6a87c, side: THREE.DoubleSide });

  const keyBox = new THREE.Mesh(softboxGeo, keyMat);
  keyBox.position.set(5, 4, 5);
  keyBox.lookAt(0, 0, 0);

  const leftStripGeo = new THREE.PlaneGeometry(2.5, 12);
  const leftStrip = new THREE.Mesh(leftStripGeo, fillMat);
  leftStrip.position.set(-6, 1.5, 3);
  leftStrip.lookAt(0, 0, 0);

  const rightWarmStrip = new THREE.Mesh(leftStripGeo, warmMat);
  rightWarmStrip.position.set(6, -1, -2);
  rightWarmStrip.lookAt(0, 0, 0);

  const overheadGeo = new THREE.PlaneGeometry(10, 10);
  const overhead = new THREE.Mesh(overheadGeo, keyMat);
  overhead.position.set(0, 8, 0);
  overhead.lookAt(0, 0, 0);

  envScene.add(keyBox, leftStrip, rightWarmStrip, overhead);
  const target = pmremGenerator.fromScene(envScene, 0.035);

  softboxGeo.dispose();
  leftStripGeo.dispose();
  overheadGeo.dispose();
  keyMat.dispose();
  fillMat.dispose();
  warmMat.dispose();
  pmremGenerator.dispose();

  return target;
}

export const SomaProductViewer3D: React.FC<SomaProductViewer3DProps> = ({ mode, language }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modeRef = useRef<SomaViewerMode>(mode);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  // Sync latest mode prop to animation/material ref without recreating WebGLRenderer
  const updateModeVisualsRef = useRef<((nextMode: SomaViewerMode) => void) | null>(null);

  useEffect(() => {
    modeRef.current = mode;
    if (updateModeVisualsRef.current) {
      updateModeVisualsRef.current(mode);
    }
  }, [mode]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    const width = Math.max(container.clientWidth, 300);
    const height = Math.max(container.clientHeight, 360);
    renderer.setSize(width, height, false);

    const scene = new THREE.Scene();
    const envTarget = createStudioEnvMap(renderer);
    scene.environment = envTarget.texture;

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 50);
    camera.position.set(0, 0.15, 6.2);

    // Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    const keyLight = new THREE.DirectionalLight(0xfff9f0, 2.8);
    keyLight.position.set(4, 5, 5);

    const fillLight = new THREE.DirectionalLight(0xd9e0f5, 1.4);
    fillLight.position.set(-4.5, 1.5, 3);

    const rimLight = new THREE.DirectionalLight(0xf6d3b8, 2.1);
    rimLight.position.set(2.5, -1, -4.5);

    // Mode 02: Spectral UV Inspection Focal Light (#7C3AED) + Botanical Serum Glow
    const uvSpotLight = new THREE.SpotLight(0x7c3aed, 0, 16, Math.PI / 4.2, 0.88, 1.1);
    uvSpotLight.position.set(-2.9, 2.3, 2.5);
    scene.add(uvSpotLight.target);

    const serumGlowLight = new THREE.PointLight(0xc87d55, 0.2, 4.5);
    serumGlowLight.position.set(0, -0.55, 0.1);

    scene.add(ambientLight, keyLight, fillLight, rimLight, uvSpotLight, serumGlowLight);

    // Master Bottle Group
    const bottleGroup = new THREE.Group();
    bottleGroup.position.set(0, -0.05, 0);
    scene.add(bottleGroup);

    // 1. Bottle Body LatheGeometry (cylindrical 30ml apothecary silhouette with thick glass walls & defined shoulders)
    const bodyPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.0, -1.22),
      new THREE.Vector2(0.36, -1.22),
      new THREE.Vector2(0.54, -1.28),
      new THREE.Vector2(0.60, -1.24),
      new THREE.Vector2(0.60, -1.16),
      new THREE.Vector2(0.60, 0.16),
      new THREE.Vector2(0.585, 0.27),
      new THREE.Vector2(0.535, 0.37),
      new THREE.Vector2(0.45, 0.455),
      new THREE.Vector2(0.34, 0.515),
      new THREE.Vector2(0.265, 0.56),
      new THREE.Vector2(0.258, 0.62),
      new THREE.Vector2(0.258, 0.86),
      new THREE.Vector2(0.28, 0.89),
      new THREE.Vector2(0.275, 0.92),
      new THREE.Vector2(0.22, 0.92),
      new THREE.Vector2(0.205, 0.84),
      new THREE.Vector2(0.205, 0.56),
      new THREE.Vector2(0.30, 0.46),
      new THREE.Vector2(0.505, 0.20),
      new THREE.Vector2(0.505, -1.12),
      new THREE.Vector2(0.0, -1.12),
    ];
    const bottleBodyGeo = new THREE.LatheGeometry(bodyPoints, 72);

    // 3 Materials for the 3 Live Modes
    const brushedTex = createBrushedMetalTexture();
    const mironMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#190c2b'),
      attenuationColor: new THREE.Color('#2c1052'),
      attenuationDistance: 0.62,
      ior: 1.52,
      transmission: 0.86,
      thickness: 0.95,
      roughness: 0.055,
      metalness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.96,
      envMapIntensity: 1.45,
      transparent: true,
    });

    const uvMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#251047'),
      attenuationColor: new THREE.Color('#6b21a8'),
      attenuationDistance: 0.82,
      ior: 1.52,
      transmission: 0.82,
      thickness: 0.85,
      roughness: 0.05,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      emissive: new THREE.Color('#3b0764'),
      emissiveIntensity: 0.34,
      envMapIntensity: 1.6,
      transparent: true,
    });

    const refillAluminumMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c2c5cc'),
      metalness: 0.88,
      roughness: 0.24,
      bumpMap: brushedTex,
      bumpScale: 0.008,
      roughnessMap: brushedTex,
      envMapIntensity: 1.55,
    });

    const bottleMesh = new THREE.Mesh<
      THREE.LatheGeometry,
      THREE.MeshPhysicalMaterial | THREE.MeshStandardMaterial
    >(bottleBodyGeo, mironMaterial);
    bottleGroup.add(bottleMesh);

    // 2. Threaded Neck Rings (3 fine DIN 18 screw thread ridges)
    const threadGeo = new THREE.TorusGeometry(0.262, 0.012, 12, 48);
    const threadMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#2a1842'),
      roughness: 0.16,
      ior: 1.52,
      transmission: 0.55,
      transparent: true,
    });
    const threadPositions = [0.64, 0.71, 0.78];
    const threadMeshes: THREE.Mesh[] = threadPositions.map((py) => {
      const m = new THREE.Mesh(threadGeo, threadMat);
      m.rotation.x = Math.PI / 2;
      m.rotation.y = 0.06;
      m.position.y = py;
      bottleGroup.add(m);
      return m;
    });

    // 3. Matte Black Knurled Collar (CylinderGeometry)
    const knurledTex = createKnurledCollarTexture();
    const collarMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141318'),
      roughness: 0.72,
      metalness: 0.14,
      bumpMap: knurledTex,
      bumpScale: 0.018,
    });
    const collarGeo = new THREE.CylinderGeometry(0.305, 0.305, 0.34, 64);
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.position.y = 0.84;

    const collarCrownGeo = new THREE.CylinderGeometry(0.275, 0.305, 0.055, 64);
    const collarCrownMesh = new THREE.Mesh(collarCrownGeo, collarMat);
    collarCrownMesh.position.y = 1.035;
    bottleGroup.add(collarMesh, collarCrownMesh);

    // 4. Dropper Rubber Bulb (LatheGeometry)
    const bulbPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.0, 1.04),
      new THREE.Vector2(0.21, 1.04),
      new THREE.Vector2(0.21, 1.08),
      new THREE.Vector2(0.165, 1.11),
      new THREE.Vector2(0.158, 1.19),
      new THREE.Vector2(0.195, 1.32),
      new THREE.Vector2(0.202, 1.43),
      new THREE.Vector2(0.175, 1.53),
      new THREE.Vector2(0.11, 1.60),
      new THREE.Vector2(0.0, 1.62),
    ];
    const bulbGeo = new THREE.LatheGeometry(bulbPoints, 64);
    const bulbMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#17161b'),
      roughness: 0.88,
      metalness: 0.03,
    });
    const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
    bottleGroup.add(bulbMesh);

    // 5. Interior Glass Pipette & Botanical Serum
    const pipetteMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffffff'),
      transmission: 0.92,
      ior: 1.48,
      roughness: 0.04,
      thickness: 0.12,
      transparent: true,
    });
    const pipetteTubeGeo = new THREE.CylinderGeometry(0.038, 0.038, 1.52, 24);
    const pipetteTube = new THREE.Mesh(pipetteTubeGeo, pipetteMat);
    pipetteTube.position.y = 0.0;

    const pipetteTipGeo = new THREE.CylinderGeometry(0.038, 0.013, 0.18, 24);
    const pipetteTip = new THREE.Mesh(pipetteTipGeo, pipetteMat);
    pipetteTip.position.y = -0.85;

    // Suspended Amber Drop at Pipette Tip
    const dropPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.0, -0.075),
      new THREE.Vector2(0.032, -0.055),
      new THREE.Vector2(0.042, -0.015),
      new THREE.Vector2(0.025, 0.035),
      new THREE.Vector2(0.008, 0.07),
      new THREE.Vector2(0.0, 0.08),
    ];
    const dropGeo = new THREE.LatheGeometry(dropPoints, 32);
    const serumMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#c87d55'),
      emissive: new THREE.Color('#8f4920'),
      emissiveIntensity: 0.22,
      transmission: 0.55,
      ior: 1.46,
      roughness: 0.08,
      transparent: true,
    });
    const dropMesh = new THREE.Mesh(dropGeo, serumMat);
    dropMesh.position.y = -0.99;

    // Botanical Liquid Body inside Bottle
    const serumGeo = new THREE.CylinderGeometry(0.49, 0.49, 1.12, 48);
    const serumMesh = new THREE.Mesh(serumGeo, serumMat);
    serumMesh.position.y = -0.54;

    bottleGroup.add(pipetteTube, pipetteTip, dropMesh, serumMesh);

    // 6. Minimalist Wrap-Around Editorial Label (CylinderGeometry)
    const labelTex = createSomaLabelTexture();
    const labelGeo = new THREE.CylinderGeometry(
      0.604,
      0.604,
      1.12,
      72,
      1,
      true,
      -Math.PI * 0.72,
      Math.PI * 1.44
    );
    const labelMat = new THREE.MeshStandardMaterial({
      map: labelTex,
      roughness: 0.84,
      metalness: 0.02,
    });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.y = -0.46;
    bottleGroup.add(labelMesh);

    // Function to apply mode state cleanly
    const applyModeVisuals = (activeMode: SomaViewerMode) => {
      if (activeMode === 'miron') {
        bottleMesh.material = mironMaterial;
        pipetteTube.visible = true;
        pipetteTip.visible = true;
        dropMesh.visible = true;
        serumMesh.visible = true;
        threadMeshes.forEach((m) => {
          m.visible = true;
        });

        keyLight.intensity = 2.8;
        fillLight.intensity = 1.4;
        rimLight.intensity = 2.1;
        uvSpotLight.intensity = 0;
        serumGlowLight.intensity = 0.25;
        serumMat.emissiveIntensity = 0.18;
      } else if (activeMode === 'uv') {
        bottleMesh.material = uvMaterial;
        pipetteTube.visible = true;
        pipetteTip.visible = true;
        dropMesh.visible = true;
        serumMesh.visible = true;
        threadMeshes.forEach((m) => {
          m.visible = true;
        });

        keyLight.intensity = 0.7;
        fillLight.intensity = 0.5;
        rimLight.intensity = 1.4;
        uvSpotLight.intensity = 22.0;
        serumGlowLight.intensity = 3.8;
        serumMat.emissiveIntensity = 0.95;
      } else {
        // Eco-Refill Recycled Aluminum Capsule
        bottleMesh.material = refillAluminumMaterial;
        pipetteTube.visible = false;
        pipetteTip.visible = false;
        dropMesh.visible = false;
        serumMesh.visible = false;
        threadMeshes.forEach((m) => {
          m.visible = false;
        });

        keyLight.intensity = 3.1;
        fillLight.intensity = 1.8;
        rimLight.intensity = 2.8;
        uvSpotLight.intensity = 0;
        serumGlowLight.intensity = 0;
      }
    };

    updateModeVisualsRef.current = applyModeVisuals;
    applyModeVisuals(modeRef.current);

    // Smooth 360° Pointer & Touch Inertia Drag (without intercepting vertical page scroll)
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let targetRotY = -0.18;
    let targetRotX = 0.08;
    let currentRotY = targetRotY;
    let currentRotX = targetRotX;
    let passiveTime = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      targetRotY += dx * 0.009;
      targetRotX = THREE.MathUtils.clamp(targetRotX + dy * 0.005, -0.52, 0.52);
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerUp, { passive: true });

    // ResizeObserver for crisp responsive sizing
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = Math.max(entry.contentRect.width, 280);
      const h = Math.max(entry.contentRect.height, 340);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    });
    resizeObserver.observe(container);

    // IntersectionObserver to pause RAF cleanly when offscreen
    let isInViewport = true;
    let rafId = 0;
    let lastFrameTime = performance.now();

    const animate = (now: number) => {
      if (!isInViewport) {
        rafId = 0;
        return;
      }
      const dt = Math.min((now - lastFrameTime) / 1000, 0.1);
      lastFrameTime = now;
      passiveTime += dt;

      if (!isDragging) {
        // Slow passive rotation at 0.15 rad/s
        targetRotY += 0.15 * dt;
      }

      // Damped inertia (lerp)
      currentRotY += (targetRotY - currentRotY) * 0.085;
      currentRotX += (targetRotX - currentRotX) * 0.085;

      bottleGroup.rotation.y = currentRotY;
      bottleGroup.rotation.x = currentRotX;
      bottleGroup.position.y = -0.05 + Math.sin(passiveTime * 1.4) * 0.035;

      if (modeRef.current === 'uv') {
        uvSpotLight.position.x = Math.sin(passiveTime * 1.2) * 3.2;
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (!rafId && isInViewport) {
        lastFrameTime = performance.now();
        rafId = requestAnimationFrame(animate);
      }
    };

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isInViewport = entry.isIntersecting;
        if (isInViewport) {
          startLoop();
        } else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { threshold: 0.02 }
    );
    visibilityObserver.observe(container);

    startLoop();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();

      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);

      updateModeVisualsRef.current = null;

      // Full disposal of geometries, textures, materials, and WebGLRenderer
      bottleBodyGeo.dispose();
      threadGeo.dispose();
      collarGeo.dispose();
      collarCrownGeo.dispose();
      bulbGeo.dispose();
      pipetteTubeGeo.dispose();
      pipetteTipGeo.dispose();
      dropGeo.dispose();
      serumGeo.dispose();
      labelGeo.dispose();

      labelTex.dispose();
      brushedTex.dispose();
      knurledTex.dispose();
      envTarget.dispose();

      mironMaterial.dispose();
      uvMaterial.dispose();
      refillAluminumMaterial.dispose();
      threadMat.dispose();
      collarMat.dispose();
      bulbMat.dispose();
      pipetteMat.dispose();
      serumMat.dispose();
      labelMat.dispose();

      renderer.dispose();
    };
  }, []);

  if (webglUnavailable) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-64 h-64 border border-[var(--soma-border)] monolith-hairline bg-[var(--soma-bg)] overflow-hidden">
          <Image
            src="/images/soma-01-glass.webp"
            alt={language === 'es' ? 'Frasco biofotónico Sōma' : 'Sōma biophotonic vessel'}
            fill
            loading="lazy"
            decoding="async"
            sizes="256px"
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[440px] flex items-center justify-center select-none"
      style={{ touchAction: 'pan-y' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block outline-none"
        style={{ touchAction: 'pan-y' }}
        aria-label={
          language === 'es'
            ? 'Visor 3D interactivo del frasco Sōma Miron 30ml'
            : 'Interactive 3D viewer for Sōma Miron 30ml bottle'
        }
      />

      {/* Marcas de registro óptico discretas */}
      <div className="pointer-events-none absolute top-3 right-3 text-[11px] font-swiss font-medium text-[var(--soma-dim)] tabular-nums">
        {language === 'es' ? 'Arrastrar 360°' : 'Drag 360°'}
      </div>
    </div>
  );
};
