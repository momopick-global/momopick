import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";

export const metadata: Metadata = {
  title: "오늘의 운세 | 모모픽",
  description:
    "타로로 오늘의 운세를 가볍게 확인하는 콘텐츠를 준비 중입니다. 서비스 오픈 전 안내입니다.",
  alternates: {
    canonical: "https://momopick.com/ko/today/",
  },
  openGraph: {
    title: "오늘의 운세 | 모모픽",
    description: "오늘의 운세",
    url: "https://momopick.com/ko/today/",
    locale: "ko_KR",
    type: "website",
  },
};

const year = new Date().getFullYear();

export default function KoTodayPage() {
  return (
    <>
      <KoSiteHeader />

      <div className="wrap">
        <main className="policy-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>오늘의 운세</span>
          </nav>

          <header className="policy-page-hd">
            <h1>오늘의 운세</h1>
          </header>

          <div className="today-hero">
            <img
              className="today-hero__img"
              src="/images/today/tarot.webp"
              alt=""
              width={940}
              height={1671}
              decoding="async"
            />
            <div className="today-hero__overlay" role="region" aria-label="안내 문구">
              <div className="today-hero__text">
                <p>
                  타로를 통해 오늘의 운세를 가볍게 확인할 수 있는 콘텐츠를 준비 중입니다.
                  <br />
                  매일 달라지는 메시지와 함께, 하루를 돌아보거나 작은 힌트를 얻을 수 있는 공간으로
                  만들어갈 예정입니다.
                </p>
                <p>
                  현재는 서비스 준비 단계로, 아직 이용은 어렵지만 곧 더 흥미롭고 완성도 높은 형태로
                  찾아뵙겠습니다.
                </p>
                <p>
                  조금만 기다려주시면, 일상 속에서 부담 없이 즐길 수 있는 운세 콘텐츠로 인사드리겠습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="cta">
            <Link className="btn primary" href="/ko/explore/">
              테스트 찾아보기
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
