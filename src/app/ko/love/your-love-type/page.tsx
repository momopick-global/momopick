import type { Metadata } from "next";
import Link from "next/link";
import { SnackQuiz } from "@/components/quiz/SnackQuiz";
import { koQuizYourLoveType } from "@/content/quiz/ko";

export const metadata: Metadata = {
  title: "내 연애 유형 테스트 | 모모픽",
  description:
    "썸부터 연인까지, 나의 연애 패턴을 가볍게 알아보는 1분 스낵 테스트. 재미·자기이해용입니다.",
  alternates: {
    canonical: "https://momopick.com/ko/love/your-love-type/",
  },
  openGraph: {
    title: "내 연애 유형 테스트 | 모모픽",
    description: "5문항 스낵 테스트로 나의 연애 성향을 알아보세요.",
    url: "https://momopick.com/ko/love/your-love-type/",
    locale: "ko_KR",
    type: "website",
  },
};

export default function YourLoveTypePage() {
  return (
    <>
      <header className="site-hd">
        <div className="inner">
          <Link className="brand" href="/ko/" aria-label="모모픽 홈">
            <span className="logo" aria-hidden="true" />
            <strong>Momopick</strong>
          </Link>
          <div className="hd-actions">
            <Link className="btn sm" href="/ko/">
              홈
            </Link>
            <Link className="btn sm primary" href="/ko/app/login/">
              로그인
            </Link>
          </div>
        </div>
      </header>

      <div className="wrap">
        <main className="quiz-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/ko/#love">연애</Link>
            <span aria-hidden="true"> / </span>
            <span>내 연애 유형</span>
          </nav>

          <header className="quiz-page-hd">
            <p className="quiz-kicker">✨ 지금 뜨는 테스트</p>
            <h1 id="quiz-title">내 연애 유형 테스트</h1>
            <p className="quiz-lead">
              썸부터 연인까지, 나에게 맞는 연애 리듬은? 약 1분이면 끝나요.
            </p>
            <div className="quiz-cover">
              <img
                src="/images/banners/ko/rail-01.webp"
                alt=""
                width={1120}
                height={630}
                loading="eager"
                decoding="async"
              />
            </div>
          </header>

          <section className="quiz-section" aria-labelledby="quiz-title">
            <SnackQuiz definition={koQuizYourLoveType} locale="ko" />
          </section>
        </main>

        <footer className="ko-ft">
          <div>
            <Link href="/ko/explore/">다른 테스트 보기</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
