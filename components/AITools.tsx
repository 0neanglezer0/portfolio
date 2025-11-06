"use client";

import { useState } from "react";

export default function AITools() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      name: "Content & Design",
      icon: "✨",
      color: "from-blue-500 to-cyan-500",
      tools: [
        { name: "Claude", desc: "Advanced reasoning" },
        { name: "ChatGPT", desc: "Versatile AI" },
        { name: "Gamma", desc: "Presentation magic" },
        { name: "Figma", desc: "Design platform" },
        { name: "Veo3", desc: "Video generation" },
      ],
    },
    {
      name: "Automation",
      icon: "⚡",
      color: "from-purple-500 to-pink-500",
      tools: [
        { name: "n8n", desc: "Workflow automation" },
        { name: "Lindy AI", desc: "AI assistant" },
        { name: "Cursor", desc: "AI code editor" },
        { name: "Notion AI", desc: "Smart workspace" },
      ],
    },
    {
      name: "Research",
      icon: "🔍",
      color: "from-orange-500 to-red-500",
      tools: [
        { name: "Perplexity", desc: "AI search" },
        { name: "NotebookLM", desc: "Research assistant" },
      ],
    },
  ];

  return (
    <section id="ai-tools" className="py-32 px-6 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
            AI Tool Stack
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            작업의 범위를 확장하는 도구들
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === index
                  ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:scale-105'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Tools display */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories[activeCategory].tools.map((tool, index) => (
            <div
              key={tool.name}
              className="group bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-transparent hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categories[activeCategory].color} mb-4 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                {categories[activeCategory].icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
                {tool.name}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                {tool.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
