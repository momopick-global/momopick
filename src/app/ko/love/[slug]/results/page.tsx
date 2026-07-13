import type { Metadata } from "next";
import Link from "next/link";
import { KoPageFooter } from "@/components/ko/KoPageFooter";
import { notFound } from "next/navigation";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { QuizImageWithFallback } from "@/components/quiz/QuizImageWithFallback";
import { pickQuizText } from "@/components/quiz/types";
import type { PercentageQuizDefinition } from "@/components/quiz/percentageTypes";
import type { TriviaQuizDefinition } from "@/components/quiz/triviaTypes";
import {
  percentageQuizDefinitionsCatalog,
  snackQuizDefinitionsCatalog,
  triviaQuizDefinitionsCatalog,
} from "@/content/quiz";
import { quizAssetUrl } from "@/lib/content/quizAssetUrl";
import { getSnackQuizBySlug, orderedSnackResultKeys } from "@/lib/content/snackQuizCatalog";
import { BackButton } from "@/components/ko/BackButton";
import { KoLoveHubMoreSection } from "@/components/ko/KoLoveHubMoreSection";

const pageLocale = "ko" as const;

function getPercentageQuizBySlug(slug: string): PercentageQuizDefinition | undefined {
  return percentageQuizDefinitionsCatalog.find((d) => d.slug === slug);
}

function getTriviaQuizBySlug(slug: string): TriviaQuizDefinition | undefined {
  return triviaQuizDefinitionsCatalog.find((d) => d.slug === slug);
}

export function generateStaticParams() {
  return [
    ...snackQuizDefinitionsCatalog.map((d) => ({ slug: d.slug })),
    ...percentageQuizDefinitionsCatalog.map((d) => ({ slug: d.slug })),
    ...triviaQuizDefinitionsCatalog.map((d) => ({ slug: d.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pack =
    getSnackQuizBySlug(slug) ?? getPercentageQuizBySlug(slug) ?? getTriviaQuizBySlug(slug);
  if (!pack) {
    return { title: "결과를 찾을 수 없습니다 | 모모픽" };
  }
  const quizTitle = pickQuizText(pageLocale, pack.title) || pack.slug;
  const title = `모든 결과 — ${quizTitle} | 모모픽`;
  const desc =
    pickQuizText(pageLocale, pack.meta?.description) ||
    `${quizTitle} 테스트의 모든 결과 유형 이미지를 한 페이지에서 확인하세요.`;
  const url = `https://momopick.com/ko/love/${slug}/results/`;
  return {
    title,
    description: desc.replace(/\s+/g, " ").slice(0, 160),
    alternates: { canonical: url },
    openGraph: {
      title,
      description: desc.replace(/\s+/g, " ").slice(0, 200),
      url,
      locale: "ko_KR",
      type: "website",
      images: pack.images?.og
        ? [{ url: `https://momopick.com${quizAssetUrl(pack.images.og, pageLocale)}` }]
        : undefined,
    },
  };
}

export default async function KoLoveQuizAllResultsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const snackPack = getSnackQuizBySlug(slug);
  const percentPack = snackPack ? undefined : getPercentageQuizBySlug(slug);
  const triviaPack = snackPack || percentPack ? undefined : getTriviaQuizBySlug(slug);
  const pack = snackPack ?? percentPack ?? triviaPack;
  if (!pack) {
    notFound();
  }

  const quizTitle = pickQuizText(pageLocale, pack.title) || pack.slug;
  const quizHref = `/ko/love/${pack.slug}/`;

  return (
    <>
      <KoSiteHeader />

      <KoCatBar />

      <div className="wrap">
        <main className="quiz-page quiz-results-gallery-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/ko/#love">연애</Link>
            <span aria-hidden="true"> / </span>
            <Link href={quizHref}>{quizTitle}</Link>
            <span aria-hidden="true"> / </span>
            <span>모든 결과</span>
          </nav>
          <BackButton />

          <header className="quiz-page-hd">
            <p className="quiz-kicker">✨ 연애 스낵 테스트</p>
            <h1 id="quiz-gallery-title">모든 결과 — {quizTitle}</h1>
            <p className="quiz-lead">
              {snackPack
                ? "이 테스트에서 나올 수 있는 결과 유형별 이미지를 모았어요."
                : triviaPack
                  ? "이 시험에서 받을 수 있는 점수대별 칭호를 모았어요."
                  : "이 테스트에서 나올 수 있는 점수 구간별 결과를 모았어요."}
            </p>
          </header>

          <section className="quiz-section" aria-labelledby="quiz-gallery-title">
            {snackPack ? (
              <>
                <div className="quiz-results-gallery-grid">
                  {orderedSnackResultKeys(snackPack).map((key) => {
                    const row = snackPack.results[key];
                    if (!row) return null;
                    const img = row.image ? quizAssetUrl(row.image, pageLocale) : null;
                    return (
                      <article key={key} className="quiz-results-gallery-card">
                        {img ? (
                          <div className="quiz-results-gallery-visual">
                            <QuizImageWithFallback
                              src={img}
                              alt=""
                              width={480}
                              height={480}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        ) : (
                          <div className="quiz-results-gallery-noimg" aria-hidden="true">
                            <span className="quiz-results-gallery-emoji">{row.emoji}</span>
                          </div>
                        )}
                        <h2 className="quiz-results-gallery-title">
                          {pickQuizText(pageLocale, row.title)}
                        </h2>
                        <p className="quiz-results-gallery-tagline">
                          {pickQuizText(pageLocale, row.tagline)}
                        </p>
                      </article>
                    );
                  })}
                </div>

                {snackPack.blend?.image ? (
                  <>
                    <h2 className="quiz-results-gallery-blend-h">동점일 때 (복합형)</h2>
                    <div className="quiz-results-gallery-grid quiz-results-gallery-grid--single">
                      <article className="quiz-results-gallery-card">
                        <div className="quiz-results-gallery-visual">
                          <QuizImageWithFallback
                            src={quizAssetUrl(snackPack.blend.image, pageLocale)}
                            alt=""
                            width={480}
                            height={480}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <h3 className="quiz-results-gallery-title">
                          {pickQuizText(pageLocale, snackPack.blend.title)}
                        </h3>
                        <p className="quiz-results-gallery-tagline">
                          {pickQuizText(pageLocale, snackPack.blend.tagline)}
                        </p>
                      </article>
                    </div>
                  </>
                ) : null}
              </>
            ) : percentPack ? (
              <div className="quiz-results-gallery-grid">
                {percentPack.resultRanges.map((range) => (
                  <article
                    key={`${range.min}-${range.max}`}
                    className="quiz-results-gallery-card quiz-results-gallery-card--range"
                  >
                    <p className="quiz-results-gallery-range" aria-hidden="true">
                      {typeof range.displayDegree === "number"
                        ? `${range.displayDegree}°`
                        : `${range.min}–${range.max}%`}
                    </p>
                    <h2 className="quiz-results-gallery-title">
                      {pickQuizText(pageLocale, range.title)}
                    </h2>
                    <p className="quiz-results-gallery-tagline">
                      {pickQuizText(pageLocale, range.desc)}
                    </p>
                  </article>
                ))}
              </div>
            ) : triviaPack ? (
              <div className="quiz-results-gallery-grid">
                {triviaPack.grades.map((grade) => (
                  <article
                    key={`${grade.min}-${grade.max}`}
                    className="quiz-results-gallery-card quiz-results-gallery-card--range"
                  >
                    <p className="quiz-results-gallery-range" aria-hidden="true">
                      {grade.min === grade.max
                        ? `${grade.min}점`
                        : `${grade.min}–${grade.max}점`}
                    </p>
                    <h2 className="quiz-results-gallery-title">
                      {pickQuizText(pageLocale, grade.title)}
                    </h2>
                    <p className="quiz-results-gallery-tagline">
                      {pickQuizText(pageLocale, grade.desc)}
                    </p>
                  </article>
                ))}
              </div>
            ) : null}

            <p className="quiz-results-gallery-back">
              <Link href={quizHref} className="btn primary sm">
                테스트 다시 하기
              </Link>
            </p>

            {pack.category?.trim() === "love" ? (
              <KoLoveHubMoreSection
                locale={pageLocale}
                excludeHref={quizHref}
                placement="quiz"
                relatedSlugs={pack.related}
              />
            ) : null}
          </section>
        </main>

      </div>
      <KoPageFooter variant="quiz" />
    </>
  );
}
