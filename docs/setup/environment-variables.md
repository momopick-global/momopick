# Environment Variables

> **비밀키 값은 이 문서에 절대 적지 마세요.** 변수명과 용도만 정리.

## 사용 변수 (모두 `NEXT_PUBLIC_*` — 클라이언트에 노출됨)

| 변수 | 필수 | 용도 |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | 권장 | Supabase 프로젝트 URL. 없으면 Supabase 클라이언트 생성 시 throw → 통계/구글 로그인/저장함 비활성 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 권장 | Supabase anon key |
| `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` | 권장 | Kakao JS SDK init용. **카카오 디벨로퍼스 → 앱 키 → JavaScript 키만** 사용 (REST/네이티브 키 ❌). 없으면 SDK 스크립트 미로드 → Kakao 공유는 링크 복사 폴백만 동작 |
| `NEXT_PUBLIC_SITE_ORIGIN` | 선택 | Kakao 공유 시 origin 정규화에 사용. 비우면 기본 `https://momopick.com`. 보통 비워둠 |

## 파일 위치

- 로컬: `.env.local` (gitignore됨)
- 템플릿: `.env.example`
- 운영: Cloudflare Pages Dashboard → Production 환경

## `NEXT_PUBLIC_*`가 의미하는 것

빌드 시점에 JS 번들에 인라인됨. 즉:
- 클라이언트 코드에서 접근 가능 (브라우저에 노출)
- **빌드 후 변경 → 새로 빌드해야 반영됨**
- 운영 Pages에서 값만 바꾸고 재배포 안 하면 옛 빌드 그대로

## Supabase 관련 설정 (운영 측)

키 값과 별개로 Supabase Dashboard에서 설정해야 동작하는 것들:

| Dashboard 위치 | 값 |
|---|---|
| Authentication → Providers → Google | enable + 본인 OAuth Client ID/Secret |
| Authentication → URL Configuration → Redirect URLs | `https://momopick.com/ko/app/login/oauth/` (운영) + `http://localhost:3040/ko/app/login/oauth/` (로컬) |
| Database → Tables → `quiz_stats` | RPC `increment_quiz_stat` 함수 + RLS 정책 (`supabase/quiz_stats_setup.sql` 참고) |

## Kakao 관련 설정 (운영 측)

Kakao Developers 콘솔에서:

| 위치 | 값 |
|---|---|
| 앱 → 플랫폼 → Web | 사이트 도메인에 `https://momopick.com`, `http://localhost:3040` 등록 |
| 앱 → 카카오 로그인 → Redirect URI | `https://momopick.com/ko/app/login/callback/` (Implicit flow) |
| 앱 → 카카오 로그인 → 동의항목 | profile_nickname / profile_image 등 |
| 앱 → 공유하기 | (필수 등록 없음 — JS SDK 사용) |

## ads.txt / AdSense

- `public/ads.txt` 하드코딩: `google.com, pub-2758905830381994, DIRECT, f08c47fec0942fa0`
- AdSense client는 `src/app/layout.tsx`에 상수: `ADSENSE_CLIENT = "ca-pub-2758905830381994"`
- 환경변수가 아닌 코드 상수로 박혀있음. 변경 필요 시 두 곳 모두 수정 후 재배포

## 환경변수 미설정 시 동작

- `NEXT_PUBLIC_SUPABASE_*` 없음 → 로그인 버튼 클릭 시 alert/에러. 익명 콘텐츠는 정상 동작.
- `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` 없음 → Kakao SDK 스크립트가 layout에 들어가지 않음 (`KakaoSdkInit`이 null 반환). Kakao 공유 버튼은 링크 복사로 폴백.
- `NEXT_PUBLIC_SITE_ORIGIN` 없음 → `https://momopick.com` 기본 사용

## 점검 명령

```bash
# 로컬에 어떤 변수가 설정되어 있는지 (값 노출 안 됨)
grep -E "^NEXT_PUBLIC_" .env.local | cut -d= -f1
```
