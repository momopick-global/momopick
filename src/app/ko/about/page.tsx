import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { BackButton } from "@/components/ko/BackButton";

export const metadata: Metadata = {
  title: "모모픽 소개 | Momopick",
  description:
    "모모픽(Momopick)은 MBTI·연애·심리·취향 등 짧은 스낵 테스트로 나를 알아보고 친구와 공유할 수 있는 서비스입니다.",
  alternates: {
    canonical: "https://momopick.com/ko/about/",
  },
  openGraph: {
    title: "모모픽 소개 | Momopick",
    description: "짧은 테스트로 나를 알아보는 모모픽을 소개합니다.",
    url: "https://momopick.com/ko/about/",
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

const year = new Date().getFullYear();

export default function KoAboutPage() {
  return (
    <>
      <KoSiteHeader
          actions={
            <>
              <Link className="btn sm" href="/ko/">
              홈
            </Link>
            <Link className="btn-icon" href="/ko/app/login/" title="로그인" aria-label="로그인">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
            </>
          }
        />

      <div className="wrap">
        <main className="policy-page about-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>모모픽 소개</span>
          </nav>
          <BackButton />

          <header className="policy-page-hd">
            <p className="about-page-kicker">Momopick</p>
            <h1>모모픽</h1>
            <p className="policy-intro">
              1~3분이면 끝나는 스낵 테스트로 성향·연애·심리·취향을 가볍게 돌아보고, 결과는 카톡·SNS로
              바로 공유할 수 있어요. 진단이 아니라 &quot;재미 + 자기이해&quot; 톤을 지향합니다.
            </p>
          </header>

          <article className="policy-prose">
            <section aria-labelledby="about-1">
              <h2 id="about-1">왜 모모픽인가요</h2>
              <p>
                긴 설문 대신 짧은 선택으로 끝나도록 구성했습니다. 바쁜 일상에서도 부담 없이 들어올 수
                있게, 카테고리·태그·슬러그로 주제도 찾기 쉽게 정리해 두었어요.
              </p>
            </section>

            <section aria-labelledby="about-2">
              <h2 id="about-2">무엇을 할 수 있나요</h2>
              <ul>
                <li>연애·썸·관계, 성격·심리, 소셜·스타일·재미 등 주제별 테스트 탐색</li>
                <li>결과 화면 공유로 친구와 밈·대화 소재 만들기</li>
                <li>로그인(준비 중)으로 맞춤 추천·히스토리 등 확장 예정</li>
              </ul>
            </section>

            <section aria-labelledby="about-3">
              <h2 id="about-3">알아 두세요</h2>
              <p>
                테스트 결과는 참고용이며 의학·법률 등 전문 판단의 대체가 될 수 없습니다. 자세한 책임
                범위는{" "}
                <Link href="/ko/policy/disclaimer/">면책조항</Link>을 참고해 주세요.
              </p>
            </section>
          </article>

          <div className="about-page-cta">
            <Link className="btn primary" href="/ko/explore/">
              테스트 탐색하기
            </Link>
            <Link className="btn" href="/ko/">
              홈으로
            </Link>
          </div>
        </main>

        <footer className="ko-ft">
          <div>© {year} Momopick. All rights reserved.</div>
          <KoFooterNav />
        </footer>
      </div>
    </>
  );
}
