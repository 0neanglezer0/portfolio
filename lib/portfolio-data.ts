export const portfolioData = {
  owner: {
    name: "곽은철",
    role: "B2B AX Manager",
    company: "GPTers",
    bio: "AI와 함께 성장하는 것을 좋아하는 프로덕트 매니저입니다.",
  },

  experiences: [
    {
      period: "2025.07 - Present",
      role: "B2B AX Manager",
      company: "GPTers",
      description: "B2B AI 솔루션 경험 관리 및 고객 성공 지원"
    },
    {
      period: "2025.05 - 2025.07",
      role: "Marketing Campaign Operator",
      company: "Bizmatrixx",
      description: "마케팅 캠페인 자동화 및 운영"
    },
    {
      period: "2023 - 2025",
      role: "Camp Leader & Program Planner",
      company: "MBC United Camp",
      description: "300명 대상 해외 청소년 교육 프로그램 기획 및 운영"
    },
    {
      period: "2023",
      role: "AI Forum Planning Intern",
      company: "MTN",
      description: "AI 포럼 기획 및 운영 지원"
    },
    {
      period: "2022 - 2023",
      role: "Data-driven Content Creator",
      company: "SKKU Admissions",
      description: "데이터 기반 입학전략설명회 자료 제작 (200장)"
    },
  ],

  projects: [
    {
      id: "skt-ai-frontier",
      title: "SKT AI Frontier 교육 프로그램",
      category: "AI Education",
      description: "대기업 임직원 대상 AI 리터러시 교육 프로그램 기획 및 운영",
      year: "2025",
      details: "SKT 그룹 임직원을 대상으로 한 AI 교육 프로그램을 설계하고 운영했습니다."
    },
    {
      id: "skku-admissions",
      title: "입학전략설명회 자료 제작",
      category: "Data Visualization",
      description: "데이터 기반 청중 맞춤형 발표자료 200장 제작",
      year: "2022-2023",
      details: "성균관대학교 입학처에서 데이터 분석을 기반으로 한 전략적 발표 자료를 제작했습니다."
    },
    {
      id: "marketing-automation",
      title: "마케팅 캠페인 자동화",
      category: "Marketing Tech",
      description: "Samsung·LG 캠페인 자동화 시나리오 구축",
      year: "2025",
      details: "대기업 마케팅 캠페인을 자동화하여 운영 효율성을 크게 향상시켰습니다."
    },
    {
      id: "overseas-camp",
      title: "해외 청소년 교육 프로그램",
      category: "Education",
      description: "300명 대상 문화 교류 프로그램 기획 및 운영",
      year: "2023-2025",
      details: "MBC에서 해외 청소년들을 위한 대규모 교육 및 문화 교류 프로그램을 운영했습니다."
    },
  ],

  skills: {
    aiTools: [
      { name: "Claude", category: "Content & Design" },
      { name: "ChatGPT", category: "Content & Design" },
      { name: "Gamma", category: "Content & Design" },
      { name: "Figma", category: "Content & Design" },
      { name: "Veo3", category: "Content & Design" },
      { name: "n8n", category: "Automation" },
      { name: "Lindy AI", category: "Automation" },
      { name: "Cursor", category: "Automation" },
      { name: "Notion AI", category: "Automation" },
      { name: "Perplexity", category: "Research" },
      { name: "NotebookLM", category: "Research" },
    ],
    expertise: [
      "AI 교육 프로그램 기획",
      "데이터 기반 의사결정",
      "마케팅 자동화",
      "프로그램 기획 및 운영",
      "B2B 고객 경험 관리"
    ]
  }
};

export type PortfolioData = typeof portfolioData;
