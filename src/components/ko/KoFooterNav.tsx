import Link from "next/link";

/** 한국어 사이트 공통 하단 정보 링크 (홈·정책·블로그 등) */
export function KoFooterNav() {
  return (
    <nav style={{ marginTop: 8 }} aria-label="사이트 정보">
      <Link href="/ko/about/">모모픽</Link> · <Link href="/ko/notice/">공지사항</Link> · <Link href="/ko/blog/">블로그</Link> ·{" "}
      <Link href="/ko/policy/privacy/">개인정보처리방침</Link> · <Link href="/ko/policy/terms/">이용약관</Link> ·{" "}
      <Link href="/ko/policy/disclaimer/">면책조항</Link>
    </nav>
  );
}
