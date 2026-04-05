/**
 * 퀴즈 페이지 URL — `/{lang}/{category}/{slug}/` (trailing slash).
 * JSON의 `card.path` 대신 라우트 규칙으로 생성한다.
 */
export function snackQuizHref(lang: string, category: string | undefined, pathSegment: string): string {
  const cat = category?.trim() || "quiz";
  return `/${lang}/${cat}/${pathSegment}/`;
}

/** 경로에는 항상 `slug`를 쓴다 (`id`는 보통 동일한 슬러그 문자열). */
export function quizPathSegment(def: { id: string; slug: string }): string {
  return def.slug.trim() || def.id.trim();
}
