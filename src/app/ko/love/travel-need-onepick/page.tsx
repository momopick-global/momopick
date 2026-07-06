import type { Metadata } from "next";
import Link from "next/link";
import { KoPageFooter } from "@/components/ko/KoPageFooter";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { SnackQuiz } from "@/components/quiz/SnackQuiz";
import { pickQuizText } from "@/components/quiz/types";
import { quizAssetUrl } from "@/lib/content/quizAssetUrl";
import { QuizImageWithFallback } from "@/components/quiz/QuizImageWithFallback";
import { quizTravelNeedOnepick } from "@/content/quiz";
import { BackButton } from "@/components/ko/BackButton";

const pack = quizTravelNeedOnepick;
const pageLocale = "ko" as const;
const ogTitle =
  pickQuizText(pageLocale, pack.meta?.ogTitle) ||
  pickQuizText(pageLocale, pack.title) ||
  "문득 떠나고 싶은 여행지는?";
const pageTitle = `${ogTitle} | 모모픽`;
const pageDesc =
  pickQuizText(pageLocale, pack.meta?.description) || "여섯 여행지 중 지금 가장 끌리는 하나로, 지금 내 마음이 진짜 바라는 걸 알아보는 원픽 테스트.";
const ogDesc = pickQuizText(pageLocale, pack.meta?.ogDescription) || pageDesc;
const subtitleLine = pickQuizText(pageLocale, pack.subtitle);

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDesc,
  keywords: pack.meta?.keywords?.map((k) => pickQuizText(pageLocale, k)),
  alternates: {
    canonical: "https://momopick.com/ko/love/travel-need-onepick/",
  },
  openGraph: {
    title: pageTitle,
    description: ogDesc,
    url: "https://momopick.com/ko/love/travel-need-onepick/",
    locale: "ko_KR",
    type: "website",
    images: pack.images?.og
      ? [{ url: `https://momopick.com${quizAssetUrl(pack.images.og, pageLocale)}`, width: 1200, height: 630 }]
      : [{ url: "https://momopick.com/og/main-og.webp", width: 1536, height: 1024, alt: "모모픽 테스트" }],
  },
};

export default function TravelNeedOnepickPage() {
  return (
    <>
      <KoSiteHeader />

      <KoCatBar />

      <div className="wrap">
        <main className="quiz-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/ko/onepick/">원픽</Link>
            <span aria-hidden="true"> / </span>
            <span>문득 떠나고 싶은 여행지는?</span>
          </nav>
          <BackButton />

          <header className="quiz-page-hd">
            <p className="quiz-kicker">🎯 원픽 테스트</p>
            <h1 id="quiz-title">{pickQuizText(pageLocale, pack.title) || "문득 떠나고 싶은 여행지는?"}</h1>
            <p className="quiz-lead">
              {subtitleLine ? `${subtitleLine} 한 번만 고르면 끝나요.` : "한 번만 고르면 끝나요."}
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

        <KoPageFooter variant="quiz" moreHref="/ko/onepick/" moreLabel="다른 원픽 테스트 보기" />
      </div>
    </>
  );
}
