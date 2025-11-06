"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, useMotionValue } from "framer-motion";

export default function PointerBlobTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Cursor position with spring physics
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    // Check for reduced motion
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a, button")) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a, button")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Animation variables
    let animationFrameId: number;
    let time = 0;

    // Pastel gradient colors
    const colors = ["#aee6ff", "#ffc3f8", "#fff1a8"];

    // Draw morphing blob
    const drawBlob = (x: number, y: number, size: number, timeOffset: number) => {
      const points = 12;
      const radiusVariation = 0.3;

      ctx.beginPath();

      for (let i = 0; i <= points; i++) {
        const angle = (Math.PI * 2 * i) / points;

        // Organic morphing using sine waves
        const noise =
          Math.sin(timeOffset * 0.5 + i * 0.5) * 0.3 +
          Math.cos(timeOffset * 0.3 + i * 0.8) * 0.2 +
          Math.sin(timeOffset * 0.7 + angle * 2) * 0.15;

        const radius = size * (1 + noise * radiusVariation);
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          // Smooth curves using quadratic bezier
          const prevAngle = (Math.PI * 2 * (i - 1)) / points;
          const prevNoise =
            Math.sin(timeOffset * 0.5 + (i - 1) * 0.5) * 0.3 +
            Math.cos(timeOffset * 0.3 + (i - 1) * 0.8) * 0.2 +
            Math.sin(timeOffset * 0.7 + prevAngle * 2) * 0.15;
          const prevRadius = size * (1 + prevNoise * radiusVariation);
          const prevX = x + Math.cos(prevAngle) * prevRadius;
          const prevY = y + Math.sin(prevAngle) * prevRadius;

          const cpx = (prevX + px) / 2;
          const cpy = (prevY + py) / 2;
          ctx.quadraticCurveTo(prevX, prevY, cpx, cpy);
        }
      }

      ctx.closePath();

      // Animated gradient
      const hueShift = (Math.sin(timeOffset * 0.2) + 1) * 0.5;
      const colorIndex = Math.floor(hueShift * colors.length);
      const nextColorIndex = (colorIndex + 1) % colors.length;
      const mixAmount = (hueShift * colors.length) % 1;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, colors[colorIndex] + (isHovering ? "bb" : "88"));
      gradient.addColorStop(0.5, colors[nextColorIndex] + (isHovering ? "99" : "66"));
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      time += 0.02;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set blend mode
      ctx.globalCompositeOperation = "screen";

      // Get smooth cursor position
      const x = smoothX.get();
      const y = smoothY.get();

      // Draw blob with dynamic size
      const currentSize = isHovering ? 200 : 150;
      drawBlob(x, y, currentSize, time);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorX, cursorY, smoothX, smoothY, isHovering]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Canvas for blob */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          opacity: 0.35,
          willChange: "transform",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
          opacity: 0.07,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
