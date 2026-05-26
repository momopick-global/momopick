# Asset Paths — 모모픽

## 디렉터리 구조

```
public/
├── images/
│   ├── quiz/                    # 퀴즈 자산
│   │   └── <slug>/
│   │       ├── ko/              # 한국어 자산 (필수)
│   │       │   ├── thumb.webp
│   │       │   ├── result-1.webp
│   │       │   ├── result-2.webp
│   │       │   ├── result-3.webp
│   │       │   ├── result-4.webp
│   │       │   └── (선택) start.webp, q1.webp, ...
│   │       └── en/              # 영어 자산 (현재 거의 빈 폴더)
│   ├── blog/                    # 블로그 hero/inline
│   │   └── <topic>-<slug>-...webp
│   ├── og/
│   │   ├── main-og.webp         # 메인 fallback OG (1536×1024)
│   │   └── blog/                # (선택) 블로그 글 OG 분리
│   ├── banners/
│   │   └── hero/                # 홈 히어로 캐러셀
│   ├── brand/
│   │   ├── momopick_symbol.webp
│   │   └── momopick_wordmark.webp
│   ├── common/
│   │   └── quiz-image-pending.webp   # fallback placeholder
│   ├── today/                   # 오늘의 운세 자산
│   │   ├── tarot.mp4
│   │   └── tarot-first-frame.webp
│   └── login_ch_1.webp, login_ch_2.webp  # 로그인 페이지 시각
├── og/                          # 메인 OG (위 images/og와 별개로 루트에도 있음)
│   └── main-og.webp
├── assets/                      # 기타
├── ads.txt
├── robots.txt
├── sitemap.xml
├── _headers
├── _redirects
└── favicon.ico
```

## 퀴즈 이미지 경로 규칙

### JSON에서의 경로 (로케일 없음)

```json
{
  "images": { "og": "/images/quiz/<slug>/og.webp" },
  "results": {
    "A": { "image": "/images/quiz/<slug>/result-1.webp" }
  }
}
```

### 실제 파일 위치 (로케일 있음)

```
public/images/quiz/<slug>/<locale>/<file>.webp
```

### 런타임 변환

`src/lib/content/quizAssetUrl.ts`의 `quizAssetUrl(path, locale)`이 다음을 처리:

```
입력: "/images/quiz/who-likes-you-type/result-1.webp"
locale: "ko"
출력: "/images/quiz/who-likes-you-type/ko/result-1.webp"
```

이미 `<locale>` 세그먼트가 들어간 경로도 정규화 (locale 교체).

## 검증

`tools/check-quiz-images.mjs`가 JSON에서 추출한 경로 + locale 룰을 적용해서 `public/` 아래 실제 존재 검사:

```bash
# 기본: ko 엄격 검사 + en은 warning
node tools/check-quiz-images.mjs

# 영어도 엄격
node tools/check-quiz-images.mjs --locale ko,en

# ko만
node tools/check-quiz-images.mjs --locale ko
```

## 블로그 이미지

| 종류 | 경로 |
|---|---|
| Hero/inline | `public/images/blog/<topic>-<slug>-...webp` |
| OG 분리 (선택) | `public/images/og/blog/<slug>...webp` |

JSON 또는 TS에서 절대 경로 사용:
```ts
image: "/images/blog/love-something-ko-cover.webp"
```

이미지 없는 블로그 글: `src/lib/content/quizImagePending.ts`의 `QUIZ_IMAGE_PENDING_SRC`로 자동 대체.

## 공통 이미지

- 메인 OG: `https://momopick.com/og/main-og.webp` (절대 URL로 빌드되어 들어감)
- Fallback placeholder: `/images/common/quiz-image-pending.webp`
- 로고: `/images/brand/momopick_symbol.webp`, `/images/brand/momopick_wordmark.webp`

## 코드에서의 참조

`public/`의 파일은 코드에서 **`/images/...` 절대 경로**로 참조 (앞 `public` 생략):

```tsx
<img src="/images/brand/momopick_symbol.webp" alt="" />
<img src="/images/quiz/<slug>/ko/result-1.webp" alt="" />  // 직접 (drift 가능)
<img src={quizAssetUrl(pack.images.og, locale)} alt="" />  // 권장
```

## 새 자산 추가 절차

### 퀴즈 자산

1. `public/images/quiz/<slug>/ko/<file>.webp` 경로로 파일 저장
2. (en 출시 전엔) `en/` 폴더는 빈 채로 둠
3. JSON에서 로케일 없이 `/images/quiz/<slug>/<file>.webp` 참조
4. `node tools/check-quiz-images.mjs` 통과 확인

### 블로그 자산

1. `public/images/blog/<...>.webp` 저장
2. `src/content/blog/koSamplePosts.ts`의 객체에 `image: "/images/blog/..."` 설정

### 메타 / OG 자산

1. `public/og/<...>.webp` 또는 `public/images/og/...`
2. `metadata.openGraph.images`에 절대 URL로 (또는 metadataBase 활용)

## 자산 정리 (cleanup) 시 주의

- `node tools/check-quiz-images.mjs`는 JSON에서 참조하는 경로만 검사
- 코드에서 직접 참조하는 경로(예: `KoTodayVideoExperience`의 `/images/today/tarot.mp4`)는 검사 안 됨
- 삭제 전 반드시 `grep -r "<filename>" src public` 으로 참조 확인

자세한 정리 사례: [../project/current-status.md](../project/current-status.md)의 `8bbd962` 커밋 참고.
