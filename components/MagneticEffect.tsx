"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface MagneticEffectProps {
  children: ReactNode;
  strength?: number; // Magnetic pull strength (default: 0.4)
  distortion?: boolean; // Enable text distortion/skew effect (default: false)
  distortionStrength?: number; // Distortion intensity (default: 0.5)
  className?: string;
}

export default function MagneticEffect({
  children,
  strength = 0.4,
  distortion = false,
  distortionStrength = 0.5,
  className = "",
}: MagneticEffectProps) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate distance from cursor to element center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Calculate distance percentage for distortion intensity
      const maxDistance = Math.sqrt(width * width + height * height) / 2;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const distanceRatio = Math.min(distance / maxDistance, 1);

      // Base magnetic animation properties
      const animationProps: gsap.TweenVars = {
        x: deltaX * strength,
        y: deltaY * strength,
        duration: 0.4,
        ease: "power2.out",
      };

      // Add distortion effects if enabled
      if (distortion) {
        const skewIntensity = distanceRatio * distortionStrength;
        const rotateIntensity = distanceRatio * distortionStrength * 2;

        animationProps.rotationX = (deltaY / height) * rotateIntensity * -10;
        animationProps.rotationY = (deltaX / width) * rotateIntensity * 10;
        animationProps.skewX = (deltaX / width) * skewIntensity * 5;
        animationProps.skewY = (deltaY / height) * skewIntensity * 3;
        animationProps.scale = 1 + distanceRatio * 0.05;
      }

      // Apply magnetic pull with optional distortion
      gsap.to(element, animationProps);
    };

    const handleMouseLeave = () => {
      // Return to original position with all transformations reset
      const resetProps: gsap.TweenVars = {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      };

      if (distortion) {
        resetProps.rotationX = 0;
        resetProps.rotationY = 0;
        resetProps.skewX = 0;
        resetProps.skewY = 0;
        resetProps.scale = 1;
      }

      gsap.to(element, resetProps);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, distortion, distortionStrength]);

  return (
    <div
      ref={magneticRef}
      className={`inline-block ${className}`}
      style={{
        perspective: distortion ? "1000px" : undefined,
        transformStyle: distortion ? "preserve-3d" : undefined,
      }}
    >
      {children}
    </div>
  );
}
