import type { Metadata } from "next";
import Image from "next/image";
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
      <KoSiteHeader />

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

          <section className="about-momo" aria-labelledby="about-momo-heading">
            <figure className="about-momo__figure">
              <Image
                src="/images/common/23543453.webp"
                alt="모모픽 안내자 모모"
                width={1024}
                height={1024}
                sizes="(max-width: 480px) 72vw, 280px"
                className="about-momo__img"
                priority
              />
            </figure>
            <div className="about-momo__body">
              <h2 id="about-momo-heading">모모는</h2>
              <p>모모픽에서 당신에게 질문을 던지는 작은 안내자입니다.</p>
              <div className="about-momo__hint">
                <p>
                  👉 모모는 &quot;정답&quot;을 알려주지 않습니다.
                  <br />
                  대신, 지금의 당신을 비추는 힌트를 건넵니다.
                </p>
              </div>
              <h3 className="about-momo__subhd">앞으로 모모는</h3>
              <p className="about-momo__future">
                테스트, 결과, 타로, 추천까지
                <br />
                모모픽의 모든 경험에서 함께합니다.
              </p>
            </div>
          </section>

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
                모모픽의 테스트는
                <br />
                재미와 자기 이해를 위한 콘텐츠입니다.
              </p>
              <p>
                의학, 법률, 심리 진단 등
                <br />
                전문적인 판단을 대신하지 않습니다.
              </p>
              <p>
                👉 중요한 선택은
                <br />
                항상 &quot;현실의 당신&quot;이 하세요.
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
