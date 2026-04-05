/** 한국어 홈 히어로 배너 (롤링) */
export type KoHeroBannerSlide = {
  id: string;
  image: string;
  alt: string;
  kicker: string;
  /** 본문 (줄바꿈은 \\n) */
  body: string;
  moreHref: string;
};

export const koHeroBannerSlides: KoHeroBannerSlide[] = [
  {
    id: "beta-open",
    image: "/images/banners/hero/notice_260406.webp",
    alt: "모모픽 베타 오픈 안내 배너",
    kicker: "[모모픽 베타 오픈 안내]",
    body:
      "MBTI·연애·심리 등 스낵 테스트를 한곳에서 즐길 수 있는 모모픽이 베타로 문을 열었습니다. 이용 중 불편이나 버그는 공지·문의 채널로 알려 주세요.",
    moreHref: "/ko/notice/",
  },
  {
    id: "dev-in-progress",
    image: "/images/banners/hero/notice_260406_2.webp",
    alt: "홈페이지 개발 진행 안내 배너",
    kicker: "[홈페이지 개발 진행 안내]",
    body: `모모픽은 현재 더 나은 서비스 제공을 위해 개발이 진행 중입니다.
일부 기능이 제한될 수 있으며, 빠르게 개선해 나가겠습니다.`,
    moreHref: "/ko/notice/",
  },
];
