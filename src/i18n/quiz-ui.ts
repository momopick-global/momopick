/**
 * SnackQuiz 고정 UI 문자열(버튼·진행 문구). 본문·문항은 JSON(로케일별)에서 가져옵니다.
 * 사이트 언어 게이트웨이(LANGS)와 맞춰 두었습니다.
 */
export type QuizUiLocale = "ko" | "en" | "ja" | "es" | "pt" | "id";

export type QuizUiStrings = {
  restart: string;
  /** 결과 화면 — 모든 결과 이미지 페이지로 이동 */
  viewAllResults: string;
  /** 1-based 현재 문항 번호 */
  formatQuestionStep: (current: number, total: number) => string;
  shareWithFriends: string;
  copyLink: string;
  copied: string;
  shareKakao: string;
  shareFacebook: string;
  shareX: string;
};

export const QUIZ_UI: Record<QuizUiLocale, QuizUiStrings> = {
  ko: {
    restart: "다시 하기",
    viewAllResults: "모든 결과 보기",
    formatQuestionStep: (c, t) => `질문 ${c} / ${t}`,
    shareWithFriends: "친구에게 공유하기",
    copyLink: "링크 복사",
    copied: "복사됨",
    shareKakao: "카카오로 공유",
    shareFacebook: "페이스북으로 공유",
    shareX: "X로 공유",
  },
  en: {
    restart: "Try again",
    viewAllResults: "View all results",
    formatQuestionStep: (c, t) => `Question ${c} / ${t}`,
    shareWithFriends: "Share with friends",
    copyLink: "Copy link",
    copied: "Copied",
    shareKakao: "Share on Kakao",
    shareFacebook: "Share on Facebook",
    shareX: "Share on X",
  },
  ja: {
    restart: "もう一度",
    viewAllResults: "すべての結果を見る",
    formatQuestionStep: (c, t) => `質問 ${c} / ${t}`,
    shareWithFriends: "友だちにシェア",
    copyLink: "リンクをコピー",
    copied: "コピーしました",
    shareKakao: "カカオでシェア",
    shareFacebook: "Facebookでシェア",
    shareX: "Xでシェア",
  },
  es: {
    restart: "Intentar de nuevo",
    viewAllResults: "Ver todos los resultados",
    formatQuestionStep: (c, t) => `Pregunta ${c} / ${t}`,
    shareWithFriends: "Compartir con amigos",
    copyLink: "Copiar enlace",
    copied: "Copiado",
    shareKakao: "Compartir en Kakao",
    shareFacebook: "Compartir en Facebook",
    shareX: "Compartir en X",
  },
  pt: {
    restart: "Tentar novamente",
    viewAllResults: "Ver todos os resultados",
    formatQuestionStep: (c, t) => `Pergunta ${c} / ${t}`,
    shareWithFriends: "Compartilhar com amigos",
    copyLink: "Copiar link",
    copied: "Copiado",
    shareKakao: "Compartilhar no Kakao",
    shareFacebook: "Compartilhar no Facebook",
    shareX: "Compartilhar no X",
  },
  id: {
    restart: "Coba lagi",
    viewAllResults: "Lihat semua hasil",
    formatQuestionStep: (c, t) => `Pertanyaan ${c} / ${t}`,
    shareWithFriends: "Bagikan ke teman",
    copyLink: "Salin tautan",
    copied: "Disalin",
    shareKakao: "Bagikan ke Kakao",
    shareFacebook: "Bagikan ke Facebook",
    shareX: "Bagikan ke X",
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
