import type { Metadata } from "next";
import Link from "next/link";
import { KoSavedRequireAuth } from "@/components/ko/KoSavedRequireAuth";
import { KoSavedVaultAccountCard } from "@/components/ko/KoSavedVaultAccountCard";
import { KoSavedVaultList } from "@/components/ko/KoSavedVaultList";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { BackButton } from "@/components/ko/BackButton";

export const metadata: Metadata = {
  title: "마이페이지 | 모모픽",
  description:
    "저장한 테스트 결과를 모아 보는 마이페이지. 북마크한 결과는 이 브라우저에 저장됩니다.",
  alternates: {
    canonical: "https://momopick.com/ko/app/saved/",
  },
  robots: { index: false, follow: true },
  openGraph: {
    title: "마이페이지 | 모모픽",
    description: "저장한 테스트 마이페이지",
    url: "https://momopick.com/ko/app/saved/",
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

const year = new Date().getFullYear();

export default function KoSavedPage() {
  return (
    <>
      <KoSiteHeader />

      <div className="wrap">
        <main className="policy-page ko-app-narrow">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>마이페이지</span>
          </nav>
          <BackButton />

          <header className="policy-page-hd">
            <h1>마이페이지</h1>
            <p className="policy-intro">
              로그인한 뒤 저장한 테스트 결과를 모아 볼 수 있어요. 북마크한 항목은 이 브라우저
              localStorage에 남으며, 계정 간 서버 동기화는 준비 중입니다.
            </p>
          </header>

          <KoSavedRequireAuth>
            <div id="ko-account" className="ko-account-anchor">
              <KoSavedVaultAccountCard />
            </div>

            <KoSavedVaultList />
          </KoSavedRequireAuth>
        </main>

        <footer className="ko-ft">
          <div>© {year} Momopick. All rights reserved.</div>
          <KoFooterNav />
        </footer>
      </div>
    </>
  );
}
