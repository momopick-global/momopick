import type {
  SnackQuizAnalytics,
  SnackQuizCard,
  SnackQuizPackImages,
  SnackQuizPackMeta,
  SnackQuizText,
} from "./types";

/** 구간별 결과 (퍼센트 0–100 기준) */
export type PercentageQuizRange = {
  min: number;
  max: number;
  title: SnackQuizText;
  desc: SnackQuizText;
  /** `resultDisplay: "temperature"` 일 때 히어로 숫자(예: 20, 50, 90) */
  displayDegree?: number;
};

export type PercentageQuizQuestionOption = {
  label: SnackQuizText;
  score: number;
};

export type PercentageQuizQuestion = {
  prompt: SnackQuizText;
  image?: string;
  options: PercentageQuizQuestionOption[];
};

/** 점수 합 → 퍼센트 환산 → `resultRanges` 매칭 */
export type PercentageQuizDefinition = {
  /** 카탈로그 식별자 (URL `slug`와 동일 권장) */
  id: string;
  /** URL 경로 세그먼트 */
  slug: string;
  locales?: string[];
  category?: string;
  tags?: SnackQuizText[];
  title?: SnackQuizText;
  subtitle?: SnackQuizText;
  images?: SnackQuizPackImages;
  meta?: SnackQuizPackMeta;
  card?: SnackQuizCard;
  analytics?: SnackQuizAnalytics;
  related?: string[];
  /** 결과 상단: 단일 % · 온도 ° · 이성/감성 이중 % */
  resultDisplay?: "percent" | "temperature" | "dual";
  /** `resultDisplay: "dual"` 일 때 — 점수 환산 % = 이성, 나머지 = 감성 */
  dualLabels?: {
    logical: SnackQuizText;
    emotional: SnackQuizText;
  };
  resultRanges: PercentageQuizRange[];
  questions: PercentageQuizQuestion[];
  footnote: SnackQuizText;
};

export function maxScoreForPercentageQuiz(questions: PercentageQuizQuestion[]): number {
  return questions.reduce((sum, q) => {
    const m = Math.max(0, ...q.options.map((o) => o.score));
    return sum + m;
  }, 0);
}

export function percentFromTotalScore(total: number, maxTotal: number): number {
  if (maxTotal <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((total / maxTotal) * 100)));
}

export function pickPercentageRange(
  ranges: PercentageQuizRange[],
  percent: number,
): PercentageQuizRange | undefined {
  return ranges.find((r) => percent >= r.min && percent <= r.max);
}
