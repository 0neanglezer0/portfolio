export const en = {
  // Hero Section
  hero: {
    greeting: "Hello, I'm",
    name: "Gakyung Han",
    tagline: "Curiosity expands the world we share.\nI design experiences that make it happen.",
    cta: {
      projects: "See my projects",
      about: "More about me",
    },
  },

  // Navigation
  nav: {
    home: "Home",
    work: "Work",
    about: "About",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
  },

  // Experience Section
  experience: {
    title: "Experience",
    subtitle: "A journey of growth together",
  },

  // Projects Section
  projects: {
    title: "Selected Works",
    subtitle: "Experiences created with AI",
    items: {
      "skt-ai-frontier": {
        title: "SKT AI Frontier Education Program",
        category: "AI Education",
        description: "AI literacy education for corporate employees",
      },
      "skku-admissions": {
        title: "Admissions Strategy Presentation",
        category: "Data Visualization",
        description: "200 data-driven presentation slides",
      },
      "marketing-automation": {
        title: "Marketing Campaign Automation",
        category: "Marketing Tech",
        description: "Automation scenarios for Samsung & LG campaigns",
      },
      "overseas-camp": {
        title: "Overseas Youth Education Program",
        category: "Education",
        description: "Cultural exchange program for 300 participants",
      },
    },
  },

  // AI Tools Section
  aiTools: {
    title: "AI Tool Stack",
    subtitle: "Tools that expand my capabilities",
    categories: {
      content: "Content & Design",
      automation: "Automation",
      research: "Research",
    },
  },

  // Footer
  footer: {
    rights: "All rights reserved.",
    builtWith: "Built with curiosity and AI.",
  },

  // Chatbot
  chatbot: {
    title: "Portfolio Assistant",
    status: "Online",
    placeholder: "Type your message...",
    button: "Ask my Portfolio",
  },

  // About Page
  about: {
    title: "About",
    bio: [
      "Hello, I'm Gakyung Han.",
      "A planner who begins with curiosity and brings ideas to life through execution.",
      "I design experiences where people grow and connect —\nthrough the mediums of food, space, and technology.",
      "From research to prototyping, execution, and feedback,\nI enjoy handling the full journey of an idea to create cohesive, meaningful experiences.",
      "I hope to share what I've learned along the way\nand help expand someone's world, even just a little.",
      "I'm not afraid to try something new —\nI test possibilities through action and keep shaping better directions.",
    ],
    education: "Education",
    university: "Sungkyunkwan University",
    major: "Film & Video Studies · Economics",
    downloadResume: "Download Resume",
    aiToolStack: "AI Tool Stack",
  },
} as const;

export type Translations = typeof en;
