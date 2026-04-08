import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { BackButton } from "@/components/ko/BackButton";

export const metadata: Metadata = {
  title: "면책조항",
  description:
    "모모픽(MOMOPICK) 면책조항. 서비스 성격, 결과 참고 한계, 개인 책임, 콘텐츠 변경, 외부 링크, 이용 제한 및 면책 범위를 안내합니다.",
  alternates: {
    canonical: "https://momopick.com/ko/policy/disclaimer/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "면책조항 | 모모픽",
    description: "모모픽(MOMOPICK) 면책조항",
    url: "https://momopick.com/ko/policy/disclaimer/",
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

export default function DisclaimerPage() {
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
        <main className="policy-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>면책조항</span>
          </nav>
          <BackButton />

          <header className="policy-page-hd">
            <h1>면책조항</h1>
            <p className="policy-effective">
              시행일: <time dateTime="2026-04-04">2026년 4월 4일</time>
            </p>
            <p className="policy-intro">
              모모픽(MOMOPICK) 서비스 이용과 관련하여 운영자의 책임 범위를 안내합니다. 본 페이지를
              읽고 서비스를 이용하는 경우 아래 내용에 동의한 것으로 봅니다.
            </p>
          </header>

          <article className="policy-prose">
            <section aria-labelledby="d1">
              <h2 id="d1">1. 서비스의 성격</h2>
              <p>
                모모픽(MOMOPICK)은 사용자의 흥미와 오락을 위한 심리 테스트 및 콘텐츠를 제공하는
                서비스입니다. 본 서비스에서 제공되는 모든 테스트 결과 및 콘텐츠는 참고용이며, 오락적
                목적으로 제작되었습니다.
              </p>
            </section>

            <section aria-labelledby="d2">
              <h2 id="d2">2. 결과의 정확성에 대한 책임</h2>
              <p>
                모모픽에서 제공되는 테스트 결과는 과학적·의학적·전문적 판단을 대체하지 않습니다.
                따라서 아래와 같은 사항에 대해 책임을 지지 않습니다:
              </p>
              <ul>
                <li>개인의 성격, 심리 상태, 관계에 대한 실제 판단</li>
                <li>연애, 인간관계, 인생 선택에 대한 결정</li>
                <li>테스트 결과에 따른 행동 또는 판단으로 발생한 모든 결과</li>
              </ul>
              <p>
                👉 테스트 결과는 하나의 참고일 뿐이며, 중요한 판단과 결정은 이용자 본인의 책임 하에
                이루어져야 합니다.
              </p>
            </section>

            <section aria-labelledby="d3">
              <h2 id="d3">3. 개인 책임의 원칙</h2>
              <p>
                사용자는 본 서비스를 이용함에 있어 모든 판단과 선택에 대한 책임이 본인에게 있음을
                이해하고 동의합니다.
              </p>
              <p>모모픽은 아래에 대해 책임지지 않습니다:</p>
              <ul>
                <li>테스트 결과를 과도하게 신뢰하여 발생한 문제</li>
                <li>타인과의 갈등, 오해, 관계 변화</li>
                <li>서비스 이용으로 인한 정신적·감정적 영향</li>
              </ul>
            </section>

            <section aria-labelledby="d4">
              <h2 id="d4">4. 콘텐츠 및 정보의 변경</h2>
              <p>
                모모픽은 서비스 품질 향상을 위해 콘텐츠를 언제든지 수정, 변경, 삭제할 수 있습니다.
                또한 사전 공지 없이 서비스 일부 또는 전체가 변경될 수 있습니다.
              </p>
            </section>

            <section aria-labelledby="d5">
              <h2 id="d5">5. 외부 링크 및 제휴 콘텐츠</h2>
              <p>
                모모픽은 외부 사이트 또는 제휴 콘텐츠로 연결될 수 있습니다. 해당 콘텐츠에 대한 책임은
                해당 제공자에게 있으며, 모모픽은 이에 대해 책임을 지지 않습니다.
              </p>
            </section>

            <section aria-labelledby="d6">
              <h2 id="d6">6. 서비스 이용 제한</h2>
              <p>다음과 같은 경우 서비스 이용이 제한될 수 있습니다:</p>
              <ul>
                <li>서비스 운영을 방해하는 행위</li>
                <li>부정한 방법으로 결과를 조작하는 행위</li>
                <li>기타 정상적인 서비스 이용을 저해하는 행위</li>
              </ul>
            </section>

            <section aria-labelledby="d7">
              <h2 id="d7">7. 면책의 범위</h2>
              <p>
                모모픽은 서비스 이용과 관련하여 발생한 직접적 또는 간접적 손해에 대해 책임을 지지
                않습니다.
              </p>
            </section>

            <section aria-labelledby="d8">
              <h2 id="d8">8. 동의</h2>
              <p>본 서비스를 이용하는 경우, 위의 모든 면책조항에 동의한 것으로 간주됩니다.</p>
            </section>
          </article>

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
