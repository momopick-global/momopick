/**
 * 기본 내비게이션 단일 소스 (Single Source of Truth).
 * 카테고리 바(KoCatBar)와 햄버거 메뉴(KoHeaderSymbolMenu)가 모두 이 목록을 참조한다.
 * 여기만 고치면 두 메뉴가 함께 바뀌므로 다시 어긋나지 않는다.
 *
 * - `live: false` 항목은 콘텐츠·라우트가 준비되기 전까지 메뉴에서 숨긴다 (404 방지).
 * - 원픽은 "1문항" 형식이라 별도 카테고리가 아니라 `questions.length === 1`로 자동 판별한다.
 *   (판별 헬퍼는 `lib/content/homeRail.ts`의 `isOnePickQuiz` 참고)
 */
export type KoPrimaryNavItem = {
  key: string;
  href: string;
  /** 햄버거 메뉴용 풀 라벨 */
  label: string;
  /** 카테고리 바(칩)용 짧은 라벨 */
  chipLabel: string;
  emoji: string;
  live: boolean;
  /** 활성 표시용 경로 prefix (없으면 href 기준) */
  matchPrefixes?: readonly string[];
  /** 전체(홈)처럼 정확히 일치할 때만 활성 */
  exactOnly?: boolean;
};

export const KO_PRIMARY_NAV: readonly KoPrimaryNavItem[] = [
  { key: "home", href: "/ko/", label: "메인", chipLabel: "메인", emoji: "🏠", live: true, exactOnly: true },
  { key: "love", href: "/ko/love/", label: "심층 테스트", chipLabel: "심층", emoji: "💗", live: true, matchPrefixes: ["/ko/love"] },
  { key: "onepick", href: "/ko/onepick/", label: "원픽 테스트", chipLabel: "원픽", emoji: "🎯", live: true, matchPrefixes: ["/ko/onepick"] },
  { key: "personality-test", href: "/ko/personality-test/", label: "성향 모아보기", chipLabel: "성향", emoji: "🧠", live: true, matchPrefixes: ["/ko/personality-test"] },
  { key: "search", href: "/ko/explore/", label: "검색", chipLabel: "검색", emoji: "🔍", live: true, matchPrefixes: ["/ko/explore"] },
  // 태그는 메뉴(카테고리 바·햄버거)에서 숨김. 태그 페이지·필터 기능은 유지되며 태그 칩·퀴즈 태그로 진입한다.
  { key: "tag", href: "/ko/tag/", label: "태그", chipLabel: "태그", emoji: "🏷️", live: false, matchPrefixes: ["/ko/tag"] },
  // --- 준비 중(콘텐츠·라우트 생기면 live: true) ---
  { key: "personality", href: "/ko/personality/", label: "성격·심리 테스트", chipLabel: "성격·심리", emoji: "🧠", live: false, matchPrefixes: ["/ko/personality/"] },
  { key: "social", href: "/ko/social/", label: "소셜 테스트", chipLabel: "소셜", emoji: "👥", live: false, matchPrefixes: ["/ko/social"] },
  { key: "style", href: "/ko/style/", label: "스타일 테스트", chipLabel: "스타일", emoji: "🎨", live: false, matchPrefixes: ["/ko/style"] },
] as const;

/** 메뉴에 실제로 노출할 항목 (live만) */
export const KO_PRIMARY_NAV_LIVE: readonly KoPrimaryNavItem[] = KO_PRIMARY_NAV.filter((i) => i.live);

/** 현재 경로가 해당 내비 항목에 해당하는지 (활성 표시용) */
export function isKoNavActive(item: KoPrimaryNavItem, pathname: string): boolean {
  if (item.exactOnly) return pathname === "/ko" || pathname === "/ko/";
  const prefixes = item.matchPrefixes ?? [item.href];
  return prefixes.some((pre) => {
    const norm = pre.replace(/\/$/, "");
    return pathname === norm || pathname.startsWith(norm + "/");
  });
}

/** 개인정보·약관·면책 (햄버거 메뉴 등에서 별도 그룹) */
export const KO_POLICY_LINKS: readonly { href: string; label: string; emoji: string }[] = [
  { href: "/ko/policy/privacy/", label: "개인정보처리방침", emoji: "🔒" },
  { href: "/ko/policy/terms/", label: "이용약관", emoji: "📋" },
  { href: "/ko/policy/disclaimer/", label: "면책조항", emoji: "⚠️" },
] as const;

/** 푸터·헤더 심볼 메뉴 등 — 정책 3건 제외한 일반 사이트 정보 */
export const KO_SITE_NAV_LINKS: readonly { href: string; label: string; emoji: string }[] = [
  { href: "/ko/about/", label: "모모픽", emoji: "🌟" },
  { href: "/ko/notice/", label: "공지사항", emoji: "📢" },
  { href: "/ko/blog/", label: "블로그", emoji: "📝" },
  { href: "/ko/faq/", label: "자주 묻는 질문", emoji: "❓" },
  { href: "/ko/feedback/", label: "서비스 개선 의견 보내기", emoji: "💬" },
  { href: "/ko/partnership/", label: "제휴 문의", emoji: "🤝" },
] as const;

/** 푸터 한 줄 링크 순서 (FAQ 다음에 정책 3건, 그다음 피드백·제휴) */
export const KO_SITE_NAV_LINKS_FOOTER: readonly { href: string; label: string; emoji: string }[] = [
  ...KO_SITE_NAV_LINKS.slice(0, 4),
  ...KO_POLICY_LINKS,
  ...KO_SITE_NAV_LINKS.slice(4),
] as const;
