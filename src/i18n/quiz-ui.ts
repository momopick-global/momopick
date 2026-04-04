/**
 * SnackQuiz 고정 UI 문자열(버튼·진행 문구). 본문·문항은 JSON(로케일별)에서 가져옵니다.
 * 사이트 언어 게이트웨이(LANGS)와 맞춰 두었습니다.
 */
export type QuizUiLocale = "ko" | "en" | "ja" | "es" | "pt" | "id";

export type QuizUiStrings = {
  restart: string;
  /** 1-based 현재 문항 번호 */
  formatQuestionStep: (current: number, total: number) => string;
};

export const QUIZ_UI: Record<QuizUiLocale, QuizUiStrings> = {
  ko: {
    restart: "다시 하기",
    formatQuestionStep: (c, t) => `질문 ${c} / ${t}`,
  },
  en: {
    restart: "Try again",
    formatQuestionStep: (c, t) => `Question ${c} / ${t}`,
  },
  ja: {
    restart: "もう一度",
    formatQuestionStep: (c, t) => `質問 ${c} / ${t}`,
  },
  es: {
    restart: "Intentar de nuevo",
    formatQuestionStep: (c, t) => `Pregunta ${c} / ${t}`,
  },
  pt: {
    restart: "Tentar novamente",
    formatQuestionStep: (c, t) => `Pergunta ${c} / ${t}`,
  },
  id: {
    restart: "Coba lagi",
    formatQuestionStep: (c, t) => `Pertanyaan ${c} / ${t}`,
  },
};

const UI_FALLBACK: QuizUiLocale = "en";

export function isQuizUiLocale(s: string): s is QuizUiLocale {
  return s in QUIZ_UI;
}

/** 알 수 없는 로케일은 en UI로 폴백 */
export function getQuizUiStrings(locale: string | undefined): QuizUiStrings {
  if (locale && isQuizUiLocale(locale)) {
    return QUIZ_UI[locale];
  }
  return QUIZ_UI[UI_FALLBACK];
}
