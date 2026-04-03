import Link from "next/link";

const year = new Date().getFullYear();

export default function KoHomePage() {
  return (
    <>
      <header className="site-hd">
        <div className="inner">
          <Link className="brand" href="/ko/" aria-label="모모픽 홈">
            <span className="logo" aria-hidden="true" />
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
        <Link className="chip" href="/ko/" aria-current="true">
          전체
        </Link>
        <Link className="chip" href="/ko/love/">
          연애
        </Link>
        <Link className="chip" href="/ko/personality/">
          성격·심리
        </Link>
        <Link className="chip" href="/ko/social/">
          소셜
        </Link>
        <Link className="chip" href="/ko/style/">
          스타일
        </Link>
        <Link className="chip" href="/ko/fun/">
          재미
        </Link>
        <Link className="chip" href="/ko/explore/">
          탐색
        </Link>
        <Link className="chip" href="/ko/tag/">
          태그
        </Link>
        <Link className="chip" href="/ko/notice/">
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
            <div className="hero-banner-wrap">
              <img
                className="hero-banner"
                src="/images/banners/ko/momopick-test-banner.png"
                alt=""
                width={1120}
                height={360}
                loading="eager"
                decoding="async"
              />
            </div>
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
              <Link className="rail-card" href="/ko/love/your-love-type/" role="listitem">
                <img
                  src="/images/banners/ko/rail-01.png"
                  alt=""
                  width={168}
                  height={224}
                  loading="eager"
                  decoding="async"
                />
                <div className="cap">
                  <b>내 연애 유형</b>
                  <small>썸부터 연인까지, 나의 패턴은?</small>
                </div>
              </Link>
              <Link className="rail-card" href="/ko/personality/my-hidden-mbti/" role="listitem">
                <img
                  src="/images/banners/ko/rail-02.png"
                  alt=""
                  width={168}
                  height={224}
                  loading="lazy"
                  decoding="async"
                />
                <div className="cap">
                  <b>숨은 MBTI</b>
                  <small>겉과 속이 다른 이유</small>
                </div>
              </Link>
              <Link className="rail-card" href="/ko/social/friendship-chemistry/" role="listitem">
                <img
                  src="/images/banners/ko/rail-03.png"
                  alt=""
                  width={168}
                  height={224}
                  loading="lazy"
                  decoding="async"
                />
                <div className="cap">
                  <b>친구 케미</b>
                  <small>우정 궁합 몇 점?</small>
                </div>
              </Link>
              <Link className="rail-card" href="/ko/love/" role="listitem">
                <img
                  src="/images/banners/ko/rail-04.png"
                  alt=""
                  width={168}
                  height={224}
                  loading="lazy"
                  decoding="async"
                />
                <div className="cap">
                  <b>연애 허브</b>
                  <small>썸·궁합·유형 한곳에</small>
                </div>
              </Link>
              <Link className="rail-card" href="/ko/personality/" role="listitem">
                <img
                  src="/images/banners/ko/rail-05.png"
                  alt=""
                  width={168}
                  height={224}
                  loading="lazy"
                  decoding="async"
                />
                <div className="cap">
                  <b>성격·심리</b>
                  <small>MBTI·감정·자아 탐색</small>
                </div>
              </Link>
              <Link className="rail-card" href="/ko/fun/" role="listitem">
                <img
                  src="/images/banners/ko/rail-06.png"
                  alt=""
                  width={168}
                  height={224}
                  loading="lazy"
                  decoding="async"
                />
                <div className="cap">
                  <b>재미 스낵</b>
                  <small>5분 컷 밈 퀴즈</small>
                </div>
              </Link>
            </div>
          </section>

          <section className="section" id="love" aria-labelledby="sec-love">
            <div className="sec-hd">
              <h2 id="sec-love">💌 썸·연애, 일단 들어와 봐요</h2>
              <Link className="link-all" href="/ko/love/">
                전체보기
              </Link>
            </div>
            <p className="sec-lead">
              연애 심리·유형·가벼운 궁합까지. 카드 썸네일은 목업 이미지이며, 추후 실제 커버로
              교체하면 됩니다.
            </p>
            <div className="tile-grid">
              <Link className="tile" href="/ko/love/your-love-type/">
                <div className="thumb">
                  <span className="badge">HOT</span>
                  <img
                    src="/images/banners/ko/tile-love-01.png"
                    alt=""
                    width={320}
                    height={220}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>내 연애 유형 테스트</b>
                  <small>나의 연애 패턴을 1분 분석</small>
                </div>
              </Link>
              <Link className="tile" href="/ko/love/">
                <div className="thumb">
                  <span className="badge">허브</span>
                  <img
                    src="/images/banners/ko/tile-love-02.png"
                    alt=""
                    width={320}
                    height={220}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>연애 테스트 모아보기</b>
                  <small>썸·연인·소개팅 스토리별</small>
                </div>
              </Link>
              <Link className="tile" href="/ko/explore/">
                <div className="thumb">
                  <img
                    src="/images/banners/ko/tile-love-03.png"
                    alt=""
                    width={320}
                    height={220}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>지금 인기 급상승</b>
                  <small>실시간 큐레이션 자리</small>
                </div>
              </Link>
              <Link className="tile" href="/ko/tag/">
                <div className="thumb">
                  <img
                    src="/images/banners/ko/tile-love-04.png"
                    alt=""
                    width={320}
                    height={220}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>태그로 찾기</b>
                  <small>#썸 #궁합 #mbti</small>
                </div>
              </Link>
            </div>
          </section>

          <section className="section" id="mind" aria-labelledby="sec-mind">
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
              <Link className="tile" href="/ko/personality/my-hidden-mbti/">
                <div className="thumb">
                  <span className="badge">1분</span>
                  <img
                    src="/images/banners/ko/tile-mind-01.png"
                    alt=""
                    width={320}
                    height={220}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>숨은 MBTI 찾기</b>
                  <small>겉모습과 속마음의 차이</small>
                </div>
              </Link>
              <Link className="tile" href="/ko/personality/">
                <div className="thumb">
                  <img
                    src="/images/banners/ko/tile-mind-02.png"
                    alt=""
                    width={320}
                    height={220}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>심리·성격 허브</b>
                  <small>테스트 더 둘러보기</small>
                </div>
              </Link>
              <Link className="tile" href="/ko/social/">
                <div className="thumb">
                  <img
                    src="/images/banners/ko/tile-mind-03.png"
                    alt=""
                    width={320}
                    height={220}
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

          <section className="section" id="snack" aria-labelledby="sec-snack">
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
              <Link className="tile" href="/ko/fun/">
                <div className="thumb">
                  <span className="badge">SNACK</span>
                  <img
                    src="/images/banners/ko/tile-snack-01.png"
                    alt=""
                    width={320}
                    height={220}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>재미 퀴즈 모음</b>
                  <small>웃고 나가는 테스트</small>
                </div>
              </Link>
              <Link className="tile" href="/ko/style/">
                <div className="thumb">
                  <img
                    src="/images/banners/ko/tile-snack-02.png"
                    alt=""
                    width={320}
                    height={220}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="body">
                  <b>스타일·취향</b>
                  <small>분위기·패션 성향</small>
                </div>
              </Link>
              <Link className="tile" href="/ko/explore/">
                <div className="thumb">
                  <img
                    src="/images/banners/ko/tile-snack-03.png"
                    alt=""
                    width={320}
                    height={220}
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
              <summary>모모픽은 어떤 테스트가 많나요?</summary>
              <p>
                연애/MBTI/심리/성격/관계/취향/재미 퀴즈까지, 가볍게 즐길 수 있는 짧은 테스트
                중심으로 구성됩니다.
              </p>
            </details>
            <details>
              <summary>검색에서 잘 나오게 하려면?</summary>
              <p>
                카테고리·태그 허브, 슬러그 규칙, 메타·OG, 관련 테스트 내부링크, FAQ 구조화
                데이터가 핵심입니다.
              </p>
            </details>
            <details>
              <summary>로그인 페이지는 검색에 노출되나요?</summary>
              <p>
                보통 <code>/ko/app/*</code> 류는 noindex로 두는 편이 깔끔합니다. 콘텐츠 페이지만
                색인 대상으로 관리하세요.
              </p>
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
          <div style={{ marginTop: 8 }}>
            <Link href="/ko/notice/">공지사항</Link> ·{" "}
            <Link href="/ko/policy/privacy/">개인정보처리방침</Link> ·{" "}
            <Link href="/ko/policy/terms/">이용약관</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
