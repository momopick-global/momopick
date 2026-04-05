import Link from "next/link";
import { HeroBannerCarousel } from "@/components/ko/HeroBannerCarousel";
import { KoBrandLogo } from "@/components/ko/KoBrandLogo";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { koHeroBannerSlides } from "@/content/home/koHeroBanners";
import { getKoHomeRailSorted, getKoLoveQuizzesSorted } from "@/lib/content/homeRail";

const year = new Date().getFullYear();

const homeRailKo = getKoHomeRailSorted("ko");
const loveSectionQuizzes = getKoLoveQuizzesSorted("ko");
/** 썸·연애 섹션 타일 개수 (우선순위 상위) */
const loveSectionTiles = loveSectionQuizzes.slice(0, 4);

export default function KoHomePage() {
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

      <nav className="cat-bar" aria-label="카테고리 빠른 이동">
        <Link className="chip chip--default" href="/ko/" aria-current="true">
          전체
        </Link>
        <Link className="chip chip--love" href="/ko/love/">
          연애
        </Link>
        <Link className="chip chip--personality" href="/ko/personality/">
          성격·심리
        </Link>
        <Link className="chip chip--social" href="/ko/social/">
          소셜
        </Link>
        <Link className="chip chip--style" href="/ko/style/">
          스타일
        </Link>
        <Link className="chip chip--fun" href="/ko/fun/">
          재미
        </Link>
        <Link className="chip chip--default" href="/ko/explore/">
          탐색
        </Link>
        <Link className="chip chip--default" href="/ko/tag/">
          태그
        </Link>
        <Link className="chip chip--default" href="/ko/notice/">
          공지
        </Link>
      </nav>

      <div className="wrap">
        <main>
          <section className="hero" aria-labelledby="hero-title">
            <span className="hero-kicker">프리미엄 감성 · 1~3분 스낵 테스트</span>
            <h1 id="hero-title">어라, 이거 내 얘긴데…?!</h1>
            <p className="lead">
              <strong>MBTI·연애·심리·관계·취향</strong>까지. 모모픽에서 가볍게 즐기고, 결과는
              친구에게 바로 공유해 보세요.
            </p>
            <HeroBannerCarousel slides={koHeroBannerSlides} />
          </section>

          <div className="login-hint">
            <div>
              <p>💡 로그인하면 맞춤 추천·히스토리를 쓸 수 있어요</p>
              <span className="desc">
                나중에 북마크와 이어하기 기능을 연결할 수 있게 자리만 잡아두었습니다.
              </span>
            </div>
            <div className="cta">
              <Link className="btn primary sm" href="/ko/app/login/">
                로그인 / 시작하기
              </Link>
            </div>
          </div>

          <section className="rail-wrap" aria-labelledby="rail-title">
            <div className="rail-head">
              <h2 id="rail-title">✨ 지금 뜨는 테스트</h2>
              <Link className="link-all" href="/ko/explore/">
                전체보기
              </Link>
            </div>
            <div className="rail" role="list">
              {homeRailKo.map((item, i) => (
                <Link
                  key={item.href}
                  className={`rail-card rail-card--${item.railTheme}`}
                  href={item.href}
                  role="listitem"
                >
                  <img
                    src={item.image || "/images/banners/rail-01.webp"}
                    alt=""
                    width={480}
                    height={320}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div className="cap">
                    <b>{item.title}</b>
                    <small>{item.subtitleLine}</small>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="section section--love" id="love" aria-labelledby="sec-love">
            <div className="sec-hd">
              <h2 id="sec-love">💌 썸·연애, 일단 들어와 봐요</h2>
              <Link className="link-all" href="/ko/love/">
                전체보기
              </Link>
            </div>
            <p className="sec-lead">
              연애 카테고리(콘텐츠 JSON의 love) 테스트 중 우선순위 상위 4개만 보여 드려요. 나머지는 상단{" "}
              <Link href="/ko/love/">전체보기</Link>에서 모아 볼 수 있어요.
            </p>
            <div className="tile-grid">
              {loveSectionTiles.map((item, i) => (
                <Link key={item.href} className="tile tile--love" href={item.href}>
                  <div className="thumb">
                    {i === 0 ? <span className="badge">HOT</span> : null}
                    <img
                      src={item.image || "/images/banners/tile-love-01.webp"}
                      alt=""
                      width={1536}
                      height={1024}
                      loading={i < 4 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                  <div className="body">
                    <b>{item.title}</b>
                    <small>{item.subtitleLine}</small>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="section section--personality" id="mind" aria-labelledby="sec-mind">
            <div className="sec-hd">
              <h2 id="sec-mind">🧠 성격·심리, 오늘의 나는 누구?</h2>
              <Link className="link-all" href="/ko/personality/">
                전체보기
              </Link>
            </div>
            <p className="sec-lead">
              MBTI·성향·감정 퀴즈. 진단이 아닌 ‘재미+자기이해’ 톤으로 구성하는 것을 권장합니다.
            </p>
            <div className="tile-grid">
              <Link className="tile tile--personality" href="/ko/personality/my-hidden-mbti/">
                <div className="thumb">
                  <span className="badge">1분</span>
                  <img
                    src="/images/banners/tile-mind-01.webp"
                    alt=""
                    width={1536}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>숨은 MBTI 찾기</b>
                  <small>겉모습과 속마음의 차이</small>
                </div>
              </Link>
              <Link className="tile tile--personality" href="/ko/personality/">
                <div className="thumb">
                  <img
                    src="/images/banners/tile-mind-02.webp"
                    alt=""
                    width={1536}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>심리·성격 허브</b>
                  <small>테스트 더 둘러보기</small>
                </div>
              </Link>
              <Link className="tile tile--social" href="/ko/social/">
                <div className="thumb">
                  <img
                    src="/images/banners/tile-mind-03.webp"
                    alt=""
                    width={1536}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>관계·대화 스타일</b>
                  <small>소셜 카테고리로 이동</small>
                </div>
              </Link>
            </div>
          </section>

          <section className="section section--fun" id="snack" aria-labelledby="sec-snack">
            <div className="sec-hd">
              <h2 id="sec-snack">🍿 심심할 때 5분 스낵 퀴즈</h2>
              <Link className="link-all" href="/ko/fun/">
                전체보기
              </Link>
            </div>
            <p className="sec-lead">
              밈·상황·랜덤. 청월당의 ‘스낵 사주’처럼 가볍게 즐기는 코너입니다.
            </p>
            <div className="tile-grid">
              <Link className="tile tile--fun" href="/ko/fun/">
                <div className="thumb">
                  <span className="badge">SNACK</span>
                  <img
                    src="/images/banners/tile-snack-01.webp"
                    alt=""
                    width={1536}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>재미 퀴즈 모음</b>
                  <small>웃고 나가는 테스트</small>
                </div>
              </Link>
              <Link className="tile tile--style" href="/ko/style/">
                <div className="thumb">
                  <img
                    src="/images/banners/tile-snack-02.webp"
                    alt=""
                    width={1536}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>스타일·취향</b>
                  <small>분위기·패션 성향</small>
                </div>
              </Link>
              <Link className="tile tile--fun" href="/ko/explore/">
                <div className="thumb">
                  <img
                    src="/images/banners/tile-snack-03.webp"
                    alt=""
                    width={1536}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>전체 탐색</b>
                  <small>최신·인기 한 번에</small>
                </div>
              </Link>
            </div>
          </section>

          <section className="section duo" aria-label="플랫폼 안내">
            <article className="info-card">
              <h3>✅ 검색·구조는 이렇게 가져가요</h3>
              <p>
                카테고리 허브, 태그, 슬러그, 결과 페이지까지 한 흐름으로 묶으면 구글이 주제별로
                이해하기 쉽습니다.
              </p>
              <div className="pillrow">
                <span className="pill">카테고리 SEO</span>
                <span className="pill">내부링크</span>
                <span className="pill">FAQ 스키마</span>
              </div>
            </article>
            <article className="info-card">
              <h3>✅ 공유는 카드 하나로 끝</h3>
              <p>
                OG 이미지·한 줄 요약만 잡아도 카톡·SNS에서 클릭률이 달라집니다. 커버 목업은 추후
                브랜드 일러로 교체하세요.
              </p>
              <div className="pillrow">
                <span className="pill">OG 이미지</span>
                <span className="pill">짧은 완주 시간</span>
                <span className="pill">결과 문구 A/B</span>
              </div>
            </article>
          </section>

          <section className="section faq" id="faq">
            <div className="sec-hd">
              <h2>자주 묻는 질문</h2>
            </div>
            <details>
              <summary>💔 왜 내 연애 테스트 결과가 이렇게 나왔나요?</summary>
              <p>솔직히 말하면… 당신의 선택 패턴이 그대로 반영된 결과입니다.</p>
              <p>무의식적으로 반복하는 연애 습관이 드러난 걸 수도 있어요.</p>
            </details>
            <details>
              <summary>😳 이거… 진짜 맞는 거 아니에요?</summary>
              <p>많은 사람들이 “소름 돋는다”라고 말합니다.</p>
              <p>
                완벽한 정답은 아니지만, 당신의 성향을 꽤 정확하게 짚어낼 수도 있어요.
              </p>
            </details>
            <details>
              <summary>🤔 친구랑 똑같이 했는데 결과가 왜 달라요?</summary>
              <p>같은 질문이라도 선택하는 순간의 감정, 생각이 다르기 때문이에요.</p>
              <p>그래서 결과도 달라집니다. 그게 포인트죠.</p>
            </details>
            <details>
              <summary>🧠 이거 MBTI 기반인가요?</summary>
              <p>일부 테스트는 MBTI 성향을 참고하지만,</p>
              <p>모모픽만의 해석 방식으로 재구성되어 있습니다.</p>
            </details>
            <details>
              <summary>😅 결과가 너무 팩폭인데요… 틀린 거죠?</summary>
              <p>틀렸다기보다는… 듣기 싫은 부분일 가능성이 큽니다.</p>
              <p>대부분의 사람은 여기서 살짝 찔립니다.</p>
            </details>
            <details>
              <summary>💡 결과를 바꿀 수 있나요?</summary>
              <p>물론 가능합니다.</p>
              <p>다른 선택을 하면 전혀 다른 결과가 나올 수 있어요.</p>
              <p>(근데… 그 선택을 진짜 할 수 있을까요?)</p>
            </details>
            <details>
              <summary>📊 테스트 결과는 믿어도 되나요?</summary>
              <p>100% 정답은 아니지만,</p>
              <p>당신을 이해하는 하나의 힌트가 될 수 있습니다.</p>
            </details>
            <details>
              <summary>🔒 로그인하면 뭐가 달라지나요?</summary>
              <ul>
                <li>내가 했던 테스트 기록 저장</li>
                <li>다시 결과 확인 가능</li>
                <li>개인 맞춤 추천 제공</li>
              </ul>
              <p>👉 그냥 안 하면 손해 보는 구조입니다.</p>
            </details>
            <details>
              <summary>📱 왜 자꾸 사람들이 공유하나요?</summary>
              <p>재밌기도 하지만…</p>
              <p>“너 이거 해봐” 하고 보내고 싶어지는 결과 구조 때문입니다.</p>
            </details>
            <details>
              <summary>📢 광고 왜 이렇게 많아요?</summary>
              <p>무료로 서비스 운영하려면 돈은 어디선가 나와야 합니다.</p>
              <p>광고는 생존 장치입니다. 참고 좀 해주세요.</p>
            </details>
            <details>
              <summary>🚨 테스트가 안 돼요 (버그)</summary>
              <p>기기, 브라우저 문제일 가능성이 큽니다.</p>
              <p>그래도 안 되면 문의 주세요.</p>
              <p>우리가 고치긴 합니다. 가끔은 빠르게.</p>
            </details>
            <details>
              <summary>😶 이거 중독성 있는 거 정상인가요?</summary>
              <p>네, 정상입니다.</p>
              <p>그래서 계속 하게 되는 겁니다.</p>
            </details>
          </section>

          <section className="section cta-bottom" id="cta-bottom">
            <h2>🔎 나한테 맞는 테스트 찾기</h2>
            <p className="sec-lead">
              지금은 목업 레이아웃입니다. 실제 추천 로직·에디터 큐 연동 시 이 영역이 메인 전환
              포인트가 됩니다.
            </p>
            <div className="cta">
              <Link className="btn primary" href="/ko/explore/">
                테스트 탐색하기
              </Link>
              <Link className="btn" href="/ko/tag/">
                태그로 둘러보기
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
