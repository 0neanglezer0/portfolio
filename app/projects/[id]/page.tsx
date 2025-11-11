import Link from "next/link";
import Image from "next/image";
import { blurDataURLs } from "@/lib/image-utils";

interface ProjectData {
  id: string;
  title: string;
  year: string;
  tags: string[];
  overview: string;
  challenge: string;
  solution: string;
  outcome: string;
  role: string;
  tools: string[];
}

const projectsData: Record<string, ProjectData> = {
  "skt-ai-frontier": {
    id: "skt-ai-frontier",
    title: "SKT AI Frontier 교육 프로그램 운영",
    year: "2025",
    tags: ["AI Education", "Workshop Design", "B2B"],
    overview: "SKT AI Frontier 4-8기 및 SK mySUNI 맞춤형 AI 워크숍 교육 운영을 총괄했습니다. 대기업 임직원들의 AI 리터러시 향상과 업무 혁신을 목표로 한 프로그램입니다.",
    challenge: "각 기업과 부서마다 다른 업무 환경과 니즈에 맞춘 교육 프로그램을 설계해야 했습니다. AI에 대한 이해도가 다양한 참가자들을 모두 만족시킬 수 있는 커리큘럼이 필요했습니다.",
    solution: "사전 설문을 통해 참가자 니즈를 파악하고, 실무에 바로 적용 가능한 실습 중심 워크숍을 설계했습니다. Claude, ChatGPT, Notion AI 등 다양한 AI 도구를 직접 체험하며 학습할 수 있도록 구성했습니다.",
    outcome: "사내 AI 워크숍에서 2등을 수상했으며, GPTers 19기 마케팅 자동화 스터디장으로서 실습 주도 경험을 쌓았습니다. 기업 맞춤형 교육 프로그램 기획 역량을 입증했습니다.",
    role: "교육 프로그램 기획 및 운영 총괄",
    tools: ["Claude", "ChatGPT", "Notion AI", "Gamma", "Genspark"],
  },
  "skku-admissions": {
    id: "skku-admissions",
    title: "입학전략설명회 자료 제작",
    year: "2022-2023",
    tags: ["Data Visualization", "Content Design", "Communication"],
    overview: "성균관대학교 입학처에서 최근 5년간 입시 데이터를 기반으로 입학전략설명회 자료를 제작했습니다.",
    challenge: "학부모, 특성화고, 예고 등 다양한 타깃 청중에게 복잡한 입시 데이터를 이해하기 쉽게 전달해야 했습니다.",
    solution: "청중 맞춤형 발표자료 200장 이상을 제작하며, 데이터 시각화와 스토리텔링을 통해 복잡한 정보를 명확하게 전달했습니다. 학생지원팀과 협업하여 학과별 콘텐츠를 기획했습니다.",
    outcome: "입학설명회 영상 및 인쇄물 디자인 제작에 참여했으며, 데이터 기반 콘텐츠 제작 역량을 키웠습니다.",
    role: "데이터 기반 콘텐츠 제작 및 발표자료 디자인",
    tools: ["PowerPoint", "Tableau", "Illustrator"],
  },
  "marketing-automation": {
    id: "marketing-automation",
    title: "마케팅 캠페인 자동화",
    year: "2025",
    tags: ["Marketing Automation", "Campaign Design", "n8n"],
    overview: "Insider 솔루션을 활용하여 Samsung과 LG의 마케팅 캠페인 자동화 시나리오를 설계하고 운영했습니다.",
    challenge: "대규모 고객 세그먼트를 관리하며, 개인화된 메시지를 적시에 전달하는 자동화 플로우가 필요했습니다.",
    solution: "고객 세그먼트 설정, 여정 설계, 리타게팅 캠페인 최적화를 수행했습니다. JavaScript, CSS, HTML을 활용한 프론트엔드 캠페인 구현과 n8n 기반 업무 자동화 플로우를 구축했습니다.",
    outcome: "마케팅 운영 효율을 크게 향상시켰으며, 캠페인 자동화 및 데이터 기반 마케팅 역량을 쌓았습니다.",
    role: "마케팅 캠페인 자동화 설계 및 운영",
    tools: ["Insider", "n8n", "JavaScript", "HTML/CSS"],
  },
  "overseas-camp": {
    id: "overseas-camp",
    title: "해외 청소년 교육 프로그램",
    year: "2023-2025",
    tags: ["Education", "Program Design", "Leadership"],
    overview: "MBC연합캠프에서 필리핀, 캐나다, 영국 등 해외 캠프 인솔교사 및 프로그램 기획 운영을 담당했습니다.",
    challenge: "300명 이상의 청소년을 대상으로 연령과 국가별 특성을 고려한 맞춤형 프로그램을 설계하고, 현장에서 발생할 수 있는 다양한 상황에 대응해야 했습니다.",
    solution: "연령과 국가별 특성을 고려한 문화 교류 및 커뮤니케이션 세부 프로그램을 설계했습니다. 위기 대응 및 현장 관리 역량을 강화하며 글로벌 환경에서의 리더십을 발휘했습니다.",
    outcome: "누적 300명 이상의 청소년을 대상으로 성공적인 해외 캠프 운영 경험을 쌓았으며, 글로벌 환경에서의 팀워크와 리더십 역량을 키웠습니다.",
    role: "캠프 인솔교사 및 프로그램 기획",
    tools: ["Notion", "Google Workspace"],
  },
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectsData[id];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl mb-4">프로젝트를 찾을 수 없습니다</h1>
          <Link
            href="/"
            className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white mb-12 transition-colors"
        >
          ← Back
        </Link>

        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <h1 className="text-4xl md:text-5xl font-light">{project.title}</h1>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {project.year}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs border border-zinc-300 dark:border-zinc-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Project Image */}
          <div className="relative aspect-[3/2] bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden">
            <Image
              src={`/images/projects/${project.id}.jpg`}
              alt={project.title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={blurDataURLs.neutral}
            />
          </div>

          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-light">Overview</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Challenge */}
          <div className="space-y-4">
            <h2 className="text-2xl font-light">Challenge</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="space-y-4">
            <h2 className="text-2xl font-light">Solution</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Outcome */}
          <div className="space-y-4">
            <h2 className="text-2xl font-light">Outcome</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {project.outcome}
            </p>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="space-y-2">
              <h3 className="font-medium">Role</h3>
              <p className="text-zinc-600 dark:text-zinc-400">{project.role}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(projectsData).map((id) => ({
    id,
  }));
}
