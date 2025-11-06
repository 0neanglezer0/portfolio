import { portfolioData } from "./portfolio-data";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// 키워드 기반 응답 생성
export function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  // 인사
  if (message.match(/안녕|hi|hello|반가워|처음/)) {
    return `안녕하세요! 👋 ${portfolioData.owner.name}의 포트폴리오에 오신 것을 환영합니다.\n\n저는 AI 기반 포트폴리오 어시스턴트입니다. 다음과 같은 질문을 하실 수 있어요:\n\n• "어떤 프로젝트를 했어?"\n• "경력이 어떻게 돼?"\n• "어떤 기술을 사용해?"\n• "연락처가 어떻게 돼?"\n\n궁금하신 것을 편하게 물어보세요!`;
  }

  // 프로젝트 관련
  if (message.match(/프로젝트|작업|포트폴리오|만든|작품/)) {
    const projects = portfolioData.projects
      .map(p => `\n**${p.title}** (${p.year})\n${p.description}`)
      .join("\n");
    return `제가 진행한 주요 프로젝트들을 소개해드릴게요:\n${projects}\n\n더 자세한 내용이 궁금하시면 특정 프로젝트에 대해 물어보세요!`;
  }

  // 경력 관련
  if (message.match(/경력|회사|일|직장|근무|경험|커리어/)) {
    const experiences = portfolioData.experiences
      .map(e => `\n**${e.company}** - ${e.role}\n${e.period}\n${e.description}`)
      .join("\n");
    return `제 경력을 소개해드릴게요:\n${experiences}`;
  }

  // SKT AI Frontier
  if (message.match(/skt|에스케이|sk|ai frontier|프론티어|교육/)) {
    const project = portfolioData.projects.find(p => p.id === "skt-ai-frontier");
    return `**${project?.title}**\n\n${project?.details}\n\n이 프로젝트는 대기업 임직원들의 AI 리터러시를 높이기 위한 교육 프로그램으로, 실무에 바로 적용 가능한 AI 도구 사용법과 활용 사례를 중심으로 진행되었습니다.`;
  }

  // 마케팅 자동화
  if (message.match(/마케팅|캠페인|자동화|samsung|lg|삼성|엘지/)) {
    const project = portfolioData.projects.find(p => p.id === "marketing-automation");
    return `**${project?.title}**\n\n${project?.details}\n\nSamsung과 LG의 마케팅 캠페인 자동화 시나리오를 구축하여 반복 작업을 줄이고 캠페인 효율성을 높였습니다.`;
  }

  // AI 도구/기술 스택
  if (message.match(/기술|스킬|도구|tool|스택|사용|능력|ai|claude|gpt/)) {
    const tools = portfolioData.skills.aiTools
      .reduce((acc, tool) => {
        if (!acc[tool.category]) acc[tool.category] = [];
        acc[tool.category].push(tool.name);
        return acc;
      }, {} as Record<string, string[]>);

    const toolsText = Object.entries(tools)
      .map(([category, names]) => `**${category}**\n${names.join(", ")}`)
      .join("\n\n");

    return `제가 주로 사용하는 AI 도구들입니다:\n\n${toolsText}\n\n이 도구들을 활용하여 콘텐츠 제작, 자동화, 리서치 등의 작업을 효율적으로 수행합니다.`;
  }

  // 전문성/강점
  if (message.match(/전문|강점|잘|특기|expertise/)) {
    const expertise = portfolioData.skills.expertise.map(e => `• ${e}`).join("\n");
    return `제 전문 분야는 다음과 같습니다:\n\n${expertise}\n\nAI를 활용한 프로세스 자동화와 데이터 기반 의사결정에 특히 강점이 있습니다.`;
  }

  // 현재 하는 일
  if (message.match(/지금|현재|요즘|최근|하는 일/)) {
    const current = portfolioData.experiences[0];
    return `현재 **${current.company}**에서 **${current.role}**로 일하고 있습니다.\n\n${current.description}\n\nB2B AI 솔루션의 고객 경험을 개선하고, 고객이 AI를 효과적으로 활용할 수 있도록 지원하는 역할을 하고 있습니다.`;
  }

  // 연락처
  if (message.match(/연락|이메일|email|contact|메일|컨택/)) {
    return `연락주셔서 감사합니다! 📧\n\n이메일이나 LinkedIn을 통해 연락주시면 빠르게 답변드리겠습니다.\n\n우측 상단의 Contact 버튼을 클릭하시면 연락처 정보를 확인하실 수 있습니다.`;
  }

  // 데이터 분석/시각화
  if (message.match(/데이터|분석|시각화|입학|성균관|skku/)) {
    const project = portfolioData.projects.find(p => p.id === "skku-admissions");
    return `**${project?.title}**\n\n${project?.details}\n\n청중별 맞춤형 데이터 분석과 시각화를 통해 설득력 있는 발표 자료를 제작했습니다.`;
  }

  // 기본 응답
  return `흥미로운 질문이네요! 다만 제가 답변할 수 있는 내용이 제한적입니다.\n\n다음과 같은 주제로 질문해주시면 더 자세히 답변드릴 수 있습니다:\n\n• 프로젝트 경험\n• 경력 사항\n• 사용하는 AI 도구\n• 전문 분야\n• 연락 방법\n\n더 궁금하신 점이 있으시면 편하게 물어보세요!`;
}

// 추천 질문들
export const suggestedQuestions = [
  "어떤 프로젝트를 진행했나요?",
  "현재 어떤 일을 하고 계신가요?",
  "어떤 AI 도구를 사용하시나요?",
  "경력이 어떻게 되나요?",
];
