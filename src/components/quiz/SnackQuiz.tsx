"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { quizAssetUrl } from "@/lib/content/quizAssetUrl";
import {
  buildSnackOutcomeQuery,
  getBrowserQuizSearchString,
  parseSnackOutcomeSearch,
} from "@/lib/quizOutcomeUrl";
import { useHydratedLocationSearch } from "@/lib/useHydratedLocationSearch";
import { getQuizUiStrings, type QuizUiLocale } from "@/i18n/quiz-ui";
import { QuizImageWithFallback } from "./QuizImageWithFallback";
import { QuizResultShare } from "./QuizResultShare";
import { QuizSaveToVaultButton } from "./QuizSaveToVaultButton";
import { pickQuizText, type SnackQuizDefinition } from "./types";

/** 버튼 채움 애니메이션(≈0.28s)이 끝난 뒤 약간 여유를 두고 다음으로 */
const ANSWER_FILL_MS = 340;

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
  const router = useRouter();
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

  const quizPageHref = useMemo(() => {
    const cat = definition.category?.trim() || "quiz";
    const seg = definition.slug?.trim() || definition.id;
    return `/${locale}/${cat}/${seg}/`;
  }, [definition.category, definition.slug, definition.id, locale]);

  const resultsGalleryHref = useMemo(() => `${quizPageHref}results/`, [quizPageHref]);

  /** 진행 중 공유 — 카카오·OG용 퀴즈 대표 커버 */
  const quizShareCoverUrl = useMemo(() => {
    const raw =
      definition.images?.thumbnail ?? definition.images?.og ?? definition.card?.image;
    return raw ? quizAssetUrl(raw, locale) : undefined;
  }, [definition.images?.thumbnail, definition.images?.og, definition.card?.image, locale]);

  const urlSearch = useHydratedLocationSearch();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const tryRestore = (search: string) => {
      const restored = parseSnackOutcomeSearch(search, resultKeys);
      if (restored) {
        setCounts(restored);
        setDone(true);
      }
    };
    tryRestore(urlSearch);
    tryRestore(getBrowserQuizSearchString());
    const id = requestAnimationFrame(() => tryRestore(getBrowserQuizSearchString()));
    return () => cancelAnimationFrame(id);
  }, [resultKeys, urlSearch]);

  /** 프로덕션 CDN·하이드레이션 타이밍에서 layout 이후 한 번 더 (짧은 깜빡임 허용) */
  useEffect(() => {
    if (typeof window === "undefined" || done) return;
    const search = getBrowserQuizSearchString();
    const restored = parseSnackOutcomeSearch(search, resultKeys);
    if (restored) {
      setCounts(restored);
      setDone(true);
    }
  }, [done, resultKeys, urlSearch]);

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
    router.replace(quizPageHref);
  }, [resultKeys, quizPageHref, router]);

  const shareOutcomeQuery = useMemo(() => {
    if (!done) return "";
    const maxScore = Math.max(0, ...resultKeys.map((k) => counts[k] ?? 0));
    const leaders = orderLeaders(resultKeys, resultOrder, counts, maxScore);
    const isBlendOutcome = leaders.length > 1;
    const onlyKey = !isBlendOutcome && leaders[0] ? leaders[0] : null;
    return buildSnackOutcomeQuery(isBlendOutcome, leaders, onlyKey);
  }, [done, counts, resultKeys, resultOrder]);

  const quizResultUrl = useMemo(() => {
    if (!shareOutcomeQuery) return undefined;
    return `${quizPageHref}?${shareOutcomeQuery}`;
  }, [quizPageHref, shareOutcomeQuery]);

  useEffect(() => {
    if (!done || typeof window === "undefined" || !shareOutcomeQuery) return;
    const want = `?${shareOutcomeQuery}`;
    if (window.location.search !== want) {
      window.history.replaceState(null, "", `${quizPageHref}?${shareOutcomeQuery}`);
    }
  }, [done, quizPageHref, shareOutcomeQuery]);

  if (done) {
    const maxScore = Math.max(0, ...resultKeys.map((k) => counts[k] ?? 0));
    const leaders = orderLeaders(resultKeys, resultOrder, counts, maxScore);
    const isBlend = leaders.length > 1;
    const singleKey = !isBlend && leaders[0] ? leaders[0] : null;
    const single = singleKey ? results[singleKey] : null;

    const resultImageRaw = isBlend ? blend.image : single?.image;
    const resultImage = resultImageRaw ? quizAssetUrl(resultImageRaw, locale) : undefined;
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
              <QuizImageWithFallback
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
          <QuizResultShare
            ui={ui}
            shareText={shareText}
            shareImageUrl={resultImage}
            quizStartUrl={quizPageHref}
            quizResultUrl={quizResultUrl}
            kakaoQuizResultShare
          />
          <div className="quiz-result-actions">
            <QuizSaveToVaultButton
              ui={ui}
              draft={{
                locale,
                quizSlug: definition.slug,
                quizTitle: pickQuizText(locale, definition.title) || definition.slug,
                quizHref: quizPageHref,
                kind: "snack",
                resultTitle: isBlend
                  ? pickQuizText(locale, blend.title)
                  : pickQuizText(locale, single?.title),
                resultLine: isBlend
                  ? pickQuizText(locale, blend.tagline)
                  : pickQuizText(locale, single?.tagline),
                imageUrl: resultImage,
              }}
            />
            <Link href={resultsGalleryHref} className="btn sm">
              {ui.viewAllResults}
            </Link>
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
    const t = pickQuizText(locale, definition.title);
    const sub = definition.subtitle ? pickQuizText(locale, definition.subtitle) : "";
    return sub ? `${t} — ${sub} | Momopick` : `${t} | Momopick`;
  })();

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
      <div className="quiz-share-wrap quiz-share-wrap--during">
        <QuizResultShare ui={ui} shareText={shareTextInProgress} shareImageUrl={quizShareCoverUrl} />
      </div>
    </div>
  );
}
