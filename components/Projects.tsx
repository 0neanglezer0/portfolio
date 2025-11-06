"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { blurDataURLs } from "@/lib/image-utils";

export default function Projects() {
  const projects = [
    {
      id: "skt-ai-frontier",
      title: "SKT AI Frontier 교육 프로그램",
      category: "AI Education",
      description: "대기업 임직원 대상 AI 리터러시 교육",
      year: "2025",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "skku-admissions",
      title: "입학전략설명회 자료 제작",
      category: "Data Visualization",
      description: "데이터 기반 청중 맞춤형 발표자료 200장",
      year: "2022-2023",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "marketing-automation",
      title: "마케팅 캠페인 자동화",
      category: "Marketing Tech",
      description: "Samsung·LG 캠페인 자동화 시나리오",
      year: "2025",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "overseas-camp",
      title: "해외 청소년 교육 프로그램",
      category: "Education",
      description: "300명 대상 문화 교류 프로그램",
      year: "2023-2025",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="projects" className="py-32 px-6 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
            Selected Works
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            AI와 함께 만든 경험들
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group relative h-[500px] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

              {/* Glass/Gel highlight on hover */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/0 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Image placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900">
                <Image
                  src={`/images/projects/${project.id}.jpg`}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  placeholder="blur"
                  blurDataURL={blurDataURLs.neutral}
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Text content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {/* Category badge */}
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-white mb-3 group-hover:translate-y-[-8px] transition-transform duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-white/90 mb-4 group-hover:translate-y-[-8px] transition-transform duration-300 delay-75">
                  {project.description}
                </p>

                {/* Year & Arrow */}
                <div className="flex items-center justify-between group-hover:translate-y-[-8px] transition-transform duration-300 delay-100">
                  <span className="text-white/60 text-sm">{project.year}</span>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500`} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
