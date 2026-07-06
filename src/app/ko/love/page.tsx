import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { KoPageFooter } from "@/components/ko/KoPageFooter";
import { getKoLoveQuizzesSorted } from "@/lib/content/homeRail";
import { BackButton } from "@/components/ko/BackButton";
import { KoLoveQuizListView } from "@/components/ko/KoLoveQuizListView";

// 허브 목록은 영문 슬러그 알파벳순으로 노출 (홈 레일은 기존 priority 정렬 유지)
const loveAll = getKoLoveQuizzesSorted("ko")
  .slice()
  .sort((a, b) => a.slug.localeCompare(b.slug));

export const metadata: Metadata = {
  title: "심층 테스트 | 모모픽",
  description:
    "여러 문항에 답하며 나를 깊이 들여다보는 심층 테스트 모음. 짧게 즐기고 결과를 친구와 공유해 보세요.",
  alternates: {
    canonical: "https://momopick.com/ko/love/",
  },
  openGraph: {
    title: "심층 테스트 | 모모픽",
    description: "문항을 따라가며 즐기는 심층 테스트 모음",
    url: "https://momopick.com/ko/love/",
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


export default function KoLoveHubPage() {
  return (
    <>
      <KoSiteHeader />

      <KoCatBar />

      <div className="wrap">
        <main>
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>심층 테스트</span>
          </nav>
          <BackButton />

          <section className="section" aria-labelledby="hub-love-title">
            <div className="sec-hd">
              <h1 id="hub-love-title">💌 심층 테스트</h1>
            </div>
            <p className="sec-lead">
              여러 문항에 차근차근 답하며 나를 더 깊이 들여다보는 테스트예요. 문항이 여러 개인 테스트가 모여요.
            </p>
            <KoLoveQuizListView items={loveAll} />
          </section>

          <section className="section duo hub-love-footer" aria-label="다음 이동">
            <p className="sec-lead" style={{ marginBottom: 16 }}>
              다른 주제도 둘러볼까요?
            </p>
            <div className="cta">
              <Link className="btn primary" href="/ko/">
                홈으로
              </Link>
              <Link className="btn" href="/ko/explore/">
                전체 탐색
              </Link>
            </div>
          </section>
        </main>

        <KoPageFooter />
      </div>
    </>
  );
}
