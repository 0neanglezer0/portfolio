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
      id: "ax-manager",
      title: "AX Manager",
      titleKR: "AX 매니저",
      tags: ["AI Transformation", "B2B Education"],
      year: "Jul 2025 - Present",
      company: "Geniefy Inc.",
      location: "Seoul, South Korea",
    },
    {
      id: "account-manager",
      title: "Account Manager",
      titleKR: "어카운트 매니저",
      tags: ["Marketing Automation", "Campaign Design"],
      year: "May 2025 - Jul 2025",
      company: "Bizmatrixx - Insider",
      location: "Seoul, South Korea",
    },
    {
      id: "camp-teacher",
      title: "Overseas Education Camp Teacher & Program Coordinator",
      titleKR: "해외 교육 캠프 교사 및 프로그램 코디네이터",
      tags: ["Education", "Cross-cultural Leadership"],
      year: "Jul 2023",
      company: "MBC Global Camp",
      location: "London Area, United Kingdom",
    },
    {
      id: "forum-intern",
      title: "Forum Operations & Speaker Support Intern",
      titleKR: "포럼 운영 및 연사 지원 인턴",
      tags: ["Event Planning", "Speaker Management"],
      year: "Aug 2023 - Dec 2023",
      company: "MTN (Money Today Network)",
      location: "Seoul, South Korea",
    },
    {
      id: "admissions-creator",
      title: "Admissions Strategy Content Creator",
      titleKR: "입학 전략 콘텐츠 제작자",
      tags: ["Data Visualization", "Content Design"],
      year: "Mar 2022 - Dec 2023",
      company: "Sungkyunkwan University",
      location: "Seoul, South Korea",
    },
    {
      id: "peer-instructor",
      title: "Peer Instructor - Presentation & Media Skills",
      titleKR: "동료 강사 - 프레젠테이션 및 미디어 스킬",
      tags: ["Teaching", "Presentation Design"],
      year: "Apr 2017 - Dec 2017",
      company: "Gwangyang Jecheol High School",
      location: "Gwangyang, South Korea",
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
