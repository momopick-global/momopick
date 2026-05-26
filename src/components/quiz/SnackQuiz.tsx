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
import { getQuizUiStrings, type QuizUiLocale, type QuizUiStrings } from "@/i18n/quiz-ui";
import { QuizImageWithFallback } from "./QuizImageWithFallback";
import { QuizResultLoadingScreen } from "./QuizResultLoadingScreen";
import { QuizPackTags } from "./QuizPackTags";
import { SnackQuizIntroWithLiveCount } from "./SnackQuizIntroWithLiveCount";
import {
  QuizResultShare,
  QuizResultShareIconRow,
  QuizShareKakaoWideButton,
  QuizShareStatusHints,
} from "./QuizResultShare";
import { QuizSaveToVaultButton } from "./QuizSaveToVaultButton";
import { pickQuizText, type SnackQuizDefinition } from "./types";
import { useQuizResultShareModel } from "./useQuizResultShareModel";
import { KoLoveHubMoreSection } from "@/components/ko/KoLoveHubMoreSection";

/** 버튼 채움 애니메이션(≈0.28s)이 끝난 뒤 약간 여유를 두고 다음으로 */
const ANSWER_FILL_MS = 340;
/** 마지막 문항 후 결과 카드 전 로딩 대기(ms). 감소 모션 시 0. */
const QUIZ_RESULT_LOADING_MS = 3000;

type QuizResultPhase = "idle" | "loading" | "done";

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

function SnackQuizDoneCard({
  definition,
  locale,
  ui,
  counts,
  quizPageHref,
  resultsGalleryHref,
  quizResultUrl,
  restart,
}: {
  definition: SnackQuizDefinition;
  locale: QuizUiLocale;
  ui: QuizUiStrings;
  counts: Record<string, number>;
  quizPageHref: string;
  resultsGalleryHref: string;
  quizResultUrl: string | undefined;
  restart: () => void;
}) {
  const { resultKeys, resultOrder, results, blend, footnote } = definition;
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

  const shareModel = useQuizResultShareModel({
    shareText,
    shareImageUrl: resultImage,
    quizStartUrl: quizPageHref,
    quizResultUrl,
    kakaoQuizResultShare: true,
  });

  return (
    <div className="quiz-shell">
      <div className="quiz-result-card">
        {resultImage ? (
          <div className="quiz-result-visual-wrap">
            <div className="quiz-result-visual">
              <QuizImageWithFallback
                src={resultImage}
                alt=""
                width={480}
                height={480}
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="quiz-result-save-fab">
              <QuizSaveToVaultButton
                variant="fab"
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
            </div>
          </div>
        ) : null}
        {resultImage ? <QuizPackTags tags={definition.tags} locale={locale} afterImage /> : null}
        <p className="quiz-result-emoji" aria-hidden="true">
          {isBlend ? blend.emoji : single?.emoji}
        </p>
        {!resultImage ? <QuizPackTags tags={definition.tags} locale={locale} /> : null}
        <h2 className="quiz-result-title">
          {isBlend ? pickQuizText(locale, blend.title) : pickQuizText(locale, single?.title)}
        </h2>
        <p className="quiz-result-tagline">
          {isBlend ? pickQuizText(locale, blend.tagline) : pickQuizText(locale, single?.tagline)}
        </p>
        <p className="quiz-result-body">
          {isBlend ? pickQuizText(locale, blend.body) : pickQuizText(locale, single?.body)}
        </p>
        <div className="quiz-share quiz-share--result-top">
          <QuizResultShareIconRow model={shareModel} ui={ui} />
        </div>
        <div className="quiz-result-actions-stack">
          {!resultImage ? (
            <QuizSaveToVaultButton
              layout="bar"
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
          ) : null}
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
      {locale === "ko" && definition.category?.trim() === "love" ? (
        <KoLoveHubMoreSection locale={locale} excludeHref={quizPageHref} placement="quiz" />
      ) : null}
    </div>
  );
}

export function SnackQuiz({
  definition,
  locale = "ko",
  trackParticipantCount = false,
}: {
  definition: SnackQuizDefinition;
  /** 고정 UI(다시 하기·질문 n/t) 언어. 라우트 세그먼트와 맞출 것 */
  locale?: QuizUiLocale;
  /**
   * true일 때만 Supabase `quiz_stats` 조회·시작 시 +1 및 `#user-count` 표시.
   * 특정 랜딩(예: ambiguous-situationship-end)에서만 켭니다.
   */
  trackParticipantCount?: boolean;
}) {
  const router = useRouter();
  const ui = getQuizUiStrings(locale);
  const { resultKeys, resultOrder, questions } = definition;

  const [step, setStep] = useState(0);
  const [counts, setCounts] = useState<Record<string, number>>(() => emptyCounts(resultKeys));
  const [resultPhase, setResultPhase] = useState<QuizResultPhase>("idle");
  /** 답 선택 후: 클릭한 버튼 안에서만 채움 애니메이션 중 */
  const [answerBusy, setAnswerBusy] = useState(false);
  const [pickingKey, setPickingKey] = useState<string | null>(null);
  const [fillActive, setFillActive] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const answerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = questions.length;
  /** 현재 문항까지 진행률(1/N … N/N). 문항 UI에서만 사용 */
  const progress = useMemo(
    () => Math.round(((step + 1) / total) * 100),
    [step, total],
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

  /** 하이드레이션: 서버·첫 클라 렌더는 `urlSearch`만 쓴다. `window` 직접 읽기는 useLayoutEffect에서 처리 */
  const effectiveSearch = useMemo(() => {
    const u = urlSearch?.trim() ?? "";
    if (u.length > 1) return u.startsWith("?") ? u : `?${u}`;
    return "";
  }, [urlSearch]);

  const hasSharedOutcomeInUrl = useMemo(
    () => parseSnackOutcomeSearch(effectiveSearch, resultKeys) != null,
    [effectiveSearch, resultKeys],
  );

  const showIntro = resultPhase === "idle" && !quizStarted && !hasSharedOutcomeInUrl;

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const tryRestore = (search: string) => {
      const restored = parseSnackOutcomeSearch(search, resultKeys);
      if (restored) {
        setCounts(restored);
        setResultPhase("done");
      }
    };
    tryRestore(urlSearch);
    tryRestore(getBrowserQuizSearchString());
    const id = requestAnimationFrame(() => tryRestore(getBrowserQuizSearchString()));
    return () => cancelAnimationFrame(id);
  }, [resultKeys, urlSearch]);

  /** 프로덕션 CDN·하이드레이션 타이밍에서 layout 이후 한 번 더 (짧은 깜빡임 허용) */
  useEffect(() => {
    if (typeof window === "undefined" || resultPhase !== "idle") return;
    const search = getBrowserQuizSearchString();
    const restored = parseSnackOutcomeSearch(search, resultKeys);
    if (restored) {
      setCounts(restored);
      setResultPhase("done");
    }
  }, [resultPhase, resultKeys, urlSearch]);

  useEffect(() => {
    if (resultPhase !== "loading") return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ms = reduced ? 0 : QUIZ_RESULT_LOADING_MS;
    const id = window.setTimeout(() => setResultPhase("done"), ms);
    return () => window.clearTimeout(id);
  }, [resultPhase]);

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
          setResultPhase("loading");
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
    setResultPhase("idle");
    setQuizStarted(false);
    setAnswerBusy(false);
    setPickingKey(null);
    setFillActive(false);
    router.replace(quizPageHref);
  }, [resultKeys, quizPageHref, router]);

  const shareOutcomeQuery = useMemo(() => {
    if (resultPhase !== "done") return "";
    const maxScore = Math.max(0, ...resultKeys.map((k) => counts[k] ?? 0));
    const leaders = orderLeaders(resultKeys, resultOrder, counts, maxScore);
    const isBlendOutcome = leaders.length > 1;
    const onlyKey = !isBlendOutcome && leaders[0] ? leaders[0] : null;
    return buildSnackOutcomeQuery(isBlendOutcome, leaders, onlyKey);
  }, [resultPhase, counts, resultKeys, resultOrder]);

  const quizResultUrl = useMemo(() => {
    if (!shareOutcomeQuery) return undefined;
    return `${quizPageHref}?${shareOutcomeQuery}`;
  }, [quizPageHref, shareOutcomeQuery]);

  useEffect(() => {
    if (resultPhase !== "done" || typeof window === "undefined" || !shareOutcomeQuery) return;
    const want = `?${shareOutcomeQuery}`;
    if (window.location.search !== want) {
      window.history.replaceState(null, "", `${quizPageHref}?${shareOutcomeQuery}`);
    }
  }, [resultPhase, quizPageHref, shareOutcomeQuery]);

  if (resultPhase === "done") {
    return (
      <SnackQuizDoneCard
        definition={definition}
        locale={locale}
        ui={ui}
        counts={counts}
        quizPageHref={quizPageHref}
        resultsGalleryHref={resultsGalleryHref}
        quizResultUrl={quizResultUrl}
        restart={restart}
      />
    );
  }

  if (resultPhase === "loading") {
    return <QuizResultLoadingScreen ui={ui} />;
  }

  if (showIntro) {
    const introShareText = (() => {
      const t = pickQuizText(locale, definition.title);
      const sub = definition.subtitle ? pickQuizText(locale, definition.subtitle) : "";
      return sub ? `${t} — ${sub} | Momopick` : `${t} | Momopick`;
    })();
    const quizId = definition.slug?.trim() || definition.id;
    return (
      <div className="quiz-shell quiz-shell--intro">
        {trackParticipantCount ? (
          <SnackQuizIntroWithLiveCount
            quizId={quizId}
            locale={locale}
            questionTotal={total}
            tags={definition.tags}
            shareText={introShareText}
            shareImageUrl={quizShareCoverUrl}
            onStarted={() => setQuizStarted(true)}
          />
        ) : (
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
              <button
                type="button"
                className="btn primary quiz-intro-start"
                onClick={() => setQuizStarted(true)}
              >
                {ui.startTest}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const q = questions[step];

  return (
    <div className="quiz-shell">
      <div
        className="quiz-progress-wrap"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label={ui.formatQuestionStep(step + 1, total)}
      >
        <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="quiz-step-label">{ui.formatQuestionStep(step + 1, total)}</p>
      {q.image ? (
        <div className="quiz-q-visual">
          <QuizImageWithFallback
            src={quizAssetUrl(q.image, locale)}
            alt=""
            width={240}
            height={240}
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
