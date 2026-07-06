"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { KO_PRIMARY_NAV_LIVE, isKoNavActive } from "./koSiteNavLinks";

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
        {KO_PRIMARY_NAV_LIVE.map((item) => {
          const active = isKoNavActive(item, pathname);
          return (
            <Link
              key={item.key}
              className="chip chip--default"
              href={item.href}
              aria-current={active ? "true" : undefined}
            >
              {item.chipLabel}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
