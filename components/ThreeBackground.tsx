"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Check for reduced motion preference
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return; // Skip animation if user prefers reduced motion

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Limit DPR for better performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Custom shader material for gradient blobs
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;

      void main() {
        vUv = uv;
        vPosition = position;

        // Add some organic movement
        vec3 pos = position;
        float displacement = sin(pos.x * 2.0 + uTime) * 0.1 +
                            cos(pos.y * 2.0 + uTime * 0.8) * 0.1 +
                            sin(pos.z * 2.0 + uTime * 0.6) * 0.1;
        pos += normal * displacement;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;

      void main() {
        // Create smooth gradient based on position
        float gradient = sin(vPosition.x * 0.5 + uTime * 0.3) *
                        cos(vPosition.y * 0.5 + uTime * 0.2) *
                        sin(vPosition.z * 0.5 + uTime * 0.4);

        // Mix three colors
        vec3 color = mix(uColor1, uColor2, vUv.x);
        color = mix(color, uColor3, gradient * 0.5 + 0.5);

        gl_FragColor = vec4(color, 0.6);
      }
    `;

    // Create multiple blobs with different colors
    const blobs: THREE.Mesh[] = [];
    const blobData: Array<{ mesh: THREE.Mesh; initialPos: [number, number, number] }> = [];

    // Jelly gradient colors
    const blobConfigs = [
      {
        // Jelly 1: Mint to Blue
        color1: new THREE.Color(0xA7F3D0), // #A7F3D0
        color2: new THREE.Color(0x60A5FA), // #60A5FA
        color3: new THREE.Color(0x7DD3FC), // blend
        position: [-2.5, 1.5, -1],
        scale: 2.2,
      },
      {
        // Jelly 2: Yellow to Pink
        color1: new THREE.Color(0xFDE68A), // #FDE68A
        color2: new THREE.Color(0xFB7185), // #FB7185
        color3: new THREE.Color(0xFBBF24), // blend
        position: [2.8, -1.2, -2],
        scale: 2.5,
      },
      {
        // Jelly 3: Purple to Light Blue
        color1: new THREE.Color(0xC4B5FD), // #C4B5FD
        color2: new THREE.Color(0x93C5FD), // #93C5FD
        color3: new THREE.Color(0xA5B4FC), // blend
        position: [0, 2.5, -1.5],
        scale: 1.8,
      },
    ];

    blobConfigs.forEach((config) => {
      const geometry = new THREE.IcosahedronGeometry(1, 64);
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColor1: { value: config.color1 },
          uColor2: { value: config.color2 },
          uColor3: { value: config.color3 },
        },
        transparent: true,
        side: THREE.DoubleSide,
      });

      const blob = new THREE.Mesh(geometry, material);
      blob.position.set(...config.position);
      blob.scale.setScalar(config.scale);
      scene.add(blob);
      blobs.push(blob);
      blobData.push({ mesh: blob, initialPos: config.position as [number, number, number] });
    });

    // Animation with visibility detection
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update shader uniforms and animate blobs with slower floating motion (12-20s cycle)
      blobData.forEach((data, index) => {
        const blob = data.mesh;
        const initialPos = data.initialPos;
        const material = blob.material as THREE.ShaderMaterial;
        material.uniforms.uTime.value = elapsedTime;

        // Slower rotation for 15-18 second cycles, smaller amplitude
        const cycleSpeed = 0.03 + index * 0.005; // ~15-20s per cycle
        blob.rotation.x = Math.sin(elapsedTime * cycleSpeed) * 0.3;
        blob.rotation.y = Math.cos(elapsedTime * cycleSpeed * 0.8) * 0.3;
        blob.rotation.z = Math.sin(elapsedTime * cycleSpeed * 0.6) * 0.2;

        // Gentle floating motion with easeInOut effect
        const floatY = Math.sin(elapsedTime * cycleSpeed * 2) * 0.4;
        const floatX = Math.cos(elapsedTime * cycleSpeed * 1.5) * 0.3;
        blob.position.y = initialPos[1] + floatY;
        blob.position.x = initialPos[0] + floatX;
      });

      renderer.render(scene, camera);
    };

    // Pause animation when page is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
        clock.stop();
      } else {
        clock.start();
        animate();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      blobs.forEach((blob) => {
        blob.geometry.dispose();
        (blob.material as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-30"
    />
  );
}
