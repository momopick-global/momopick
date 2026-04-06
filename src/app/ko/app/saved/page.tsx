import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";

export const metadata: Metadata = {
  title: "보관함 | 모모픽",
  description: "저장한 테스트와 결과를 모아 보는 보관함. 로그인 후 이용할 수 있습니다.",
  alternates: {
    canonical: "https://momopick.com/ko/app/saved/",
  },
  robots: { index: false, follow: true },
  openGraph: {
    title: "보관함 | 모모픽",
    description: "저장한 테스트 보관함",
    url: "https://momopick.com/ko/app/saved/",
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

          <header className="policy-page-hd">
            <h1>보관함</h1>
            <p className="policy-intro">
              북마크·이어하기·결과 히스토리는 로그인 후 이곳에 쌓이도록 연결할 수 있어요. 지금은
              준비 중입니다.
            </p>
          </header>

          <div className="cta">
            <Link className="btn primary" href="/ko/app/login/">
              로그인하고 시작하기
            </Link>
            <Link className="btn" href="/ko/explore/">
              테스트 둘러보기
            </Link>
          </div>
        </main>

        <footer className="ko-ft">
          <div>© {year} Momopick. All rights reserved.</div>
          <KoFooterNav />
        </footer>
      </div>
    </>
  );
}
