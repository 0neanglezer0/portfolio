"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blurDataURLs } from "@/lib/image-utils";
import { useTranslation } from "@/lib/useTranslation";

export default function AboutPage() {
  const t = useTranslation();
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-screen-2xl mx-auto">
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-display font-semibold mb-20">{t.about.title}</h1>

          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left - Profile Image */}
            <div>
              <div className="relative aspect-square bg-zinc-100 dark:bg-zinc-900 max-w-lg">
                <Image
                  src="/images/profile.jpg"
                  alt="Gakyung Han"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={blurDataURLs.neutral}
                />
              </div>
            </div>

            {/* Right - Bio */}
            <div className="space-y-8">
              <div className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t.about.bio.map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Education */}
              <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-sm text-zinc-500 mb-3">{t.about.education}</p>
                <p className="text-xl font-light">{t.about.university}</p>
                <p className="text-zinc-600 dark:text-zinc-400">{t.about.major}</p>
              </div>

              {/* Resume Download */}
              <div className="pt-8">
                <a
                  href="/resume.pdf"
                  download
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity"
                >
                  <span>{t.about.downloadResume}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </a>
              </div>

              {/* AI Tool Stack */}
              <div className="pt-12">
                <h3 className="text-2xl font-display font-semibold mb-6">{t.about.aiToolStack}</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Claude",
                    "ChatGPT",
                    "Gamma",
                    "Genspark",
                    "Figma",
                    "n8n",
                    "Lindy AI",
                    "Cursor",
                    "Notion AI",
                    "Perplexity",
                    "NotebookLM",
                    "Veo3",
                  ].map((tool) => (
                    <span
                      key={tool}
                      className="px-4 py-2 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 text-sm hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
