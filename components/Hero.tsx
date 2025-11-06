"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ThreeBackground from "./ThreeBackground";
import { useTranslation } from "@/lib/useTranslation";
import MagneticEffect from "./MagneticEffect";

export default function Hero() {
  const t = useTranslation();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden"
      aria-labelledby="home-hero-title"
    >
      <ThreeBackground />
      <motion.div
        className="max-w-screen-xl mx-auto w-full z-10 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-8">
          {/* Greeting */}
          <motion.h1
            id="home-hero-title"
            variants={itemVariants}
            className="hero-title text-5xl md:text-7xl lg:text-8xl font-display font-semibold"
            style={{ letterSpacing: '-0.01em' }}
          >
            {t.hero.greeting} <br />{t.hero.name}
          </motion.h1>

          {/* Tagline */}
          <motion.div variants={itemVariants} className="space-y-6 max-w-3xl">
            <p className="text-xl md:text-2xl font-light text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
              {t.hero.tagline}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="pt-8 flex flex-col sm:flex-row gap-4"
          >
            <MagneticEffect strength={0.2}>
              <Link
                href="/work"
                className="group inline-flex items-center justify-center gap-3 px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity"
              >
                <span>{t.hero.cta.projects}</span>
                <svg className="arrow-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </MagneticEffect>
            <MagneticEffect strength={0.2}>
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-3 px-6 py-3 border border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
              >
                <span>{t.hero.cta.about}</span>
                <svg className="arrow-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </MagneticEffect>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
