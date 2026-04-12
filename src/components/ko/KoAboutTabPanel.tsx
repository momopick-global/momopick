"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TABS = [
  { id: "intro", label: "모모픽 소개" },
  { id: "character", label: "모모 캐릭터" },
  { id: "howto", label: "이용 방법" },
  { id: "explore", label: "테스트 둘러보기" },
  { id: "together", label: "함께하기" },
] as const;

type AboutTabId = (typeof TABS)[number]["id"];

export function KoAboutTabPanel() {
  const [active, setActive] = useState<AboutTabId>("intro");

  return (
    <>
      <div className="blog-tabs-wrap">
        <div className="blog-tabs" role="tablist" aria-label="모모픽 소개 카테고리">
          {TABS.map((tab) => {
            const selected = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`about-tab-${tab.id}`}
                aria-controls={`about-tabpanel-${tab.id}`}
                tabIndex={0}
                className={`blog-tab${selected ? " blog-tab--active" : ""}`}
                onClick={() => setActive(tab.id)}
              >
                <span className="blog-tab__label">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {active === "intro" ? (
        <section className="about-page-hero" aria-label="모모픽 소개 비주얼">
          <figure className="about-page-hero__figure">
            <Image
              src="/images/common/momopick-about-intro.webp"
              alt="모모픽 서비스를 소개하는 일러스트"
              width={1024}
              height={1024}
              sizes="(max-width: 480px) 88vw, 360px"
              className="about-page-hero__img"
              priority
            />
          </figure>
        </section>
      ) : null}

      {active === "howto" ? (
        <section className="about-page-hero" aria-label="모모픽 이용 방법 비주얼">
          <figure className="about-page-hero__figure">
            <Image
              src="/images/common/momopick-about-hero.webp"
              alt="모모픽 이용 방법을 안내하는 일러스트"
              width={1024}
              height={1024}
              sizes="(max-width: 480px) 88vw, 360px"
              className="about-page-hero__img"
            />
          </figure>
        </section>
      ) : null}

      <div
        role="tabpanel"
        id={`about-tabpanel-${active}`}
        aria-labelledby={`about-tab-${active}`}
        className="about-tabpanel"
      >
        {active === "intro" ? (
          <div className="about-tabpanel__inner policy-prose">
            <section aria-labelledby="about-intro-lead">
              <p id="about-intro-lead" className="policy-intro about-tabpanel__intro">
                1~3분이면 끝나는 스낵 테스트로 성향·연애·심리·취향을 가볍게 돌아보고, 결과는 카톡·SNS로 바로
                공유할 수 있어요. 진단이 아니라 &quot;재미 + 자기이해&quot; 톤을 지향합니다.
              </p>
            </section>
            <section aria-labelledby="about-1">
              <h2 id="about-1">왜 모모픽인가요</h2>
              <p>
                긴 설문 대신 짧은 선택으로 끝나도록 구성했습니다. 바쁜 일상에서도 부담 없이 들어올 수 있게,
                카테고리·태그·슬러그로 주제도 찾기 쉽게 정리해 두었어요.
              </p>
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
          </div>
        ) : null}

        {active === "howto" ? (
          <div className="about-tabpanel__inner policy-prose">
            <section aria-labelledby="about-howto-h">
              <h2 id="about-howto-h">이렇게 이용해요</h2>
              <ol className="about-howto-steps">
                <li>
                  <strong>테스트 고르기</strong> — 홈, 탐색, 카테고리(연애·성격 등)에서 마음에 드는 테스트를
                  골라요.
                </li>
                <li>
                  <strong>문항 선택</strong> — 짧은 질문에 맞는 선택지를 눌러요. 중간에 나가도 처음부터 다시
                  시작할 수 있어요.
                </li>
                <li>
                  <strong>결과 확인·공유</strong> — 결과 화면에서 카카오톡, 링크 복사 등으로 친구와 나눌 수
                  있어요.
                </li>
                <li>
                  <strong>앞으로</strong> — 로그인(준비 중)이 열리면 저장·히스토리·맞춤 추천을 이어갈 예정이에요.
                </li>
              </ol>
            </section>
          </div>
        ) : null}

        {active === "explore" ? (
          <div className="about-tabpanel__inner about-tabpanel__inner--explore policy-prose">
            <section aria-labelledby="about-2">
              <h2 id="about-2">무엇을 할 수 있나요</h2>
              <ul>
                <li>연애·썸·관계, 성격·심리, 소셜·스타일·재미 등 주제별 테스트 탐색</li>
                <li>결과 화면 공유로 친구와 밈·대화 소재 만들기</li>
                <li>로그인(준비 중)으로 맞춤 추천·히스토리 등 확장 예정</li>
              </ul>
            </section>
            <div className="about-tabpanel__cta-row">
              <Link className="btn primary" href="/ko/explore/">
                전체 테스트 탐색
              </Link>
              <Link className="btn" href="/ko/love/">
                썸·연애 허브
              </Link>
              <Link className="btn" href="/ko/">
                한국어 홈
              </Link>
            </div>
          </div>
        ) : null}

        {active === "character" ? (
          <section className="about-momo about-momo--tab" aria-labelledby="about-momo-heading-tab">
            <figure className="about-momo__figure">
              <Image
                src="/images/common/23543453.webp"
                alt="모모픽 안내자 모모"
                width={1024}
                height={1024}
                sizes="(max-width: 480px) 72vw, 280px"
                className="about-momo__img"
              />
            </figure>
            <div className="about-momo__body">
              <h2 id="about-momo-heading-tab">모모는</h2>
              <p>모모픽에서 당신에게 질문을 던지는 작은 안내자입니다.</p>
              <div className="about-momo__hint">
                <p>
                  👉 모모는 &quot;정답&quot;을 알려주지 않습니다.
                  <br />
                  대신, 지금의 당신을 비추는 힌트를 건넵니다.
                </p>
              </div>
              <figure className="about-momo__figure about-momo__figure--forward">
                <Image
                  src="/images/common/momo-character-forward.webp"
                  alt="앞으로 모모픽과 함께할 모모"
                  width={1024}
                  height={1024}
                  sizes="(max-width: 480px) 72vw, 280px"
                  className="about-momo__img"
                />
              </figure>
              <h3 className="about-momo__subhd">앞으로 모모는</h3>
              <p className="about-momo__future">
                테스트, 결과, 타로, 추천까지
                <br />
                모모픽의 모든 경험에서 함께합니다.
              </p>
            </div>
          </section>
        ) : null}

        {active === "together" ? (
          <div className="about-tabpanel__inner policy-prose">
            <section aria-labelledby="about-together-h">
              <h2 id="about-together-h">함께해 주세요</h2>
              <p>
                제휴·협업·콘텐츠 문의는 파트너십 페이지를, 서비스 의견은 피드백으로 남겨 주세요. 소식은
                카카오 채널·인스타그램에서도 만나요.
              </p>
            </section>
            <ul className="about-together-links">
              <li>
                <Link href="/ko/partnership/">제휴·협업 (파트너십)</Link>
              </li>
              <li>
                <Link href="/ko/feedback/">의견 보내기</Link>
              </li>
              <li>
                <Link href="/ko/blog/">블로그</Link>
              </li>
              <li>
                <a href="https://pf.kakao.com/_GlGxlX" target="_blank" rel="noopener noreferrer">
                  카카오 채널 (새 창)
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/momopick.cc?igsh=MTVzbmhueWVpaWNxMg%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  인스타그램 (새 창)
                </a>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}
