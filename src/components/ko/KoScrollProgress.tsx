"use client";

import { useEffect, useState } from "react";

/** 헤더(로고·햄버거·로그인) 바로 아래에 붙는 스크롤 진행바.
 *  페이지를 아래로 내릴수록 왼쪽부터 채워진다. */
export function KoScrollProgress() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setPercent(Math.min(100, Math.max(0, p)));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="ko-scroll-progress" aria-hidden="true">
      <div className="ko-scroll-progress__fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
