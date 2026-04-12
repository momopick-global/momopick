import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { getKoLoveQuizzesSorted } from "@/lib/content/homeRail";
import { BackButton } from "@/components/ko/BackButton";
import { KoLoveQuizListView } from "@/components/ko/KoLoveQuizListView";

const loveAll = getKoLoveQuizzesSorted("ko");

export const metadata: Metadata = {
  title: "썸·연애 테스트 모아보기 | 모모픽",
  description:
    "썸·연인·관계 심리 스낵 테스트를 한곳에 모았습니다. 짧게 즐기고 결과를 친구와 공유해 보세요.",
  alternates: {
    canonical: "https://momopick.com/ko/love/",
  },
  openGraph: {
    title: "썸·연애 테스트 모아보기 | 모모픽",
    description: "연애·썸 카테고리 테스트 전체 목록",
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

const year = new Date().getFullYear();

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
            <span>연애</span>
          </nav>
          <BackButton />

          <section className="section section--love hub-love" aria-labelledby="hub-love-title">
            <div className="sec-hd">
              <h1 id="hub-love-title">💌 썸·연애 테스트</h1>
            </div>
            <p className="sec-lead">
              홈 메인 썸·연애 섹션과 같은 목록입니다. 콘텐츠 JSON에서 <strong>category: love</strong>인 테스트를
              카드 우선순위(높을수록 앞)로 정렬해 두었어요.
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

        <footer className="ko-ft">
          <div>© {year} Momopick. All rights reserved.</div>
          <KoFooterNav />
        </footer>
      </div>
    </>
  );
}
