import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { QuizImageWithFallback } from "@/components/quiz/QuizImageWithFallback";
import { pickQuizText } from "@/components/quiz/types";
import { snackQuizDefinitionsCatalog } from "@/content/quiz";
import { quizAssetUrl } from "@/lib/content/quizAssetUrl";
import { getSnackQuizBySlug, orderedSnackResultKeys } from "@/lib/content/snackQuizCatalog";
import { BackButton } from "@/components/ko/BackButton";

const pageLocale = "ko" as const;

export function generateStaticParams() {
  return snackQuizDefinitionsCatalog.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pack = getSnackQuizBySlug(slug);
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
  const pack = getSnackQuizBySlug(slug);
  if (!pack) {
    notFound();
  }

  const quizTitle = pickQuizText(pageLocale, pack.title) || pack.slug;
  const orderedKeys = orderedSnackResultKeys(pack);
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
            <p className="quiz-lead">이 테스트에서 나올 수 있는 결과 유형별 이미지를 모았어요.</p>
          </header>

          <section className="quiz-section" aria-labelledby="quiz-gallery-title">
            <div className="quiz-results-gallery-grid">
              {orderedKeys.map((key) => {
                const row = pack.results[key];
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
                          height={600}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <div className="quiz-results-gallery-noimg" aria-hidden="true">
                        <span className="quiz-results-gallery-emoji">{row.emoji}</span>
                      </div>
                    )}
                    <h2 className="quiz-results-gallery-title">{pickQuizText(pageLocale, row.title)}</h2>
                    <p className="quiz-results-gallery-tagline">{pickQuizText(pageLocale, row.tagline)}</p>
                  </article>
                );
              })}
            </div>

            {pack.blend?.image ? (
              <>
                <h2 className="quiz-results-gallery-blend-h">동점일 때 (복합형)</h2>
                <div className="quiz-results-gallery-grid quiz-results-gallery-grid--single">
                  <article className="quiz-results-gallery-card">
                    <div className="quiz-results-gallery-visual">
                      <QuizImageWithFallback
                        src={quizAssetUrl(pack.blend.image, pageLocale)}
                        alt=""
                        width={480}
                        height={600}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h3 className="quiz-results-gallery-title">{pickQuizText(pageLocale, pack.blend.title)}</h3>
                    <p className="quiz-results-gallery-tagline">{pickQuizText(pageLocale, pack.blend.tagline)}</p>
                  </article>
                </div>
              </>
            ) : null}

            <p className="quiz-results-gallery-back">
              <Link href={quizHref} className="btn primary sm">
                테스트 다시 하기
              </Link>
            </p>
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
