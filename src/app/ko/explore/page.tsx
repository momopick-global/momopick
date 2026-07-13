import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoPageFooter } from "@/components/ko/KoPageFooter";
import { BackButton } from "@/components/ko/BackButton";
import { KoQuizSearch } from "@/components/ko/KoQuizSearch";
import { getKoSearchIndex } from "@/lib/content/homeRail";
import { getKoQuizTags } from "@/lib/content/quizTags";

export const metadata: Metadata = {
  title: "테스트 검색·탐색 | 모모픽",
  description: "MBTI·연애·심리 테스트를 검색하고 둘러보세요.",
  alternates: {
    canonical: "https://momopick.com/ko/explore/",
  },
  robots: { index: false, follow: true },
  openGraph: {
    title: "테스트 검색·탐색 | 모모픽",
    description: "테스트 검색·탐색",
    url: "https://momopick.com/ko/explore/",
    images: [
      {
        url: "https://momopick.com/og/main-og.webp",
        width: 1536,
        height: 1024,
        alt: "모모픽 — MBTI·연애·심리 테스트",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};


export default function KoExplorePage() {
  const searchIndex = getKoSearchIndex("ko");
  const quickTags = getKoQuizTags(2).slice(0, 12);

  return (
    <>
      <KoSiteHeader />

      <div className="wrap">
        <main>
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>검색</span>
          </nav>
          <BackButton />

          <header className="policy-page-hd">
            <h1>검색</h1>
            <p className="policy-intro">
              테스트 이름이나 태그로 찾아보세요. 초성 검색도 돼요.
            </p>
          </header>

          <KoQuizSearch index={searchIndex} tags={quickTags} />
        </main>

      </div>
      <KoPageFooter />
    </>
  );
}
