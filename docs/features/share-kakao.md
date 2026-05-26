# Kakao Share — 카카오 공유

> ⚠️ **Protected area** — 운영 영향 큼. 자세한 건 [../project/protected-areas.md](../project/protected-areas.md).

## 공유 채널

| 채널 | 동작 |
|---|---|
| Kakao Feed | Kakao SDK `Share.sendDefault({ objectType: "feed", ... })` |
| Facebook | `https://www.facebook.com/sharer/sharer.php?u=...` new window |
| Twitter / X | `https://twitter.com/intent/tweet?...` new window |
| 링크 복사 | Clipboard API |

## 파일 구조

| 파일 | 역할 |
|---|---|
| `src/components/KakaoSdkInit.tsx` | SDK 로드 + `Kakao.init(JS_KEY)` |
| `src/lib/kakaoShareFeed.ts` | URL/이미지 origin 정규화, Feed payload 빌더 |
| `src/components/quiz/QuizResultShare.tsx` | 공유 버튼 UI (Kakao + 다른 채널) |
| `src/components/quiz/useQuizResultShareModel.ts` | 공유 모델(텍스트·URL·이미지) 빌더 |
| `src/lib/quizOutcomeUrl.ts` | 결과 딥링크 URL 빌더 (`?r=`, `?p=`) |

## Kakao Feed payload 구조

```ts
{
  objectType: "feed",
  content: {
    title: "...",
    description: "...",
    imageUrl: "https://momopick.com/images/quiz/<slug>/ko/result-1.webp",
    link: { mobileWebUrl: "...", webUrl: "..." }
  },
  buttons: [
    { title: "테스트 결과 보기", link: { mobileWebUrl, webUrl } },
    { title: "친구에게 공유하기", link: { mobileWebUrl, webUrl } }
  ]
}
```

## origin 정규화

`KAKAO_SITE_ORIGIN`은 `NEXT_PUBLIC_SITE_ORIGIN || "https://momopick.com"`. 모든 공유 URL/이미지 URL을 운영 origin으로 변환 (`normalizeUrlForKakao`, `normalizeMomopickHostForShare`):

- `localhost`, `127.0.0.1`, `*.local` 등 로컬 host는 자동으로 `momopick.com`으로 치환
- 상대 경로 (`/ko/...`)는 운영 origin으로 절대화
- 이래야 로컬 dev에서도 운영 도메인의 카카오 공유 카드를 미리볼 수 있음

## 결과 공유 모델 빌딩 (useQuizResultShareModel)

```ts
const { kakaoFeed, openKakao, kakaoCopyLink, openFacebook, openTwitter, copyLink } =
  useQuizResultShareModel({
    shareText,       // 결과 텍스트 (예: "나의 썸 패턴은 밀당형!")
    shareImageUrl,   // 결과 이미지 절대/상대 URL
    quizStartUrl,    // 시작 URL
    quizResultUrl,   // 결과 딥링크 URL
    kakaoQuizResultShare: true,
  });
```

## Kakao Developers 운영 설정

| 위치 | 등록 필요 |
|---|---|
| 플랫폼 → Web | `https://momopick.com` (필수), `http://localhost:3040` (선택) |
| (공유는 별도 등록 없음 — JS SDK 사용) | - |

`NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` 환경변수 미설정 시 SDK 미로드 → 링크 복사 폴백.

## 공유 이미지 404 주의

Kakao Feed의 `imageUrl`은 **카카오 서버가 직접 fetch**하여 카드 캐시 생성. 다음 이슈 주의:

- 이미지 URL이 404면 카드에 이미지 안 보임 (텍스트만)
- Kakao는 한 번 캐시된 imageUrl을 일정 기간 재사용 → 이미지 교체 후에도 옛 캐시가 보일 수 있음
- 캐시 갱신: Kakao Developers 콘솔 → 도구 → 디버거에 URL 입력 → "새로운 정보 가져오기"

→ JSON의 `share.image` 경로는 반드시 운영에 존재해야 함. 누락 시 `quiz-image-pending.webp`로 임시 대체 ([f46ee64 ambiguous-situationship-end 사례](../project/current-status.md)).

## 공유 UI 위치

- 퀴즈 결과 페이지 메인
- 결과 카탈로그 페이지 (`/ko/love/<slug>/results/`)에는 노출 안 됨
- 블로그 글에는 공유 UI 없음 (현재)

## 트러블슈팅

[../troubleshooting/kakao-share.md](../troubleshooting/kakao-share.md) 참조.
