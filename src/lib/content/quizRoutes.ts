/**
 * 퀴즈 페이지 URL — `/{lang}/{category}/{id}/` (trailing slash).
 * JSON의 `card.path` 대신 라우트 규칙으로 생성한다.
 */
export function snackQuizHref(lang: string, category: string | undefined, id: string): string {
  const cat = category?.trim() || "quiz";
  return `/${lang}/${cat}/${id}/`;
}
