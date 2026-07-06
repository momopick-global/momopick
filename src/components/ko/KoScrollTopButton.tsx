"use client";

import { useEffect, useRef, useState } from "react";

/** 스크롤을 위로 올리면 나타나고, 아래로 내리면 사라지는 "맨 위로" 버튼.
 *  - 오른쪽 하단 고정(하단 탭바 위)
 *  - 맨 위 근처(THRESHOLD 미만)에서는 항상 숨김
 *  - 화살표는 위아래로 살짝 튀는 애니메이션 */
const SHOW_THRESHOLD = 300;

export function KoScrollTopButton() {
  const [visible, setVisible] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const update = () => {
      tickingRef.current = false;
      const y = window.scrollY;
      const last = lastYRef.current;

      if (y < SHOW_THRESHOLD) {
        // 맨 위 근처에서는 숨김
        setVisible(false);
      } else if (y > last + 4) {
        // 아래로 스크롤 → 표시
        setVisible(true);
      } else if (y < last - 4) {
        // 위로 스크롤 → 숨김
        setVisible(false);
      }
      lastYRef.current = y;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className={`ko-scroll-top${visible ? " is-visible" : ""}`}
      onClick={handleClick}
      aria-label="맨 위로"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <svg
        className="ko-scroll-top__arrow"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m6 14 6-6 6 6"
        />
      </svg>
    </button>
  );
}
