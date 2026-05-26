# Auth & Login

> ⚠️ **Protected area** — 운영 영향 큼. 자세한 건 [../project/protected-areas.md](../project/protected-areas.md).

## 두 가지 인증 경로

| 방식 | Flow | 콜백 경로 | 컨텍스트 |
|---|---|---|---|
| **Kakao** | OAuth Implicit (hash에 access_token) | `/ko/app/login/callback/` | `KakaoAuthContext` |
| **Supabase** (Google 등) | OAuth PKCE (search params) | `/ko/app/login/oauth/` | Supabase auth |

분리 이유: Kakao는 JS SDK 기반 implicit flow가 손쉬워서 자체 처리, 다른 OAuth는 Supabase 통합으로 일원화.

## 파일 구조

### Kakao 측

| 파일 | 역할 |
|---|---|
| `src/components/KakaoSdkInit.tsx` | Kakao SDK 1회 로드 + `Kakao.init()` |
| `src/context/KakaoAuthContext.tsx` | 토큰 → user 정보 fetch + 컨텍스트 제공 |
| `src/lib/kakaoAuth.ts` | localStorage 기반 user load/save/clear |
| `src/app/ko/app/login/callback/page.tsx` | implicit hash 파싱 + user 동기화 |
| `src/types/kakao-browser.d.ts` | window.Kakao 타입 정의 |

### Supabase 측

| 파일 | 역할 |
|---|---|
| `src/lib/supabase/client.ts` | 브라우저 클라이언트 (PKCE, Kakao 콜백 경로 격리) |
| `src/lib/supabase/server.ts` | Server Component용 (정적 export에선 거의 미사용) |
| `src/lib/supabase/env.ts` | URL 정규화 + env 유효성 |
| `src/app/ko/app/login/oauth/page.tsx` | PKCE 콜백 처리 |
| `src/hooks/useSupabaseAuthUser.ts` | 세션 + user 훅 |

### 통합 측

| 파일 | 역할 |
|---|---|
| `src/hooks/useKoAuthStatus.ts` | Kakao + Supabase 통합 인증 상태 훅 |
| `src/lib/postLoginRedirect.ts` | 로그인 직후 돌아갈 URL 저장/복원 |
| `src/components/ko/PostLoginRedirectCapture.tsx` | URL에서 next 파라미터 캡처 |
| `src/components/ko/SocialLoginButtons.tsx` | UI |
| `src/components/ko/OAuthLoggedInBlocks.tsx` | 로그인 상태 표시 블록 |
| `src/lib/supabaseUserDisplay.ts` | Supabase user → 표시명/아바타 |

## 핵심 안전장치

### Kakao 해시 토큰을 Supabase가 가로채지 않게

`createSupabaseBrowserClient`의 `detectSessionInUrl`:

```ts
detectSessionInUrl: (link, params) => {
  if (isKakaoOAuthReturnPath(link.pathname)) return false;
  return Boolean(params.access_token || params.error_description);
}
```

이거 없으면 Kakao 콜백 hash의 `access_token`을 Supabase가 자기 토큰으로 오인. **수정 금지**.

### 토큰 저장 위치

- Kakao user: `localStorage` (`KAKAO_USER_STORAGE_KEY`)
- Supabase session: Supabase가 cookie + localStorage 자체 관리 (PKCE flow)
- 로그아웃 시: `clearKakaoUser()` + `clearQuizVault()` (저장함 도 비움)

## 운영 측 설정 (코드 외부)

### Supabase Dashboard

| 위치 | 등록 |
|---|---|
| Authentication → Providers → Google | enabled + OAuth Client ID/Secret |
| Authentication → URL Configuration → Redirect URLs | `https://momopick.com/ko/app/login/oauth/` + `http://localhost:3040/ko/app/login/oauth/` |

### Kakao Developers

| 위치 | 등록 |
|---|---|
| 앱 → 플랫폼 → Web | `https://momopick.com`, `http://localhost:3040` |
| 앱 → 카카오 로그인 → Redirect URI | `https://momopick.com/ko/app/login/callback/` |
| 앱 → 카카오 로그인 → 동의항목 | profile_nickname, profile_image (필요한 것만) |

## 로그인 강제하지 않는 페이지

- 모든 콘텐츠 페이지 (홈, 퀴즈, 결과, 블로그, 정책 등)
- AdSense 크롤러가 익명으로 모든 콘텐츠 접근 가능 ✅

## 로그인 필요한 페이지

- `/ko/app/saved/` — 결과 보관함 (vault)
- `KoSavedRequireAuth` 컴포넌트가 인증 가드

## 로그아웃 흐름

1. `useKoAuthStatus.signOut()` (또는 콘텍스트의 logout 함수)
2. Kakao: SDK logout + localStorage clear
3. Supabase: `signOut()`
4. Vault clear (`clearQuizVault()`)
5. 홈 또는 적절한 페이지로 리다이렉트

## 트러블슈팅

| 증상 | 원인 가능성 |
|---|---|
| 로그인 후 무한 리다이렉트 | Supabase Redirect URLs 미등록 |
| Kakao 콜백 후 access_token 못 받음 | Kakao Redirect URI 등록 누락 |
| 로컬에서 Kakao 로그인 안 됨 | 플랫폼 도메인에 `http://localhost:3040` 없음 |
| 로그인 직후 vault 안 보임 | 저장함은 localStorage 기반 — 다른 디바이스/시크릿 모드는 별도 |
