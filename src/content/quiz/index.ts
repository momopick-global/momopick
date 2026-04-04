import type { PercentageQuizDefinition } from "@/components/quiz/percentageTypes";
import type { SnackQuizDefinition } from "@/components/quiz/types";
import angerStyleTest from "./anger-style-test.json";
import confessionSuccessRate from "./confession-success-rate.json";
import datingExpertOrBeginner from "./dating-expert-or-beginner.json";
import hiddenDarkSide from "./hidden-dark-side.json";
import idealTypeRealityTest from "./ideal-type-reality-test.json";
import leaderOrSupporter from "./leader-or-supporter.json";
import loveTemperatureTest from "./love-temperature-test.json";
import logicalOrEmotional from "./logical-or-emotional.json";
import relationshipBalanceTest from "./relationship-balance-test.json";
import lovePatternDestroyingHabit from "./love-pattern-destroying-habit.json";
import whoLikesYouType from "./who-likes-you-type.json";
import whenMenLoseInterest from "./when-men-lose-interest.json";
import whyCantYouTextFirst from "./why-cant-you-text-first.json";

/** 빌드 시 번들에 포함. 문구는 JSON 내 `{ ko, en }`로 관리 (언어별 하위 폴더 불필요) */
export const quizWhoLikesYouType = whoLikesYouType as SnackQuizDefinition;

export const quizLovePatternDestroyingHabit = lovePatternDestroyingHabit as SnackQuizDefinition;

export const quizDatingExpertOrBeginner = datingExpertOrBeginner as SnackQuizDefinition;

export const quizIdealTypeRealityTest = idealTypeRealityTest as SnackQuizDefinition;

export const quizHiddenDarkSide = hiddenDarkSide as SnackQuizDefinition;

export const quizLeaderOrSupporter = leaderOrSupporter as SnackQuizDefinition;

export const quizAngerStyleTest = angerStyleTest as SnackQuizDefinition;

export const quizWhyCantYouTextFirst = whyCantYouTextFirst as SnackQuizDefinition;

export const quizWhenMenLoseInterest = whenMenLoseInterest as SnackQuizDefinition;

export const quizConfessionSuccessRate = confessionSuccessRate as PercentageQuizDefinition;

export const quizLoveTemperatureTest = loveTemperatureTest as PercentageQuizDefinition;

export const quizRelationshipBalanceTest = relationshipBalanceTest as PercentageQuizDefinition;

export const quizLogicalOrEmotional = logicalOrEmotional as PercentageQuizDefinition;

/**
 * 한국어 홈(“지금 뜨는 테스트” 등) — `src/content/quiz`에 JSON을 추가하면 여기에 한 줄 넣고,
 * 정렬은 각 JSON의 `card.priority`(클수록 앞)로 `getKoHomeRailSorted`에서 처리합니다.
 */
export const koQuizCatalogForHome: (SnackQuizDefinition | PercentageQuizDefinition)[] = [
  quizWhoLikesYouType,
  quizWhyCantYouTextFirst,
  quizWhenMenLoseInterest,
  quizConfessionSuccessRate,
  quizLoveTemperatureTest,
  quizRelationshipBalanceTest,
  quizLogicalOrEmotional,
  quizHiddenDarkSide,
  quizLeaderOrSupporter,
  quizAngerStyleTest,
  quizLovePatternDestroyingHabit,
  quizDatingExpertOrBeginner,
  quizIdealTypeRealityTest,
];
