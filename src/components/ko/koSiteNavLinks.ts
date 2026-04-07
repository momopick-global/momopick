/** 헤더 심볼 메뉴 테스트 카테고리 링크 (emoji는 햄버거 메뉴 표시용, 푸터는 label만 사용) */
export const KO_TEST_CATEGORY_LINKS: readonly { href: string; label: string; emoji: string }[] = [
  { href: "/ko/explore/", label: "지금 뜨는 테스트", emoji: "✨" },
  { href: "/ko/love/", label: "썸·연애 테스트", emoji: "💗" },
  { href: "/ko/personality/", label: "성격·심리 테스트", emoji: "🧠" },
  { href: "/ko/social/", label: "소셜 테스트", emoji: "👥" },
  { href: "/ko/style/", label: "스타일 테스트", emoji: "🎨" },
] as const;

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
