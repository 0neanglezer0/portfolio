"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const experiencesRef = useRef<(HTMLDivElement | null)[]>([]);
  const experiences = [
    {
      startDate: "2025-07",
      endDate: "present",
      displayPeriod: "2025.07 - Present",
      role: "B2B AX Manager",
      company: "GPTers",
      color: "from-blue-500 to-cyan-500",
    },
    {
      startDate: "2025-05",
      endDate: "2025-07",
      displayPeriod: "2025.05 - 2025.07",
      role: "Marketing Campaign Operator",
      company: "Bizmatrixx",
      color: "from-purple-500 to-pink-500",
    },
    {
      startDate: "2023",
      endDate: "2025",
      displayPeriod: "2023 - 2025",
      role: "Camp Leader & Program Planner",
      company: "MBC United Camp",
      color: "from-orange-500 to-red-500",
    },
    {
      startDate: "2023",
      endDate: "2023",
      displayPeriod: "2023",
      role: "AI Forum Planning Intern",
      company: "MTN",
      color: "from-green-500 to-emerald-500",
    },
    {
      startDate: "2022",
      endDate: "2023",
      displayPeriod: "2022 - 2023",
      role: "Data-driven Content Creator",
      company: "SKKU Admissions",
      color: "from-violet-500 to-purple-500",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Timeline progress indicator
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
          }
        );
      }

      // Animate each experience card
      experiencesRef.current.forEach((el, index) => {
        if (!el) return;

        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-32 px-6 bg-white dark:bg-black relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            함께 성장한 여정
          </p>
        </div>

        {/* Timeline Progress Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block">
          <div
            ref={timelineRef}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 origin-top"
            style={{ height: '100%' }}
          />
        </div>

        {/* Timeline */}
        <div className="space-y-12 relative">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => {experiencesRef.current[index] = el}}
              className="group relative"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Period badge */}
                <div className="md:w-48 flex-shrink-0">
                  <div className={`inline-block px-4 py-2 bg-gradient-to-r ${exp.color} text-white rounded-full text-sm font-medium shadow-lg`}>
                    <time dateTime={exp.startDate}>
                      {exp.displayPeriod.split(" - ")[0]}
                    </time>
                    {exp.displayPeriod.includes(" - ") && (
                      <>
                        {" - "}
                        <time dateTime={exp.endDate}>
                          {exp.displayPeriod.split(" - ")[1]}
                        </time>
                      </>
                    )}
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 relative">
                  <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 group-hover:border-transparent group-hover:shadow-2xl transition-all duration-300">
                    {/* Gradient accent */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

                    <div className="relative">
                      <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        {exp.company}
                      </p>
                    </div>

                    {/* Decorative corner */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-300`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
