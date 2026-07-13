"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { QuizImageWithFallback } from "@/components/quiz/QuizImageWithFallback";
import type { KoBlogCategoryId, KoSampleBlogPost } from "@/content/blog/koSamplePosts";

/** 탭 UI용 — 글 데이터의 `category`에 `all`은 없음 */
export type KoBlogTabId = "all" | KoBlogCategoryId;

const TABS: { id: KoBlogTabId; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "love", label: "💗 연애 심리" },
  { id: "personality", label: "🧠 성격 / 심리 분석" },
  { id: "tarot", label: "🔮 타로 / 운세" },
  { id: "fun", label: "🎭 재미 / 트렌드" },
  { id: "story", label: "📖 모모픽 스토리" },
];

const FALLBACK_IMG = "/images/common/quiz-image-pending.webp";
const VIEW_STORAGE_KEY = "momopick-ko-blog-view";

type ViewMode = "grid" | "list" | "rail";

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

function IconRail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="7" height="12" rx="1.5" fill="currentColor" opacity="0.92" />
      <rect x="12" y="6" width="7" height="12" rx="1.5" fill="currentColor" opacity="0.55" />
      <rect x="21" y="6" width="2" height="12" rx="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function KoBlogTabPanel({ posts }: { posts: KoSampleBlogPost[] }) {
  const [active, setActive] = useState<KoBlogTabId>("all");
  const [view, setView] = useState<ViewMode>("list");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(VIEW_STORAGE_KEY);
      if (raw === "grid" || raw === "list" || raw === "rail") setView(raw);
    } catch {
      /* ignore */
    }
  }, []);

  const setMode = (m: ViewMode) => {
    setView(m);
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  };

  const filtered = useMemo(() => {
    if (active === "all") return posts;
    return posts.filter((p) => p.category === active);
  }, [posts, active]);

  return (
    <>
      <div className="blog-tabs-wrap">
        <div className="blog-tabs" role="tablist" aria-label="블로그 카테고리">
          {TABS.map((tab) => {
            const selected = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`blog-tab-${tab.id}`}
                aria-controls={`blog-tabpanel-${tab.id}`}
                tabIndex={0}
                className={`blog-tab${selected ? " blog-tab--active" : ""}`}
                onClick={() => setActive(tab.id)}
              >
                <span className="blog-tab__label">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`blog-tabpanel-${active}`}
        aria-labelledby={`blog-tab-${active}`}
      >
        {filtered.length === 0 ? (
          <p className="blog-tab-empty">
            {active === "all"
              ? "아직 등록된 글이 없어요."
              : "이 카테고리에 아직 글이 없어요. 다른 탭을 눌러 보세요."}
          </p>
        ) : (
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
              <button
                type="button"
                className={`love-hub-view-btn${view === "rail" ? " is-active" : ""}`}
                onClick={() => setMode("rail")}
                aria-pressed={view === "rail"}
                title="레일형"
              >
                <IconRail />
                <span className="sr-only">레일형 보기</span>
              </button>
            </div>

            {view === "grid" ? (
              <div className="tile-grid">
                {filtered.map((post, i) => (
                  <Link key={post.id} className="tile tile--love" href={`/ko/blog/${post.id}/`}>
                    <div className="thumb">
                      <QuizImageWithFallback
                        src={post.image || FALLBACK_IMG}
                        alt={post.imageAlt || ""}
                        width={1024}
                        height={1024}
                        loading={i < 6 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </div>
                    <div className="body">
                      <b>{post.title}</b>
                      <small>
                        {post.date}
                        {post.tag ? ` · ${post.tag}` : ""}
                      </small>
                    </div>
                  </Link>
                ))}
              </div>
            ) : view === "rail" ? (
              <div className="rail" role="list">
                {filtered.map((post, i) => (
                  <div key={post.id} className="rail-card rail-card--love" role="listitem">
                    <div className="rail-card__thumb">
                      <Link
                        href={`/ko/blog/${post.id}/`}
                        className="rail-card__thumb-link"
                        aria-label={post.title}
                      >
                        <QuizImageWithFallback
                          src={post.image || FALLBACK_IMG}
                          alt={post.imageAlt || ""}
                          width={480}
                          height={480}
                          loading={i < 4 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </Link>
                    </div>
                    <Link href={`/ko/blog/${post.id}/`} className="rail-card__cap-link">
                      <div className="cap">
                        <b>{post.title}</b>
                        <small>
                          {post.date}
                          {post.tag ? ` · ${post.tag}` : ""}
                        </small>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="blog-list" aria-label="블로그 글 목록">
                {filtered.map((post) => (
                  <li key={post.id}>
                    <Link href={`/ko/blog/${post.id}/`} className="blog-card-link">
                      <article className="blog-card" aria-labelledby={`blog-title-${post.id}`}>
                        <div className="blog-card__meta">
                          <time className="blog-card__date" dateTime={post.dateTime}>
                            {post.date}
                          </time>
                          {post.tag ? <span className="blog-card__tag">{post.tag}</span> : null}
                        </div>
                        <h2 className="blog-card__title" id={`blog-title-${post.id}`}>
                          {post.title}
                        </h2>
                        <p className="blog-card__excerpt">{post.excerpt}</p>
                      </article>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
}
