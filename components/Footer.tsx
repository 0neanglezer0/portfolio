"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-zinc-200 dark:border-zinc-800" role="contentinfo">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500">
            Designed and coded by Gakyung © {currentYear}
          </p>
          <p className="text-sm text-zinc-500">
            Expanding experiences together with AI
          </p>
        </div>
      </div>
    </footer>
  );
}
