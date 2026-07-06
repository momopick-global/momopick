import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { KoPageFooter } from "@/components/ko/KoPageFooter";
import { BackButton } from "@/components/ko/BackButton";
import { getKoQuizTags } from "@/lib/content/quizTags";

const allTags = getKoQuizTags(1);

export const metadata: Metadata = {
  title: "태그 모아보기 | 모모픽",
  description:
    "태그별로 심층·원픽·성향 테스트를 모아 보세요. 관심 있는 주제를 골라 바로 시작할 수 있어요.",
  alternates: {
    canonical: "https://momopick.com/ko/tag/",
  },
  openGraph: {
    title: "태그 | 모모픽",
    description: "태그별 테스트 모아보기",
    url: "https://momopick.com/ko/tag/",
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

export default function KoTagPage() {
  return (
    <>
      <KoSiteHeader />

      <KoCatBar />

      <div className="wrap">
        <main>
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>태그</span>
          </nav>
          <BackButton />

          <section className="section" aria-labelledby="tag-title">
            <div className="sec-hd">
              <h1 id="tag-title">🏷️ 태그</h1>
            </div>
            <p className="sec-lead">
              관심 있는 주제 태그를 고르면 심층·원픽·성향 테스트를 모아서 보여드려요.
            </p>
            <div className="tag-cloud">
              {allTags.map((t) => (
                <Link key={t.slug} className="chip chip--tag" href={`/ko/tag/${t.slug}/`}>
                  #{t.label}
                  <span className="tag-cloud__count" aria-hidden="true">
                    {t.count}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <KoPageFooter />
      </div>
    </>
  );
}
