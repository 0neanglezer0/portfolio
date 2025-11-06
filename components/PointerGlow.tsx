"use client";

import { useEffect, useRef, useState } from "react";

export default function PointerGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Check for reduced motion preference
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX - 150, y: e.clientY - 150 });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none"
      style={{
        left: 0,
        top: 0,
        width: "300px",
        height: "300px",
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.5s ease-out",
        zIndex: 9999,
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(180,120,255,0.8) 0%, rgba(120,200,255,0.5) 40%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.7,
        }}
      />
    </div>
  );
}
