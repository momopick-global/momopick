# Blog — `/ko/blog/`

> 콘텐츠 확장 계획은 [../content/blog-content-roadmap.md](../content/blog-content-roadmap.md) 참조 (2026-07-06 신설).

## 개요

7개 짧은 블로그 글. 콘텐츠는 `src/content/blog/koSamplePosts.ts`에 TypeScript 객체 배열로 작성.

## 운영 중인 글 (8개, 길이 2026-07-06 확인)

| slug | 제목 | 본문 길이 |
|---|---|---|
| `signs-som-turning-into-love` | 썸에서 연애로 넘어가는 신호 | ~1,541자 |
| `what-is-tarot` | 🔮 타로 카드란 무엇인가? | ~1,271자 |
| `why-som-always-ends-awkwardly` | 📌 썸이 항상 애매하게 끝나는 이유 | ~1,220자 |
| `mbti-not-diagnosis` | MBTI·성향 퀴즈, 진단이 아니라는 걸 기억해 주세요 | ~1,118자 |
| `snack-test-what` | 스낵 테스트가 뭐예요? | ~972자 |
| `love-category-editor` | 연애 테스트, 웃으면서 보는 게 포인트 | ~972자 |
| `share-result` | 테스트 결과, 친구에게 이렇게 공유해 보세요 | ~956자 |
| `new-quizzes-rhythm` | 앞으로도 테스트는 꾸준히 늘어납니다 | ~775자 |

> ✅ 8개 글 전부 600자 이상(775~1,541자, 2026-07-06 확인). 과거 220~320자였던 5개(`snack-test-what`, `share-result`, `love-category-editor`, `new-quizzes-rhythm`, `mbti-not-diagnosis`)는 확장 완료 — thin-content 길이 리스크 해소.

## 구조

| 위치 | 역할 |
|---|---|
| `src/content/blog/koSamplePosts.ts` | 블로그 데이터 (제목·요약·본문·카테고리·태그·이미지) |
| `src/app/ko/blog/page.tsx` | 블로그 인덱스 (탭/필터 UI) |
| `src/app/ko/blog/[slug]/page.tsx` | 블로그 상세 (`generateStaticParams`로 정적 생성) |
| `src/components/ko/KoBlogTabPanel.tsx` | 인덱스 탭 패널 |
| `src/components/ko/BlogCarousel.tsx` | 홈에서 노출되는 캐러셀 |
| `src/components/blog/BlogAmbiguousSituationshipPromo.tsx` | 특정 글의 promo 블록 |

## 데이터 모델

```ts
export type KoSampleBlogPost = {
  id: string;              // slug로도 쓰임
  date: string;            // "2026.04.13" (표시용)
  dateTime: string;        // "2026-04-13" (machine-readable)
  title: string;
  excerpt: string;
  body: string;            // 빈 줄로 문단 구분
  category: "love" | "personality" | "tarot" | "fun" | "story";
  tag?: "가이드" | "에디터노트" | "업데이트" | "팁";
  image?: string;          // 대표 이미지 (없으면 quiz-image-pending fallback)
  imageAlt?: string;
  // featured/promo 등 일부 글에만 있는 확장 필드
};
```

## 카테고리

- `love` 연애
- `personality` 성격
- `tarot` 타로
- `fun` 재미
- `story` 스토리·운영 노트

## 이미지 경로

| 종류 | 경로 |
|---|---|
| 대표 이미지 (hero) | `public/images/blog/<slug>-...webp` (있으면) |
| OG 이미지 분리 | `public/images/og/blog/<slug>...webp` (있을 경우) |
| 이미지 없는 글 | `QUIZ_IMAGE_PENDING_SRC = /images/common/quiz-image-pending.webp` 자동 대체 |

`src/lib/content/quizImagePending.ts` 참고.

## SEO

- 각 상세 페이지는 `generateMetadata` 사용
- canonical: `https://momopick.com/ko/blog/<slug>/`
- OG image: post.image 있으면 절대 URL로 변환, 없으면 `main-og.webp`

## 새 글 추가 절차

1. `src/content/blog/koSamplePosts.ts`의 배열에 객체 추가 (id가 slug로 사용됨)
2. (선택) `public/images/blog/<slug>-...webp` 대표 이미지 추가
3. `public/sitemap.xml`에 `<url>` 블록 등록 (priority 0.5, monthly)
4. `npm run build` 통과 확인
5. `/ko/blog/`에서 카드 노출 확인

## 글 작성 가이드

- 작성법: [../content/blog-writing-guide.md](../content/blog-writing-guide.md)
- 어떤 글을 쓸지(주제·우선순위·연결 퀴즈): [../content/blog-content-roadmap.md](../content/blog-content-roadmap.md)

## 빠진 정렬·필터

- 인덱스 페이지에서 카테고리 필터 동작 중
- 검색 기능은 없음 (`/ko/explore/`가 placeholder 상태)
- 페이지네이션 없음 — 글 수가 적어 한 페이지에 모두 표시
