import type { ReactNode } from "react";
import Link from "next/link";
import { KoHeaderLoginBtn } from "./KoHeaderLoginBtn";
import { KoHeaderSymbolMenu } from "./KoHeaderSymbolMenu";

type Props = {
  /** 오른쪽 액션 영역 (버튼 등). 생략 시 로그인 버튼만 표시 */
  actions?: ReactNode;
};

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
          {actions ?? <KoHeaderLoginBtn />}
        </div>
      </div>
    </header>
  );
}
