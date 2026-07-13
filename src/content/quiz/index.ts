import type { PercentageQuizDefinition } from "@/components/quiz/percentageTypes";
import type { SnackQuizDefinition } from "@/components/quiz/types";
import type { TriviaQuizDefinition } from "@/components/quiz/triviaTypes";
import loveMemeExam from "./love-meme-exam.json";
import kakaoReplyStyle from "./kakao-reply-style.json";
import pursuitVsReality from "./pursuit-vs-reality.json";
import firstDmSimulation from "./first-dm-simulation.json";
import emojiReplyOnepick from "./emoji-reply-onepick.json";
import loveRecap2026H2 from "./love-recap-2026h2.json";
import someSignalReadingTest from "./some-signal-reading-test.json";
import loveMemeExam2 from "./love-meme-exam-2.json";
import loveKnowledgeCertificate from "./love-knowledge-certificate.json";
import soloSurvivalExam from "./solo-survival-exam.json";
import crushOverdriveIndex from "./crush-overdrive-index.json";
import ghostingRiskForecast from "./ghosting-risk-forecast.json";
import breakupResilienceTest from "./breakup-resilience-test.json";
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

/** 정답형(트리비아) 퀴즈 */
export const quizLoveMemeExam = loveMemeExam as TriviaQuizDefinition;

export const quizKakaoReplyStyle = kakaoReplyStyle as SnackQuizDefinition;
export const quizPursuitVsReality = pursuitVsReality as SnackQuizDefinition;
export const quizFirstDmSimulation = firstDmSimulation as SnackQuizDefinition;
export const quizEmojiReplyOnepick = emojiReplyOnepick as SnackQuizDefinition;
export const quizLoveRecap2026H2 = loveRecap2026H2 as SnackQuizDefinition;
export const quizSomeSignalReadingTest = someSignalReadingTest as TriviaQuizDefinition;
export const quizLoveMemeExam2 = loveMemeExam2 as TriviaQuizDefinition;
export const quizLoveKnowledgeCertificate = loveKnowledgeCertificate as TriviaQuizDefinition;
export const quizSoloSurvivalExam = soloSurvivalExam as TriviaQuizDefinition;
export const quizCrushOverdriveIndex = crushOverdriveIndex as PercentageQuizDefinition;
export const quizGhostingRiskForecast = ghostingRiskForecast as PercentageQuizDefinition;
export const quizBreakupResilienceTest = breakupResilienceTest as PercentageQuizDefinition;

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
  quizKakaoReplyStyle,
  quizPursuitVsReality,
  quizFirstDmSimulation,
  quizEmojiReplyOnepick,
  quizLoveRecap2026H2,
];



/** 정답형 퀴즈 카탈로그 — `/ko/love/[slug]/results/` 등급 갤러리용 */
export const triviaQuizDefinitionsCatalog: TriviaQuizDefinition[] = [
  quizLoveMemeExam,
  quizSomeSignalReadingTest,
  quizLoveMemeExam2,
  quizLoveKnowledgeCertificate,
  quizSoloSurvivalExam,
];

/** 퍼센트형(점수 합산) 퀴즈 — `/ko/love/[slug]/results/` 구간별 결과 갤러리용 */
export const percentageQuizDefinitionsCatalog: PercentageQuizDefinition[] = [
  quizConfessionSuccessRate,
  quizLoveTemperatureTest,
  quizRelationshipBalanceTest,
  quizLogicalOrEmotional,
  quizPlannerOrSpontaneous,
  quizSelfEsteemLevel,
  quizCrushOverdriveIndex,
  quizGhostingRiskForecast,
  quizBreakupResilienceTest,
];

/**
 * 한국어 홈(“지금 뜨는 테스트” 등) — `src/content/quiz`에 JSON을 추가하면 여기에 한 줄 넣고,
 * 정렬은 각 JSON의 `card.priority`(클수록 앞)로 `getKoHomeRailSorted`에서 처리합니다.
 */
export const koQuizCatalogForHome: (
  | SnackQuizDefinition
  | PercentageQuizDefinition
  | TriviaQuizDefinition
)[] = [
  quizLoveMemeExam,
  quizKakaoReplyStyle,
  quizPursuitVsReality,
  quizFirstDmSimulation,
  quizEmojiReplyOnepick,
  quizLoveRecap2026H2,
  quizSomeSignalReadingTest,
  quizLoveMemeExam2,
  quizLoveKnowledgeCertificate,
  quizSoloSurvivalExam,
  quizCrushOverdriveIndex,
  quizGhostingRiskForecast,
  quizBreakupResilienceTest,
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
