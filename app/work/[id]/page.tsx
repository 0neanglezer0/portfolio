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
    titleKR: "기업 AI 교육 담당 B2B AX Manager",
    categories: ["AI Transformation", "B2B Education"],
    year: "Jul 2025 - Present",
    company: "Geniefy Inc. / GPTers",
    companyKR: "지니파이 주식회사 / GPTers (국내 최대 AI 커뮤니티)",
    location: "Seoul, South Korea",
    description: "Oversaw the implementation of AI transformation initiatives for corporate clients, focusing on both program development and delivery.",
    descriptionKR: "기업 고객을 위한 AI 교육 프로그램 기획 및 운영을 총괄하고 있습니다.",
    responsibilities: [
      "Led SKT AI Frontier 4-8 programs and SK mySUNI customized AI workshops",
      "Secured 2nd place in company-wide AI workshop competition, pioneering AI-driven innovation cases",
      "Designed enterprise-tailored AI literacy and automation training programs",
      "Led GPTers 19th Marketing Automation Study as head facilitator",
      "Created outbound sales proposal slides and presentation materials"
    ],
    responsibilitiesKR: [
      "SKT AI Frontier 4-8기 및 SK mySUNI 맞춤형 AI 워크숍 교육 운영 총괄",
      "사내 AI 워크숍 2등 수상, AI 기반 업무 혁신 사례 발굴",
      "기업 맞춤형 AI 리터러시 및 자동화 교육 프로그램 기획",
      "GPTers 19기 마케팅 자동화 스터디장으로서 실습 주도 경험",
      "아웃바운드 Sales 제안서 슬라이드 제작"
    ],
  },
  {
    id: "account-manager",
    title: "Marketing Campaign Operator",
    titleKR: "마케팅 캠페인 운영",
    categories: ["Marketing Automation", "Campaign Design"],
    year: "May 2025 - Jul 2025",
    company: "Bizmatrixx - Insider",
    companyKR: "비즈매트릭스 (Bizmatrixx)",
    location: "Seoul, South Korea",
    description: "Designed and operated marketing automation campaigns for Samsung & LG using Insider platform.",
    descriptionKR: "Insider 솔루션을 활용해 Samsung·LG 캠페인 자동화 시나리오를 설계 및 운영했습니다.",
    responsibilities: [
      "Designed and operated Samsung & LG campaign automation scenarios using Insider solution",
      "Performed customer segmentation, journey design, and retargeting campaign optimization",
      "Implemented frontend campaigns using JavaScript, CSS, and HTML",
      "Built n8n-based workflow automation, improving marketing operation efficiency"
    ],
    responsibilitiesKR: [
      "Insider 솔루션을 활용해 Samsung·LG 캠페인 자동화 시나리오 설계 및 운영",
      "고객 세그먼트 설정, 여정 설계, 리타게팅 캠페인 최적화 수행",
      "JavaScript, CSS, HTML을 활용한 프론트엔드 캠페인 구현",
      "n8n 기반 업무 자동화 플로우 구축, 마케팅 운영 효율 향상"
    ],
  },
  {
    id: "camp-teacher",
    title: "Overseas Camp Leader & Program Designer",
    titleKR: "해외 캠프 인솔교사 & 프로그램 기획 운영",
    categories: ["Education", "Cross-cultural Leadership"],
    year: "2023 - 2025 (4 months total)",
    company: "MBC Global Camp",
    companyKR: "㈜MBC연합캠프 (필리핀, 캐나다, 영국)",
    location: "Philippines, Canada, United Kingdom",
    description: "Led overseas education camps for 300+ youth across multicultural settings.",
    descriptionKR: "300명 이상 청소년 대상 해외 캠프 현장 운영 및 프로그램 기획을 담당했습니다.",
    responsibilities: [
      "Operated on-site overseas camps for cumulative 300+ youth participants",
      "Designed detailed cultural exchange and communication programs tailored by age and country",
      "Strengthened crisis response and on-site management capabilities",
      "Accumulated leadership and teamwork experience in global environments"
    ],
    responsibilitiesKR: [
      "누적 300명 이상 청소년 대상 해외 캠프 현장 운영",
      "연령·국가별 특성을 고려한 문화 교류·커뮤니케이션 세부 프로그램 설계",
      "위기 대응·현장 관리 역량 강화",
      "글로벌 환경에서의 리더십·팀워크 경험 축적"
    ],
  },
  {
    id: "forum-intern",
    title: "AI Forum Planning Intern",
    titleKR: "AI/경제 포럼 행사 기획 인턴",
    categories: ["Event Planning", "Speaker Management"],
    year: "2023 (6 months)",
    company: "MTN (Money Today Network)",
    companyKR: "MTN 머니투데이방송 (Money Today Network)",
    location: "Seoul, South Korea",
    description: "Assisted in organizing ESG Economic Forum and Seoul Future Forum (SFF).",
    descriptionKR: "2023 ESG경제포럼 및 서울퓨처포럼 등 행사 기획 및 진행을 지원했습니다.",
    responsibilities: [
      "Supported planning and execution of 2023 ESG Economic Forum and Seoul Future Forum (SFF)",
      "Conducted international speaker research and managed English email communication",
      "Created and refined presentation slides and design, improving deliverable quality",
      "Collaborated with internal production team on event video and content archiving"
    ],
    responsibilitiesKR: [
      "2023 ESG경제포럼 / 서울퓨처포럼(SFF) 등 행사 기획 및 진행 지원",
      "해외 연사 리서치 및 영어 이메일 커뮤니케이션 담당",
      "PT 슬라이드 제작 및 디자인 교정, 발표자료 품질 향상 기여",
      "내부 제작팀과 협업하여 행사 영상 및 콘텐츠 아카이브 관리"
    ],
  },
  {
    id: "admissions-creator",
    title: "Admissions Strategy Content Lead",
    titleKR: "입학 전략 콘텐츠 제작 총괄",
    categories: ["Data Visualization", "Content Design"],
    year: "Mar 2022 - Dec 2023",
    company: "Sungkyunkwan University",
    companyKR: "성균관대학교 입학처",
    location: "Seoul, South Korea",
    description: "Produced data-driven admission strategy content based on 5-year admissions data.",
    descriptionKR: "최근 5년간 입시 데이터를 기반으로 입학전략설명회 자료를 제작했습니다.",
    responsibilities: [
      "Produced admission strategy presentation materials based on recent 5-year admissions data",
      "Created 200+ audience-tailored slides (parents, vocational/arts high school students)",
      "Participated in admission briefing video and printed material design production",
      "Collaborated with Student Support Team on department-specific content planning and PR strategy"
    ],
    responsibilitiesKR: [
      "최근 5년간 입시 데이터를 기반으로 입학전략설명회 자료 제작",
      "청중 맞춤형 발표자료 200장 이상 제작 (학부모·특성화고·예고 등 타깃별 구성)",
      "입학 설명회 영상 및 인쇄물 디자인 제작 참여",
      "학생지원팀과 협업하여 학과별 콘텐츠 기획 및 홍보전략 수립"
    ],
  },
  {
    id: "peer-instructor",
    title: "Presentation Skills Instructor",
    titleKR: "고등학교 교내 PPT 강사",
    categories: ["Teaching", "Presentation Design"],
    year: "2018 (1 semester)",
    company: "Gwangyang Jecheol High School",
    companyKR: "광양제철고등학교",
    location: "Gwangyang, South Korea",
    description: "Operated self-developed presentation and media production curriculum.",
    descriptionKR: "직접 개발한 발표·미디어 제작 커리큘럼 수업을 운영했습니다.",
    responsibilities: [
      "Operated self-developed presentation and media production curriculum classes",
      "Experienced PPT template creation and sales, extended to regular course due to student demand",
      "Achieved early capacity (30 students) every month with high satisfaction, enabling continuous operation"
    ],
    responsibilitiesKR: [
      "직접 개발한 발표·미디어 제작 커리큘럼 수업 운영",
      "PPT 템플릿 제작 및 판매 경험, 학생 수요에 따라 정규과정으로 연장",
      "매월 정원 조기 마감(30명), 높은 만족도로 지속 운영"
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

          {/* Title - Bilingual */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-light mb-3">
              {experience.title}
            </h1>
            <p className="text-2xl md:text-3xl text-zinc-600 dark:text-zinc-400">
              {experience.titleKR}
            </p>
          </div>

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
              <p className="text-base text-zinc-600 dark:text-zinc-400">{experience.companyKR}</p>
              <p className="text-sm text-zinc-400 mt-1">{experience.location}</p>
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
                <p className="text-sm text-zinc-500 mb-4">English</p>
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
                <p className="text-lg text-zinc-600 dark:text-zinc-400">{nextExperience.titleKR}</p>
                <p className="text-sm text-zinc-500 mt-1">
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
