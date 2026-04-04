import type { PercentageQuizDefinition } from "@/components/quiz/percentageTypes";
import type { SnackQuizDefinition } from "@/components/quiz/types";

/** 퀴즈 JSON을 찾을 때 쓰는 좌표 (URL `{lang}/{category}/{slug}`와 맞춤) */
export type QuizRef = {
  lang: string;
  category: string;
  slug: string;
};

/**
 * 콘텐츠 소스 — 지금은 JSON 번들, 나중에 CMS/API로 교체 시 구현체만 갈아끼우면 됨.
 */
export type QuizContentSource = {
  getSnackQuiz(ref: QuizRef): Promise<SnackQuizDefinition | null>;
  getPercentageQuiz?(ref: QuizRef): Promise<PercentageQuizDefinition | null>;
};
