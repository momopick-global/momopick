import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { BackButton } from "@/components/ko/BackButton";

export const metadata: Metadata = {
  title: "태그 모아보기 | 모모픽",
  description:
    "태그별 테스트 둘러보기를 준비 중입니다. 서비스 오픈 전 안내입니다.",
  alternates: {
    canonical: "https://momopick.com/ko/tag/",
  },
  robots: { index: false, follow: true },
  openGraph: {
    title: "태그 | 모모픽",
    description: "태그별 테스트 둘러보기 준비 중",
    url: "https://momopick.com/ko/tag/",
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

export default function KoTagPage() {
  return (
    <>
      <KoSiteHeader />

      <KoCatBar />

      <div className="wrap">
        <main>
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>태그</span>
          </nav>
          <BackButton />

          <section className="section" aria-labelledby="tag-title">
            <div className="sec-hd">
              <h1 id="tag-title">🏷️ 태그</h1>
            </div>
            <p className="sec-lead">
              태그별 테스트 둘러보기 UI는 준비 중입니다. 지금은 카테고리에서 골라 보세요.
            </p>
            <div className="cta-row">
              <Link className="btn primary sm" href="/ko/personality-test/">
                성향 테스트 보러 가기
              </Link>
              <Link className="btn secondary sm" href="/ko/">
                홈으로
              </Link>
            </div>
          </section>
        </main>

        <KoFooterNav />
      </div>
    </>
  );
}
