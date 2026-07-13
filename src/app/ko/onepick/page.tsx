import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { KoPageFooter } from "@/components/ko/KoPageFooter";
import { BackButton } from "@/components/ko/BackButton";
import { getKoOnePickQuizzesSorted } from "@/lib/content/homeRail";
import { KoLoveQuizListView } from "@/components/ko/KoLoveQuizListView";

const onepickAll = getKoOnePickQuizzesSorted("ko");

// 허브 공유(OG) 이미지: 대표(최상위 우선순위) 원픽 테스트의 썸네일을 사용.
// 카카오 공유 안정성을 위해 WebP 대신 같은 폴더의 JPG(og)를 쓴다. 없으면 공용 OG로 폴백.
const featuredOnepick = onepickAll[0];
const ogImageUrl =
  featuredOnepick?.image && !featuredOnepick.image.includes("quiz-image-pending")
    ? `https://momopick.com${featuredOnepick.image.replace(/\.webp$/, ".jpg")}`
    : "https://momopick.com/og/main-og.webp";

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
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "모모픽 원픽 테스트",
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

          <section className="section hub-page" aria-labelledby="onepick-title">
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
                    심층 테스트 보러 가기
                  </Link>
                  <Link className="btn secondary sm" href="/ko/">
                    홈으로
                  </Link>
                </div>
              </div>
            )}
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

      </div>
      <KoPageFooter />
    </>
  );
}
