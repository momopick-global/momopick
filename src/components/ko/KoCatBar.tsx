"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type ChipItem = {
  href: string;
  label: string;
  className: string;
  matchFn: (p: string) => boolean;
};

const chips: ChipItem[] = [
  {
    href: "/ko/",
    label: "전체",
    className: "chip chip--default",
    matchFn: (p) => p === "/ko" || p === "/ko/",
  },
  {
    href: "/ko/onepick/",
    label: "원픽 테스트",
    className: "chip chip--default",
    matchFn: (p) => p.startsWith("/ko/onepick"),
  },
  {
    href: "/ko/personality-test/",
    label: "성향 테스트",
    className: "chip chip--default",
    matchFn: (p) =>
      p.startsWith("/ko/personality-test") ||
      // 성향 테스트 카테고리 페이지(/ko/love/ 등)에서도 활성 표시
      p.startsWith("/ko/love") ||
      p.startsWith("/ko/personality/") ||
      p.startsWith("/ko/social") ||
      p.startsWith("/ko/style") ||
      p.startsWith("/ko/fun"),
  },
  {
    href: "/ko/explore/",
    label: "검색",
    className: "chip chip--default",
    matchFn: (p) => p.startsWith("/ko/explore"),
  },
  {
    href: "/ko/tag/",
    label: "태그",
    className: "chip chip--default",
    matchFn: (p) => p.startsWith("/ko/tag"),
  },
  {
    href: "/ko/notice/",
    label: "공지",
    className: "chip chip--default",
    matchFn: (p) => p.startsWith("/ko/notice"),
  },
];

/** 스크롤 내릴 때 숨고, 올릴 때 다시 나타나는 카테고리 바 */
export function KoCatBar() {
  const pathname = usePathname() ?? "";
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        if (delta > 4 && y > 80) {
          setHidden(true);
        } else if (delta < -4) {
          setHidden(false);
        }
        lastY.current = y;
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <nav
      className={`cat-bar${hidden ? " cat-bar--hidden" : ""}`}
      aria-label="카테고리 빠른 이동"
    >
      <div className="cat-bar__inner">
        {chips.map((chip) => {
          const active = chip.matchFn(pathname);
          return (
            <Link
              key={chip.href}
              className={chip.className}
              href={chip.href}
              aria-current={active ? "true" : undefined}
            >
              {chip.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
