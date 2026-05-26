# Sitemap & robots.txt — 모모픽

## sitemap.xml

| 항목 | 값 |
|---|---|
| 위치 | `public/sitemap.xml` |
| 관리 방식 | **수기 관리** (자동 생성 스크립트 없음) |
| 빌드 동작 | `public/` → `out/`으로 그대로 복사. 덮어쓰기 없음 |
| 운영 URL | `https://momopick.com/sitemap.xml` |
| 현재 등록 URL 수 | 31개 (2026-05-25 기준) |

## 등록된 URL 분류 (31)

| 카테고리 | 수 |
|---|---|
| Apex + ko 홈 | 2 (`/`, `/ko/`) |
| 카테고리 허브 | 1 (`/ko/love/`) |
| 연애 퀴즈 19개 | 19 |
| 정책 페이지 | 2 (`privacy`, `terms`) |
| 블로그 글 7개 | 7 |
| **합계** | **31** |

## sitemap 미등록 (의도적 또는 누락)

| URL | 사유 |
|---|---|
| `/ko/explore/`, `/ko/today/` | `noindex` 처리됨 — sitemap에서 의도적으로 제외 |
| `/ko/feedback/`, `/ko/app/login/`, `/ko/app/saved/` | `noindex` — 제외 |
| `/ko/love/<slug>/results/` 19개 | (검토 필요) 결과 카탈로그 페이지가 색인 가치 있는지 결정 후 |
| `/ko/about/`, `/ko/blog/`(인덱스), `/ko/notice/`, `/ko/faq/`, `/ko/partnership/`, `/ko/policy/disclaimer/` | **누락 — 추가 검토 권장** |

## hreflang

각 URL에 `xhtml:link rel="alternate" hreflang="ko|en|ja|es|pt|id|x-default"` 등록. 다국어 placeholder는 `noindex`라 실제 노출은 없음.

## 새 URL 추가 절차

1. `public/sitemap.xml` 열기
2. 마지막 `</urlset>` 직전에 `<url>` 블록 추가:
   ```xml
   <url>
     <loc>https://momopick.com/ko/<path>/</loc>
     <lastmod>YYYY-MM-DD</lastmod>
     <changefreq>monthly</changefreq>
     <priority>0.5</priority>
   </url>
   ```
3. `priority` 가이드:
   - 홈: 1.0
   - 주요 허브 (`/ko/`, `/ko/love/`): 0.8~0.9
   - 퀴즈 페이지: 0.7
   - 블로그 글: 0.5
   - 정책: 0.3
4. 빌드 후 `out/sitemap.xml`에 정합 확인
5. 운영 반영 후 Google Search Console에 재제출 (선택)

## XML 유효성 검증

```bash
python3 -c "import xml.etree.ElementTree as ET; t = ET.parse('public/sitemap.xml'); print(f'OK, {len(list(t.getroot()))} urls')"
```

## robots.txt

| 항목 | 값 |
|---|---|
| 위치 | `public/robots.txt` |
| 운영 URL | `https://momopick.com/robots.txt` |

### 우리가 작성한 본문

```
User-agent: *
Allow: /

# Disallow: /ko/app/   ← 주석 처리 (앱 페이지는 noindex 메타로 제외)

Sitemap: https://momopick.com/sitemap.xml
```

### Cloudflare가 자동 prepend

운영 응답에는 Cloudflare가 AI 봇 차단 블록을 앞에 붙임:

```
User-agent: *
Content-Signal: search=yes,ai-train=no
Allow: /

User-agent: Amazonbot       Disallow: /
User-agent: Applebot-Extended  Disallow: /
User-agent: Bytespider      Disallow: /
User-agent: CCBot           Disallow: /
User-agent: ClaudeBot       Disallow: /
User-agent: Google-Extended Disallow: /
User-agent: GPTBot          Disallow: /
User-agent: meta-externalagent Disallow: /
... (etc)
```

**중요**: AdSense 봇 차단 없음 ✅
- `Mediapartners-Google` ❌ 차단 안 됨
- `AdsBot-Google` ❌ 차단 안 됨
- 일반 `Googlebot` ❌ 차단 안 됨
- `Google-Extended`만 차단 (AI 학습용. AdSense와 무관)

## sitemap & noindex 정합성

원칙: **`noindex` 페이지는 sitemap에 등록하지 않는다.** Search Console에서 "Submitted URL marked 'noindex'" 경고가 잡혀 sitemap 품질 점수 하락.

## Search Console 운용

[search-console.md](./search-console.md) 참조.

## canonical 도메인

모든 URL은 `https://momopick.com/` (apex, trailing slash) 기준. `www`는 사용 안 함 (301로 흡수).
