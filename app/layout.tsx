import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import BouncyCursor from "@/components/BouncyCursor";
import ChatbotWidget from "@/components/ChatbotWidget";
import { LocaleProvider } from "@/lib/LocaleContext";
import SmoothScroll from "@/components/SmoothScroll";

// Outfit for English Display - Retro-futuristic geometric sans-serif
const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Gakyung Han - Education Planner & Marketing Strategist",
    template: "%s | Gakyung Han",
  },
  description:
    "Education Planner & Marketing Strategist. 사람의 경험을 확장하는 일에 관심이 많습니다.",
  keywords: [
    "Education Planner",
    "Marketing Strategist",
    "AI",
    "Portfolio",
    "Gakyung Han",
    "한가경",
  ],
  authors: [{ name: "Gakyung Han", url: "https://gakyung.com" }],
  creator: "Gakyung Han",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://gakyung.com",
    siteName: "Gakyung Han Portfolio",
    title: "Gakyung Han - Education Planner & Marketing Strategist",
    description:
      "사람의 경험을 확장하는 일에 관심이 많습니다. AI와 함께!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gakyung Han Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gakyung Han - Education Planner & Marketing Strategist",
    description:
      "사람의 경험을 확장하는 일에 관심이 많습니다. AI와 함께!",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://gakyung.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body
        className={`${outfit.variable} antialiased`}
      >
        <LocaleProvider>
          <SmoothScroll>
            <BouncyCursor />
            {children}
            <ChatbotWidget />
          </SmoothScroll>
        </LocaleProvider>
      </body>
    </html>
  );
}
