import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { notFound } from "next/navigation";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { getKoBlogPostBySlug, getKoBlogSlugs } from "@/content/blog/koSamplePosts";
import { BlogAmbiguousSituationshipPromo } from "@/components/blog/BlogAmbiguousSituationshipPromo";
import { BackButton } from "@/components/ko/BackButton";
import { QUIZ_IMAGE_PENDING_SRC } from "@/lib/content/quizImagePending";


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
  const heroPath = post.image ?? QUIZ_IMAGE_PENDING_SRC;
  const useCustomOg = heroPath !== QUIZ_IMAGE_PENDING_SRC;
  const ogImages = useCustomOg
    ? [
        {
          url: `https://momopick.com${heroPath}`,
          width: 1536,
          height: 1024,
          alt: post.imageAlt ?? post.title,
        },
      ]
    : [
        {
          url: "https://momopick.com/og/main-og.webp",
          width: 1536,
          height: 1024,
          alt: "모모픽 — MBTI·연애·심리 테스트",
        },
      ];

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
      images: ogImages,
      locale: "ko_KR",
      type: "article",
    },
  };
}

function BlogPostBody({ body }: { body: string }) {
  const blocks = body
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="blog-post-body policy-prose">
      {blocks.map((block, i) => {
        const heading = /^## (.+)$/.exec(block);
        if (heading?.[1]?.trim()) {
          return (
            <h3 key={i} className="blog-post-h3">
              {heading[1].trim()}
            </h3>
          );
        }
        const lines = block.split("\n");
        return (
          <p key={i}>
            {lines.map((line, li) => (
              <Fragment key={li}>
                {li > 0 ? <br /> : null}
                {line}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

export default async function KoBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getKoBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const heroPath = post.image ?? QUIZ_IMAGE_PENDING_SRC;

  return (
    <>
      <KoSiteHeader />

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
          <BackButton />

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

            <figure className="blog-post-hero">
              <Image
                src={heroPath}
                alt={post.imageAlt ?? post.title}
                fill
                sizes="(max-width: 480px) 92vw, 520px"
                className="blog-post-hero__img"
                priority
              />
            </figure>

            <BlogPostBody body={post.body} />

            {post.embedAfterBody === "ambiguous-situationship-end" ? (
              <BlogAmbiguousSituationshipPromo />
            ) : null}
          </article>

          <p className="policy-foot">
            <Link className="link-all" href="/ko/blog/">
              ← 블로그 목록
            </Link>
          </p>
        </main>

        <footer className="ko-ft">
          <KoFooterNav />
        </footer>
      </div>
    </>
  );
}
