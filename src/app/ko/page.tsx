import Link from "next/link";
import { QuizImageWithFallback } from "@/components/quiz/QuizImageWithFallback";
import { KoSiteHeader } from "@/components/ko/KoSiteHeader";
import { HeroBannerCarousel } from "@/components/ko/HeroBannerCarousel";
import { KoCatBar } from "@/components/ko/KoCatBar";
import { KoFooterNav } from "@/components/ko/KoFooterNav";
import { koHeroBannerSlides } from "@/content/home/koHeroBanners";
import { getKoLoveQuizzesSorted } from "@/lib/content/homeRail";
import { koSamplePosts } from "@/content/blog/koSamplePosts";
import { BlogCarousel } from "@/components/ko/BlogCarousel";
const year = new Date().getFullYear();

const recentBlogPosts = koSamplePosts;
const loveSectionQuizzes = getKoLoveQuizzesSorted("ko");
/** 임시: 지금 뜨는 테스트 = love 우선순위 상위 4 (썸·연애 타일과 동일 소스) */
const homeRailKo = loveSectionQuizzes.slice(0, 4);
/** 썸·연애 섹션 타일 개수 (우선순위 상위) */
const loveSectionTiles = loveSectionQuizzes.slice(0, 4);

export default function KoHomePage() {
  return (
    <>
      <KoSiteHeader />

      <KoCatBar />

      <div className="wrap">
        <main>
          <section className="hero" aria-label="추천 배너">
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
                  <QuizImageWithFallback
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
                    <QuizImageWithFallback
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
                  <QuizImageWithFallback
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
                  <QuizImageWithFallback
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
                  <QuizImageWithFallback
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
              <Link className="tile tile--personality" href="/ko/faq/">
                <div className="thumb">
                  <QuizImageWithFallback
                    src="/images/banners/tile-mind-04.webp"
                    alt=""
                    width={1536}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>자주 묻는 질문</b>
                  <small>이용·결과 안내</small>
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
                  <QuizImageWithFallback
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
                  <QuizImageWithFallback
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
                  <QuizImageWithFallback
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
              <Link className="tile tile--fun" href="/ko/blog/">
                <div className="thumb">
                  <span className="badge">NOTE</span>
                  <QuizImageWithFallback
                    src="/images/banners/tile-snack-04.webp"
                    alt=""
                    width={1536}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>블로그·소식</b>
                  <small>팁·업데이트 짧게 읽기</small>
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

          <section className="section" id="blog" aria-labelledby="sec-blog">
            <div className="sec-hd">
              <h2 id="sec-blog">📝 블로그 · 소식</h2>
              <Link className="link-all" href="/ko/blog/">
                전체보기
              </Link>
            </div>
            <BlogCarousel posts={recentBlogPosts} />
          </section>

          <section className="section faq" id="faq">
            <div className="sec-hd">
              <h2>자주 묻는 질문</h2>
              <Link className="link-all" href="/ko/faq/">
                전체보기
              </Link>
            </div>
            <details>
              <summary>💔 왜 내 연애 테스트 결과가 이렇게 나왔나요?</summary>
              <p>솔직히 말하면… 당신의 선택 패턴이 그대로 반영된 결과입니다.</p>
              <p>무의식적으로 반복하는 연애 습관이 드러난 걸 수도 있어요.</p>
            </details>
            <details>
              <summary>😳 이거… 진짜 맞는 거 아니에요?</summary>
              <p>많은 사람들이 &ldquo;소름 돋는다&rdquo;라고 말합니다.</p>
              <p>완벽한 정답은 아니지만, 당신의 성향을 꽤 정확하게 짚어낼 수도 있어요.</p>
            </details>
            <details>
              <summary>🤔 친구랑 똑같이 했는데 결과가 왜 달라요?</summary>
              <p>같은 질문이라도 선택하는 순간의 감정, 생각이 다르기 때문이에요.</p>
              <p>그래서 결과도 달라집니다. 그게 포인트죠.</p>
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
              <summary>🚨 테스트가 안 돼요 (버그)</summary>
              <p>기기, 브라우저 문제일 가능성이 큽니다.</p>
              <p>그래도 안 되면 문의 주세요. 우리가 고치긴 합니다.</p>
            </details>
            <div className="faq-more-wrap">
              <Link className="btn faq-more-btn" href="/ko/faq/">
                자세히 보기
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8h10M9 4l4 4-4 4"
                  />
                </svg>
              </Link>
            </div>
          </section>

          <section className="section cta-bottom" id="cta-bottom">
            <div className="cta-bottom-card">
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
