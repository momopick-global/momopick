import type { Metadata } from "next";
import Link from "next/link";
import { KoAboutTabPanel } from "@/components/ko/KoAboutTabPanel";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { BackButton } from "@/components/ko/BackButton";

export const metadata: Metadata = {
  title: "모모픽 소개 | Momopick",
  description:
    "모모픽(Momopick)은 MBTI·연애·심리·취향 등 짧은 스낵 테스트로 나를 알아보고 친구와 공유할 수 있는 서비스입니다.",
  alternates: {
    canonical: "https://momopick.com/ko/about/",
  },
  openGraph: {
    title: "모모픽 소개 | Momopick",
    description: "짧은 테스트로 나를 알아보는 모모픽을 소개합니다.",
    url: "https://momopick.com/ko/about/",
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


export default function KoAboutPage() {
  return (
    <>
      <KoSiteHeader />

      <div className="wrap">
        <main className="policy-page about-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>모모픽 소개</span>
          </nav>
          <BackButton />

          <header className="policy-page-hd">
            <p className="about-page-kicker">Momopick</p>
            <h1>모모픽</h1>
            <p className="policy-intro about-page-hd-lead">
              아래 카테고리에서 소개·캐릭터·이용법·탐색·협력 안내를 골라 볼 수 있어요.
            </p>
          </header>

          <KoAboutTabPanel />

          <div className="about-page-cta">
            <Link className="btn primary" href="/ko/explore/">
              테스트 탐색하기
            </Link>
            <Link className="btn" href="/ko/">
              홈으로
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
