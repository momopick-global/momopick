"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { KoSearchItem } from "@/lib/content/homeRail";
import type { KoQuizTag } from "@/lib/content/quizTags";
import { chosungOf, isChosungQuery, normalizeText } from "@/lib/search/koChosung";
import { KoLoveQuizListView } from "./KoLoveQuizListView";

type Props = {
  index: KoSearchItem[];
  tags: KoQuizTag[];
};

/** 클라이언트 검색 — 제목·부제·태그 부분일치 + 초성 검색 + 태그 칩 필터 + ?q= 연동. */
export function KoQuizSearch({ index, tags }: Props) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // 최초 진입 시 ?q= 값을 입력창에 반영
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setQuery(q);
  }, []);

  // 입력 변화 시 URL(?q=) 동기화 — 공유·뒤로가기 가능
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (query.trim()) params.set("q", query.trim());
    else params.delete("q");
    const qs = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  }, [query]);

  const results = useMemo(() => {
    let items = index;
    if (activeTag) items = items.filter((it) => it.tagSlugs.includes(activeTag));

    const q = query.trim();
    if (!q) return items;

    if (isChosungQuery(q)) {
      const qc = chosungOf(q);
      return items.filter((it) => it.chosung.includes(qc));
    }
    const qn = normalizeText(q);
    return items.filter((it) => it.keywords.includes(qn));
  }, [index, query, activeTag]);

  return (
    <div className="quiz-search">
      <div className="quiz-search__field">
        <svg
          className="quiz-search__icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <path
            d="m20 20-3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="search"
          className="quiz-search__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="테스트 이름·태그로 검색 (초성도 OK)"
          aria-label="테스트 검색"
          autoComplete="off"
        />
        {query ? (
          <button
            type="button"
            className="quiz-search__clear"
            onClick={() => setQuery("")}
            aria-label="검색어 지우기"
          >
            ✕
          </button>
        ) : null}
      </div>

      {tags.length > 0 ? (
        <div className="quiz-search__tags" role="list" aria-label="태그로 빠른 필터">
          <button
            type="button"
            className={`chip chip--tag${activeTag === null ? " is-active" : ""}`}
            onClick={() => setActiveTag(null)}
          >
            전체
          </button>
          {tags.map((t) => (
            <button
              key={t.slug}
              type="button"
              className={`chip chip--tag${activeTag === t.slug ? " is-active" : ""}`}
              onClick={() => setActiveTag((cur) => (cur === t.slug ? null : t.slug))}
            >
              #{t.label}
            </button>
          ))}
        </div>
      ) : null}

      <p className="quiz-search__count" aria-live="polite">
        {query.trim() || activeTag ? `${results.length}개 결과` : `전체 ${results.length}개`}
      </p>

      {results.length > 0 ? (
        <KoLoveQuizListView items={results} />
      ) : (
        <div className="quiz-search__empty">
          <p>검색 결과가 없어요.</p>
          <p className="quiz-search__empty-sub">
            다른 키워드로 검색하거나{" "}
            <Link href="/ko/love/">심층 테스트</Link> ·{" "}
            <Link href="/ko/onepick/">원픽 테스트</Link>를 둘러보세요.
          </p>
        </div>
      )}
    </div>
  );
}
