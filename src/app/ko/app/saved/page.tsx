import type { Metadata } from "next";
import Link from "next/link";
import { KoSavedLoginIconSettings } from "@/components/ko/KoSavedLoginIconSettings";
import { KoSavedVaultList } from "@/components/ko/KoSavedVaultList";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { BackButton } from "@/components/ko/BackButton";

export const metadata: Metadata = {
  title: "보관함 | 모모픽",
  description:
    "저장한 테스트 결과를 모아 보는 보관함. 이 기기에서 북마크한 결과가 표시되며, 로그인·동기화는 준비 중입니다.",
  alternates: {
    canonical: "https://momopick.com/ko/app/saved/",
  },
  robots: { index: false, follow: true },
  openGraph: {
    title: "보관함 | 모모픽",
    description: "저장한 테스트 보관함",
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
        <main className="policy-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>보관함</span>
          </nav>
          <BackButton />

          <header className="policy-page-hd">
            <h1>보관함</h1>
            <p className="policy-intro">
              테스트 결과 화면의 북마크 아이콘으로 저장한 항목이 아래에 모입니다. 데이터는 이
              브라우저에만 남고, 계정 연동·다른 기기 동기화는 곧 이어서 붙일 수 있어요.
            </p>
          </header>

          <KoSavedVaultList />

          <div className="cta ko-vault-cta">
            <Link className="btn primary" href="/ko/app/login/">
              로그인하고 시작하기
            </Link>
            <Link className="btn" href="/ko/explore/">
              테스트 둘러보기
            </Link>
          </div>

          <KoSavedLoginIconSettings />
        </main>

        <footer className="ko-ft">
          <div>© {year} Momopick. All rights reserved.</div>
          <KoFooterNav />
        </footer>
      </div>
    </>
  );
}
