import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-screen-2xl mx-auto">
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-light mb-20">Contact</h1>

          <div className="max-w-2xl">
            <div className="space-y-12">
              {/* Intro */}
              <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                함께 사람의 경험을 확장하고,
                의미 있는 변화를 만들어가고 싶으시다면 연락 주세요.
              </p>

              {/* Email */}
              <div>
                <p className="text-sm text-zinc-500 mb-3">Email</p>
                <a
                  href="mailto:akturs25@naver.com"
                  className="group inline-flex items-center gap-3 text-2xl hover:opacity-60 transition-opacity"
                >
                  <span>akturs25@naver.com</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>

              {/* Phone */}
              <div>
                <p className="text-sm text-zinc-500 mb-3">Phone</p>
                <a
                  href="tel:010-8323-3438"
                  className="text-xl text-zinc-600 dark:text-zinc-400 hover:opacity-60 transition-opacity"
                >
                  010-8323-3438
                </a>
              </div>

              {/* Social Media */}
              <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-sm text-zinc-500 mb-6">Social Media</p>
                <div className="space-y-4">
                  <a
                    href="https://www.instagram.com/0neanglezer0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-lg hover:opacity-60 transition-opacity"
                  >
                    <span>Instagram</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://blog.naver.com/1z_z3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-lg hover:opacity-60 transition-opacity"
                  >
                    <span>Naver Blog</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
