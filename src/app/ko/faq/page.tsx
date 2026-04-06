import type { Metadata } from "next";
import Link from "next/link";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { KoFooterNav } from "@/components/ko/KoFooterNav";

export const metadata: Metadata = {
  title: "자주 묻는 질문(FAQ) | 모모픽",
  description:
    "모모픽 테스트·서비스·계정·오류에 관해 자주 묻는 질문을 모아두었습니다. 궁금한 점을 빠르게 확인해 보세요.",
  alternates: {
    canonical: "https://momopick.com/ko/faq/",
  },
  openGraph: {
    title: "자주 묻는 질문(FAQ) | 모모픽",
    description: "모모픽 서비스 FAQ",
    url: "https://momopick.com/ko/faq/",
    locale: "ko_KR",
    type: "website",
  },
};

const year = new Date().getFullYear();

type FaqItem = { q: string; a: string | string[] };
type FaqSection = { id: string; title: string; items: FaqItem[] };

const faqSections: FaqSection[] = [
  {
    id: "test",
    title: "🧩 테스트 결과",
    items: [
      {
        q: "💔 왜 내 연애 테스트 결과가 이렇게 나왔나요?",
        a: [
          "솔직히 말하면… 당신의 선택 패턴이 그대로 반영된 결과입니다.",
          "무의식적으로 반복하는 연애 습관이 드러난 걸 수도 있어요.",
        ],
      },
      {
        q: "😳 이거… 진짜 맞는 거 아니에요?",
        a: [
          '많은 사람들이 "소름 돋는다"라고 말합니다.',
          "완벽한 정답은 아니지만, 당신의 성향을 꽤 정확하게 짚어낼 수도 있어요.",
        ],
      },
      {
        q: "🤔 친구랑 똑같이 했는데 결과가 왜 달라요?",
        a: [
          "같은 질문이라도 선택하는 순간의 감정, 생각이 다르기 때문이에요.",
          "그래서 결과도 달라집니다. 그게 포인트죠.",
        ],
      },
      {
        q: "🧠 이거 MBTI 기반인가요?",
        a: [
          "일부 테스트는 MBTI 성향을 참고하지만,",
          "모모픽만의 해석 방식으로 재구성되어 있습니다.",
        ],
      },
      {
        q: "😅 결과가 너무 팩폭인데요… 틀린 거죠?",
        a: [
          "틀렸다기보다는… 듣기 싫은 부분일 가능성이 큽니다.",
          "대부분의 사람은 여기서 살짝 찔립니다.",
        ],
      },
      {
        q: "💡 결과를 바꿀 수 있나요?",
        a: [
          "물론 가능합니다.",
          "다른 선택을 하면 전혀 다른 결과가 나올 수 있어요.",
          "(근데… 그 선택을 진짜 할 수 있을까요?)",
        ],
      },
      {
        q: "📊 테스트 결과는 믿어도 되나요?",
        a: [
          "100% 정답은 아니지만,",
          "당신을 이해하는 하나의 힌트가 될 수 있습니다.",
        ],
      },
      {
        q: "😶 이거 중독성 있는 거 정상인가요?",
        a: ["네, 정상입니다.", "그래서 계속 하게 되는 겁니다."],
      },
      {
        q: "🔁 같은 테스트를 여러 번 해도 되나요?",
        a: [
          "얼마든지 괜찮습니다.",
          "감정 상태나 상황에 따라 결과가 달라지는 것도 흥미로운 포인트예요.",
        ],
      },
    ],
  },
  {
    id: "share",
    title: "📤 공유·소셜",
    items: [
      {
        q: "📱 왜 자꾸 사람들이 공유하나요?",
        a: [
          "재밌기도 하지만…",
          '"너 이거 해봐" 하고 보내고 싶어지는 결과 구조 때문입니다.',
        ],
      },
      {
        q: "🔗 결과 링크를 공유하면 상대방도 내 결과를 볼 수 있나요?",
        a: [
          "결과 페이지의 링크를 공유하면 같은 결과 화면이 열립니다.",
          "상대방이 같은 테스트를 직접 할 수도 있어요.",
        ],
      },
      {
        q: "🖼️ 카톡에 공유하면 미리보기가 안 나와요",
        a: [
          "카카오톡은 OG 이미지 캐시가 늦게 반영되는 경우가 있습니다.",
          "URL 앞뒤에 공백을 붙여 재전송하거나 잠시 후 다시 시도해 보세요.",
        ],
      },
    ],
  },
  {
    id: "account",
    title: "🔒 계정·보관함",
    items: [
      {
        q: "🔒 로그인하면 뭐가 달라지나요?",
        a: "로그인하면 ① 내가 했던 테스트 기록 저장, ② 결과 다시 확인, ③ 개인 맞춤 추천을 받을 수 있습니다. 안 하면 손해예요.",
      },
      {
        q: "🗑️ 보관함에서 결과를 삭제할 수 있나요?",
        a: [
          "로그인 후 보관함에서 개별 결과를 삭제하거나 전체를 초기화할 수 있습니다.",
          "(기능 연동 예정)",
        ],
      },
      {
        q: "👤 회원 탈퇴는 어떻게 하나요?",
        a: [
          "계정 설정 → '회원 탈퇴' 메뉴에서 신청할 수 있습니다.",
          "탈퇴 시 저장된 결과·기록은 모두 삭제됩니다.",
        ],
      },
      {
        q: "📧 비밀번호를 잊어버렸어요",
        a: [
          "소셜 로그인(구글·카카오 등)을 사용하는 경우 해당 서비스에서 비밀번호를 초기화하세요.",
          "이메일 로그인은 로그인 화면의 '비밀번호 찾기'를 이용하면 됩니다.",
        ],
      },
    ],
  },
  {
    id: "service",
    title: "⚙️ 서비스·운영",
    items: [
      {
        q: "📢 광고 왜 이렇게 많아요?",
        a: [
          "무료로 서비스를 운영하려면 돈은 어디선가 나와야 합니다.",
          "광고는 생존 장치입니다. 참아 주셔서 감사해요.",
        ],
      },
      {
        q: "💬 새 테스트 요청은 어디서 할 수 있나요?",
        a: [
          "공지사항 채널이나 고객 문의로 원하는 주제를 보내주시면 검토합니다.",
          "인기가 많을수록 빠르게 만들어집니다.",
        ],
      },
      {
        q: "🌐 다른 언어 버전도 있나요?",
        a: [
          "영어(EN)·일본어(JA)·스페인어(ES) 등 여러 언어를 지원 중이거나 준비하고 있습니다.",
          "상단 언어 선택 메뉴에서 확인해 보세요.",
        ],
      },
    ],
  },
  {
    id: "privacy",
    title: "🛡️ 개인정보·보안",
    items: [
      {
        q: "🔐 내 테스트 응답 데이터는 어떻게 사용되나요?",
        a: [
          "서비스 품질 개선·통계 목적으로만 활용되며, 개인을 특정하는 방식으로는 사용하지 않습니다.",
          "자세한 내용은 개인정보처리방침을 확인해 주세요.",
        ],
      },
      {
        q: "🍪 쿠키를 사용하나요?",
        a: [
          "서비스 운영·분석·광고 최적화를 위해 쿠키를 사용합니다.",
          "브라우저 설정에서 쿠키를 제한할 수 있지만, 일부 기능이 제한될 수 있습니다.",
        ],
      },
    ],
  },
  {
    id: "error",
    title: "🚨 오류·기술",
    items: [
      {
        q: "🚨 테스트가 안 돼요 (버그)",
        a: [
          "기기·브라우저 문제일 가능성이 큽니다. 새로고침 후 다시 시도해 보세요.",
          "그래도 안 되면 고객 문의로 알려주세요. 최대한 빠르게 확인합니다.",
        ],
      },
      {
        q: "📵 인터넷 없이 사용할 수 있나요?",
        a: [
          "현재는 오프라인 모드를 지원하지 않습니다.",
          "안정적인 인터넷 연결 환경에서 이용해 주세요.",
        ],
      },
      {
        q: "🔄 테스트 중간에 새로고침하면 어떻게 되나요?",
        a: [
          "로그인 상태라면 진행 상황이 임시 저장될 수 있습니다.",
          "비로그인 상태에서는 처음부터 다시 시작해야 할 수 있습니다.",
        ],
      },
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqSections.flatMap((s) =>
    s.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: Array.isArray(item.a) ? item.a.join(" ") : item.a,
      },
    })),
  ),
};

export default function KoFaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <KoSiteHeader />

      <div className="wrap">
        <main className="policy-page faq-page">
          <nav className="quiz-breadcrumb" aria-label="경로">
            <Link href="/ko/">홈</Link>
            <span aria-hidden="true"> / </span>
            <span>자주 묻는 질문</span>
          </nav>

          <header className="policy-page-hd">
            <h1>자주 묻는 질문</h1>
            <p className="policy-intro">
              모모픽 테스트·서비스·계정·오류에 관해 가장 많이 받는 질문을 모았습니다.
              궁금한 점이 여기 없다면{" "}
              <Link href="/ko/notice/">공지사항</Link>을 확인하거나 고객 문의를 이용해 주세요.
            </p>

            {/* 섹션 퀵 네비 */}
            <div className="faq-quick-nav">
              {faqSections.map((s) => (
                <a key={s.id} className="faq-quick-chip" href={`#faq-${s.id}`}>
                  {s.title}
                </a>
              ))}
            </div>
          </header>

          {faqSections.map((section) => (
            <section key={section.id} id={`faq-${section.id}`} className="faq-section">
              <h2 className="faq-section-title">{section.title}</h2>
              <div className="faq">
                {section.items.map((item, i) => (
                  <details key={i}>
                    <summary>{item.q}</summary>
                    {Array.isArray(item.a)
                      ? item.a.map((line, j) => <p key={j}>{line}</p>)
                      : <p>{item.a}</p>}
                  </details>
                ))}
              </div>
            </section>
          ))}

          <div className="cta" style={{ marginTop: 32, justifyContent: "center" }}>
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
