/**
 * SnackQuiz 고정 UI 문자열(버튼·진행 문구). 본문·문항은 JSON(로케일별)에서 가져옵니다.
 * 사이트 언어 게이트웨이(LANGS)와 맞춰 두었습니다.
 */
export type QuizUiLocale = "ko" | "en" | "ja" | "es" | "pt" | "id";

export type QuizUiStrings = {
  restart: string;
  /** 결과 화면 — 모든 결과 이미지 페이지로 이동 */
  viewAllResults: string;
  /** 보관함에 결과 저장 */
  saveToVault: string;
  /** 저장 완료 피드백 */
  savedToVault: string;
  /** 보관함 목록에서 항목 삭제 */
  removeFromVault: string;
  /** 1-based 현재 문항 번호 */
  formatQuestionStep: (current: number, total: number) => string;
  shareWithFriends: string;
  copyLink: string;
  copied: string;
  /** 카카오 공유 실패·미설정 시 링크 복사 폴백 안내(「복사됨」과 구분) */
  kakaoShareFallbackHint: string;
  /** 빌드에 `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` 가 없을 때(운영 미설정·재배포 필요) */
  kakaoShareMissingKeyHint: string;
  /** SDK 스크립트 로드 실패(차단·네트워크) */
  kakaoShareScriptBlockedHint: string;
  shareKakao: string;
  shareFacebook: string;
  shareX: string;
};

export const QUIZ_UI: Record<QuizUiLocale, QuizUiStrings> = {
  ko: {
    restart: "다시 하기",
    viewAllResults: "모든 결과 보기",
    saveToVault: "보관함에 저장",
    savedToVault: "보관함에 저장했어요",
    removeFromVault: "삭제",
    formatQuestionStep: (c, t) => `질문 ${c} / ${t}`,
    shareWithFriends: "친구에게 공유하기",
    copyLink: "링크 복사",
    copied: "복사됨",
    kakaoShareFallbackHint: "카카오를 열 수 없어 링크를 복사했어요",
    kakaoShareMissingKeyHint:
      "카카오 키가 빌드에 없어요. Cloudflare Pages 환경 변수에 NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY 를 넣고 다시 배포해 주세요. 링크는 복사해 두었어요.",
    kakaoShareScriptBlockedHint: "카카오 스크립트를 불러오지 못했어요(차단·네트워크). 링크를 복사했어요.",
    shareKakao: "카카오로 공유",
    shareFacebook: "페이스북으로 공유",
    shareX: "X로 공유",
  },
  en: {
    restart: "Try again",
    viewAllResults: "View all results",
    saveToVault: "Save to vault",
    savedToVault: "Saved to your vault",
    removeFromVault: "Remove",
    formatQuestionStep: (c, t) => `Question ${c} / ${t}`,
    shareWithFriends: "Share with friends",
    copyLink: "Copy link",
    copied: "Copied",
    kakaoShareFallbackHint: "Kakao didn’t open — we copied the link",
    kakaoShareMissingKeyHint:
      "Kakao JS key wasn’t in the build. Add NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY in Cloudflare Pages and redeploy. Link copied.",
    kakaoShareScriptBlockedHint: "Couldn’t load Kakao script (blocker/network). Link copied.",
    shareKakao: "Share on Kakao",
    shareFacebook: "Share on Facebook",
    shareX: "Share on X",
  },
  ja: {
    restart: "もう一度",
    viewAllResults: "すべての結果を見る",
    saveToVault: "保存する",
    savedToVault: "保存しました",
    removeFromVault: "削除",
    formatQuestionStep: (c, t) => `質問 ${c} / ${t}`,
    shareWithFriends: "友だちにシェア",
    copyLink: "リンクをコピー",
    copied: "コピーしました",
    kakaoShareFallbackHint: "カカオを開けなかったため、リンクをコピーしました",
    kakaoShareMissingKeyHint:
      "ビルドにカカオJSキーがありません。Cloudflare Pagesの環境変数に NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY を設定して再デプロイしてください。リンクはコピー済みです。",
    kakaoShareScriptBlockedHint: "カカオのスクリプトを読み込めませんでした（ブロック・通信）。リンクをコピーしました。",
    shareKakao: "カカオでシェア",
    shareFacebook: "Facebookでシェア",
    shareX: "Xでシェア",
  },
  es: {
    restart: "Intentar de nuevo",
    viewAllResults: "Ver todos los resultados",
    saveToVault: "Guardar",
    savedToVault: "Guardado",
    removeFromVault: "Eliminar",
    formatQuestionStep: (c, t) => `Pregunta ${c} / ${t}`,
    shareWithFriends: "Compartir con amigos",
    copyLink: "Copiar enlace",
    copied: "Copiado",
    kakaoShareFallbackHint: "No se abrió Kakao; copiamos el enlace",
    kakaoShareMissingKeyHint:
      "Falta la clave JS de Kakao en el build. Añade NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY en Pages y vuelve a desplegar. Enlace copiado.",
    kakaoShareScriptBlockedHint: "No se pudo cargar el script de Kakao (bloqueo/red). Enlace copiado.",
    shareKakao: "Compartir en Kakao",
    shareFacebook: "Compartir en Facebook",
    shareX: "Compartir en X",
  },
  pt: {
    restart: "Tentar novamente",
    viewAllResults: "Ver todos os resultados",
    saveToVault: "Salvar",
    savedToVault: "Salvo",
    removeFromVault: "Remover",
    formatQuestionStep: (c, t) => `Pergunta ${c} / ${t}`,
    shareWithFriends: "Compartilhar com amigos",
    copyLink: "Copiar link",
    copied: "Copiado",
    kakaoShareFallbackHint: "O Kakao não abriu — copiamos o link",
    kakaoShareMissingKeyHint:
      "Chave JS do Kakao ausente no build. Defina NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY no Pages e faça redeploy. Link copiado.",
    kakaoShareScriptBlockedHint: "Não foi possível carregar o script do Kakao (bloqueio/rede). Link copiado.",
    shareKakao: "Compartilhar no Kakao",
    shareFacebook: "Compartilhar no Facebook",
    shareX: "Compartilhar no X",
  },
  id: {
    restart: "Coba lagi",
    viewAllResults: "Lihat semua hasil",
    saveToVault: "Simpan",
    savedToVault: "Tersimpan",
    removeFromVault: "Hapus",
    formatQuestionStep: (c, t) => `Pertanyaan ${c} / ${t}`,
    shareWithFriends: "Bagikan ke teman",
    copyLink: "Salin tautan",
    copied: "Disalin",
    kakaoShareFallbackHint: "Kakao tidak terbuka — tautan sudah disalin",
    kakaoShareMissingKeyHint:
      "Kunci JS Kakao tidak ada di build. Tambahkan NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY di Pages lalu deploy ulang. Tautan disalin.",
    kakaoShareScriptBlockedHint: "Skrip Kakao tidak dimuat (pemblokiran/jaringan). Tautan disalin.",
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
