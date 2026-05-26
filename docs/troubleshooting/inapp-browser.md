# Troubleshooting — In-App Browser

## 카카오톡 / 인스타 인앱 브라우저에서 발생하는 일반적 이슈

### 글자 크기 깨짐

- 사용자 OS 글자 크기 설정 / 인앱 줌으로 폰트 크기가 다르게 보임
- 대응: 절대 크기(`px`) 일관 사용 + 줄간격 충분 (1.5+)
- 자세한 건 [../design/typography.md](../design/typography.md)

### 캐시 문제 (옛 페이지 보임)

- 카카오톡 인앱은 자체 캐시가 강함 — 사이트 업데이트 후에도 옛 페이지가 보일 수 있음
- 사용자 측 해결:
  - 인앱 메뉴 → 새로고침
  - 외부 브라우저로 열기 (`InAppBrowserGuide`가 안내)
- 서버 측: `must-revalidate` 캐시 헤더 (이미 `/ko/love/*` 적용)

### 로그인 / OAuth 동작 안 함

- 일부 인앱 브라우저에서 OAuth redirect가 실패
- 대응: `InAppBrowserGuide` 모달이 외부 브라우저 유도
- 사용자가 외부 브라우저로 열면 정상 동작

### 카카오 SDK가 인앱에서 동작 안 함

- 카카오톡 인앱에서 자체 Kakao SDK 호출 시 일부 OS·버전에서 제한
- 보통 SDK가 로드는 되지만 `Share.sendDefault`가 응답 없음
- 자세한 건 [kakao-share.md](./kakao-share.md)

### 영상 / 자동 재생 깨짐

- 인앱 브라우저는 `autoplay` 정책이 일반 브라우저와 다름
- iOS 카카오톡: 사용자 제스처 없이 자동 재생 안 됨
- 대응: 자동 재생 사용 시 `muted` + `playsinline` 둘 다 필수
- 예시: `KoTodayVideoExperience`의 `<video autoplay muted playsinline>`

## InAppBrowserGuide 모달 동작 확인

```js
// 콘솔에서 강제 발동
sessionStorage.removeItem("momopick:inapp-dismissed");
Object.defineProperty(navigator, "userAgent", {
  value: navigator.userAgent + " KAKAOTALK/1.0",
  configurable: true,
});
location.reload();
```

데스크톱에서는 UA가 매칭 안 됨 → 위 patch 필요.

## "외부 브라우저로 열기" 동작

| Platform | 동작 |
|---|---|
| Android | `intent://...#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=...;end` |
| iOS | `googlechromes://<host+path>` (HTTPS) |
| Chrome 미설치 | iOS: 스킴 호출 무시 → 현재 페이지에 머무름 / Android: `browser_fallback_url`로 복귀 |

## sessionStorage 안 됨

- 사용자가 시크릿/프라이빗 모드 → `sessionStorage` 접근 시 throw
- 모달은 `try/catch`로 silently 무시 → 재진입 시 또 모달 표시 (정상 동작)
- 사용자 입장에서는 약간 귀찮을 수 있지만 작동 자체에 문제 없음

## 자주 묻는 질문 (운영 관점)

### Q: 카카오톡에서 사이트 깨지면 어떻게 해야 하나요?

- A: `InAppBrowserGuide` 모달이 자동으로 외부 브라우저 안내. 사용자가 "외부 브라우저로 열기" 클릭.

### Q: 인앱에서 로그인이 안 돼요

- A: 외부 브라우저로 열어서 로그인. 인앱은 OAuth 제한이 흔함.

### Q: 페이스북 메신저는?

- A: `fb_iab` UA 포함하면 감지됨 (페이스북 인앱). 모달 정상 동작.

### Q: 안드로이드 Chrome / iOS Safari에서도 모달이 뜨나요?

- A: 안 뜸. UA에 `kakaotalk`, `instagram`, `fbav`, `line`, `naver` 등이 포함되어야 발동.

## 코드 위치

- 컴포넌트: `src/components/InAppBrowserGuide.tsx`
- 스타일: `src/components/InAppBrowserGuide.module.css`
- 마운트: `src/app/layout.tsx`

자세한 건 [../features/inapp-browser.md](../features/inapp-browser.md).
