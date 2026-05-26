# Deployment — Cloudflare Pages

## 배포 환경

| 항목 | 값 |
|---|---|
| 호스팅 | Cloudflare Pages |
| 리포 | `momopick-global/momopick` (GitHub) |
| Production branch | `main` |
| 자동 배포 | main 푸시 시 자동 (보통 1~3분 내 라이브) |
| Build command | `npm ci && npm run build` |
| Build output | `out/` |
| Root directory | (비움 — 레포 루트) |
| Node 버전 | Cloudflare Pages 기본 (Node 22) |

## 배포 흐름

1. `main`에 push
2. Cloudflare Pages가 GitHub webhook 받음
3. Pages가 `npm ci && npm run build` 실행
4. 산출물 `out/`을 Cloudflare CDN에 배포
5. 운영 도메인 `momopick.com`에 반영 (배포 완료까지 보통 1~3분, 작은 변경은 1초~수십초)

## 도메인 / 리다이렉트

| URL | 동작 |
|---|---|
| `https://momopick.com/` | 운영 (apex) |
| `https://www.momopick.com/*` | `https://momopick.com/:splat` **301 redirect** (`public/_redirects` 첫 줄) |

## 환경변수 변경

1. Cloudflare Pages Dashboard → 프로젝트 → Settings → Environment variables
2. **Production** 환경에 변수 등록 (Preview에도 필요하면 별도)
3. **새로 배포** (`Deployments` → 최신 배포 옆 `... → Retry deployment`) — 안 하면 `NEXT_PUBLIC_*`는 새 빌드에 반영 안 됨

## 수동 배포 (옵션)

```bash
npm run deploy:pages
# 내부적으로: npm run build && npx wrangler pages deploy out
```

`wrangler` 로그인 + 프로젝트 매핑 필요. 평소엔 git push 자동 배포로 충분.

## 배포 후 운영 검증

자동 배포 완료 신호로 다음 URL 응답을 확인:

```bash
# AdSense 심사용
curl -sI https://momopick.com/ads.txt          # 200
curl -s  https://momopick.com/ads.txt          # google.com, pub-2758905830381994, DIRECT, ...

# AdSense script in head
curl -s https://momopick.com/ | grep -oE '<script[^>]*pagead2[^>]*>' | head -1

# Sitemap
curl -sI https://momopick.com/sitemap.xml      # 200

# 주요 페이지
curl -sI https://momopick.com/                                       # 200
curl -sI https://momopick.com/ko/                                    # 200
curl -sI https://momopick.com/ko/love/                               # 200
curl -sI https://momopick.com/ko/love/who-likes-you-type/            # 200
curl -sI https://momopick.com/ko/policy/privacy/                     # 200
curl -sI https://momopick.com/ko/policy/disclaimer/                  # 200
curl -sI https://momopick.com/ko/blog/                               # 200

# noindex 확인
curl -s https://momopick.com/ko/explore/ | grep robots
curl -s https://momopick.com/ko/today/   | grep robots

# www redirect
curl -sI https://www.momopick.com/ | head -1   # 301
```

## 배포 완료 폴링 (Claude Code 패턴)

```bash
# 변경한 부분이 라이브에 반영되었는지 polling
start=$(date +%s); until curl -s "https://momopick.com/<URL>" | grep -q "<keyword>"; do
  elapsed=$(( $(date +%s) - start ))
  if [ $elapsed -gt 600 ]; then echo "TIMEOUT"; exit 1; fi
  sleep 15
done; echo "DEPLOYED after $(( $(date +%s) - start ))s"
```

보통 정적 export는 **1초~1분** 내 반영. CDN edge 캐시 hit 시 더 빠름.

## 캐시 헤더

`public/_headers`:
```
/ko/love/*
  Cache-Control: public, max-age=0, must-revalidate
```

연애 퀴즈 페이지는 매번 검증 → 옛 JS 청크 참조하는 stale HTML 방지. 다른 정적 자산은 Cloudflare 기본 캐시.

## 트러블슈팅

| 증상 | 원인 가능성 |
|---|---|
| `NEXT_PUBLIC_*` 변경이 반영 안 됨 | Redeploy 안 함 — 위 "환경변수 변경" 절차 |
| 배포 후 옛 청크 참조 에러 | Cloudflare 캐시 — `must-revalidate` 적용된 페이지인지 확인 |
| `out/api/health/index.html`이 없는데 `/api/health` 200 | `functions/api/health.ts`가 Pages Functions로 동작 (정상) |
| `wrangler pages deploy out`이 401 | `wrangler login` 다시 |

자세한 도메인/DNS 이슈는 [../troubleshooting/domain-cloudflare.md](../troubleshooting/domain-cloudflare.md).
