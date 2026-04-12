"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { KoHeaderLoginBtn } from "./KoHeaderLoginBtn";
import { KoHeaderSymbolMenu } from "./KoHeaderSymbolMenu";

/** 슬라이드 아웃(0.34s)과 맞춤 */
const SYMBOL_MENU_CLOSE_NAV_MS = 360;

type Props = {
  /** 오른쪽 액션 영역 (버튼 등). 생략 시 로그인 버튼만 표시 */
  actions?: ReactNode;
};

/** 한국어 구역 공통 상단 헤더 (로고 왼쪽 · 타이틀 중앙 · 액션 오른쪽) */
export function KoSiteHeader({ actions }: Props) {
  const router = useRouter();
  const [symbolMenuOpen, setSymbolMenuOpen] = useState(false);

  return (
    <header className="site-hd">
      <div className="inner">
        <KoHeaderSymbolMenu open={symbolMenuOpen} onOpenChange={setSymbolMenuOpen} />
        <Link
          className="hd-title"
          href="/ko/"
          aria-label="Momopick"
          onClick={(e) => {
            if (!symbolMenuOpen) return;
            e.preventDefault();
            setSymbolMenuOpen(false);
          }}
        >
          <img
            className="hd-wordmark"
            src="/images/brand/momopick_wordmark.webp"
            alt=""
            width={930}
            height={215}
            decoding="async"
          />
        </Link>
        <div
          className="hd-actions"
          onClickCapture={(e) => {
            if (!symbolMenuOpen) return;
            const target = e.target as HTMLElement | null;
            if (!target) return;
            const root = target.closest(".hd-actions");
            const anchor = target.closest("a[href]");
            if (!root || !anchor || !root.contains(anchor)) return;
            e.preventDefault();
            e.stopPropagation();
            setSymbolMenuOpen(false);
            const href = anchor.getAttribute("href");
            if (!href) return;
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const delay = reduced ? 0 : SYMBOL_MENU_CLOSE_NAV_MS;
            window.setTimeout(() => {
              if (/^https?:\/\//i.test(href)) {
                window.location.assign(href);
              } else {
                router.push(href);
              }
            }, delay);
          }}
        >
          {actions ?? <KoHeaderLoginBtn />}
        </div>
      </div>
    </header>
  );
}
