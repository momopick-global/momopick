import type { PercentageQuizDefinition } from "@/components/quiz/percentageTypes";
import type { SnackQuizDefinition } from "@/components/quiz/types";
import {
  quizAngerStyleTest,
  quizConfessionSuccessRate,
  quizLogicalOrEmotional,
  quizLoveTemperatureTest,
  quizRelationshipBalanceTest,
  quizPlannerOrSpontaneous,
  quizSelfEsteemLevel,
  quizDatingExpertOrBeginner,
  quizEmotionalSensitivity,
  quizHiddenDarkSide,
  quizLeaderOrSupporter,
  quizMentalStrengthTest,
  quizTrueSelfAlone,
  quizTrustLevelTest,
  quizLovePatternDestroyingHabit,
  quizWhenMenLoseInterest,
  quizWhoLikesYouType,
  quizAmbiguousSituationshipEnd,
  quizWhyCantYouTextFirst,
} from "@/content/quiz";
import type { QuizContentSource, QuizRef } from "./types";

function keyOf(ref: QuizRef): string {
  return `${ref.lang}/${ref.category}/${ref.slug}`;
}

const koByKey: Record<string, SnackQuizDefinition> = {
  "ko/love/who-likes-you-type": quizWhoLikesYouType,
  "ko/love/ambiguous-situationship-end": quizAmbiguousSituationshipEnd,
  "ko/love/love-pattern-destroying-habit": quizLovePatternDestroyingHabit,
  "ko/love/dating-expert-or-beginner": quizDatingExpertOrBeginner,
  "ko/love/why-cant-you-text-first": quizWhyCantYouTextFirst,
  "ko/love/when-men-lose-interest": quizWhenMenLoseInterest,
  "ko/love/hidden-dark-side": quizHiddenDarkSide,
  "ko/love/leader-or-supporter": quizLeaderOrSupporter,
  "ko/love/anger-style-test": quizAngerStyleTest,
  "ko/love/mental-strength-test": quizMentalStrengthTest,
  "ko/love/emotional-sensitivity": quizEmotionalSensitivity,
  "ko/love/true-self-alone": quizTrueSelfAlone,
  "ko/love/trust-level-test": quizTrustLevelTest,
};

const koPercentageByKey: Record<string, PercentageQuizDefinition> = {
  "ko/love/confession-success-rate": quizConfessionSuccessRate,
  "ko/love/love-temperature-test": quizLoveTemperatureTest,
  "ko/love/relationship-balance-test": quizRelationshipBalanceTest,
  "ko/love/logical-or-emotional": quizLogicalOrEmotional,
  "ko/love/planner-or-spontaneous": quizPlannerOrSpontaneous,
  "ko/love/self-esteem-level": quizSelfEsteemLevel,
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
