"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getQuizUiStrings, type QuizUiLocale } from "@/i18n/quiz-ui";
import { QuizResultShare } from "./QuizResultShare";
import { pickQuizText, type SnackQuizDefinition } from "./types";

/** 버튼 채움 애니메이션(≈0.8s)이 끝난 뒤 약간 여유를 두고 다음으로 */
const ANSWER_FILL_MS = 920;

function emptyCounts(keys: string[]): Record<string, number> {
  return Object.fromEntries(keys.map((k) => [k, 0]));
}

/** 동점 후보를 `resultOrder`(없으면 `resultKeys`) 순으로 정렬 */
function orderLeaders(
  resultKeys: string[],
  resultOrder: string[] | undefined,
  counts: Record<string, number>,
  maxScore: number,
): string[] {
  const leaderSet = new Set(resultKeys.filter((k) => (counts[k] ?? 0) === maxScore));
  const order = resultOrder ?? resultKeys;
  const primary = order.filter((k) => leaderSet.has(k));
  const rest = resultKeys.filter((k) => leaderSet.has(k) && !primary.includes(k));
  return [...primary, ...rest];
}

export function SnackQuiz({
  definition,
  locale = "ko",
}: {
  definition: SnackQuizDefinition;
  /** 고정 UI(다시 하기·질문 n/t) 언어. 라우트 세그먼트와 맞출 것 */
  locale?: QuizUiLocale;
}) {
  const ui = getQuizUiStrings(locale);
  const { resultKeys, resultOrder, results, blend, questions, footnote } = definition;

  const [step, setStep] = useState(0);
  const [counts, setCounts] = useState<Record<string, number>>(() => emptyCounts(resultKeys));
  const [done, setDone] = useState(false);
  /** 답 선택 후: 클릭한 버튼 안에서만 채움 애니메이션 중 */
  const [answerBusy, setAnswerBusy] = useState(false);
  const [pickingKey, setPickingKey] = useState<string | null>(null);
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
    (key: string) => {
      if (answerBusy || !resultKeys.includes(key)) return;

      setAnswerBusy(true);
      setPickingKey(key);
      setFillActive(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setFillActive(true));
      });

      if (answerTimerRef.current) clearTimeout(answerTimerRef.current);
      answerTimerRef.current = setTimeout(() => {
        answerTimerRef.current = null;
        setCounts((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
        if (step >= total - 1) {
          setDone(true);
        } else {
          setStep((s) => s + 1);
        }
        setAnswerBusy(false);
        setPickingKey(null);
        setFillActive(false);
      }, ANSWER_FILL_MS);
    },
    [answerBusy, resultKeys, step, total],
  );

  const restart = useCallback(() => {
    if (answerTimerRef.current) {
      clearTimeout(answerTimerRef.current);
      answerTimerRef.current = null;
    }
    setStep(0);
    setCounts(emptyCounts(resultKeys));
    setDone(false);
    setAnswerBusy(false);
    setPickingKey(null);
    setFillActive(false);
  }, [resultKeys]);

  if (done) {
    const maxScore = Math.max(0, ...resultKeys.map((k) => counts[k] ?? 0));
    const leaders = orderLeaders(resultKeys, resultOrder, counts, maxScore);
    const isBlend = leaders.length > 1;
    const singleKey = !isBlend && leaders[0] ? leaders[0] : null;
    const single = singleKey ? results[singleKey] : null;

    const resultImage = isBlend ? blend.image : single?.image;
    const shareText = (() => {
      if (isBlend && blend.share) {
        return `${pickQuizText(locale, blend.share.title)} — ${pickQuizText(locale, blend.share.description)} | Momopick`;
      }
      if (!isBlend && single?.share) {
        return `${pickQuizText(locale, single.share.title)} — ${pickQuizText(locale, single.share.description)} | Momopick`;
      }
      const resultTitle = isBlend
        ? pickQuizText(locale, blend.title)
        : pickQuizText(locale, single?.title);
      const resultTagline = isBlend
        ? pickQuizText(locale, blend.tagline)
        : pickQuizText(locale, single?.tagline);
      return `${resultTitle} — ${resultTagline} | Momopick`.trim();
    })();

    return (
      <div className="quiz-shell">
        <div className="quiz-result-card">
          {resultImage ? (
            <div className="quiz-result-visual">
              <img
                src={resultImage}
                alt=""
                width={480}
                height={320}
                loading="eager"
                decoding="async"
              />
            </div>
          ) : null}
          <p className="quiz-result-emoji" aria-hidden="true">
            {isBlend ? blend.emoji : single?.emoji}
          </p>
          <h2 className="quiz-result-title">
            {isBlend ? pickQuizText(locale, blend.title) : pickQuizText(locale, single?.title)}
          </h2>
          <p className="quiz-result-tagline">
            {isBlend ? pickQuizText(locale, blend.tagline) : pickQuizText(locale, single?.tagline)}
          </p>
          <p className="quiz-result-body">
            {isBlend ? pickQuizText(locale, blend.body) : pickQuizText(locale, single?.body)}
          </p>
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
  return (
    <div className="quiz-shell">
      <div className="quiz-progress-wrap" aria-hidden="true">
        <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="quiz-step-label">{ui.formatQuestionStep(step + 1, total)}</p>
      {q.image ? (
        <div className="quiz-q-visual">
          <img
            src={q.image}
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
        {q.options.map((o) => {
          const isPicking = pickingKey === o.key;
          const showFill = isPicking && fillActive;
          return (
            <li key={`${step}-${o.key}`}>
              <button
                type="button"
                className={`quiz-opt${isPicking ? " quiz-opt--picking" : ""}`}
                disabled={answerBusy}
                onClick={() => pick(o.key)}
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
