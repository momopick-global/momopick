import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { BackButton } from "@/components/ko/BackButton";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "모모픽(Momopick) 개인정보처리방침. 개인정보의 수집·이용·보관·파기 및 정보주체의 권리를 안내합니다.",
  alternates: {
    canonical: "https://momopick.com/ko/policy/privacy/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "개인정보처리방침 | 모모픽",
    description: "모모픽 개인정보처리방침",
    url: "https://momopick.com/ko/policy/privacy/",
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

export default function PrivacyPolicyPage() {
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
            <span>개인정보처리방침</span>
          </nav>
          <BackButton />

          <header className="policy-page-hd">
            <h1>개인정보처리방침</h1>
            <p className="policy-effective">
              시행일: <time dateTime="2026-04-04">2026년 4월 4일</time>
            </p>
            <p className="policy-intro">
              모모픽(Momopick, 이하 &quot;서비스&quot;)는 이용자의 개인정보를 중요하게 생각합니다. 본 방침은
              서비스 이용 과정에서 처리되는 개인정보에 관한 사항을 설명합니다. 서비스 기능이 추가되거나
              관련 법령이 바뀌면 내용을 수정할 수 있으며, 변경 시 서비스 내 공지 등 합리적인 방법으로
              안내합니다.
            </p>
          </header>

          <article className="policy-prose">
            <section aria-labelledby="p1">
              <h2 id="p1">1. 처리 목적</h2>
              <p>
                서비스는 다음의 목적 범위에서만 개인정보를 처리합니다. 목적이 변경되는 경우 별도 동의를
                받거나 법령에 따른 절차를 진행합니다.
              </p>
              <ul>
                <li>회원 가입·로그인·본인 확인, 계정 관리</li>
                <li>콘텐츠 제공, 맞춤 추천·히스토리 등 서비스 기능 제공(해당 기능이 있는 경우)</li>
                <li>부정 이용 방지, 분쟁 대응, 통계·품질 개선(가능한 범위에서 비식별·익명 처리)</li>
                <li>고객 문의 응대 및 공지·안내 전달</li>
              </ul>
            </section>

            <section aria-labelledby="p2">
              <h2 id="p2">2. 수집 항목</h2>
              <p>서비스 이용 단계에 따라 다음과 같은 정보가 수집될 수 있습니다.</p>
              <ul>
                <li>
                  <strong>서비스 이용 시 자동 생성·수집</strong>: 접속 로그, IP 주소, 쿠키, 기기·브라우저
                  정보, 이용 기록 일부(보안·통계 목적)</li>
                <li>
                  <strong>회원·로그인 기능 이용 시</strong>: 이메일 주소, 닉네임 등 가입 시 입력하는 정보,
                  서비스 연동에 필요한 식별자(구체 항목은 가입 화면에서 안내)</li>
                <li>
                  <strong>고객 문의</strong>: 문의 내용, 연락처(이메일 등), 처리 이력
                </li>
              </ul>
              <p>
                필수·선택 항목은 각 수집 시점에 별도로 구분하여 안내합니다. 이용자는 선택 항목에 대해
                동의를 거부할 수 있으며, 필수 항목 미제공 시 일부 기능 이용이 제한될 수 있습니다.
              </p>
            </section>

            <section aria-labelledby="p3">
              <h2 id="p3">3. 보유 및 이용 기간</h2>
              <p>
                원칙적으로 개인정보는 수집·이용 목적이 달성되면 지체 없이 파기합니다. 다만 관계 법령에
                따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관합니다.
              </p>
              <ul>
                <li>회원 정보: 탈퇴 시 지체 없이 파기(단, 법령·분쟁 대응에 필요한 최소 정보는 예외)</li>
                <li>전자상거래 등에서의 소비자 보호에 관한 법률 등에 따른 보존: 해당 법령이 정한 기간</li>
              </ul>
            </section>

            <section aria-labelledby="p4">
              <h2 id="p4">4. 제3자 제공 및 처리 위탁</h2>
              <p>
                서비스는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만 이용자의 동의가
                있거나 법령에 근거가 있는 경우는 예외입니다.
              </p>
              <p>
                원활한 서비스 운영을 위해 호스팅, 이메일 발송, 데이터베이스·인증 등 일부 업무를 외부
                업체에 위탁할 수 있습니다. 위탁 시에는 위탁받는 자, 위탁 업무 내용을 본 방침 또는 별도
                공지로 게재하고, 관련 법령에 따라 관리·감독합니다.
              </p>
            </section>

            <section aria-labelledby="p5">
              <h2 id="p5">5. 국외 이전</h2>
              <p>
                클라우드·인프라 특성상 개인정보가 국외 서버에 저장·처리될 수 있습니다. 해당 경우 관련
                법령이 요구하는 사항(이전 국가, 일시·방법, 항목, 조치 등)을 안내하고 필요한 보호조치를
                취합니다.
              </p>
            </section>

            <section aria-labelledby="p6">
              <h2 id="p6">6. 정보주체의 권리</h2>
              <p>
                이용자는 언제든지 자신의 개인정보 열람·정정·삭제·처리정지 요구 등을 할 수 있습니다. 요청은
                고객센터(아래 연락처)로 하시면 지체 없이 조치하겠습니다. 권리 행사는 법정대리인 등 위임을
                통해서도 가능하며, 이 경우 위임장이 제출될 수 있습니다.
              </p>
            </section>

            <section aria-labelledby="p7">
              <h2 id="p7">7. 개인정보의 파기</h2>
              <p>
                보유 기간이 경과하거나 처리 목적이 달성된 개인정보는 복구가 불가능한 방법으로 파기합니다.
                전자적 파일은 기록을 재생할 수 없는 기술적 방법을 사용하고, 출력물은 분쇄·소각 등으로
                처리합니다.
              </p>
            </section>

            <section aria-labelledby="p8">
              <h2 id="p8">8. 안전성 확보 조치</h2>
              <p>
                서비스는 개인정보의 분실·도난·유출·변조·훼손을 방지하기 위해 접근 권한 관리, 저장·전송 구간
                보호, 백업 및 복구 절차 등 합리적·기술적·물리적 조치를 취합니다.
              </p>
            </section>

            <section aria-labelledby="p9">
              <h2 id="p9">9. 쿠키</h2>
              <p>
                서비스는 이용 편의·통계·보안을 위해 쿠키 등을 사용할 수 있습니다. 브라우저 설정에서 쿠키
                저장을 거부할 수 있으나, 일부 기능이 제한될 수 있습니다.
              </p>
            </section>

            <section aria-labelledby="p10">
              <h2 id="p10">10. 개인정보 보호책임자</h2>
              <p>
                개인정보 처리에 관한 문의·불만·피해 구제 요청은 아래 연락처로 연락 주시기 바랍니다.
              </p>
              <ul className="policy-contact">
                <li>
                  <strong>이메일</strong>:{" "}
                  <a href="mailto:momopick.global@gmail.com">momopick.global@gmail.com</a>
                </li>
                <li>
                  <strong>기타</strong>: 추가 연락처(전화·주소 등)는 확정 시 본 페이지에 반영합니다.
                </li>
              </ul>
              <p>
                개인정보 침해에 대한 상담·신고는 개인정보침해신고센터(
                <a href="https://privacy.kisa.or.kr" rel="noopener noreferrer">
                  privacy.kisa.or.kr
                </a>
                ) 등에도 가능합니다.
              </p>
            </section>

            <section aria-labelledby="p11">
              <h2 id="p11">11. 방침의 변경</h2>
              <p>
                법령·서비스 변경에 따라 본 방침을 수정할 수 있습니다. 중요한 변경은 시행일·개정 사유와
                함께 서비스 내 공지합니다.
              </p>
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
