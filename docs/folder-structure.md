# 모모픽 폴더 구조 및 파일 설명 (1차 오픈 기준)

> **단일 앱**: Next.js는 **레포 루트**에 두고, 배포 기준은 **Cloudflare Pages**입니다. (유어타로류 “풀스택 Next 한 프로젝트” 레이아웃)

---

## 1. 레포 루트

```
momopick/
├── src/                 # ★ Next.js 소스 (app, components, lib)
├── public/              # 정적 파일 (robots, sitemap, _redirects)
├── functions/           # Cloudflare Pages Functions (/api/*)
├── docs/                # 기획·개발 문서
├── supabase/            # (예정) migrations 등
├── scripts/             # 빌드·유지보수 스크립트 자리
├── tests/               # 테스트 자리
├── assets/              # (선택) 정적 에셋 메모 등
├── package.json
├── next.config.ts
├── tsconfig.json
├── .env.example
├── README.md
└── .gitignore
```

---

## 2. `src/` (Next.js)

```
src/
├── app/                     # App Router 페이지·레이아웃
│   ├── page.tsx             # / 언어 게이트웨이
│   ├── ko/                  # /ko/ 한국어
│   └── [lang]/              # /en/ 등 플레이스홀더
├── components/              # 공용 컴포넌트
└── lib/
    └── supabase/            # Supabase 클라이언트 스캐폴드
```

루트의 **`functions/`** (Next 밖):

```
functions/
└── api/health.ts            # GET /api/health
```

| 경로 | 역할 |
|------|------|
| `src/app/` | 라우팅·SEO 메타·페이지 UI |
| `public/robots.txt`, `sitemap.xml` | 크롤러 (필요 시 갱신) |
| `public/_redirects` | Pages 리다이렉트 규칙 |
| `functions/` | Next에 없는 **엣지 API** (Pages 전용) |
| `src/lib/supabase/` | 브라우저/서버 Supabase 팩토리 |

---

## 3. 배포 시 (Cloudflare Pages)

- **Root directory**: 비움(레포 루트)
- Build command 예: `npm ci && npm run build`
- Build output: **`out`**
- 환경 변수: `NEXT_PUBLIC_*` 및 빌드에 필요한 시크릿

---

## 4. 문서 정합성

- API·데이터: [data-model.md](./data-model.md), [api-spec.md](./api-spec.md)  
- 디자인: [design-system.md](./design-system.md)  
- 인프라 요약: [README.md](./README.md)
