/** 푸터·헤더 심볼 메뉴 등에서 동일하게 쓰는 사이트 정보 링크 */
export const KO_SITE_NAV_LINKS: readonly { href: string; label: string }[] = [
  { href: "/ko/about/", label: "모모픽" },
  { href: "/ko/notice/", label: "공지사항" },
  { href: "/ko/blog/", label: "블로그" },
  { href: "/ko/faq/", label: "자주 묻는 질문" },
  { href: "/ko/policy/privacy/", label: "개인정보처리방침" },
  { href: "/ko/policy/terms/", label: "이용약관" },
  { href: "/ko/policy/disclaimer/", label: "면책조항" },
  { href: "/ko/feedback/", label: "서비스 개선 의견 보내기" },
  { href: "/ko/partnership/", label: "제휴 문의" },
] as const;
