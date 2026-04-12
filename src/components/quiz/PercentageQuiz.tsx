"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { quizAssetUrl } from "@/lib/content/quizAssetUrl";
import {
  buildPercentageOutcomeQuery,
  getBrowserQuizSearchString,
  parsePercentageOutcomePercent,
  totalScoreForTargetPercent,
} from "@/lib/quizOutcomeUrl";
import { useHydratedLocationSearch } from "@/lib/useHydratedLocationSearch";
import { getQuizUiStrings, type QuizUiLocale, type QuizUiStrings } from "@/i18n/quiz-ui";
import { QuizImageWithFallback } from "./QuizImageWithFallback";
import { QuizPackTags } from "./QuizPackTags";
import {
  QuizResultShare,
  QuizResultShareIconRow,
  QuizShareKakaoWideButton,
  QuizShareStatusHints,
} from "./QuizResultShare";
import { QuizSaveToVaultButton } from "./QuizSaveToVaultButton";
import { useQuizResultShareModel } from "./useQuizResultShareModel";
import { pickQuizText } from "./types";
import {
  maxScoreForPercentageQuiz,
  percentFromTotalScore,
  pickPercentageRange,
  type PercentageQuizDefinition,
} from "./percentageTypes";

const ANSWER_FILL_MS = 340;

function PercentageQuizDoneCard({
  definition,
  locale,
  ui,
  totalScore,
  maxTotal,
  quizPageHref,
  restart,
}: {
  definition: PercentageQuizDefinition;
  locale: QuizUiLocale;
  ui: QuizUiStrings;
  totalScore: number;
  maxTotal: number;
  quizPageHref: string;
  restart: () => void;
}) {
  const { resultRanges, footnote, resultDisplay, dualLabels } = definition;

  const finalPercent = useMemo(
    () => percentFromTotalScore(totalScore, maxTotal),
    [totalScore, maxTotal],
  );
  const rangeMatch = useMemo(
    () => pickPercentageRange(resultRanges, finalPercent),
    [resultRanges, finalPercent],
  );

  const titleText = rangeMatch ? pickQuizText(locale, rangeMatch.title) : `${finalPercent}%`;
  const descText = rangeMatch ? pickQuizText(locale, rangeMatch.desc) : "";
  const logicalPct = finalPercent;
  const emotionalPct = 100 - logicalPct;
  const showDual = resultDisplay === "dual" && dualLabels != null;
  const heroDegree =
    !showDual &&
    resultDisplay === "temperature" &&
    rangeMatch &&
    typeof rangeMatch.displayDegree === "number"
      ? rangeMatch.displayDegree
      : null;
  const showDegree = heroDegree != null;

  const shareText = useMemo(() => {
    const tt = rangeMatch ? pickQuizText(locale, rangeMatch.title) : `${finalPercent}%`;
    if (showDual && dualLabels) {
      return `${pickQuizText(locale, definition.title) || "Quiz"} — ${tt} (${pickQuizText(locale, dualLabels.logical)} ${logicalPct}% · ${pickQuizText(locale, dualLabels.emotional)} ${emotionalPct}%) | Momopick`;
    }
    if (showDegree) {
      return `${pickQuizText(locale, definition.title) || "Quiz"} — ${tt} (${heroDegree}° · ${finalPercent}%) | Momopick`;
    }
    return `${pickQuizText(locale, definition.title) || "Quiz"} — ${tt} (${finalPercent}%) | Momopick`;
  }, [
    definition.title,
    dualLabels,
    emotionalPct,
    finalPercent,
    heroDegree,
    locale,
    logicalPct,
    rangeMatch,
    showDegree,
    showDual,
  ]);

  const shareOgImage = useMemo(
    () => (definition.images?.og ? quizAssetUrl(definition.images.og, locale) : undefined),
    [definition.images?.og, locale],
  );

  const quizResultUrl = useMemo(() => {
    const q = buildPercentageOutcomeQuery(finalPercent);
    return q ? `${quizPageHref}?${q}` : undefined;
  }, [finalPercent, quizPageHref]);

  const resultsGalleryHref = `${quizPageHref}results/`;

  const shareModel = useQuizResultShareModel({
    shareText,
    shareImageUrl: shareOgImage,
    quizStartUrl: quizPageHref,
    quizResultUrl,
    kakaoQuizResultShare: true,
  });

  const resultLineDraft = (() => {
    if (showDual && dualLabels) {
      return `${pickQuizText(locale, dualLabels.logical)} ${logicalPct}% · ${pickQuizText(locale, dualLabels.emotional)} ${emotionalPct}%`;
    }
    if (showDegree) {
      return locale === "ko"
        ? `${heroDegree}° · 환산 ${finalPercent}%`
        : `${heroDegree}° · ${finalPercent}%`;
    }
    return `${finalPercent}%`;
  })();

  return (
    <div className="quiz-shell">
      <div className="quiz-result-card">
        {showDual && dualLabels ? (
          <div
            className="quiz-result-dual"
            aria-label={`${pickQuizText(locale, dualLabels.logical)} ${logicalPct}%, ${pickQuizText(locale, dualLabels.emotional)} ${emotionalPct}%`}
          >
            <div className="quiz-result-dual-item">
              <span className="quiz-result-dual-label">
                {pickQuizText(locale, dualLabels.logical)}
              </span>
              <div className="quiz-result-dual-row">
                <span className="quiz-result-percent">{logicalPct}</span>
                <span className="quiz-result-percent-suffix">%</span>
              </div>
            </div>
            <div className="quiz-result-dual-divider" aria-hidden="true" />
            <div className="quiz-result-dual-item">
              <span className="quiz-result-dual-label">
                {pickQuizText(locale, dualLabels.emotional)}
              </span>
              <div className="quiz-result-dual-row">
                <span className="quiz-result-percent">{emotionalPct}</span>
                <span className="quiz-result-percent-suffix">%</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              className="quiz-result-percent-wrap"
              aria-label={showDegree ? `${heroDegree}°` : `${finalPercent}%`}
            >
              {showDegree ? (
                <>
                  <span className="quiz-result-percent">{heroDegree}</span>
                  <span className="quiz-result-percent-suffix">°</span>
                </>
              ) : (
                <>
                  <span className="quiz-result-percent">{finalPercent}</span>
                  <span className="quiz-result-percent-suffix">%</span>
                </>
              )}
            </div>
            {showDegree ? (
              <p className="quiz-result-submetric">
                {locale === "ko" ? `환산 지수 ${finalPercent}%` : `Index ${finalPercent}%`}
              </p>
            ) : null}
          </>
        )}
        <QuizPackTags tags={definition.tags} locale={locale} />
        <h2 className="quiz-result-title">{titleText}</h2>
        {descText ? (
          <p className="quiz-result-body quiz-result-body--percent">{descText}</p>
        ) : null}
        <div className="quiz-share quiz-share--result-top">
          <QuizResultShareIconRow model={shareModel} ui={ui} />
        </div>
        <div className="quiz-result-actions-stack">
          <QuizSaveToVaultButton
            layout="bar"
            ui={ui}
            draft={{
              locale,
              quizSlug: definition.slug,
              quizTitle: pickQuizText(locale, definition.title) || definition.slug,
              quizHref: quizPageHref,
              kind: "percent",
              resultTitle: titleText,
              resultLine: resultLineDraft,
              imageUrl: shareOgImage,
            }}
          />
          <div className="quiz-result-actions-row">
            <Link href={resultsGalleryHref} className="btn sm quiz-result-actions-row__secondary">
              {ui.viewAllResults}
            </Link>
            <button type="button" className="btn primary sm quiz-result-actions-row__primary" onClick={restart}>
              {ui.restart}
            </button>
          </div>
        </div>
        <p className="quiz-footnote">{pickQuizText(locale, footnote)}</p>
        <QuizShareKakaoWideButton model={shareModel} ui={ui} />
        <div className="quiz-result-share-hints">
          <QuizShareStatusHints model={shareModel} ui={ui} />
        </div>
      </div>
    </div>
  );
}

export function PercentageQuiz({
  definition,
  locale = "ko",
}: {
  definition: PercentageQuizDefinition;
  locale?: QuizUiLocale;
}) {
  const router = useRouter();
  const ui = getQuizUiStrings(locale);
  const { questions } = definition;

  const maxTotal = useMemo(() => maxScoreForPercentageQuiz(questions), [questions]);

  const [step, setStep] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answerBusy, setAnswerBusy] = useState(false);
  const [pickingIdx, setPickingIdx] = useState<number | null>(null);
  const [fillActive, setFillActive] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const answerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = questions.length;
  const progress = useMemo(
    () => (done ? 100 : Math.round((step / total) * 100)),
    [done, step, total],
  );

  const quizPageHref = useMemo(() => {
    const cat = definition.category?.trim() || "quiz";
    const seg = definition.slug?.trim() || definition.id;
    return `/${locale}/${cat}/${seg}/`;
  }, [definition.category, definition.slug, definition.id, locale]);

  /** 진행 중 공유 — 카카오·OG용 퀴즈 대표 커버(thumbnail 우선) */
  const quizShareCoverUrl = useMemo(() => {
    const raw =
      definition.images?.thumbnail ?? definition.images?.og ?? definition.card?.image;
    return raw ? quizAssetUrl(raw, locale) : undefined;
  }, [definition.images?.thumbnail, definition.images?.og, definition.card?.image, locale]);

  const urlSearch = useHydratedLocationSearch();

  /** 하이드레이션: 서버·첫 클라 렌더는 `urlSearch`만 쓴다. `window` 직접 읽기는 useLayoutEffect에서 처리 */
  const effectiveSearch = useMemo(() => {
    const u = urlSearch?.trim() ?? "";
    if (u.length > 1) return u.startsWith("?") ? u : `?${u}`;
    return "";
  }, [urlSearch]);

  const hasSharedOutcomeInUrl = useMemo(
    () => parsePercentageOutcomePercent(effectiveSearch) != null,
    [effectiveSearch],
  );

  const showIntro = !done && !quizStarted && !hasSharedOutcomeInUrl;

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const tryRestore = (search: string) => {
      const pct = parsePercentageOutcomePercent(search);
      if (pct == null) return;
      setTotalScore(totalScoreForTargetPercent(pct, maxTotal));
      setDone(true);
      setStep(questions.length);
    };
    tryRestore(urlSearch);
    tryRestore(getBrowserQuizSearchString());
    const id = requestAnimationFrame(() => tryRestore(getBrowserQuizSearchString()));
    return () => cancelAnimationFrame(id);
  }, [maxTotal, questions.length, urlSearch]);

  useEffect(() => {
    if (typeof window === "undefined" || done) return;
    const pct = parsePercentageOutcomePercent(getBrowserQuizSearchString());
    if (pct == null) return;
    setTotalScore(totalScoreForTargetPercent(pct, maxTotal));
    setDone(true);
    setStep(questions.length);
  }, [done, maxTotal, questions.length, urlSearch]);

  useEffect(() => {
    return () => {
      if (answerTimerRef.current) clearTimeout(answerTimerRef.current);
    };
  }, []);

  const pick = useCallback(
    (optionIndex: number) => {
      if (answerBusy) return;
      const q = questions[step];
      const opt = q?.options[optionIndex];
      if (!opt) return;

      setAnswerBusy(true);
      setPickingIdx(optionIndex);
      setFillActive(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setFillActive(true));
      });

      if (answerTimerRef.current) clearTimeout(answerTimerRef.current);
      answerTimerRef.current = setTimeout(() => {
        answerTimerRef.current = null;
        setTotalScore((s) => s + opt.score);
        if (step >= total - 1) {
          setDone(true);
        } else {
          setStep((x) => x + 1);
        }
        setAnswerBusy(false);
        setPickingIdx(null);
        setFillActive(false);
      }, ANSWER_FILL_MS);
    },
    [answerBusy, questions, step, total],
  );

  const restart = useCallback(() => {
    if (answerTimerRef.current) {
      clearTimeout(answerTimerRef.current);
      answerTimerRef.current = null;
    }
    setStep(0);
    setTotalScore(0);
    setDone(false);
    setQuizStarted(false);
    setAnswerBusy(false);
    setPickingIdx(null);
    setFillActive(false);
    router.replace(quizPageHref);
  }, [quizPageHref, router]);

  const finalPercent = useMemo(
    () => percentFromTotalScore(totalScore, maxTotal),
    [totalScore, maxTotal],
  );

  const sharePctQuery = useMemo(() => {
    if (!done) return "";
    return buildPercentageOutcomeQuery(finalPercent);
  }, [done, finalPercent]);

  useEffect(() => {
    if (!done || typeof window === "undefined" || !sharePctQuery) return;
    const want = `?${sharePctQuery}`;
    if (window.location.search !== want) {
      window.history.replaceState(null, "", `${quizPageHref}?${sharePctQuery}`);
    }
  }, [done, quizPageHref, sharePctQuery]);

  if (done) {
    return (
      <PercentageQuizDoneCard
        definition={definition}
        locale={locale}
        ui={ui}
        totalScore={totalScore}
        maxTotal={maxTotal}
        quizPageHref={quizPageHref}
        restart={restart}
      />
    );
  }

  if (showIntro) {
    const introShareText = (() => {
      const t = pickQuizText(locale, definition.title) || "Quiz";
      const sub = definition.subtitle ? pickQuizText(locale, definition.subtitle) : "";
      return sub ? `${t} — ${sub} | Momopick` : `${t} | Momopick`;
    })();
    return (
      <div className="quiz-shell quiz-shell--intro">
        <div className="quiz-intro">
          <QuizPackTags tags={definition.tags} locale={locale} className="quiz-intro-tags" />
          <p className="quiz-intro-body">{ui.quizIntroBody(total)}</p>
          <div className="quiz-share-wrap quiz-share-wrap--intro">
            <QuizResultShare
              ui={ui}
              shareText={introShareText}
              shareImageUrl={quizShareCoverUrl}
            />
          </div>
          <div className="quiz-intro-actions">
            <button type="button" className="btn primary quiz-intro-start" onClick={() => setQuizStarted(true)}>
              {ui.startTest}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[step];

  return (
    <div className="quiz-shell">
      {/* 로딩바 애니메이션 — 추후 활성화 시 주석 해제
      <div className="quiz-progress-wrap" aria-hidden="true">
        <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      */}
      <p className="quiz-step-label">{ui.formatQuestionStep(step + 1, total)}</p>
      {q.image ? (
        <div className="quiz-q-visual">
          <QuizImageWithFallback
            src={quizAssetUrl(q.image, locale)}
            alt=""
            width={480}
            height={600}
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
      <h2 className="quiz-q">{pickQuizText(locale, q.prompt)}</h2>
      <ul className="quiz-options" role="list">
        {q.options.map((o, idx) => {
          const isPicking = pickingIdx === idx;
          const showFill = isPicking && fillActive;
          return (
            <li key={`${step}-${idx}`}>
              <button
                type="button"
                className={`quiz-opt${isPicking ? " quiz-opt--picking" : ""}`}
                disabled={answerBusy}
                onClick={() => pick(idx)}
              >
                <span
                  className={`quiz-opt-fill${showFill ? " quiz-opt-fill--full" : ""}`}
                  aria-hidden="true"
                />
                <span className="quiz-opt-label">{pickQuizText(locale, o.label)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
