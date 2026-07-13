import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { KoPageFooter } from "@/components/ko/KoPageFooter";
import { BackButton } from "@/components/ko/BackButton";
import { KoTagGroups } from "@/components/ko/KoTagGroups";
import { getKoQuizzesByTag } from "@/lib/content/homeRail";
import { KO_TAG_REGISTRY, koTagBySlug } from "@/lib/content/koTagRegistry";

/** 정적 export — 레지스트리에 정의된 태그만 미리 생성한다. */
export const dynamicParams = false;
export function generateStaticParams() {
  return KO_TAG_REGISTRY.map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const label = koTagBySlug(tag)?.ko ?? tag;
  const title = `#${label} 테스트 모아보기 | 모모픽`;
  return {
    title,
    description: `#${label} 태그가 달린 심층·원픽·성향 테스트를 모아 보세요.`,
    alternates: { canonical: `https://momopick.com/ko/tag/${tag}/` },
    openGraph: {
      title,
      description: `#${label} 태그 테스트 모아보기`,
      url: `https://momopick.com/ko/tag/${tag}/`,
      images: [
        {
          url: "https://momopick.com/og/main-og.webp",
          width: 1536,
          height: 1024,
          alt: "모모픽 — MBTI·연애·심리 테스트",
        },
      ],
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function KoTagDetailPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const t = koTagBySlug(tag);
  const label = t?.ko ?? tag;
  const groups = getKoQuizzesByTag(tag, "ko");
  const total = groups.deep.length + groups.onepick.length + groups.personality.length;

  return (
    <>
      <KoSiteHeader />

      <KoCatBar />

      <div className="wrap">
        <main>
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/ko/tag/">태그</Link>
            <span aria-hidden="true"> / </span>
            <span>#{label}</span>
          </nav>
          <BackButton />

          <section className="section" aria-labelledby="tag-title">
            <div className="sec-hd">
              <h1 id="tag-title">
                {t?.emoji ? `${t.emoji} ` : ""}#{label}
              </h1>
            </div>
            <p className="sec-lead">
              ‘{label}’ 태그가 달린 테스트 {total}개를 메뉴별로 모았어요.
            </p>
          </section>

          {total === 0 ? (
            <section className="section" aria-label="빈 결과">
              <div className="empty-state">
                <p>아직 이 태그의 테스트가 없어요.</p>
                <div className="cta-row">
                  <Link className="btn primary sm" href="/ko/tag/">
                    다른 태그 보기
                  </Link>
                  <Link className="btn secondary sm" href="/ko/">
                    홈으로
                  </Link>
                </div>
              </div>
            </section>
          ) : (
            <KoTagGroups groups={groups} />
          )}
        </main>

      </div>
      <KoPageFooter />
    </>
  );
}
