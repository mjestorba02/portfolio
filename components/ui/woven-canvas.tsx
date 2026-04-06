"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const clock = new THREE.Clock();

    // Initial safe size — will be corrected by ResizeObserver
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Canvas fills container via CSS; pixel res is set separately
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    mount.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(9999, 9999);

    const particleCount = 35000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 300, 40);
    const posAttr = torusKnot.attributes.position;

    for (let i = 0; i < particleCount; i++) {
      const vi = i % posAttr.count;
      const x = posAttr.getX(vi);
      const y = posAttr.getY(vi);
      const z = posAttr.getZ(vi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const color = new THREE.Color();
      color.setHSL(0.68 + Math.random() * 0.15, 0.75, 0.55);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const handleMouseLeave = () => mouse.set(9999, 9999);

    const section = mount.parentElement || window;
    section.addEventListener("mousemove", handleMouseMove as EventListener);
    section.addEventListener("mouseleave", handleMouseLeave as EventListener);

    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const mouseWorld = new THREE.Vector3(mouse.x * 3.5, mouse.y * 3.5, 0);
      const posArray = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
        const cx = posArray[ix], cy = posArray[iy], cz = posArray[iz];
        const ox = originalPositions[ix], oy = originalPositions[iy], oz = originalPositions[iz];
        let vx = velocities[ix], vy = velocities[iy], vz = velocities[iz];

        const dx = cx - mouseWorld.x;
        const dy = cy - mouseWorld.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 2.0 && dist > 0.001) {
          const force = Math.pow((2.0 - dist) / 2.0, 2) * 0.035;
          vx += (dx / dist) * force;
          vy += (dy / dist) * force;
        }

        vx += (ox - cx) * 0.0015;
        vy += (oy - cy) * 0.0015;
        vz += (oz - cz) * 0.0015;
        vx *= 0.92; vy *= 0.92; vz *= 0.92;

        posArray[ix] = cx + vx;
        posArray[iy] = cy + vy;
        posArray[iz] = cz + vz;
        velocities[ix] = vx; velocities[iy] = vy; velocities[iz] = vz;
      }

      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = elapsed * 0.035;
      renderer.render(scene, camera);
    };

    animate();

    // ResizeObserver: resize renderer whenever the container changes size
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false); // false = don't override CSS style
        }
      }
    });
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      section.removeEventListener("mousemove", handleMouseMove as EventListener);
      section.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      torusKnot.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    />
  );
};
