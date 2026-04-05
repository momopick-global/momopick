import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KoBrandLogo } from "@/components/ko/KoBrandLogo";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { getKoBlogPostBySlug, getKoBlogSlugs } from "@/content/blog/koSamplePosts";

const year = new Date().getFullYear();

export function generateStaticParams() {
  return getKoBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getKoBlogPostBySlug(slug);
  if (!post) {
    return { title: "글을 찾을 수 없습니다 | 모모픽" };
  }
  const title = `${post.title} | 모모픽 블로그`;
  return {
    title,
    description: post.excerpt.replace(/\s+/g, " ").slice(0, 160),
    alternates: {
      canonical: `https://momopick.com/ko/blog/${post.id}/`,
    },
    openGraph: {
      title,
      description: post.excerpt.slice(0, 200),
      url: `https://momopick.com/ko/blog/${post.id}/`,
      locale: "ko_KR",
      type: "article",
    },
  };
}

function BlogPostBody({ body }: { body: string }) {
  const paragraphs = body.split(/\n\n+/).filter(Boolean);
  return (
    <div className="blog-post-body policy-prose">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export default async function KoBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getKoBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <>
      <header className="site-hd">
        <div className="inner">
          <Link className="brand" href="/ko/" aria-label="모모픽 홈">
            <KoBrandLogo />
            <strong>Momopick</strong>
          </Link>
          <div className="hd-actions">
            <Link className="btn sm" href="/ko/blog/">
              블로그
            </Link>
            <Link className="btn sm primary" href="/ko/app/login/">
              로그인
            </Link>
          </div>
        </div>
      </header>

      <div className="wrap">
        <main className="policy-page blog-post-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/ko/blog/">블로그</Link>
            <span aria-hidden="true"> / </span>
            <span className="blog-post-crumb" title={post.title}>
              {post.title}
            </span>
          </nav>

          <article>
            <header className="blog-post-hd">
              <div className="blog-post-meta">
                <time className="blog-post-date" dateTime={post.dateTime}>
                  {post.date}
                </time>
                {post.tag ? <span className="blog-card__tag">{post.tag}</span> : null}
              </div>
              <h1 className="blog-post-title">{post.title}</h1>
            </header>

            <BlogPostBody body={post.body} />
          </article>

          <p className="policy-foot">
            <Link className="link-all" href="/ko/blog/">
              ← 블로그 목록
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
