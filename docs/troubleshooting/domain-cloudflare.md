# Troubleshooting — Domain / Cloudflare

## 도메인 구조

- Apex: `momopick.com`
- `www`: `www.momopick.com` → apex 301 redirect (`public/_redirects` 첫 줄)
- DNS: Cloudflare 관리

## DNS 변경 시 영향

| 변경 | 영향 |
|---|---|
| `momopick.com` A/AAAA 레코드 | Cloudflare Pages 자동 관리 — 직접 건드리지 말 것 |
| MX, TXT (SPF/DKIM/DMARC) | 이메일 발송에 영향. Search Console 소유권 TXT 레코드도 |
| `www` CNAME | Pages 프로젝트에 `www` 도메인 등록되어 있으면 자동 |

## 자주 마주치는 이슈

### "DNS Change Recommended" 경고

Cloudflare Pages 대시보드에서 자주 뜨는 메시지. 보통:
- Apex (`momopick.com`)를 Pages 프로젝트에 추가했을 때 CNAME flattening 권장
- 무시해도 동작하지만 권장사항 따라 변경 가능

작업 전 운영 응답이 정상인지 확인하고 신중하게.

### `www`가 redirect 안 됨

체크리스트:
1. `public/_redirects`에 `https://www.momopick.com/* https://momopick.com/:splat 301!` 있는지
2. Pages 프로젝트의 Custom domains에 `www.momopick.com`도 등록되어 있는지
3. 빌드 후 `out/_redirects`에 복사되었는지

```bash
curl -sI https://www.momopick.com/ | head -3
# HTTP/2 301
# location: https://momopick.com/
```

### 운영 URL과 canonical 도메인 불일치

`NEXT_PUBLIC_SITE_*` 변경 후 재배포 안 하면:
- canonical / OG URL은 빌드 시점 값 그대로
- sitemap도 옛 URL 기준

→ Cloudflare Pages 대시보드에서 `Retry deployment` 필수.

### Cloudflare가 robots.txt를 덮어쓴 것처럼 보임

Cloudflare는 robots.txt를 덮어쓰지 않고 **prepend**합니다. AI 봇 차단 블록을 우리 본문 앞에 붙임:
```
# BEGIN Cloudflare Managed content
User-agent: *
Content-Signal: search=yes,ai-train=no
...
# END Cloudflare Managed Content

User-agent: *
Allow: /
...
```

- AdSense 봇(`Mediapartners-Google`, `AdsBot-Google`)은 차단되지 않음
- 두 개의 `User-agent: *` 공존 → 일부 봇이 두 번째 무시 가능성. 무시해도 무방.

자세한 건 [../seo/sitemap-robots.md](../seo/sitemap-robots.md).

### 도메인 SSL 경고

Cloudflare가 자동 발급. Pages 프로젝트에 도메인 등록 직후 몇 분 내 활성화. 만료 자동 갱신.

수동 확인: `https://momopick.com`에서 브라우저 자물쇠 클릭 → 인증서 정보. Issuer: Cloudflare.

### 운영에서 dev 도메인 ↔ 운영 도메인 혼동

- `momopick.com` 운영
- `*.pages.dev` Cloudflare Pages 자동 생성 도메인 (preview/production 모두 있음)
- preview deploy 도메인: `<random>.<project>.pages.dev`

운영 검증은 항상 `momopick.com` 또는 사용자 등록 도메인 기준. `*.pages.dev`에서는 redirect, ads.txt, 일부 동작이 다를 수 있음.

## 점검 명령

```bash
# 도메인 응답
curl -sI https://momopick.com/
curl -sI https://www.momopick.com/

# DNS 확인
dig momopick.com A +short
dig www.momopick.com CNAME +short

# SSL
openssl s_client -connect momopick.com:443 -servername momopick.com < /dev/null 2>/dev/null | openssl x509 -noout -dates
```

## Pages Dashboard 위치

Cloudflare Dashboard → Workers & Pages → momopick 프로젝트 → 

- **Custom domains**: 도메인 등록·DNS 상태
- **Deployments**: 빌드 이력·재배포
- **Settings** → Environment variables
- **Settings** → Build & deployments
- **Settings** → Functions (Pages Functions 설정)
