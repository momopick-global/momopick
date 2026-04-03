# Momopick — Next.js (Cloudflare **Pages**)

정적 HTML Export + **Pages Functions** 조합입니다.

## 404 / File not found

1. **로컬**: HTML은 **`out/`** 안에만 있습니다. `web/` 또는 레포 루트에서 정적 서버를 켜면 안 됩니다.  
   - `npm run build` 후 `npm run preview` **또는** `cd out && python3 -m http.server 3038`
2. **Cloudflare Pages**: 저장소 연결 시 **Root directory = `web`**, **Build output = `out`**.  
   (루트를 저장소 최상위로 두었다면 output은 **`web/out`** 으로 지정.)  
(Cloudflare는 **풀스택 SSR Next.js**에 [Workers 가이드](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)를 권장하지만, **Pages만** 쓰려면 이 방식이 공식 안내와 맞습니다.)

## 로컬

```bash
cd web
npm install
cp .env.example .env.local   # Supabase 키 채우기
npm run dev                  # http://localhost:3038
```

정적 산출물 미리보기 (`out/`):

```bash
npm run build
npm run preview              # serve out — 포트 3038
```

## Cloudflare Pages (대시보드 설정)

1. [Workers & Pages](https://dash.cloudflare.com/) → **Create** → **Pages** → Git 연결  
2. **Root directory (중요)**: `web`  
3. **Framework preset**: `Next.js (Static HTML Export)`  
4. 권장 값:

| 항목 | 값 |
|------|-----|
| Build command | `npm run build` |
| Build output directory | `out` |

5. **Environment variables**: Supabase용 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (및 빌드에 필요한 기타 키)

### Pages Functions

- `functions/api/health.ts` → 배포 후 **`/api/health`** (JSON 헬스체크)  
- [Pages Functions 문서](https://developers.cloudflare.com/pages/functions/)

### 리다이렉트

- `public/_redirects` — www → apex 등 (Pages [Redirects](https://developers.cloudflare.com/pages/configuration/redirects/))

### 참고

- [Static Next.js on Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)

## Supabase

- `src/lib/supabase/client.ts` — 브라우저 (`createSupabaseBrowserClient`)  
- `src/lib/supabase/server.ts` — 서버 컴포넌트/서버 액션용 (정적 페이지만일 때는 미사용 가능)  
- `.env.example` 참고, **Pages 빌드 환경 변수**에도 동일 키 등록

## 라우트

| 경로 | 설명 |
|------|------|
| `/` | 언어 게이트웨이 |
| `/ko/` | 한국어 메인 |
| `/en/` … | 플레이스홀더 |
| `/api/health` | Pages Function (Next Route Handler 아님) |
