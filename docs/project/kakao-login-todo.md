# 카카오 로그인 — 추후 재활성화 TODO

## 현재 상태 (2026-07-07 기준)
카카오 로그인 버튼은 **임시 비활성화**되어 있다 (로그인 화면에 안 보임).
- 토글 위치: `src/components/ko/SocialLoginButtons.tsx` 의 `const KAKAO_LOGIN_ENABLED = false;`
- `true` 로 바꾸면 버튼이 다시 노출된다.
- 버튼은 이미 **Supabase OAuth(provider: "kakao")** 방식으로 구현되어 있다 (구글과 동일한 흐름). 즉 코드는 준비 완료 상태이고, **대시보드 설정만 하면 동작**한다.

## 왜 비활성화했나 (원인 기록)
- 기존 카카오 로그인은 `Kakao.Auth.authorize({ responseType: "token" })` 의 **implicit(토큰) 방식**이었다.
- 카카오가 implicit 방식을 폐기하면서 SDK가 `Invalid parameter keys: responseType` 에러를 던져 로그인이 깨졌다.
- 정적 export(SPA) 구조라 토큰 교환 서버가 없어, 해결책으로 **Supabase의 Kakao provider**를 쓰기로 함(구글과 동일). 단, 대시보드 설정이 필요해 당장은 보류하고 버튼만 숨김.

## 재활성화 절차

### 1) Kakao Developers (developers.kakao.com → 내 앱)
1. **앱 키 → REST API 키** 복사 (JavaScript 키 아님).
2. **카카오 로그인 → 보안 → Client Secret** 발급 → 상태 "사용함" → 코드 복사.
3. **카카오 로그인 → Redirect URI**에 Supabase 콜백 추가:
   `https://beyktdxhramexjztcrjs.supabase.co/auth/v1/callback`
4. 카카오 로그인 **활성화 ON**, 동의항목(닉네임/프로필 등) 설정.

### 2) Supabase (Authentication → Providers → Kakao)
1. Kakao **Enable**.
2. **Kakao API Key(= Client ID)** 칸 = 위 REST API 키.
3. **Client Secret** 칸 = 위 Client Secret.
4. Save.
5. Authentication → URL Configuration → Redirect URLs 에
   `https://momopick.com/ko/app/login/oauth/` 포함 확인 (구글과 공용).

### 3) 코드
- `SocialLoginButtons.tsx` 에서 `KAKAO_LOGIN_ENABLED = true` 로 변경.
- 커밋·푸시 → Cloudflare 자동 배포.

### 4) 테스트
- 로그인 화면에서 카카오 버튼 노출 확인 → 클릭 → 카카오 동의 → 로그인 완료.
- 카카오 사용자도 구글처럼 **Supabase 세션 사용자**로 로그인된다.

## 참고
- 카카오 JS SDK(`KakaoSdkInit`)는 **로그인이 아니라 카카오톡 공유 기능**에 계속 쓰이므로 제거하지 않는다.
- 기존 `KakaoAuthContext` 의 `login()`(implicit) 은 더 이상 버튼에서 호출하지 않는다. 완전 정리는 재활성화 확인 후 진행.
