"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { KoBlogCategoryId, KoSampleBlogPost } from "@/content/blog/koSamplePosts";

/** 탭 UI용 — 글 데이터의 `category`에 `all`은 없음 */
export type KoBlogTabId = "all" | KoBlogCategoryId;

const TABS: { id: KoBlogTabId; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "love", label: "💗 연애 심리" },
  { id: "tarot", label: "🔮 타로 / 운세" },
  { id: "growth", label: "🎯 자기계발" },
  { id: "fun", label: "🎭 재미 / 트렌드" },
];

export function KoBlogTabPanel({ posts }: { posts: KoSampleBlogPost[] }) {
  const [active, setActive] = useState<KoBlogTabId>("all");

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
      </div>
    </>
  );
}
