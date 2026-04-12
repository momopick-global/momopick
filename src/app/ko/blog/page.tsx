import type { Metadata } from "next";
import Link from "next/link";
import { KoBlogTabPanel } from "@/components/ko/KoBlogTabPanel";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { koSamplePosts } from "@/content/blog/koSamplePosts";
import { BackButton } from "@/components/ko/BackButton";

export const metadata: Metadata = {
  title: "블로그 | 모모픽",
  description: "모모픽 블로그 — 업데이트·팁·스토리를 차례로 채워 나갑니다.",
  alternates: {
    canonical: "https://momopick.com/ko/blog/",
  },
  openGraph: {
    title: "블로그 | 모모픽",
    description: "모모픽 블로그",
    url: "https://momopick.com/ko/blog/",
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


export default function KoBlogPage() {
  return (
    <>
      <KoSiteHeader />

      <div className="wrap">
        <main className="policy-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>블로그</span>
          </nav>
          <BackButton />

          <header className="policy-page-hd">
            <h1>블로그</h1>
            <p className="policy-intro">
              서비스 소식·콘텐츠 가이드·에디터 노트를 이곳에 올립니다. 아래는 레이아웃·톤 확인용{" "}
              <strong>예시 글</strong>입니다.
            </p>
          </header>

          <KoBlogTabPanel posts={koSamplePosts} />

          <p className="policy-foot">
            <Link className="link-all" href="/ko/">
              ← 홈으로
            </Link>
          </p>
        </main>

        <footer className="ko-ft">
          <KoFooterNav />
        </footer>
      </div>
    </>
  );
}
