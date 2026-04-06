import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";

export const metadata: Metadata = {
  title: "이용약관",
  description:
    "모모픽(Momopick) 이용약관. 서비스 이용 조건, 회원 의무, 콘텐츠·결과 이용, 책임의 한계 등을 안내합니다.",
  alternates: {
    canonical: "https://momopick.com/ko/policy/terms/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "이용약관 | 모모픽",
    description: "모모픽 이용약관",
    url: "https://momopick.com/ko/policy/terms/",
    locale: "ko_KR",
    type: "website",
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <KoSiteHeader
          actions={
            <>
              <Link className="btn sm" href="/ko/">
              홈
            </Link>
            <Link className="btn-icon" href="/ko/app/login/" title="로그인" aria-label="로그인">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
            <span>이용약관</span>
          </nav>

          <header className="policy-page-hd">
            <h1>이용약관</h1>
            <p className="policy-effective">
              시행일: <time dateTime="2026-04-04">2026년 4월 4일</time>
            </p>
            <p className="policy-intro">
              모모픽(Momopick, 이하 &quot;서비스&quot;)에 오신 것을 환영합니다. 본 약관은 서비스 이용과
              관련한 회사(운영 주체)와 이용자 간 권리·의무 및 책임 사항을 규정합니다. 서비스를 이용하면 본
              약관에 동의한 것으로 간주됩니다. 운영 주체·연락처는 서비스 내 공지 또는 아래 안내에 따릅니다.
            </p>
          </header>

          <article className="policy-prose">
            <section aria-labelledby="t1">
              <h2 id="t1">1. 목적 및 약관의 효력</h2>
              <p>
                본 약관은 서비스의 제공 조건 및 절차, 이용자와 운영자 간 필요한 사항을 정함을 목적으로
                합니다. 운영자는 관련 법령을 위배하지 않는 범위에서 약관을 개정할 수 있으며, 개정 시
                시행일·개정 내용을 서비스 내 공지 등으로 안내합니다. 이용자가 개정 후에도 서비스를 계속
                이용하는 경우 변경 약관에 동의한 것으로 볼 수 있습니다.
              </p>
            </section>

            <section aria-labelledby="t2">
              <h2 id="t2">2. 용어의 정의</h2>
              <ul>
                <li>
                  <strong>이용자</strong>: 본 약관에 따라 서비스에 접속하거나 이용하는 모든 사람을
                  말합니다.
                </li>
                <li>
                  <strong>회원</strong>: 계정을 생성하거나 로그인하여 추가 기능(기록 저장, 추천 등)을
                  이용하는 이용자를 말합니다. (해당 기능이 제공되는 경우)
                </li>
                <li>
                  <strong>콘텐츠</strong>: 서비스 내 테스트·퀴즈, 문항, 결과 화면, 이미지, 텍스트 등
                  운영자가 제공하거나 이용자가 생성·공유하는 정보 일체를 말합니다.
                </li>
              </ul>
            </section>

            <section aria-labelledby="t3">
              <h2 id="t3">3. 서비스의 제공 및 변경</h2>
              <p>
                서비스는 연애·심리·성향·재미 퀴즈 등 엔터테인먼트 목적의 테스트와 관련 기능을 제공합니다.
                운영자는 기술적·운영적 필요에 따라 서비스의 전부 또는 일부를 변경·중단·종료할 수 있으며,
                가능한 경우 사전에 안내합니다. 다만 긴급한 보안·법적 사유 등 불가피한 경우 사후 안내할 수
                있습니다.
              </p>
            </section>

            <section aria-labelledby="t4">
              <h2 id="t4">4. 회원가입 및 계정</h2>
              <p>
                회원 기능이 제공되는 경우, 이용자는 정확한 정보를 제공하고 계정 보안(비밀번호·연동 정보
                등)을 스스로 관리할 책임이 있습니다. 타인의 정보를 도용하거나 허위 가입을 해서는 안 됩니다.
                계정의 부정 사용이 의심되면 운영자는 이용 제한·정지 등 조치를 취할 수 있습니다.
              </p>
            </section>

            <section aria-labelledby="t5">
              <h2 id="t5">5. 이용자의 의무</h2>
              <p>이용자는 다음 행위를 해서는 안 됩니다.</p>
              <ul>
                <li>법령 또는 본 약관·공지에 위반되는 행위</li>
                <li>서비스·시스템·네트워크의 정상 운영을 방해하는 행위(과도한 자동화 접속, 취약점 악용 등)</li>
                <li>타인의 권리를 침해하거나 명예·사생활을 훼손하는 행위</li>
                <li>음란·폭력·차별·불법 정보의 게시·유포</li>
                <li>운영자 또는 제3자의 지식재산권을 무단으로 침해하는 행위</li>
              </ul>
            </section>

            <section aria-labelledby="t6">
              <h2 id="t6">6. 테스트·퀴즈 결과 및 콘텐츠의 성격</h2>
              <p>
                서비스가 제공하는 테스트·퀴즈 결과는 재미·자기 이해를 위한 참고용이며, 의학·심리학·법률
                등 전문적인 진단·상담·조언을 대체하지 않습니다. 결과에 대한 해석·신뢰 여부는 이용자의
                선택이며, 그에 따른 판단·행위에 대해 운영자는 책임을 지지 않습니다.
              </p>
            </section>

            <section aria-labelledby="t7">
              <h2 id="t7">7. 지식재산권</h2>
              <p>
                서비스 및 그에 포함된 콘텐츠에 대한 저작권 등 지식재산권은 운영자 또는 정당한 권리자에게
                있습니다. 이용자는 운영자가 허용한 범위(예: 공유 기능을 통한 링크·스크린샷 등)를 넘어
                무단 복제·배포·2차 저작물 작성을 할 수 없습니다.
              </p>
            </section>

            <section aria-labelledby="t8">
              <h2 id="t8">8. 광고 및 제휴</h2>
              <p>
                서비스에는 배너·동영상 등 제3자 광고가 게재될 수 있습니다. 광고주의 상품·서비스와 관련한
                거래는 이용자와 광고주 간의 책임이며, 운영자는 광고 내용의 정확성이나 거래 결과에 대해
                보증하지 않습니다.
              </p>
            </section>

            <section aria-labelledby="t9">
              <h2 id="t9">9. 면책</h2>
              <p>
                운영자는 천재지변, 시스템 점검, 통신 장애, 제3자의 귀책 등 운영자의 합리적 통제를 벗어난
                사유로 인한 서비스 중단·지연·데이터 손실 등에 대해 책임을 제한할 수 있습니다. 서비스는
                &quot;있는 그대로&quot; 제공되며, 특정 목적 적합성 등에 대한 보증을 하지 않습니다.
              </p>
            </section>

            <section aria-labelledby="t10">
              <h2 id="t10">10. 이용 제한 및 계약 해지</h2>
              <p>
                이용자가 본 약관을 위반하거나 서비스 운영에 중대한 지장을 초래한 경우, 운영자는 사전 통지
                후 또는 긴급한 경우 사후 통지로 서비스 이용을 제한·정지하거나 계약을 해지할 수 있습니다.
                회원은 언제든지 탈퇴(해당 기능이 있는 경우) 등을 통해 이용 계약을 종료할 수 있습니다.
              </p>
            </section>

            <section aria-labelledby="t11">
              <h2 id="t11">11. 준거법 및 분쟁 해결</h2>
              <p>
                본 약관은 대한민국 법령에 따릅니다. 서비스와 관련하여 분쟁이 발생한 경우 운영자 소재지
                관할 법원을 전속 관할로 합니다. 다만 소비자에게 유리한 강행 규정이 있는 경우 그에
                따릅니다.
              </p>
            </section>

            <section aria-labelledby="t12">
              <h2 id="t12">12. 문의</h2>
              <p>본 약관에 관한 문의는 아래로 연락 주시기 바랍니다.</p>
              <ul className="policy-contact">
                <li>
                  <strong>이메일</strong>:{" "}
                  <a href="mailto:privacy@momopick.com">privacy@momopick.com</a>
                  {" "}(서비스·약관 관련 문의)
                </li>
                <li>
                  <strong>개인정보</strong>:{" "}
                  <Link href="/ko/policy/privacy/">개인정보처리방침</Link>
                </li>
              </ul>
            </section>
          </article>

          <p className="policy-foot">
            <Link className="link-all" href="/ko/">
              ← 홈으로
            </Link>
          </p>
        </main>

        <footer className="ko-ft">
          <div>© {new Date().getFullYear()} Momopick. All rights reserved.</div>
          <KoFooterNav />
        </footer>
      </div>
    </>
  );
}
