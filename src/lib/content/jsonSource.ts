import type { PercentageQuizDefinition } from "@/components/quiz/percentageTypes";
import type { SnackQuizDefinition } from "@/components/quiz/types";
import {
  quizAngerStyleTest,
  quizConfessionSuccessRate,
  quizLogicalOrEmotional,
  quizLoveTemperatureTest,
  quizRelationshipBalanceTest,
  quizDatingExpertOrBeginner,
  quizHiddenDarkSide,
  quizIdealTypeRealityTest,
  quizLeaderOrSupporter,
  quizLovePatternDestroyingHabit,
  quizWhenMenLoseInterest,
  quizWhoLikesYouType,
  quizWhyCantYouTextFirst,
} from "@/content/quiz";
import type { QuizContentSource, QuizRef } from "./types";

function keyOf(ref: QuizRef): string {
  return `${ref.lang}/${ref.category}/${ref.slug}`;
}

const koByKey: Record<string, SnackQuizDefinition> = {
  "ko/love/who-likes-you-type": quizWhoLikesYouType,
  "ko/love/love-pattern-destroying-habit": quizLovePatternDestroyingHabit,
  "ko/love/dating-expert-or-beginner": quizDatingExpertOrBeginner,
  "ko/love/ideal-type-reality-test": quizIdealTypeRealityTest,
  "ko/love/why-cant-you-text-first": quizWhyCantYouTextFirst,
  "ko/love/when-men-lose-interest": quizWhenMenLoseInterest,
  "ko/love/hidden-dark-side": quizHiddenDarkSide,
  "ko/love/leader-or-supporter": quizLeaderOrSupporter,
  "ko/love/anger-style-test": quizAngerStyleTest,
};

const koPercentageByKey: Record<string, PercentageQuizDefinition> = {
  "ko/love/confession-success-rate": quizConfessionSuccessRate,
  "ko/love/love-temperature-test": quizLoveTemperatureTest,
  "ko/love/relationship-balance-test": quizRelationshipBalanceTest,
  "ko/love/logical-or-emotional": quizLogicalOrEmotional,
};

/**
 * `src/content/quiz` 기반 정적 JSON 소스. 퀴즈가 늘어나면 맵만 확장.
 */
export const jsonQuizSource: QuizContentSource = {
  async getSnackQuiz(ref: QuizRef): Promise<SnackQuizDefinition | null> {
    const q = koByKey[keyOf(ref)];
    return q ?? null;
  },
  async getPercentageQuiz(ref: QuizRef): Promise<PercentageQuizDefinition | null> {
    const q = koPercentageByKey[keyOf(ref)];
    return q ?? null;
  },
};
