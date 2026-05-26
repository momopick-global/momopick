import type { Metadata } from "next";
import Link from "next/link";
import { KoFooterLegal } from "@/components/ko/KoFooterNav";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { SnackQuiz } from "@/components/quiz/SnackQuiz";
import { pickQuizText } from "@/components/quiz/types";
import { quizAssetUrl } from "@/lib/content/quizAssetUrl";
import { QuizImageWithFallback } from "@/components/quiz/QuizImageWithFallback";
import { quizWhoLikesYouType } from "@/content/quiz";
import { BackButton } from "@/components/ko/BackButton";

const pack = quizWhoLikesYouType;
const pageLocale = "ko" as const;
const ogTitle =
  pickQuizText(pageLocale, pack.meta?.ogTitle) ||
  pickQuizText(pageLocale, pack.title) ||
  "나를 좋아하는 사람은 어떤 타입?";
const pageTitle = `${ogTitle} | 모모픽`;
const pageDesc =
  pickQuizText(pageLocale, pack.meta?.description) ||
  "주변에서 나한테 호감 있는 사람은 어떤 스타일일까? 8문항 스낵 테스트. 재미·자기이해용입니다.";
const ogDesc = pickQuizText(pageLocale, pack.meta?.ogDescription) || pageDesc;
const subtitleLine = pickQuizText(pageLocale, pack.subtitle);

/** JSON-LD Article 스키마 — Google 구조화 데이터 */
function buildArticleJsonLd(opts: { title: string; description: string; url: string; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    image: opts.image ?? "https://momopick.com/og/main-og.webp",
    publisher: {
      "@type": "Organization",
      name: "Momopick",
      logo: {
        "@type": "ImageObject",
        url: "https://momopick.com/images/brand/momopick_symbol.webp",
      },
    },
  };
}

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDesc,
  keywords: pack.meta?.keywords?.map((k) => pickQuizText(pageLocale, k)),
  alternates: {
    canonical: "https://momopick.com/ko/love/who-likes-you-type/",
  },
  openGraph: {
    title: pageTitle,
    description: ogDesc,
    url: "https://momopick.com/ko/love/who-likes-you-type/",
    locale: "ko_KR",
    type: "website",
    images: pack.images?.og
        ? [{ url: `https://momopick.com${quizAssetUrl(pack.images.og, pageLocale)}`, width: 1200, height: 630 }]
        : [{ url: "https://momopick.com/og/main-og.webp", width: 1536, height: 1024, alt: "모모픽 테스트" }],
  },
};

export default function WhoLikesYouTypePage() {
  return (
    <>
      <KoSiteHeader />

      <KoCatBar />

      <div className="wrap">
        <main className="quiz-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/ko/#love">연애</Link>
            <span aria-hidden="true"> / </span>
            <span>나를 좋아하는 사람은?</span>
          </nav>
          <BackButton />

          <header className="quiz-page-hd">
            <p className="quiz-kicker">✨ 연애 스낵 테스트</p>
            <h1 id="quiz-title">
              {pickQuizText(pageLocale, pack.title) || "나를 좋아하는 사람은 어떤 타입?"}
            </h1>
            <p className="quiz-lead">
              {subtitleLine ? `${subtitleLine} 8문항이면 끝나요.` : "8문항이면 끝나요."}
            </p>
            {pack.images?.thumbnail ? (
              <div className="quiz-cover">
                <QuizImageWithFallback
                  src={quizAssetUrl(pack.images.thumbnail, pageLocale)}
                  alt=""
                  width={480}
                  height={480}
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : null}
          </header>

          <section className="quiz-section" aria-labelledby="quiz-title">
            <SnackQuiz definition={pack} locale="ko" />
          </section>
        </main>

        <footer className="ko-ft">
          <div>
            <Link href="/ko/explore/">다른 테스트 보기</Link>
          </div>
          <KoFooterLegal />
        </footer>
      </div>
    </>
  );
}
