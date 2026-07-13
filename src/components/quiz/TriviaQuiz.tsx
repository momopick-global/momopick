"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { quizAssetUrl } from "@/lib/content/quizAssetUrl";
import {
  buildPercentageOutcomeQuery,
  getBrowserQuizSearchString,
  parsePercentageOutcomePercent,
} from "@/lib/quizOutcomeUrl";
import { useHydratedLocationSearch } from "@/lib/useHydratedLocationSearch";
import { getQuizUiStrings, type QuizUiLocale, type QuizUiStrings } from "@/i18n/quiz-ui";
import { trackQuizComplete, trackQuizStart } from "@/lib/quizFunnel";
import { QuizImageWithFallback } from "./QuizImageWithFallback";
import { QuizIntroParticipantsLine } from "./QuizIntroParticipantsLine";
import { QuizResultFeedback } from "./QuizResultFeedback";
import { QuizResultLoadingScreen } from "./QuizResultLoadingScreen";
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
  pickTriviaGrade,
  triviaCorrectIndex,
  triviaScoreFromCorrect,
  type TriviaQuizDefinition,
} from "./triviaTypes";
import { KoLoveHubMoreSection } from "@/components/ko/KoLoveHubMoreSection";

/** 마지막 문항 후 결과 카드 전 로딩 대기(ms). 감소 모션 시 0. */
const QUIZ_RESULT_LOADING_MS = 500;

type QuizResultPhase = "idle" | "loading" | "done";

/** 응답 직후 공개 상태 — pickedIndex는 사용자가 고른 보기 */
type Reveal = { pickedIndex: number; correct: boolean };

function TriviaQuizDoneCard({
  definition,
  locale,
  ui,
  score,
  correctCount,
  quizPageHref,
  restart,
}: {
  definition: TriviaQuizDefinition;
  locale: QuizUiLocale;
  ui: QuizUiStrings;
  score: number;
  /** 공유 URL 복원 시 null — 정답 개수 줄을 숨긴다 */
  correctCount: number | null;
  quizPageHref: string;
  restart: () => void;
}) {
  const grade = pickTriviaGrade(definition.grades, score);
  const gradeTitle = grade ? pickQuizText(locale, grade.title) : "";
  const gradeDesc = grade ? pickQuizText(locale, grade.desc) : "";
  const total = definition.questions.length;

  const shareText = useMemo(() => {
    const t = pickQuizText(locale, definition.title) || "Quiz";
    const head = gradeTitle ? `${score} · ${gradeTitle}` : `${score}`;
    return `${t} — ${head} · ${ui.formatTriviaChallenge(score)} | Momopick`;
  }, [definition.title, gradeTitle, locale, score, ui]);

  const shareOgImage = useMemo(
    () => (definition.images?.og ? quizAssetUrl(definition.images.og, locale) : undefined),
    [definition.images?.og, locale],
  );

  const quizResultUrl = useMemo(() => {
    const q = buildPercentageOutcomeQuery(score);
    return q ? `${quizPageHref}?${q}` : undefined;
  }, [score, quizPageHref]);

  const resultsGalleryHref = `${quizPageHref}results/`;

  const shareModel = useQuizResultShareModel({
    shareText,
    shareImageUrl: shareOgImage,
    quizStartUrl: quizPageHref,
    quizResultUrl,
    kakaoQuizResultShare: true,
    funnelSlug: definition.slug,
  });

  return (
    <div className="quiz-shell">
      <div className="quiz-result-card">
        <div className="quiz-result-percent-wrap" aria-label={`${score}`}>
          <span className="quiz-result-percent">{score}</span>
          <span className="quiz-result-percent-suffix quiz-result-score-suffix">
            {locale === "ko" ? "점" : "pts"}
          </span>
        </div>
        {correctCount !== null ? (
          <p className="quiz-result-submetric">
            {ui.formatTriviaCorrectLine(correctCount, total)}
          </p>
        ) : null}
        <QuizPackTags tags={definition.tags} locale={locale} />
        {gradeTitle ? <h2 className="quiz-result-title">{gradeTitle}</h2> : null}
        {gradeDesc ? (
          <p className="quiz-result-body quiz-result-body--percent">{gradeDesc}</p>
        ) : null}
        <p className="quiz-result-challenge">{ui.formatTriviaChallenge(score)}</p>
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
              resultTitle: gradeTitle || `${score}`,
              resultLine:
                locale === "ko" ? `${score}점 · ${gradeTitle}` : `${score} pts · ${gradeTitle}`,
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
        <QuizResultFeedback quizSlug={definition.slug} ui={ui} />
        <p className="quiz-footnote">{pickQuizText(locale, definition.footnote)}</p>
        <QuizShareKakaoWideButton model={shareModel} ui={ui} />
        <div className="quiz-result-share-hints">
          <QuizShareStatusHints model={shareModel} ui={ui} />
        </div>
      </div>
      {locale === "ko" && definition.category?.trim() === "love" ? (
        <KoLoveHubMoreSection
          locale={locale}
          excludeHref={quizPageHref}
          placement="quiz"
          relatedSlugs={definition.related}
        />
      ) : null}
    </div>
  );
}

export function TriviaQuiz({
  definition,
  locale = "ko",
}: {
  definition: TriviaQuizDefinition;
  locale?: QuizUiLocale;
}) {
  const router = useRouter();
  const ui = getQuizUiStrings(locale);
  const { questions } = definition;
  const total = questions.length;

  const [step, setStep] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [reveal, setReveal] = useState<Reveal | null>(null);
  const [resultPhase, setResultPhase] = useState<QuizResultPhase>("idle");
  const [quizStarted, setQuizStarted] = useState(false);
  /** 공유 URL로 복원된 점수 (정답 개수를 모르므로 별도 보관) */
  const [restoredScore, setRestoredScore] = useState<number | null>(null);

  const quizId = definition.slug?.trim() || definition.id;

  const quizPageHref = useMemo(() => {
    const cat = definition.category?.trim() || "quiz";
    return `/${locale}/${cat}/${quizId}/`;
  }, [definition.category, quizId, locale]);

  const quizShareCoverUrl = useMemo(() => {
    const raw =
      definition.images?.thumbnail ?? definition.images?.og ?? definition.card?.image;
    return raw ? quizAssetUrl(raw, locale) : undefined;
  }, [definition.images?.thumbnail, definition.images?.og, definition.card?.image, locale]);

  const urlSearch = useHydratedLocationSearch();

  const effectiveSearch = useMemo(() => {
    const u = urlSearch?.trim() ?? "";
    if (u.length > 1) return u.startsWith("?") ? u : `?${u}`;
    return "";
  }, [urlSearch]);

  const hasSharedOutcomeInUrl = useMemo(
    () => parsePercentageOutcomePercent(effectiveSearch) != null,
    [effectiveSearch],
  );

  const showIntro = resultPhase === "idle" && !quizStarted && !hasSharedOutcomeInUrl;

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const tryRestore = (search: string) => {
      const pct = parsePercentageOutcomePercent(search);
      if (pct == null) return;
      setRestoredScore(pct);
      setResultPhase("done");
      setStep(total);
    };
    tryRestore(urlSearch);
    tryRestore(getBrowserQuizSearchString());
    const id = requestAnimationFrame(() => tryRestore(getBrowserQuizSearchString()));
    return () => cancelAnimationFrame(id);
  }, [total, urlSearch]);

  useEffect(() => {
    if (typeof window === "undefined" || resultPhase !== "idle") return;
    const pct = parsePercentageOutcomePercent(getBrowserQuizSearchString());
    if (pct == null) return;
    setRestoredScore(pct);
    setResultPhase("done");
    setStep(total);
  }, [resultPhase, total, urlSearch]);

  useEffect(() => {
    if (resultPhase !== "loading") return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ms = reduced ? 0 : QUIZ_RESULT_LOADING_MS;
    const id = window.setTimeout(() => setResultPhase("done"), ms);
    return () => window.clearTimeout(id);
  }, [resultPhase]);

  const pick = useCallback(
    (optionIndex: number) => {
      if (reveal) return; // 정답 공개 중에는 재선택 불가
      const q = questions[step];
      const opt = q?.options[optionIndex];
      if (!opt) return;
      const correct = opt.correct === true;
      setReveal({ pickedIndex: optionIndex, correct });
      if (correct) setCorrectCount((c) => c + 1);
    },
    [questions, reveal, step],
  );

  const goNext = useCallback(() => {
    if (!reveal) return;
    setReveal(null);
    if (step >= total - 1) {
      trackQuizComplete(quizId);
      setResultPhase("loading");
    } else {
      setStep((s) => s + 1);
    }
  }, [reveal, step, total, quizId]);

  const restart = useCallback(() => {
    setStep(0);
    setCorrectCount(0);
    setReveal(null);
    setRestoredScore(null);
    setResultPhase("idle");
    setQuizStarted(false);
    router.replace(quizPageHref);
  }, [quizPageHref, router]);

  const score = restoredScore ?? triviaScoreFromCorrect(correctCount, total);

  const shareScoreQuery = useMemo(() => {
    if (resultPhase !== "done") return "";
    return buildPercentageOutcomeQuery(score);
  }, [resultPhase, score]);

  useEffect(() => {
    if (resultPhase !== "done" || typeof window === "undefined" || !shareScoreQuery) return;
    const want = `?${shareScoreQuery}`;
    if (window.location.search !== want) {
      window.history.replaceState(null, "", `${quizPageHref}?${shareScoreQuery}`);
    }
  }, [resultPhase, quizPageHref, shareScoreQuery]);

  if (resultPhase === "done") {
    return (
      <TriviaQuizDoneCard
        definition={definition}
        locale={locale}
        ui={ui}
        score={score}
        correctCount={restoredScore !== null ? null : correctCount}
        quizPageHref={quizPageHref}
        restart={restart}
      />
    );
  }

  if (resultPhase === "loading") {
    return <QuizResultLoadingScreen ui={ui} />;
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
          {/* 스낵 퀴즈 인트로와 동일한 배치: 시작 버튼 → 구분선 → 태그 → 안내 → 공유 → 참여 수 */}
          <div className="quiz-intro-actions">
            <button
              type="button"
              className="btn primary quiz-intro-start"
              onClick={() => {
                trackQuizStart(quizId);
                setQuizStarted(true);
              }}
            >
              {ui.startTest}
            </button>
          </div>
          <hr className="quiz-divider" />
          <QuizPackTags tags={definition.tags} locale={locale} className="quiz-intro-tags" />
          <p className="quiz-intro-body">{ui.quizIntroBody(total)}</p>
          <div className="quiz-share-wrap quiz-share-wrap--intro">
            <QuizResultShare
              ui={ui}
              shareText={introShareText}
              shareImageUrl={quizShareCoverUrl}
            />
          </div>
          <QuizIntroParticipantsLine quizId={quizId} ui={ui} />
        </div>
      </div>
    );
  }

  const q = questions[step];
  const answerIndex = triviaCorrectIndex(q);
  const progress = Math.round(((step + 1) / total) * 100);
  const earnedScore = triviaScoreFromCorrect(correctCount, total);

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
      <div className="quiz-trivia-statusbar">
        <p className="quiz-step-label quiz-step-label--trivia">
          {ui.formatQuestionStep(step + 1, total)}
        </p>
        <p className="quiz-trivia-live-score" aria-live="polite">
          {ui.formatTriviaLiveScore(earnedScore)}
        </p>
      </div>
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
        {q.options.map((o, idx) => {
          const isPicked = reveal?.pickedIndex === idx;
          const revealCorrect = reveal != null && idx === answerIndex;
          const revealWrongPick = reveal != null && isPicked && !reveal.correct;
          const cls = [
            "quiz-opt",
            revealCorrect ? "quiz-opt--trivia-correct" : "",
            revealWrongPick ? "quiz-opt--trivia-wrong" : "",
            reveal != null && !revealCorrect && !revealWrongPick ? "quiz-opt--trivia-dim" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <li key={`${step}-${idx}`}>
              <button
                type="button"
                className={cls}
                disabled={reveal != null}
                onClick={() => pick(idx)}
              >
                <span className="quiz-opt-label">{pickQuizText(locale, o.label)}</span>
                {revealCorrect ? (
                  <span className="quiz-trivia-opt-mark" aria-hidden="true">
                    ✓
                  </span>
                ) : null}
                {revealWrongPick ? (
                  <span className="quiz-trivia-opt-mark" aria-hidden="true">
                    ✕
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
      {reveal ? (
        <div
          className={`quiz-trivia-reveal${reveal.correct ? " quiz-trivia-reveal--correct" : " quiz-trivia-reveal--wrong"}`}
          role="status"
        >
          <p className="quiz-trivia-reveal__badge">
            {reveal.correct ? ui.triviaCorrect : ui.triviaWrong}
          </p>
          {q.explanation ? (
            <p className="quiz-trivia-reveal__explanation">
              {pickQuizText(locale, q.explanation)}
            </p>
          ) : null}
          <button type="button" className="btn primary quiz-trivia-next" onClick={goNext}>
            {step >= total - 1 ? ui.triviaShowResult : ui.triviaNext}
          </button>
        </div>
      ) : null}
    </div>
  );
}
