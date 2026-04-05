import type { Metadata } from "next";
import Link from "next/link";
import { KoBrandLogo } from "@/components/ko/KoBrandLogo";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { getKoLoveQuizzesSorted } from "@/lib/content/homeRail";

const loveAll = getKoLoveQuizzesSorted("ko");

export const metadata: Metadata = {
  title: "썸·연애 테스트 모아보기 | 모모픽",
  description:
    "썸·연인·관계 심리 스낵 테스트를 한곳에 모았습니다. 짧게 즐기고 결과를 친구와 공유해 보세요.",
  alternates: {
    canonical: "https://momopick.com/ko/love/",
  },
  openGraph: {
    title: "썸·연애 테스트 모아보기 | 모모픽",
    description: "연애·썸 카테고리 테스트 전체 목록",
    url: "https://momopick.com/ko/love/",
    locale: "ko_KR",
    type: "website",
  },
};

const year = new Date().getFullYear();

export default function KoLoveHubPage() {
  return (
    <>
      <header className="site-hd">
        <div className="inner">
          <Link className="brand" href="/ko/" aria-label="모모픽 홈">
            <KoBrandLogo />
            <strong>Momopick</strong>
          </Link>
          <div className="hd-actions">
            <Link className="btn-icon" href="/ko/explore/" title="탐색" aria-label="테스트 탐색">
              🔎
            </Link>
            <Link className="btn sm primary" href="/ko/app/login/">
              로그인
            </Link>
          </div>
        </div>
      </header>

      <KoCatBar />

      <div className="wrap">
        <main>
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>연애</span>
          </nav>

          <section className="section section--love hub-love" aria-labelledby="hub-love-title">
            <div className="sec-hd">
              <h1 id="hub-love-title">💌 썸·연애 테스트</h1>
            </div>
            <p className="sec-lead">
              홈 메인에는 같은 조건(콘텐츠 JSON에서 <strong>category: love</strong>) 중 우선순위 상위 4개만
              노출됩니다. 여기서는 해당 카테고리 테스트를 <strong>전체</strong> 볼 수 있어요. 순서는 카드
              우선순위(높을수록 앞)입니다.
            </p>
            <div className="tile-grid">
              {loveAll.map((item, i) => (
                <Link key={item.href} className="tile tile--love" href={item.href}>
                  <div className="thumb">
                    {i === 0 ? <span className="badge">HOT</span> : null}
                    <img
                      src={item.image || "/images/banners/tile-love-01.webp"}
                      alt=""
                      width={1536}
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
          </section>

          <section className="section duo hub-love-footer" aria-label="다음 이동">
            <p className="sec-lead" style={{ marginBottom: 16 }}>
              다른 주제도 둘러볼까요?
            </p>
            <div className="cta">
              <Link className="btn primary" href="/ko/">
                홈으로
              </Link>
              <Link className="btn" href="/ko/explore/">
                전체 탐색
              </Link>
            </div>
          </section>
        </main>

        <footer className="ko-ft">
          <div>© {year} Momopick. All rights reserved.</div>
          <KoFooterNav />
        </footer>
      </div>
    </>
  );
}
