import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { BackButton } from "@/components/ko/BackButton";

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
  return (
    <>
      <KoSiteHeader />

      <div className="wrap">
        <main className="policy-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>검색</span>
          </nav>
          <BackButton />

          <header className="policy-page-hd">
            <h1>검색</h1>
            <p className="policy-intro">
              전체 검색 UI는 준비 중입니다. 지금은 카테고리 허브로 이동해 테스트를 골라 보세요.
            </p>
          </header>

          <div className="cta" style={{ justifyContent: "flex-start" }}>
            <Link className="btn primary" href="/ko/love/">
              연애 테스트
            </Link>
            <Link className="btn" href="/ko/about/">
              모모픽 소개
            </Link>
            <Link className="btn" href="/ko/notice/">
              공지사항
            </Link>
          </div>
        </main>

        <footer className="ko-ft">
          <KoFooterNav />
        </footer>
      </div>
    </>
  );
}
