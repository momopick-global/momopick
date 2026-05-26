import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { BackButton } from "@/components/ko/BackButton";
import { KoLoveQuizListView } from "@/components/ko/KoLoveQuizListView";
import { getKoLoveQuizzesSorted } from "@/lib/content/homeRail";

const SECTION_LIMIT = 12;
const loveItems = getKoLoveQuizzesSorted("ko").slice(0, SECTION_LIMIT);

/** 카테고리 in-page nav 항목. href는 같은 페이지 anchor */
const categoryNav: readonly { id: string; label: string }[] = [
  { id: "cat-love", label: "💌 연애" },
  { id: "cat-personality", label: "🧠 성격 심리" },
  { id: "cat-social", label: "👥 소셜" },
  { id: "cat-style", label: "🎨 스타일" },
  { id: "cat-fun", label: "🎲 재미" },
];

/** 콘텐츠가 아직 없는 카테고리 (404 라우트라 더보기 버튼 X) */
const emptyCategories: readonly { id: string; label: string }[] = [
  { id: "cat-personality", label: "🧠 성격 심리" },
  { id: "cat-social", label: "👥 소셜" },
  { id: "cat-style", label: "🎨 스타일" },
  { id: "cat-fun", label: "🎲 재미" },
];

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

export default function KoPersonalityTestHubPage() {
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
              8~10문항을 풀고 3~4가지 유형으로 결과가 나오는 기존 모모픽 테스트입니다.
              카테고리별로 모아 두었어요.
            </p>

            {/* 카테고리 in-page anchor 네비 — 같은 페이지 내 섹션으로 스크롤. 404 없음. */}
            <nav
              className="ptest-cat-nav"
              aria-label="카테고리 빠른 이동"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                margin: "12px 0 24px",
              }}
            >
              {categoryNav.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="chip chip--default"
                  style={{ textDecoration: "none" }}
                >
                  {c.label}
                </a>
              ))}
            </nav>
          </section>

          {/* 연애 — 콘텐츠 있음. KoLoveQuizListView로 12개 + 더보기 */}
          <section
            id="cat-love"
            className="section section--love hub-love"
            aria-labelledby="cat-love-title"
            style={{ scrollMarginTop: "calc(var(--ko-header-h) + 16px)" }}
          >
            <div className="sec-hd">
              <h2 id="cat-love-title">💌 연애</h2>
            </div>
            <KoLoveQuizListView items={loveItems} />
            <div className="cta-row" style={{ marginTop: 20 }}>
              <Link className="btn primary sm" href="/ko/love/">
                연애 테스트 더보기 →
              </Link>
            </div>
          </section>

          {/* 콘텐츠 0개 카테고리 — 섹션 헤더 + 안내 문구. 더보기 버튼 없음. */}
          {emptyCategories.map((c) => (
            <section
              key={c.id}
              id={c.id}
              className="section"
              aria-labelledby={`${c.id}-title`}
              style={{ scrollMarginTop: "calc(var(--ko-header-h) + 16px)" }}
            >
              <div className="sec-hd">
                <h2 id={`${c.id}-title`}>{c.label}</h2>
              </div>
              <p className="sec-lead">곧 새로운 테스트가 추가될 예정입니다.</p>
            </section>
          ))}
        </main>

        <KoFooterNav />
      </div>
    </>
  );
}
