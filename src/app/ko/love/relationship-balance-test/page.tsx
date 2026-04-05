import type { Metadata } from "next";
import Link from "next/link";
import { KoBrandLogo } from "@/components/ko/KoBrandLogo";
import { PercentageQuiz } from "@/components/quiz/PercentageQuiz";
import { pickQuizText } from "@/components/quiz/types";
import { quizAssetUrl } from "@/lib/content/quizAssetUrl";
import { quizRelationshipBalanceTest } from "@/content/quiz";

const pack = quizRelationshipBalanceTest;
const pageLocale = "ko" as const;
const ogTitle =
  pickQuizText(pageLocale, pack.meta?.ogTitle) ||
  pickQuizText(pageLocale, pack.title) ||
  "연애 중 나는 갑 vs 을?";
const pageTitle = `${ogTitle} | 모모픽`;
const pageDesc =
  pickQuizText(pageLocale, pack.meta?.description) ||
  "연애에서 갑·을 성향을 알아보는 테스트. 재미·자기이해용입니다.";
const ogDesc = pickQuizText(pageLocale, pack.meta?.ogDescription) || pageDesc;
const subtitleLine = pickQuizText(pageLocale, pack.subtitle);
const qCount = pack.questions?.length ?? 0;
const kicker = pickQuizText(pageLocale, pack.card?.kicker) || "⚖️ 관계 밸런스";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDesc,
  keywords: pack.meta?.keywords?.map((k) => pickQuizText(pageLocale, k)),
  alternates: {
    canonical: "https://momopick.com/ko/love/relationship-balance-test/",
  },
  openGraph: {
    title: pageTitle,
    description: ogDesc,
    url: "https://momopick.com/ko/love/relationship-balance-test/",
    locale: "ko_KR",
    type: "website",
    images: pack.images?.og ? [{ url: `https://momopick.com${quizAssetUrl(pack.images.og, pageLocale)}` }] : undefined,
  },
};

export default function RelationshipBalanceTestPage() {
  return (
    <>
      <header className="site-hd">
        <div className="inner">
          <Link className="brand" href="/ko/" aria-label="모모픽 홈">
            <KoBrandLogo />
            <strong>Momopick</strong>
          </Link>
          <div className="hd-actions">
            <Link className="btn sm" href="/ko/">
              홈
            </Link>
            <Link className="btn sm primary" href="/ko/app/login/">
              로그인
            </Link>
          </div>
        </div>
      </header>

      <div className="wrap">
        <main className="quiz-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/ko/#love">연애</Link>
            <span aria-hidden="true"> / </span>
            <span>갑 vs 을</span>
          </nav>

          <header className="quiz-page-hd">
            <p className="quiz-kicker">{kicker}</p>
            <h1 id="quiz-title">
              {pickQuizText(pageLocale, pack.title) || "연애 중 나는 갑 vs 을?"}
            </h1>
            <p className="quiz-lead">
              {subtitleLine
                ? `${subtitleLine} ${qCount}문항이면 끝나요.`
                : `${qCount}문항이면 끝나요.`}
            </p>
            {pack.images?.thumbnail ? (
              <div className="quiz-cover">
                <img
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
