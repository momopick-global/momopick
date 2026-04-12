"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { KoSampleBlogPost, KoBlogCategoryId } from "@/content/blog/koSamplePosts";
import { QuizImageWithFallback } from "@/components/quiz/QuizImageWithFallback";
import { QUIZ_IMAGE_PENDING_SRC } from "@/lib/content/quizImagePending";

type TabId = "all" | KoBlogCategoryId;

type Tab = { id: TabId; label: string };

const TABS: Tab[] = [
  { id: "all", label: "전체" },
  { id: "love", label: "💗 연애 심리" },
  { id: "personality", label: "🧠 성격 / 심리 분석" },
  { id: "tarot", label: "🔮 타로 / 운세" },
  { id: "fun", label: "🎭 재미 / 트렌드" },
  { id: "story", label: "📖 모모픽 스토리" },
];

/** 메인 리스트는 텍스트 위주 — 요약을 조금 더 길게 */
const EXCERPT_LIMIT = 118;

function truncateExcerpt(text: string, limit = EXCERPT_LIMIT): string {
  const flat = text.replace(/\n/g, " ");
  return flat.length > limit ? flat.slice(0, limit) + "…" : flat;
}

type Props = {
  posts: KoSampleBlogPost[];
};

export function BlogCarousel({ posts }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const scrollRef = useRef<HTMLUListElement>(null);

  const filtered = activeTab === "all" ? posts : posts.filter((p) => p.category === activeTab);

  const handleTabClick = (id: TabId) => {
    setActiveTab(id);
    scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="blog-carousel-wrap">
      <div className="blog-carousel-tabs" role="tablist" aria-label="블로그 카테고리">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`blog-carousel-tab${activeTab === tab.id ? " is-active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="blog-carousel-empty">해당 카테고리 글이 없어요.</p>
      ) : (
        <ul className="blog-carousel blog-carousel--list" ref={scrollRef} role="list">
          {filtered.map((post) => (
            <li key={post.id} className="blog-carousel-item blog-carousel-item--list">
              <Link className="blog-card-link blog-card-link--row" href={`/ko/blog/${post.id}/`}>
                <article className="blog-card blog-card--home-list">
                  <div className="blog-card__thumb-frame blog-card__thumb-frame--sq" aria-hidden="true">
                    <QuizImageWithFallback
                      src={post.image ?? QUIZ_IMAGE_PENDING_SRC}
                      alt=""
                      width={128}
                      height={128}
                      loading="lazy"
                      decoding="async"
                      className="blog-card__thumb"
                    />
                  </div>
                  <div className="blog-card__body">
                    <div className="blog-card__meta">
                      <time className="blog-card__date" dateTime={post.dateTime}>
                        {post.date}
                      </time>
                      {post.tag ? <span className="blog-card__tag">{post.tag}</span> : null}
                    </div>
                    <h3 className="blog-card__title">{post.title}</h3>
                    <p className="blog-card__excerpt">{truncateExcerpt(post.excerpt)}</p>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
