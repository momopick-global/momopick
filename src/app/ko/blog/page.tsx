import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { koSamplePosts } from "@/content/blog/koSamplePosts";

export const metadata: Metadata = {
  title: "블로그 | 모모픽",
  description: "모모픽 블로그 — 업데이트·팁·스토리를 차례로 채워 나갑니다.",
  alternates: {
    canonical: "https://momopick.com/ko/blog/",
  },
  openGraph: {
    title: "블로그 | 모모픽",
    description: "모모픽 블로그",
    url: "https://momopick.com/ko/blog/",
    locale: "ko_KR",
    type: "website",
  },
};

const year = new Date().getFullYear();

export default function KoBlogPage() {
  return (
    <>
      <KoSiteHeader
          actions={
            <>
              <Link className="btn sm" href="/ko/">
              홈
            </Link>
            <Link className="btn-icon" href="/ko/app/login/" title="로그인" aria-label="로그인">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
            </>
          }
        />

      <div className="wrap">
        <main className="policy-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>블로그</span>
          </nav>

          <header className="policy-page-hd">
            <h1>블로그</h1>
            <p className="policy-intro">
              서비스 소식·콘텐츠 가이드·에디터 노트를 이곳에 올립니다. 아래는 레이아웃·톤 확인용{" "}
              <strong>예시 글</strong>입니다.
            </p>
          </header>

          <ul className="blog-list" aria-label="블로그 글 목록">
            {koSamplePosts.map((post) => (
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

          <p className="policy-foot">
            <Link className="link-all" href="/ko/">
              ← 홈으로
            </Link>
          </p>
        </main>

        <footer className="ko-ft">
          <div>© {year} Momopick. All rights reserved.</div>
          <KoFooterNav />
        </footer>
      </div>
    </>
  );
}
