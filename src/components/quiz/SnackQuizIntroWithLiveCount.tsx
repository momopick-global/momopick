"use client";

import { getQuizUiStrings, type QuizUiLocale } from "@/i18n/quiz-ui";
import { useQuizParticipantCount } from "@/hooks/useQuizParticipantCount";
import { QuizPackTags } from "./QuizPackTags";
import { QuizResultShare } from "./QuizResultShare";
import type { SnackQuizText } from "./types";

type Props = {
  quizId: string;
  locale: QuizUiLocale;
  questionTotal: number;
  onStarted: () => void;
  tags?: SnackQuizText[];
  shareText: string;
  shareImageUrl?: string;
};

/**
 * Supabase `quiz_stats` 연동 인트로 — 훅은 이 컴포넌트 안에서만 호출(조건부 훅 방지).
 */
export function SnackQuizIntroWithLiveCount({
  quizId,
  locale,
  questionTotal,
  onStarted,
  tags,
  shareText,
  shareImageUrl,
}: Props) {
  const ui = getQuizUiStrings(locale);
  const { count: participantCount, registerStart } = useQuizParticipantCount(quizId);

  return (
    <div className="quiz-intro">
      <QuizPackTags tags={tags} locale={locale} className="quiz-intro-tags" />
      <p className="quiz-intro-body">{ui.quizIntroBody(questionTotal)}</p>
      <div className="quiz-share-wrap quiz-share-wrap--intro">
        <QuizResultShare ui={ui} shareText={shareText} shareImageUrl={shareImageUrl} />
      </div>
      <div className="quiz-intro-actions">
        <button
          type="button"
          className="btn primary quiz-intro-start"
          onClick={async () => {
            await registerStart();
            onStarted();
          }}
        >
          {ui.startTest}
        </button>
      </div>
      <p id="user-count" className="quiz-intro-participants" aria-live="polite">
        {ui.formatLiveParticipantLine(participantCount)}
      </p>
    </div>
  );
}
