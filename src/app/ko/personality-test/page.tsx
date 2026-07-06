import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { KoPageFooter } from "@/components/ko/KoPageFooter";
import { BackButton } from "@/components/ko/BackButton";
import { quizPersonalityPsychologyTest } from "@/content/quiz";
import { pickQuizText } from "@/components/quiz/types";
import { quizAssetUrl } from "@/lib/content/quizAssetUrl";
import { QuizImageWithFallback } from "@/components/quiz/QuizImageWithFallback";

// 허브 공유(OG) 이미지: 대표 성향 테스트(성격·심리 분석)의 썸네일 JPG. 없으면 공용 OG로 폴백.
const ptOg = quizPersonalityPsychologyTest.images?.og;
const ogImageUrl = ptOg
  ? `https://momopick.com${quizAssetUrl(ptOg, "ko")}`
  : "https://momopick.com/og/main-og.webp";

export const metadata: Metadata = {
  title: "성향 테스트 모아보기 | 모모픽",
  description:
    "MBTI·연애·성격·심리 등 모모픽의 성향 테스트를 카테고리별로 모아 보세요. 짧게 즐기고 결과를 친구와 공유해 보세요.",
  alternates: {
    canonical: "https://momopick.com/ko/personality-test/",
  },
  openGraph: {
    title: "성향 테스트 모아보기 | 모모픽",
    description: "카테고리별 성향 테스트 모아보기",
    url: "https://momopick.com/ko/personality-test/",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "모모픽 성향 테스트",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function KoPersonalityTestHubPage() {
  const pack = quizPersonalityPsychologyTest;
  const title = pickQuizText("ko", pack.title) || "나의 성격·심리 분석은?";
  const subtitle = pickQuizText("ko", pack.subtitle) || "내 성격이 드러나는 순간 분석";
  return (
    <>
      <KoSiteHeader />

      <KoCatBar />

      <div className="wrap">
        <main>
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>성향 테스트</span>
          </nav>
          <BackButton />

          <section className="section" aria-labelledby="ptest-title">
            <div className="sec-hd">
              <h1 id="ptest-title">🧭 성향 테스트</h1>
            </div>
            <p className="sec-lead">
              성격과 심리 반응을 가볍게 살펴보는 테스트를 모아 둔 목차예요.
            </p>
          </section>

          <section className="section" aria-labelledby="featured-personality-title">
            <div className="sec-hd">
              <h2 id="featured-personality-title">🧠 대표 테스트</h2>
            </div>
            <div className="tile-grid">
              <Link className="tile tile--love" href="/ko/love/personality-psychology-test/">
                <div className="thumb">
                  <span className="badge">NEW</span>
                  <QuizImageWithFallback
                    src={quizAssetUrl(pack.images?.thumbnail || "/images/common/quiz-image-pending.webp", "ko")}
                    alt=""
                    width={1024}
                    height={1024}
                    loading="eager"
                    decoding="async"
                  />
                  <span className="thumb-slug" aria-hidden="true">
                    personality-psychology-test
                  </span>
                </div>
                <div className="body">
                  <b>{title}</b>
                  <small>{subtitle}</small>
                </div>
              </Link>
            </div>
            <div className="cta-row" style={{ marginTop: 20 }}>
              <Link className="btn primary sm" href="/ko/love/personality-psychology-test/">
                바로 시작하기 →
              </Link>
            </div>
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
