"use client";

import Script from "next/script";

/** 카카오 애드핏 광고 단위 (300x250) — 홈 중간 삽입용 */
export function KakaoAdUnit() {
  return (
    <div
      className="kakao-ad-wrap"
      style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}
      aria-label="광고"
    >
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit="DAN-1sLQbtiOEr1WXJFC"
        data-ad-width="300"
        data-ad-height="250"
      />
      <Script
        src="//t1.kakaocdn.net/kas/static/ba.min.js"
        strategy="afterInteractive"
        async
      />
    </div>
  );
}
