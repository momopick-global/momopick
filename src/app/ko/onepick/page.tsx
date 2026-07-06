import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { BackButton } from "@/components/ko/BackButton";
import { getKoOnePickQuizzesSorted } from "@/lib/content/homeRail";
import { KoLoveQuizListView } from "@/components/ko/KoLoveQuizListView";

const onepickAll = getKoOnePickQuizzesSorted("ko");

export const metadata: Metadata = {
  title: "원픽 테스트 | 모모픽",
  description:
    "한 문항만 골라도 결과가 바로 나오는 가벼운 원픽 테스트 모음. 짧게 즐기고 결과를 친구와 공유해 보세요.",
  alternates: {
    canonical: "https://momopick.com/ko/onepick/",
  },
  openGraph: {
    title: "원픽 테스트 | 모모픽",
    description: "한 문항으로 즐기는 원픽 테스트 모음",
    url: "https://momopick.com/ko/onepick/",
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

export default function KoOnepickPage() {
  return (
    <>
      <KoSiteHeader />

      <KoCatBar />

      <div className="wrap">
        <main>
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>원픽 테스트</span>
          </nav>
          <BackButton />

          <section className="section" aria-labelledby="onepick-title">
            <div className="sec-hd">
              <h1 id="onepick-title">🎯 원픽 테스트</h1>
            </div>
            <p className="sec-lead">
              한 문항만 골라도 결과가 바로 나오는 가벼운 테스트예요. 문항이 1개인 테스트가 자동으로 모여요.
            </p>

            {onepickAll.length > 0 ? (
              <KoLoveQuizListView items={onepickAll} />
            ) : (
              <div className="empty-state">
                <p>아직 공개된 원픽 테스트가 없어요.</p>
                <div className="cta-row">
                  <Link className="btn primary sm" href="/ko/love/">
                    썸·연애 테스트 보러 가기
                  </Link>
                  <Link className="btn secondary sm" href="/ko/">
                    홈으로
                  </Link>
                </div>
              </div>
            )}
          </section>
        </main>

        <KoFooterNav />
      </div>
    </>
  );
}
