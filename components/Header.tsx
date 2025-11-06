"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/LocaleContext";
import { useTranslation } from "@/lib/useTranslation";
import MagneticEffect from "@/components/MagneticEffect";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { locale, setLocale } = useLocale();
  const t = useTranslation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleLanguage = () => {
    setLocale(locale === "en" ? "ko" : "en");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-black focus:text-white"
      >
        Skip to main content
      </a>

      <motion.header
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.8)",
          paddingTop: isScrolled ? "12px" : "24px",
          paddingBottom: isScrolled ? "12px" : "24px",
        }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm dark:bg-black/80"
        role="banner"
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center">
            {/* Left - Name */}
            <Link
              href="/"
              className="text-lg font-medium hover:opacity-60 transition-opacity"
              aria-label="Home - Gakyung Han"
            >
              Gakyung Han
            </Link>

            {/* Right - Language Toggle + Menu */}
            <div className="flex items-center gap-6">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="caption text-sm hover:opacity-60 transition-all duration-200 hover:scale-110"
                aria-label="Toggle language"
              >
                {locale === "en" ? "KR" : "EN"}
              </button>

              {/* Menu Button */}
              <button
                onClick={toggleMenu}
                className="caption text-sm hover:opacity-60 transition-opacity"
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
              >
                {t.nav.menu}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-black"
            role="dialog"
            aria-modal="true"
            onClick={closeMenu}
          >
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-6">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={closeMenu}
                className="caption text-sm hover:opacity-60 transition-opacity"
                aria-label="Close menu"
              >
                {t.nav.close}
              </button>
            </div>

            {/* Menu Items */}
            <motion.nav className="mt-20 space-y-8">
              {[
                { key: "home", label: t.nav.home, href: "/" },
                { key: "work", label: t.nav.work, href: "/work" },
                { key: "about", label: t.nav.about, href: "/about" },
                { key: "contact", label: t.nav.contact, href: "/contact" },
              ].map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <MagneticEffect
                    strength={0.3}
                    distortion={true}
                    distortionStrength={0.6}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="block text-5xl md:text-7xl font-display font-semibold hover:opacity-60 transition-opacity"
                    >
                      {item.label}
                    </Link>
                  </MagneticEffect>
                </motion.div>
              ))}

              {/* Social Links */}
              <div className="pt-12 space-y-4 text-xl text-zinc-600 dark:text-zinc-400">
                <a
                  href="https://www.instagram.com/0neanglezer0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-60 transition-opacity"
                >
                  Instagram →
                </a>
                <a
                  href="https://blog.naver.com/1z_z3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-60 transition-opacity"
                >
                  Naver Blog →
                </a>
              </div>
            </motion.nav>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
