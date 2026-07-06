import type { PercentageQuizDefinition } from "@/components/quiz/percentageTypes";
import type { SnackQuizDefinition } from "@/components/quiz/types";
import ambiguousSituationshipEnd from "./ambiguous-situationship-end.json";
import angerStyleTest from "./anger-style-test.json";
import colorMoodOnepick from "./color-mood-onepick.json";
import doorNeedOnepick from "./door-need-onepick.json";
import dessertLoveOnepick from "./dessert-love-onepick.json";
import nightSkyMoodOnepick from "./night-sky-mood-onepick.json";
import islandValueOnepick from "./island-value-onepick.json";
import flowerCharmOnepick from "./flower-charm-onepick.json";
import emojiCrushOnepick from "./emoji-crush-onepick.json";
import weatherRelationshipOnepick from "./weather-relationship-onepick.json";
import cafeSeatOnepick from "./cafe-seat-onepick.json";
import dollLoveOnepick from "./doll-love-onepick.json";
import travelNeedOnepick from "./travel-need-onepick.json";
import confessionSuccessRate from "./confession-success-rate.json";
import datingExpertOrBeginner from "./dating-expert-or-beginner.json";
import emotionalSensitivity from "./emotional-sensitivity.json";
import hiddenDarkSide from "./hidden-dark-side.json";
import leaderOrSupporter from "./leader-or-supporter.json";
import loveTemperatureTest from "./love-temperature-test.json";
import mentalStrengthTest from "./mental-strength-test.json";
import personalityPsychologyTest from "./personality-psychology-test.json";
import plannerOrSpontaneous from "./planner-or-spontaneous.json";
import selfEsteemLevel from "./self-esteem-level.json";
import logicalOrEmotional from "./logical-or-emotional.json";
import relationshipBalanceTest from "./relationship-balance-test.json";
import trueSelfAlone from "./true-self-alone.json";
import trustLevelTest from "./trust-level-test.json";
import lovePatternDestroyingHabit from "./love-pattern-destroying-habit.json";
import whoLikesYouType from "./who-likes-you-type.json";
import whenMenLoseInterest from "./when-men-lose-interest.json";
import whyCantYouTextFirst from "./why-cant-you-text-first.json";

/** 빌드 시 번들에 포함. 문구는 JSON 내 `{ ko, en }`로 관리 (언어별 하위 폴더 불필요) */
export const quizWhoLikesYouType = whoLikesYouType as SnackQuizDefinition;

export const quizLovePatternDestroyingHabit = lovePatternDestroyingHabit as SnackQuizDefinition;

export const quizDatingExpertOrBeginner = datingExpertOrBeginner as SnackQuizDefinition;

export const quizHiddenDarkSide = hiddenDarkSide as SnackQuizDefinition;

export const quizLeaderOrSupporter = leaderOrSupporter as SnackQuizDefinition;

export const quizAngerStyleTest = angerStyleTest as SnackQuizDefinition;

export const quizMentalStrengthTest = mentalStrengthTest as SnackQuizDefinition;

export const quizEmotionalSensitivity = emotionalSensitivity as SnackQuizDefinition;

export const quizPersonalityPsychologyTest = personalityPsychologyTest as SnackQuizDefinition;

/** 원픽 테스트 샘플 — 1문항(이미지 보기 4개) → 결과 1:1 */
export const quizColorMoodOnepick = colorMoodOnepick as SnackQuizDefinition;
export const quizDoorNeedOnepick = doorNeedOnepick as SnackQuizDefinition;

export const quizDessertLoveOnepick = dessertLoveOnepick as SnackQuizDefinition;

export const quizNightSkyMoodOnepick = nightSkyMoodOnepick as SnackQuizDefinition;

export const quizIslandValueOnepick = islandValueOnepick as SnackQuizDefinition;

export const quizFlowerCharmOnepick = flowerCharmOnepick as SnackQuizDefinition;

export const quizEmojiCrushOnepick = emojiCrushOnepick as SnackQuizDefinition;

export const quizWeatherRelationshipOnepick = weatherRelationshipOnepick as SnackQuizDefinition;

export const quizCafeSeatOnepick = cafeSeatOnepick as SnackQuizDefinition;

export const quizDollLoveOnepick = dollLoveOnepick as SnackQuizDefinition;

export const quizTravelNeedOnepick = travelNeedOnepick as SnackQuizDefinition;

export const quizTrueSelfAlone = trueSelfAlone as SnackQuizDefinition;

export const quizTrustLevelTest = trustLevelTest as SnackQuizDefinition;

export const quizWhyCantYouTextFirst = whyCantYouTextFirst as SnackQuizDefinition;

export const quizAmbiguousSituationshipEnd = ambiguousSituationshipEnd as SnackQuizDefinition;

export const quizWhenMenLoseInterest = whenMenLoseInterest as SnackQuizDefinition;

export const quizConfessionSuccessRate = confessionSuccessRate as PercentageQuizDefinition;

export const quizLoveTemperatureTest = loveTemperatureTest as PercentageQuizDefinition;

export const quizRelationshipBalanceTest = relationshipBalanceTest as PercentageQuizDefinition;

export const quizLogicalOrEmotional = logicalOrEmotional as PercentageQuizDefinition;

export const quizPlannerOrSpontaneous = plannerOrSpontaneous as PercentageQuizDefinition;

export const quizSelfEsteemLevel = selfEsteemLevel as PercentageQuizDefinition;

/** 스낵 퀴즈(최다득표형) — 결과 이미지 갤러리·`/ko/love/[slug]/results/` 라우트용 */
export const snackQuizDefinitionsCatalog: SnackQuizDefinition[] = [
  quizColorMoodOnepick,
  quizDoorNeedOnepick,
  quizDessertLoveOnepick,
  quizNightSkyMoodOnepick,
  quizIslandValueOnepick,
  quizFlowerCharmOnepick,
  quizEmojiCrushOnepick,
  quizWeatherRelationshipOnepick,
  quizCafeSeatOnepick,
  quizDollLoveOnepick,
  quizTravelNeedOnepick,
  quizWhoLikesYouType,
  quizAmbiguousSituationshipEnd,
  quizWhyCantYouTextFirst,
  quizWhenMenLoseInterest,
  quizHiddenDarkSide,
  quizLeaderOrSupporter,
  quizAngerStyleTest,
  quizMentalStrengthTest,
  quizEmotionalSensitivity,
  quizPersonalityPsychologyTest,
  quizTrueSelfAlone,
  quizTrustLevelTest,
  quizLovePatternDestroyingHabit,
  quizDatingExpertOrBeginner,
];

/**
 * 한국어 홈(“지금 뜨는 테스트” 등) — `src/content/quiz`에 JSON을 추가하면 여기에 한 줄 넣고,
 * 정렬은 각 JSON의 `card.priority`(클수록 앞)로 `getKoHomeRailSorted`에서 처리합니다.
 */
export const koQuizCatalogForHome: (SnackQuizDefinition | PercentageQuizDefinition)[] = [
  quizColorMoodOnepick,
  quizDoorNeedOnepick,
  quizDessertLoveOnepick,
  quizNightSkyMoodOnepick,
  quizIslandValueOnepick,
  quizFlowerCharmOnepick,
  quizEmojiCrushOnepick,
  quizWeatherRelationshipOnepick,
  quizCafeSeatOnepick,
  quizDollLoveOnepick,
  quizTravelNeedOnepick,
  quizWhoLikesYouType,
  quizAmbiguousSituationshipEnd,
  quizWhyCantYouTextFirst,
  quizWhenMenLoseInterest,
  quizConfessionSuccessRate,
  quizLoveTemperatureTest,
  quizRelationshipBalanceTest,
  quizPlannerOrSpontaneous,
  quizSelfEsteemLevel,
  quizLogicalOrEmotional,
  quizHiddenDarkSide,
  quizLeaderOrSupporter,
  quizAngerStyleTest,
  quizMentalStrengthTest,
  quizEmotionalSensitivity,
  quizPersonalityPsychologyTest,
  quizTrueSelfAlone,
  quizTrustLevelTest,
  quizLovePatternDestroyingHabit,
  quizDatingExpertOrBeginner,
];
