"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blurDataURLs } from "@/lib/image-utils";

export default function WorkPage() {
  const experiences = [
    {
      id: "b2b-ax-manager",
      title: "B2B AX Manager",
      titleKR: "B2B AX 매니저",
      tags: ["AI Education", "Workshop Design"],
      year: "2025",
      company: "GPTers",
    },
    {
      id: "marketing-campaign-operator",
      title: "Marketing Campaign Operator",
      titleKR: "마케팅 캠페인 운영 담당",
      tags: ["Campaign Design", "Automation"],
      year: "2024-2025",
      company: "GPTers",
    },
    {
      id: "overseas-camp-leader",
      title: "Overseas Camp Leader & Program Designer",
      titleKR: "해외 캠프 인솔교사 & 프로그램 기획 운영",
      tags: ["Program Design", "Leadership"],
      year: "2023-2025",
      company: "SKKU",
    },
    {
      id: "ai-forum-planning-intern",
      title: "AI Forum Planning Intern",
      titleKR: "AI 포럼 행사 기획 인턴",
      tags: ["Event Planning", "AI"],
      year: "2024",
      company: "AIF",
    },
    {
      id: "data-content-creator",
      title: "Data-driven Content Creator",
      titleKR: "데이터 기반 콘텐츠 제작 담당",
      tags: ["Data Visualization", "Content Design"],
      year: "2022-2023",
      company: "SKKU",
    },
    {
      id: "campus-town-supporter",
      title: "Campus Town Supporter",
      titleKR: "창업지원단 캠퍼스타운 서포터즈",
      tags: ["Startup Support", "Community"],
      year: "2023",
      company: "SKKU",
    },
    {
      id: "volunteer-media-instructor",
      title: "Volunteer Media Instructor",
      titleKR: "고등학교 교내 PPT 강사",
      tags: ["Education", "Presentation"],
      year: "2019",
      company: "High School",
    },
  ];

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-screen-2xl mx-auto">
          {/* Title with count */}
          <div className="mb-20">
            <div className="flex items-baseline gap-4">
              <h1 className="text-5xl md:text-7xl font-light">Work</h1>
              <span className="text-xl text-zinc-500">{experiences.length}</span>
            </div>
          </div>

          {/* Experience Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link href={`/work/${exp.id}`} className="group block">
                  {/* Image */}
                  <motion.div
                    className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 mb-6 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={`/images/work/${exp.id}.jpg`}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      placeholder="blur"
                      blurDataURL={blurDataURLs.neutral}
                    />
                  </motion.div>

                {/* Info */}
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-light group-hover:opacity-60 transition-opacity">
                      {exp.title}
                    </h3>
                    <span className="text-sm text-zinc-500 whitespace-nowrap">
                      {exp.year}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-zinc-500">
                    {exp.company}
                  </p>

                  {/* Arrow */}
                  <div className="pt-2 flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View details</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
