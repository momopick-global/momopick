import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { PercentageQuiz } from "@/components/quiz/PercentageQuiz";
import { pickQuizText } from "@/components/quiz/types";
import { quizAssetUrl } from "@/lib/content/quizAssetUrl";
import { QuizImageWithFallback } from "@/components/quiz/QuizImageWithFallback";
import { quizLoveTemperatureTest } from "@/content/quiz";

const pack = quizLoveTemperatureTest;
const pageLocale = "ko" as const;
const ogTitle =
  pickQuizText(pageLocale, pack.meta?.ogTitle) ||
  pickQuizText(pageLocale, pack.title) ||
  "나는 어떤 연애 온도일까?";
const pageTitle = `${ogTitle} | 모모픽`;
const pageDesc =
  pickQuizText(pageLocale, pack.meta?.description) ||
  "연애 스타일의 온도를 알아보는 테스트. 재미·자기이해용입니다.";
const ogDesc = pickQuizText(pageLocale, pack.meta?.ogDescription) || pageDesc;
const subtitleLine = pickQuizText(pageLocale, pack.subtitle);
const qCount = pack.questions?.length ?? 0;
const kicker = pickQuizText(pageLocale, pack.card?.kicker) || "🌡️ 연애 온도";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDesc,
  keywords: pack.meta?.keywords?.map((k) => pickQuizText(pageLocale, k)),
  alternates: {
    canonical: "https://momopick.com/ko/love/love-temperature-test/",
  },
  openGraph: {
    title: pageTitle,
    description: ogDesc,
    url: "https://momopick.com/ko/love/love-temperature-test/",
    locale: "ko_KR",
    type: "website",
    images: pack.images?.og ? [{ url: `https://momopick.com${quizAssetUrl(pack.images.og, pageLocale)}` }] : undefined,
  },
};

export default function LoveTemperatureTestPage() {
  return (
    <>
      <KoSiteHeader
          actions={
            <>
              <Link className="btn sm" href="/ko/">
              홈
            </Link>
            <Link className="btn-icon" href="/ko/app/login/" title="로그인" aria-label="로그인">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
            </>
          }
        />

      <div className="wrap">
        <main className="quiz-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/ko/#love">연애</Link>
            <span aria-hidden="true"> / </span>
            <span>연애 온도</span>
          </nav>

          <header className="quiz-page-hd">
            <p className="quiz-kicker">{kicker}</p>
            <h1 id="quiz-title">
              {pickQuizText(pageLocale, pack.title) || "나는 어떤 연애 온도일까?"}
            </h1>
            <p className="quiz-lead">
              {subtitleLine
                ? `${subtitleLine} ${qCount}문항이면 끝나요.`
                : `${qCount}문항이면 끝나요.`}
            </p>
            {pack.images?.thumbnail ? (
              <div className="quiz-cover">
                <QuizImageWithFallback
                  src={quizAssetUrl(pack.images.thumbnail, pageLocale)}
                  alt=""
                  width={480}
                  height={320}
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : null}
          </header>

          <section className="quiz-section" aria-labelledby="quiz-title">
            <PercentageQuiz definition={pack} locale="ko" />
          </section>
        </main>

        <footer className="ko-ft">
          <div>
            <Link href="/ko/explore/">다른 테스트 보기</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
