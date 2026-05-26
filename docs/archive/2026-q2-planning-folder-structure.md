# 모모픽 폴더 구조 및 파일 설명

> **단일 앱**: Next.js는 **레포 루트**의 `src/`에 두고, 배포 기준은 **Cloudflare Pages**입니다.

---

## 1. 규칙 요약 (합의)

| 결정 | 내용 |
|------|------|
| App Router 위치 | **`src/app/`** 유지 (루트 `app/`와 혼용하지 않음) |
| 정적 내보내기 | `next.config.ts`의 **`output: "export"`** → **`src/app/api` Route Handler는 빌드에 포함되지 않음** |
| HTTP API | **Cloudflare Pages `functions/`** (엣지) 또는 외부 백엔드. 미래에 SSR/Node 배포로 바꾸면 `src/app/api` 검토 |
| 콘텐츠 | **원본**은 `src/content/`, 스키마는 `src/schemas/`. 배포용 집계 JSON(`data/` 등)은 `tools/`로 생성하는 흐름을 예정으로 둠 |
| 추상화 | **`src/lib/content/`** — JSON/CMS 등 소스 교체 지점 (`QuizContentSource`) |

---

## 2. 레포 루트

```
momopick/
├── src/                 # Next.js 앱 + 원본 콘텐츠·스키마
├── public/              # 정적 파일 (robots, sitemap, _redirects, 이미지)
├── functions/           # Cloudflare Pages Functions (예: /api/health)
├── tools/               # 데이터 생성·검증·사이트맵 등(JSON 설정/스크립트 자리)
├── docs/                # 기획·개발 문서
├── backend/             # (선택) 설명·실험 메모 — 런타임은 app·lib·functions로 흡수하는 것이 일반적
├── supabase/            # (예정) migrations 등
├── tests/               # 테스트 자리
├── package.json
├── next.config.ts       # Next 설정 (정적 export, distDir 등)
├── middleware.ts        # (추가 시) 언어·리다이렉트 등 요청 단 처리
├── tsconfig.json
├── .env.example
├── README.md
└── .gitignore
```

---

## 3. `src/app/` — 목표 라우트 트리 (점진 적용)

아래는 **확장 시 참고용**입니다. 없는 경로는 필요할 때 추가하면 됩니다.

```
src/app/
├── page.tsx                 # / (언어 게이트웨이 등)
├── layout.tsx
├── [lang]/
│   ├── layout.tsx
│   ├── page.tsx             # /{lang}
│   ├── explore/             # 탐색
│   ├── tag/, t/[tag]/       # 태그
│   ├── love/[slug]/ …       # 카테고리별 퀴즈 (love, personality, …)
│   ├── r/[slug]/[resultKey]/ # 결과 공유 랜딩
│   ├── account/…            # 로그인·마이페이지 등
│   ├── notice/…
│   └── p/…                  # about, privacy, terms, contact
└── (현재) ko/…              # 기존 한국어 전용 경로 — [lang] 일반화 시 정리
```

---

## 4. `src/components/`, `src/lib/`

```
src/components/     # UI (layout/, quiz/, comments/, common/ … 목표 구조)
src/lib/
├── content/        # ★ 콘텐츠 소스 추상화 (types, jsonSource — CMS 대비)
├── supabase/       # Supabase 클라이언트
└── (예정) user/, comments/, counters/, ai/, security/
```

---

## 5. `src/content/`, `public/`, `data/` (예정)

| 경로 | 역할 |
|------|------|
| `src/content/quiz/` | 퀴즈 원본 JSON·`index.ts` (다국어는 JSON `{ ko, en }`, 언어별 하위 폴더 없음) |
| `src/schemas/` | JSON 스키마(검증·문서화) |
| `public/` | 파비콘, 배너, OG용 이미지 등 **URL로 직접 서빙** |
| `data/` (예정) | `tools`가 만든 배포용 인덱스·집계 (저장소에 둘지는 팀 선택) |

---

## 6. `functions/` (Cloudflare Pages)

Next 정적 export와 별도로, **서버/엣지에서 돌아가는 API**는 여기에 둡니다.

```
functions/
└── api/health.ts            # 예: GET /api/health
```

---

## 7. 배포 시 (Cloudflare Pages)

- **Root directory**: 레포 루트
- Build command 예: `npm ci && npm run build`
- Build output: **`out`**
- 환경 변수: `NEXT_PUBLIC_*` 및 빌드에 필요한 시크릿

---

## 8. 문서 정합성

- API·데이터: [data-model.md](./data-model.md), [api-spec.md](./api-spec.md)
- 디자인: [design-system.md](./design-system.md)
- 인프라 요약: [README.md](../README.md)
