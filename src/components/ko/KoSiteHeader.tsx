import type { ReactNode } from "react";
import Link from "next/link";
import { KoHeaderSymbolMenu } from "./KoHeaderSymbolMenu";

type Props = {
  /** 오른쪽 액션 영역 (버튼 등). 생략 시 로그인 버튼만 표시 */
  actions?: ReactNode;
};

function LoginIconBtn() {
  return (
    <Link className="btn-icon" href="/ko/app/login/" title="로그인" aria-label="로그인">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}

/** 한국어 구역 공통 상단 헤더 (로고 왼쪽 · 타이틀 중앙 · 액션 오른쪽) */
export function KoSiteHeader({ actions }: Props) {
  return (
    <header className="site-hd">
      <div className="inner">
        <KoHeaderSymbolMenu />
        <Link className="hd-title" href="/ko/" aria-label="Momopick">
          <img
            className="hd-wordmark"
            src="/images/brand/momopick_wordmark.webp"
            alt=""
            width={930}
            height={215}
            decoding="async"
          />
        </Link>
        <div className="hd-actions">
          {actions ?? <LoginIconBtn />}
        </div>
      </div>
    </header>
  );
}
