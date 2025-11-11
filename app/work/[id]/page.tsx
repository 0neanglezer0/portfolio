import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { blurDataURLs } from "@/lib/image-utils";

const experiences = [
  {
    id: "ax-manager",
    title: "AX Manager",
    titleKR: "AX 매니저",
    categories: ["AI Transformation", "B2B Education"],
    year: "Jul 2025 - Present",
    company: "Geniefy Inc.",
    location: "Seoul, South Korea",
    description: "Oversaw the implementation of AI transformation initiatives for corporate clients, focusing on both program development and delivery.",
    descriptionKR: "기업 고객을 위한 AI 혁신 이니셔티브 구현을 감독하며, 프로그램 개발 및 전달에 집중했습니다.",
    responsibilities: [
      "Planned and executed AI transformation programs tailored for enterprise clients in a B2B context",
      "Designed and executed internal AI workshops and capability assessments to enhance staff proficiency",
      "Implemented automation of workflows utilizing Claude Code, n8n, and custom GPT tools, improving efficiency in program delivery",
      "Acted as a liaison between client stakeholders and internal teams to ensure alignment of business goals with educational design",
      "Created and led an internal AI web workshop that secured 2nd place in a company-wide innovation challenge"
    ],
    responsibilitiesKR: [
      "B2B 맥락에서 기업 고객을 위한 맞춤형 AI 혁신 프로그램 기획 및 실행",
      "직원 역량 향상을 위한 내부 AI 워크숍 및 역량 평가 설계 및 실행",
      "Claude Code, n8n, 커스텀 GPT 도구를 활용한 워크플로우 자동화 구현으로 프로그램 전달 효율성 향상",
      "비즈니스 목표와 교육 설계의 일치를 보장하기 위해 고객 이해관계자와 내부 팀 간 연락 담당",
      "사내 AI 웹 워크숍을 만들고 주도하여 전사 혁신 챌린지에서 2위 달성"
    ],
  },
  {
    id: "account-manager",
    title: "Account Manager",
    titleKR: "어카운트 매니저",
    categories: ["Marketing Automation", "Campaign Design"],
    year: "May 2025 - Jul 2025",
    company: "Bizmatrixx - Insider",
    location: "Seoul, South Korea",
    description: "Supported marketing automation campaigns for enterprise clients (Samsung & LG) using the Insider platform.",
    descriptionKR: "Insider 플랫폼을 사용하여 대기업 고객(삼성 및 LG)의 마케팅 자동화 캠페인을 지원했습니다.",
    responsibilities: [
      "Planned AI-driven customer segmentation and automated campaign workflows to enhance engagement",
      "Implemented marketing features through front-end development using JavaScript, CSS, and HTML",
      "Collaborated with client teams to optimize campaign performance and ensure smooth execution"
    ],
    responsibilitiesKR: [
      "참여도 향상을 위한 AI 기반 고객 세분화 및 자동화된 캠페인 워크플로우 기획",
      "JavaScript, CSS, HTML을 사용한 프론트엔드 개발을 통한 마케팅 기능 구현",
      "캠페인 성과 최적화 및 원활한 실행을 위해 고객 팀과 협업"
    ],
  },
  {
    id: "camp-teacher",
    title: "Overseas Education Camp Teacher & Program Coordinator",
    titleKR: "해외 교육 캠프 교사 및 프로그램 코디네이터",
    categories: ["Education", "Cross-cultural Leadership"],
    year: "Jul 2023",
    company: "MBC Global Camp",
    location: "London Area, United Kingdom",
    description: "Led educational camps for over 300 students across multicultural settings, coordinating logistics, safety, and cross-cultural communication.",
    descriptionKR: "다문화 환경에서 300명 이상의 학생을 대상으로 교육 캠프를 주도하며 물류, 안전 및 문화 간 커뮤니케이션을 조정했습니다.",
    responsibilities: [
      "Managed educational camps for over 300 students, overseeing all aspects of program delivery and logistics",
      "Organized cultural exchange initiatives, prioritizing safety and clear communication among participants of varying ages",
      "Enhanced adaptability and problem-solving abilities while operating within multicultural settings"
    ],
    responsibilitiesKR: [
      "300명 이상의 학생을 대상으로 한 교육 캠프를 관리하며 프로그램 전달 및 물류의 모든 측면 감독",
      "다양한 연령의 참가자들 사이에서 안전과 명확한 소통을 우선시하며 문화 교류 이니셔티브 조직",
      "다문화 환경 내에서 운영하며 적응력 및 문제 해결 능력 향상"
    ],
  },
  {
    id: "forum-intern",
    title: "Forum Operations & Speaker Support Intern",
    titleKR: "포럼 운영 및 연사 지원 인턴",
    categories: ["Event Planning", "Speaker Management"],
    year: "Aug 2023 - Dec 2023",
    company: "MTN (Money Today Network)",
    location: "Seoul, South Korea",
    description: "Assisted in organizing and executing ESG and AI-focused international forums under the Media Business Division.",
    descriptionKR: "미디어 비즈니스 부서 산하에서 ESG 및 AI 중심의 국제 포럼 조직 및 실행을 지원했습니다.",
    responsibilities: [
      "Performed research and outreach to international speakers, utilizing business English for effective communication",
      "Created and refined presentation decks and event materials that improved message clarity and speaker engagement"
    ],
    responsibilitiesKR: [
      "효과적인 커뮤니케이션을 위해 비즈니스 영어를 활용하여 국제 연사에 대한 리서치 및 아웃리치 수행",
      "메시지 명확성 및 연사 참여를 향상시키는 프레젠테이션 자료 및 행사 자료 제작 및 개선"
    ],
  },
  {
    id: "admissions-creator",
    title: "Admissions Strategy Content Creator",
    titleKR: "입학 전략 콘텐츠 제작자",
    categories: ["Data Visualization", "Content Design"],
    year: "Mar 2022 - Dec 2023",
    company: "Sungkyunkwan University",
    location: "Seoul, South Korea",
    description: "Produced data-driven admission content for Sungkyunkwan University's Office of Admissions.",
    descriptionKR: "성균관대학교 입학처를 위한 데이터 기반 입학 콘텐츠를 제작했습니다.",
    responsibilities: [
      "Analyzed five-year applicant trends and admission score changes by department using regression analysis and data visualization",
      "Designed and produced over 200 customized presentation slides for admission briefings tailored to different audiences (e.g., parents, vocational and arts high school students)",
      "Edited promotional and teaser videos, and collaborated with the Student Support Team on content planning and communication strategies"
    ],
    responsibilitiesKR: [
      "회귀 분석 및 데이터 시각화를 사용하여 학과별 5년간 지원자 추세 및 입학 점수 변화 분석",
      "다양한 청중(예: 학부모, 특성화고 및 예술고 학생)을 위한 맞춤형 입학 설명회 프레젠테이션 슬라이드 200장 이상 설계 및 제작",
      "홍보 및 티저 영상 편집, 학생 지원팀과 콘텐츠 기획 및 커뮤니케이션 전략 협업"
    ],
  },
  {
    id: "peer-instructor",
    title: "Peer Instructor - Presentation & Media Skills",
    titleKR: "동료 강사 - 프레젠테이션 및 미디어 스킬",
    categories: ["Teaching", "Presentation Design"],
    year: "Apr 2017 - Dec 2017",
    company: "Gwangyang Jecheol High School",
    location: "Gwangyang, South Korea",
    description: "Focused on teaching presentation and media skills through a custom-developed course.",
    descriptionKR: "맞춤 개발된 과정을 통해 프레젠테이션 및 미디어 스킬 교육에 집중했습니다.",
    responsibilities: [
      "Created and implemented a tailored PowerPoint and media production curriculum for fellow students",
      "Maintained full attendance each month, leading to the course's expansion into a full semester due to popularity",
      "Enhanced students' abilities in practical presentation and visual communication techniques"
    ],
    responsibilitiesKR: [
      "동료 학생들을 위한 맞춤형 PowerPoint 및 미디어 제작 커리큘럼 제작 및 실행",
      "매월 100% 출석률 유지, 인기로 인해 과정이 전체 학기로 확장됨",
      "실용적인 프레젠테이션 및 시각적 커뮤니케이션 기법에서 학생들의 능력 향상"
    ],
  },
];

export async function generateStaticParams() {
  return experiences.map((exp) => ({
    id: exp.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const experience = experiences.find((exp) => exp.id === id);

  if (!experience) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: experience.title,
    description: experience.description,
    openGraph: {
      title: `${experience.title} | Gakyung Han`,
      description: experience.description,
      type: "article",
      images: [`/images/work/${experience.id}.jpg`],
    },
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = experiences.find((exp) => exp.id === id);

  if (!experience) {
    notFound();
  }

  const currentIndex = experiences.findIndex((exp) => exp.id === id);
  const nextExperience = experiences[(currentIndex + 1) % experiences.length];

  // Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: experience.title,
    description: experience.description,
    author: {
      "@type": "Person",
      name: "Gakyung Han",
      jobTitle: "AI Experience Designer",
    },
    datePublished: experience.year,
    keywords: experience.categories.join(", "),
    publisher: {
      "@type": "Organization",
      name: experience.company,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main id="main-content" className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-screen-2xl mx-auto">
          {/* Hero Cover Image */}
          <div className="relative aspect-[16/9] bg-zinc-100 dark:bg-zinc-900 mb-12 overflow-hidden rounded-lg">
            <Image
              src={`/images/work/${experience.id}.jpg`}
              alt={experience.title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={blurDataURLs.neutral}
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-light mb-8">
            {experience.title}
          </h1>

          {/* Meta Info */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 pb-16 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <p className="text-sm text-zinc-500 mb-2">Categories</p>
              <div className="flex flex-wrap gap-2">
                {experience.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-sm px-3 py-1 border border-zinc-300 dark:border-zinc-700"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-zinc-500 mb-2">Period</p>
              <p className="text-lg">{experience.year}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 mb-2">Company</p>
              <p className="text-lg">{experience.company}</p>
              <p className="text-sm text-zinc-400">{experience.location}</p>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl font-light mb-6">Overview</h2>
            <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 mb-4">
              {experience.description}
            </p>
            <p className="text-lg leading-relaxed text-zinc-500 dark:text-zinc-500">
              {experience.descriptionKR}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="max-w-3xl mb-20">
            <h2 className="text-2xl font-light mb-6">Key Responsibilities</h2>
            <div className="space-y-8">
              {/* English */}
              <div>
                <ul className="space-y-3">
                  {experience.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-zinc-600 dark:text-zinc-400">
                      <span className="text-zinc-400 dark:text-zinc-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Korean */}
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-sm text-zinc-500 mb-4">한국어</p>
                <ul className="space-y-3">
                  {experience.responsibilitiesKR.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-zinc-600 dark:text-zinc-400">
                      <span className="text-zinc-400 dark:text-zinc-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Next Project Navigation */}
          <div className="mt-32 pt-16 border-t border-zinc-200 dark:border-zinc-800">
            <Link
              href={`/work/${nextExperience.id}`}
              className="group inline-flex items-center gap-4 hover:opacity-60 transition-opacity"
            >
              <span className="text-xl">→</span>
              <div>
                <p className="text-sm text-zinc-500 mb-1">Next experience</p>
                <p className="text-2xl font-light">{nextExperience.title}</p>
                <p className="text-sm text-zinc-500">
                  {nextExperience.categories.join(" · ")}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
