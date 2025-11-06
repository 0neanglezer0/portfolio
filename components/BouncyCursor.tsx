"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Position {
  x: number;
  y: number;
}

export default function BouncyCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Check if device has hover capability (not touch-only)
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Animate dot - fast and precise
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
        });
      }

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.hasAttribute("onclick") ||
        target.style.cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(isInteractive);
    };

    const handleMouseEnter = () => {
      if (dotRef.current && circleRef.current) {
        gsap.to([dotRef.current, circleRef.current], {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)",
        });
      }
    };

    const handleMouseLeave = () => {
      if (dotRef.current && circleRef.current) {
        gsap.to([dotRef.current, circleRef.current], {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    };

    // Animate circle to follow dot with lag - springy effect
    const animateCircle = () => {
      if (circleRef.current) {
        gsap.to(circleRef.current, {
          x: mousePos.current.x,
          y: mousePos.current.y,
          duration: 0.6, // Slower than dot for springy effect
          ease: "elastic.out(1, 0.3)",
        });
      }

      requestAnimationFrame(animateCircle);
    };

    // Start circle animation loop
    const animationId = requestAnimationFrame(animateCircle);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Update circle size when hovering over interactive elements
  useEffect(() => {
    if (!circleRef.current) return;

    if (isHovering) {
      gsap.to(circleRef.current, {
        width: 60,
        height: 60,
        duration: 0.3,
        ease: "elastic.out(1, 0.4)",
      });
    } else {
      gsap.to(circleRef.current, {
        width: 40,
        height: 40,
        duration: 0.3,
        ease: "elastic.out(1, 0.4)",
      });
    }
  }, [isHovering]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Border circle - follows with lag */}
      <div
        ref={circleRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 top-0 left-0"
        style={{
          width: "40px",
          height: "40px",
          scale: 0,
          opacity: 0,
        }}
      >
        <div
          className="w-full h-full rounded-full border-2 transition-colors duration-300"
          style={{
            borderColor: isHovering ? "rgb(147, 51, 234)" : "rgb(100, 116, 139)",
          }}
        />
      </div>

      {/* Center dot - follows precisely */}
      <div
        ref={dotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 top-0 left-0"
        style={{
          scale: 0,
          opacity: 0,
        }}
      >
        <div
          className="w-full h-full rounded-full transition-colors duration-300"
          style={{
            backgroundColor: isHovering ? "rgb(147, 51, 234)" : "rgb(15, 23, 42)",
          }}
        />
      </div>
    </div>
  );
}
