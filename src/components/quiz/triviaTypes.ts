import type {
  SnackQuizAnalytics,
  SnackQuizCard,
  SnackQuizPackImages,
  SnackQuizPackMeta,
  SnackQuizText,
} from "./types";

/**
 * 정답형(능력고사) 퀴즈 — 문항마다 정답이 있고, 점수(0~100)로 등급·칭호가 결정된다.
 * 스낵(득표)·퍼센트(성향 점수합)와 달리 응답 직후 정답 공개 + 해설 연출이 핵심.
 */

export type TriviaQuizOption = {
  label: SnackQuizText;
  /** 정답 보기 여부 — 문항당 정확히 1개 권장 */
  correct?: boolean;
};

export type TriviaQuizQuestion = {
  prompt: SnackQuizText;
  /** 문항 상단 일러스트 (선택) */
  image?: string;
  options: TriviaQuizOption[];
  /** 정답 공개 직후 보여줄 해설 한 줄 (선택 — 유머 포인트) */
  explanation?: SnackQuizText;
};

/** 점수 구간(0~100) → 칭호. 결과는 "{score}점 · {title}" 형태로 노출 */
export type TriviaQuizGrade = {
  min: number;
  max: number;
  /** 밈형 칭호 (예: "연애 밈 만렙") */
  title: SnackQuizText;
  desc: SnackQuizText;
};

export type TriviaQuizDefinition = {
  id: string;
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
  grades: TriviaQuizGrade[];
  questions: TriviaQuizQuestion[];
  footnote: SnackQuizText;
};

/** 맞힌 개수 → 100점 만점 환산 (공유 URL `p=` 파라미터와 동일 스케일) */
export function triviaScoreFromCorrect(correctCount: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((correctCount / total) * 100)));
}

export function pickTriviaGrade(
  grades: TriviaQuizGrade[],
  score: number,
): TriviaQuizGrade | undefined {
  return grades.find((g) => score >= g.min && score <= g.max);
}

/** 문항의 정답 인덱스 (correct가 여러 개면 첫 번째) */
export function triviaCorrectIndex(question: TriviaQuizQuestion): number {
  return question.options.findIndex((o) => o.correct === true);
}
