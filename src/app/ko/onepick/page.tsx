import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { BackButton } from "@/components/ko/BackButton";

export const metadata: Metadata = {
  title: "원픽 테스트 | 모모픽",
  description:
    "한 문항으로 빠르게 결과를 확인하는 원픽 테스트를 준비 중입니다. 서비스 오픈 전 안내입니다.",
  alternates: {
    canonical: "https://momopick.com/ko/onepick/",
  },
  robots: { index: false, follow: true },
  openGraph: {
    title: "원픽 테스트 | 모모픽",
    description: "원픽 테스트 준비 중",
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
              <h1 id="onepick-title">⚡ 원픽 테스트</h1>
            </div>
            <p className="sec-lead">
              한 문항만 골라도 결과가 바로 나오는 가벼운 테스트 유형이에요.
              <br />
              현재 콘텐츠를 준비 중입니다. 곧 다양한 원픽 테스트를 만나보실 수 있어요.
            </p>
            <div className="empty-state">
              <p>아직 공개된 원픽 테스트가 없어요.</p>
              <div className="cta-row">
                <Link className="btn primary sm" href="/ko/personality-test/">
                  성향 테스트 보러 가기
                </Link>
                <Link className="btn secondary sm" href="/ko/">
                  홈으로
                </Link>
              </div>
            </div>
          </section>
        </main>

        <KoFooterNav />
      </div>
    </>
  );
}
