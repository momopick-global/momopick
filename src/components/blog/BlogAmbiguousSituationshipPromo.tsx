"use client";

import Link from "next/link";
import { QuizImageWithFallback } from "@/components/quiz/QuizImageWithFallback";
import { QuizPackTags } from "@/components/quiz/QuizPackTags";
import { QuizResultShare } from "@/components/quiz/QuizResultShare";
import { pickQuizText } from "@/components/quiz/types";
import { quizAmbiguousSituationshipEnd } from "@/content/quiz";
import { getQuizUiStrings } from "@/i18n/quiz-ui";
import { quizAssetUrl } from "@/lib/content/quizAssetUrl";
import { KoLoveHubMoreSection } from "@/components/ko/KoLoveHubMoreSection";
import { useQuizParticipantCount } from "@/hooks/useQuizParticipantCount";

const pack = quizAmbiguousSituationshipEnd;
const locale = "ko" as const;
const quizHref = "/ko/love/ambiguous-situationship-end/";

/**
 * 블로그 하단용 — /ko/love/ambiguous-situationship-end/ 인트로와 동일(커버·태그·안내·공유·시작·참여 수).
 */
export function BlogAmbiguousSituationshipPromo() {
  const ui = getQuizUiStrings(locale);
  const total = pack.questions?.length ?? 0;
  const quizId = pack.slug?.trim() || pack.id;
  const { count } = useQuizParticipantCount(quizId);
  const kicker = pickQuizText(locale, pack.card?.kicker) || "💬 썸 패턴";
  const titleText = pickQuizText(locale, pack.title) || "썸이 항상 애매하게 끝나는 이유";
  const subtitleLine = pickQuizText(locale, pack.subtitle);
  const introShareText = (() => {
    const sub = pack.subtitle ? pickQuizText(locale, pack.subtitle) : "";
    return sub ? `${titleText} — ${sub} | Momopick` : `${titleText} | Momopick`;
  })();
  const quizShareCoverUrl = (() => {
    const raw = pack.images?.thumbnail ?? pack.images?.og ?? pack.card?.image;
    return raw ? quizAssetUrl(raw, locale) : undefined;
  })();

  return (
    <aside className="blog-quiz-promo" aria-label="관련 테스트">
      <header className="quiz-page-hd blog-quiz-promo__hd">
        <p className="quiz-kicker">{kicker}</p>
        <h2 id="blog-quiz-promo-heading" className="blog-quiz-promo__title">
          <Link href={quizHref}>{titleText}</Link>
        </h2>
        <p className="quiz-lead">
          {subtitleLine ? `${subtitleLine} ${total}문항이면 끝나요.` : `${total}문항이면 끝나요.`}
        </p>
        {pack.images?.thumbnail ? (
          <Link href={quizHref} className="blog-quiz-promo__cover-link">
            <div className="quiz-cover">
              <QuizImageWithFallback
                src={quizAssetUrl(pack.images.thumbnail, locale)}
                alt=""
                width={480}
                height={600}
                loading="lazy"
                decoding="async"
              />
            </div>
          </Link>
        ) : null}
      </header>

      <section className="quiz-section blog-quiz-promo__section" aria-labelledby="blog-quiz-promo-heading">
        <div className="quiz-shell quiz-shell--intro">
          <div className="quiz-intro">
            <QuizPackTags tags={pack.tags} locale={locale} className="quiz-intro-tags" />
            <p className="quiz-intro-body">{ui.quizIntroBody(total)}</p>
            <div className="quiz-share-wrap quiz-share-wrap--intro">
              <QuizResultShare ui={ui} shareText={introShareText} shareImageUrl={quizShareCoverUrl} />
            </div>
            <div className="quiz-intro-actions">
              <Link href={quizHref} className="btn primary quiz-intro-start">
                {ui.startTest}
              </Link>
            </div>
            <p className="quiz-intro-participants" aria-live="polite">
              {ui.formatLiveParticipantLine(count)}
            </p>
          </div>
        </div>
      </section>

      <KoLoveHubMoreSection locale={locale} excludeHref={quizHref} placement="blog" />
    </aside>
  );
}
