# Troubleshooting — Kakao Share

## 카카오 공유가 안 될 때

### 1. SDK 로드 확인

브라우저 콘솔에서:
```js
window.Kakao
window.Kakao.isInitialized()
```

- `Kakao` undefined → SDK 스크립트 미로드 → `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` 환경변수 확인
- `isInitialized()` false → init 실패 — 키 값 또는 SDK 버전 이슈

### 2. JavaScript Key 확인

- **JavaScript 키만** 사용 (REST API 키·네이티브 앱 키 ❌)
- Kakao Developers → 앱 → 앱 키 → JavaScript 키
- `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` 환경변수에 정확히 (앞뒤 공백 제거)
- 키 변경 후 **Cloudflare Pages 재배포** 필수 (`NEXT_PUBLIC_*`는 빌드 시점 인라인)

### 3. Kakao Developers 도메인 등록

- 앱 → 플랫폼 → Web
- 사이트 도메인에 `https://momopick.com` 등록
- 로컬 테스트: `http://localhost:3040`도 등록

### 4. 공유 이미지 404

Kakao Feed의 `imageUrl`은 **카카오 서버가 직접 fetch**:
```bash
curl -sI <imageUrl>   # 반드시 200
```

404면 카드에 이미지 안 보임 (텍스트만 표시). 해결:
- JSON의 `share.image` 경로가 운영에 실제 존재하는지
- `node tools/check-quiz-images.mjs` 통과
- 누락된 자산 → 임시로 `quiz-image-pending.webp`로 JSON 교체 후 재배포

예시 사례: `ambiguous-situationship-end` C/D 결과 (`f46ee64` 커밋 참고).

### 5. 공유 이미지 캐시 문제

Kakao는 한 번 fetch한 이미지를 일정 기간 캐시. 이미지 교체 후에도 옛 이미지가 보일 수 있음.

**갱신 방법**:
1. Kakao Developers → 도구 → 디버거
2. URL 입력 (`https://momopick.com/ko/love/<slug>/?r=A` 같은 결과 URL)
3. "새로운 정보 가져오기" 클릭
4. 그래도 안 되면 이미지 URL 자체에 `?v=N` 같은 쿼리 붙이기 (코드 변경 필요)

### 6. origin 정규화 동작 확인

`src/lib/kakaoShareFeed.ts`의 `normalizeUrlForKakao(url)`:
- localhost / 127.0.0.1 → `https://momopick.com`으로 자동 치환
- 상대 경로 → 절대 URL로

로컬 dev에서 공유 카드는 운영 URL 기준으로 빌드됨 (의도된 동작). 실제 클릭 시 운영 도메인으로 이동.

### 7. 카카오톡 인앱 브라우저에서 SDK 동작 안 함

- 일부 카카오톡 버전·OS에서 인앱 SDK 제한
- `InAppBrowserGuide` 모달이 외부 브라우저 유도 — 외부에서 공유 시도

### 8. Kakao 공유가 링크 복사로 fallback됨

- SDK 미로드 시 자동 fallback
- 브라우저 콘솔에서 SDK 상태 확인
- 의도적으로 공유 비활성 → 키 값 비워두면 됨 (운영 정책 결정)

## 디버깅 패턴

```js
// 1. SDK 상태
console.log('Kakao loaded?', !!window.Kakao);
console.log('Initialized?', window.Kakao?.isInitialized());

// 2. 공유 호출 (수동)
window.Kakao.Share.sendDefault({
  objectType: 'feed',
  content: {
    title: 'test',
    description: 'test',
    imageUrl: 'https://momopick.com/og/main-og.webp',
    link: {
      mobileWebUrl: 'https://momopick.com/',
      webUrl: 'https://momopick.com/'
    }
  }
});
```

## 운영 검증

```bash
# Share용 OG 이미지 200 확인
curl -sI https://momopick.com/og/main-og.webp

# 결과 이미지 (각 슬러그)
curl -sI https://momopick.com/images/quiz/<slug>/ko/result-1.webp

# Pending placeholder
curl -sI https://momopick.com/images/common/quiz-image-pending.webp
```

## 관련

- 공유 기능 구조: [../features/share-kakao.md](../features/share-kakao.md)
- Protected area: [../project/protected-areas.md](../project/protected-areas.md)
