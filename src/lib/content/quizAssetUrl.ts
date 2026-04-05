const PREFIX = "/images/quiz/";

/**
 * JSON에는 `/images/quiz/{slug}/파일.webp`처럼 로케일 세그먼트 없이 둔다.
 * 실제 파일은 `public/images/quiz/{slug}/{locale}/…` 에 둔다.
 * 예전에 JSON에 `/ko/`가 들어간 경우에도 같은 규칙으로 해석한다.
 */
export function quizAssetUrl(path: string | undefined, locale: string): string {
  if (!path?.startsWith(PREFIX)) return path ?? "";
  const rest = path.slice(PREFIX.length);
  const segments = rest.split("/").filter(Boolean);
  if (segments.length < 2) return path;

  const slug = segments[0];
  const maybeLocale = segments[1];
  if (maybeLocale === "ko" || maybeLocale === "en") {
    return `${PREFIX}${slug}/${locale}/${segments.slice(2).join("/")}`;
  }
  return `${PREFIX}${slug}/${locale}/${segments.slice(1).join("/")}`;
}
