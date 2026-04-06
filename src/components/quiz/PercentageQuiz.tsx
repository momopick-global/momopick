"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { quizAssetUrl } from "@/lib/content/quizAssetUrl";
import { getQuizUiStrings, type QuizUiLocale } from "@/i18n/quiz-ui";
import { QuizImageWithFallback } from "./QuizImageWithFallback";
import { QuizResultShare } from "./QuizResultShare";
import { pickQuizText } from "./types";
import {
  maxScoreForPercentageQuiz,
  percentFromTotalScore,
  pickPercentageRange,
  type PercentageQuizDefinition,
} from "./percentageTypes";

const ANSWER_FILL_MS = 920;

export function PercentageQuiz({
  definition,
  locale = "ko",
}: {
  definition: PercentageQuizDefinition;
  locale?: QuizUiLocale;
}) {
  const ui = getQuizUiStrings(locale);
  const { questions, resultRanges, footnote, resultDisplay, dualLabels } = definition;

  const maxTotal = useMemo(() => maxScoreForPercentageQuiz(questions), [questions]);

  const [step, setStep] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answerBusy, setAnswerBusy] = useState(false);
  const [pickingIdx, setPickingIdx] = useState<number | null>(null);
  const [fillActive, setFillActive] = useState(false);
  const answerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = questions.length;
  const progress = useMemo(
    () => (done ? 100 : Math.round((step / total) * 100)),
    [done, step, total],
  );

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
    setAnswerBusy(false);
    setPickingIdx(null);
    setFillActive(false);
  }, []);

  const finalPercent = useMemo(
    () => percentFromTotalScore(totalScore, maxTotal),
    [totalScore, maxTotal],
  );

  const rangeMatch = useMemo(
    () => pickPercentageRange(resultRanges, finalPercent),
    [resultRanges, finalPercent],
  );

  if (done) {
    const titleText = rangeMatch
      ? pickQuizText(locale, rangeMatch.title)
      : `${finalPercent}%`;
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
    const shareText =
      showDual && dualLabels
      ? `${pickQuizText(locale, definition.title) || "Quiz"} — ${titleText} (${pickQuizText(locale, dualLabels.logical)} ${logicalPct}% · ${pickQuizText(locale, dualLabels.emotional)} ${emotionalPct}%) | Momopick`
      : showDegree
        ? `${pickQuizText(locale, definition.title) || "Quiz"} — ${titleText} (${heroDegree}° · ${finalPercent}%) | Momopick`
        : `${pickQuizText(locale, definition.title) || "Quiz"} — ${titleText} (${finalPercent}%) | Momopick`;

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
          <h2 className="quiz-result-title">{titleText}</h2>
          {descText ? (
            <p className="quiz-result-body quiz-result-body--percent">{descText}</p>
          ) : null}
          <QuizResultShare ui={ui} shareText={shareText} />
          <div className="quiz-result-actions">
            <button type="button" className="btn primary sm" onClick={restart}>
              {ui.restart}
            </button>
          </div>
          <p className="quiz-footnote">{pickQuizText(locale, footnote)}</p>
        </div>
      </div>
    );
  }

  const q = questions[step];
  const shareTextInProgress = (() => {
    const t = pickQuizText(locale, definition.title) || "Quiz";
    const sub = definition.subtitle ? pickQuizText(locale, definition.subtitle) : "";
    return sub ? `${t} — ${sub} | Momopick` : `${t} | Momopick`;
  })();

  return (
    <div className="quiz-shell">
      <div className="quiz-progress-wrap" aria-hidden="true">
        <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="quiz-step-label">{ui.formatQuestionStep(step + 1, total)}</p>
      {q.image ? (
        <div className="quiz-q-visual">
          <QuizImageWithFallback
            src={quizAssetUrl(q.image, locale)}
            alt=""
            width={480}
            height={320}
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
      <div className="quiz-share-wrap quiz-share-wrap--during">
        <QuizResultShare ui={ui} shareText={shareTextInProgress} />
      </div>
    </div>
  );
}
