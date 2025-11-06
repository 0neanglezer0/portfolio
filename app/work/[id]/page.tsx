import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { blurDataURLs } from "@/lib/image-utils";

const experiences = [
  {
    id: "b2b-ax-manager",
    title: "B2B AX Manager",
    titleKR: "B2B AX 매니저",
    categories: ["AI Education", "Workshop Design"],
    year: "2025",
    company: "GPTers",
    description: "기업 임직원 대상 AI 리터러시 교육 프로그램 기획 및 운영. SKT, 삼성, LG 등 주요 기업과 협력하여 맞춤형 AI 교육을 제공했습니다.",
    sections: [
      {
        title: "Program Overview",
        images: ["program-1.jpg", "program-2.jpg"],
      },
      {
        title: "Workshop Materials",
        images: ["materials-1.jpg", "materials-2.jpg"],
      },
    ],
  },
  {
    id: "marketing-campaign-operator",
    title: "Marketing Campaign Operator",
    titleKR: "마케팅 캠페인 운영 담당",
    categories: ["Campaign Design", "Automation"],
    year: "2024-2025",
    company: "GPTers",
    description: "Samsung·LG 캠페인 자동화 시나리오 설계 및 마케팅 프로세스 최적화",
    sections: [
      {
        title: "Campaign Strategy",
        images: ["campaign-1.jpg"],
      },
    ],
  },
  {
    id: "overseas-camp-leader",
    title: "Overseas Camp Leader & Program Designer",
    titleKR: "해외 캠프 인솔교사 & 프로그램 기획 운영",
    categories: ["Program Design", "Leadership"],
    year: "2023-2025",
    company: "SKKU",
    description: "300명 대상 해외 청소년 문화 교류 프로그램 기획 및 운영",
    sections: [
      {
        title: "Program Highlights",
        images: ["camp-1.jpg", "camp-2.jpg"],
      },
    ],
  },
  {
    id: "ai-forum-planning-intern",
    title: "AI Forum Planning Intern",
    titleKR: "AI 포럼 행사 기획 인턴",
    categories: ["Event Planning", "AI"],
    year: "2024",
    company: "AIF",
    description: "AI 포럼 행사 기획 및 운영 지원",
    sections: [
      {
        title: "Event Planning",
        images: ["forum-1.jpg"],
      },
    ],
  },
  {
    id: "data-content-creator",
    title: "Data-driven Content Creator",
    titleKR: "데이터 기반 콘텐츠 제작 담당",
    categories: ["Data Visualization", "Content Design"],
    year: "2022-2023",
    company: "SKKU",
    description: "데이터 기반 청중 맞춤형 발표자료 200장 제작",
    sections: [
      {
        title: "Content Examples",
        images: ["content-1.jpg", "content-2.jpg"],
      },
    ],
  },
  {
    id: "campus-town-supporter",
    title: "Campus Town Supporter",
    titleKR: "창업지원단 캠퍼스타운 서포터즈",
    categories: ["Startup Support", "Community"],
    year: "2023",
    company: "SKKU",
    description: "창업 지원 활동 및 캠퍼스 커뮤니티 운영",
    sections: [
      {
        title: "Activities",
        images: ["supporter-1.jpg"],
      },
    ],
  },
  {
    id: "volunteer-media-instructor",
    title: "Volunteer Media Instructor",
    titleKR: "고등학교 교내 PPT 강사",
    categories: ["Education", "Presentation"],
    year: "2019",
    company: "High School",
    description: "고등학교 학생 대상 프레젠테이션 스킬 교육",
    sections: [
      {
        title: "Teaching Materials",
        images: ["instructor-1.jpg"],
      },
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
      images: [`/images/work/${experience.id}/cover.jpg`],
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
          <div className="relative aspect-[16/9] bg-zinc-100 dark:bg-zinc-900 mb-12 overflow-hidden">
            <Image
              src={`/images/work/${experience.id}/cover.jpg`}
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
              <p className="text-sm text-zinc-500 mb-2">Year</p>
              <p className="text-lg">{experience.year}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 mb-2">Company</p>
              <p className="text-lg">{experience.company}</p>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-3xl mb-20">
            <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
              {experience.description}
            </p>
          </div>

          {/* Sections with Image Galleries */}
          {experience.sections.map((section, idx) => (
            <div key={idx} className="mb-20">
              <h2 className="text-3xl font-light mb-8">{section.title}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {section.images.map((img, imgIdx) => (
                  <div
                    key={imgIdx}
                    className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-900"
                  >
                    <Image
                      src={`/images/work/${experience.id}/${img}`}
                      alt={`${section.title} ${imgIdx + 1}`}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={blurDataURLs.neutral}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Next Project Navigation */}
          <div className="mt-32 pt-16 border-t border-zinc-200 dark:border-zinc-800">
            <Link
              href={`/work/${nextExperience.id}`}
              className="group inline-flex items-center gap-4 hover:opacity-60 transition-opacity"
            >
              <span className="text-xl">→</span>
              <div>
                <p className="text-sm text-zinc-500 mb-1">Next project</p>
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
