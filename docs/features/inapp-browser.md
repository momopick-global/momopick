# In-App Browser Guide

## 개요

카카오톡, 인스타그램, 페이스북, 라인, 네이버 등 **인앱 브라우저**에서 사이트가 열리면 모달을 띄워 외부 브라우저로 안내. 인앱 브라우저는 글자 크기·캐시·기능 호환성 이슈가 잦아서 도입.

## 파일

| 파일 | 역할 |
|---|---|
| `src/components/InAppBrowserGuide.tsx` | 클라이언트 컴포넌트 (UA 감지 + 모달) |
| `src/components/InAppBrowserGuide.module.css` | 모달 스타일 |
| `src/app/layout.tsx` | 루트에 `<InAppBrowserGuide />` 마운트 → 전 페이지 적용 |

## UA 감지 패턴

```ts
function detectInApp(ua: string): boolean {
  const s = ua.toLowerCase();
  return (
    s.includes("kakaotalk") ||
    s.includes("instagram") ||
    s.includes("fbav") ||      // Facebook iOS app
    s.includes("fb_iab") ||    // Facebook in-app browser
    s.includes("fban") ||
    s.includes("fbios") ||
    s.includes("fbsv") ||
    / line\//.test(s) ||
    s.includes("naver(inapp") ||
    s.includes("naver")
  );
}
```

## Platform 분기

| Platform | 감지 | 외부 열기 방법 |
|---|---|---|
| Android | `/android/` | `intent://...#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=...;end` |
| iOS | `/iphone\|ipad\|ipod/` | `googlechromes://<host+path>` (HTTPS) 또는 `googlechrome://` (HTTP) |
| other | — | `window.open(url, "_blank")` |

iOS Chrome 미설치 시: scheme 호출이 무시되어 현재 페이지에 머무름 = 자연스러운 fallback.

## 재노출 방지

- "그냥 보기" 클릭 시 `sessionStorage.setItem("momopick:inapp-dismissed", "1")`
- 같은 세션 동안 다시 안 띄움
- private/sessionStorage 사용 불가 시 silently skip

## UI 문구

```
제목: 외부 브라우저에서 더 안정적으로 볼 수 있어요
설명: 현재 인앱브라우저에서는 글자 크기나 화면 구성이 다르게 보일 수 있어요.
      외부 브라우저에서 열면 더 안정적으로 이용할 수 있습니다.
주 버튼: 외부 브라우저로 열기
보조 버튼: 그냥 보기
```

## 동작 위치

루트 레이아웃에 마운트되어 모든 페이지에서 동작. 단, **첫 진입 시점 기준**으로 한 번 검사. SPA 라우팅 후엔 재발동 안 됨.

## 로컬 테스트

데스크톱 브라우저에서는 UA 매칭 안 됨. 강제 발동:

```js
// 콘솔에서
sessionStorage.removeItem("momopick:inapp-dismissed");
Object.defineProperty(navigator, "userAgent", {
  value: navigator.userAgent + " KAKAOTALK/1.0",
  configurable: true,
});
location.reload();
```

또는 실기기에서 카카오톡으로 https://momopick.com 링크 보내서 클릭.

## 트러블슈팅

[../troubleshooting/inapp-browser.md](../troubleshooting/inapp-browser.md) 참고.

## 향후 개선 검토

- iOS Safari 외 외부 브라우저 옵션 명시 (현재 Chrome만)
- 카카오톡에서 "더보기 → 외부 브라우저로 열기" 위치 안내 (모달 안내 텍스트 추가)
- Analytics 이벤트 (현재 GA4 미도입)
