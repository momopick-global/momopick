"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { QuizImageWithFallback } from "@/components/quiz/QuizImageWithFallback";
import type { KoHomeRailItem } from "@/lib/content/homeRail";

const STORAGE_KEY = "momopick-ko-love-hub-view";

type ViewMode = "grid" | "list";

function IconGridCards() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"
        opacity="0.92"
      />
    </svg>
  );
}

function IconListRows() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="5" height="5" rx="1.25" fill="currentColor" opacity="0.92" />
      <rect x="11" y="6.5" width="9" height="2" rx="1" fill="currentColor" opacity="0.55" />
      <rect x="11" y="11" width="9" height="2" rx="1" fill="currentColor" opacity="0.55" />
      <rect x="11" y="15.5" width="7" height="2" rx="1" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

type Props = {
  items: KoHomeRailItem[];
};

export function KoLoveQuizListView({ items }: Props) {
  const [view, setView] = useState<ViewMode>("grid");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === "list" || raw === "grid") setView(raw);
    } catch {
      /* ignore */
    }
  }, []);

  const setMode = (m: ViewMode) => {
    setView(m);
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <div className="love-hub-view-toolbar" role="toolbar" aria-label="목록 보기 방식">
        <button
          type="button"
          className={`love-hub-view-btn${view === "grid" ? " is-active" : ""}`}
          onClick={() => setMode("grid")}
          aria-pressed={view === "grid"}
          title="카드형"
        >
          <IconGridCards />
          <span className="sr-only">카드형 보기</span>
        </button>
        <button
          type="button"
          className={`love-hub-view-btn${view === "list" ? " is-active" : ""}`}
          onClick={() => setMode("list")}
          aria-pressed={view === "list"}
          title="목록형"
        >
          <IconListRows />
          <span className="sr-only">목록형 보기</span>
        </button>
      </div>

      {view === "grid" ? (
        <div className="tile-grid">
          {items.map((item, i) => (
            <Link key={item.href} className="tile tile--love" href={item.href}>
              <div className="thumb">
                {i === 0 ? <span className="badge">HOT</span> : null}
                <QuizImageWithFallback
                  src={item.image || "/images/banners/tile-love-01.webp"}
                  alt=""
                  width={1024}
                  height={1024}
                  loading={i < 6 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span className="thumb-slug" aria-hidden="true">
                  {item.slug.split("/").filter(Boolean).pop() ?? item.slug}
                </span>
              </div>
              <div className="body">
                <b>{item.title}</b>
                <small>{item.subtitleLine}</small>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <ul className="love-hub-list" role="list">
          {items.map((item, i) => (
            <li key={item.href}>
              <Link href={item.href} className="love-hub-list__link">
                <div className="love-hub-list__thumb">
                  {i === 0 ? <span className="badge love-hub-list__badge">HOT</span> : null}
                  <QuizImageWithFallback
                    src={item.image || "/images/banners/tile-love-01.webp"}
                    alt=""
                    width={320}
                    height={320}
                    loading={i < 8 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
                <div className="love-hub-list__body">
                  <span className="love-hub-list__title">{item.title}</span>
                  <span className="love-hub-list__sub">{item.subtitleLine}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
