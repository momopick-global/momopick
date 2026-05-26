# Google Search Console — 모모픽

## 권장 셋업

1. Search Console에서 `momopick.com` 속성 추가 (Domain property 권장)
2. 소유권 확인: DNS TXT 레코드 (Cloudflare DNS 관리)
3. Sitemap 제출: `https://momopick.com/sitemap.xml`

## URL 검사 / 색인 요청

새 페이지 또는 콘텐츠 큰 변경 후:
1. Search Console → URL Inspection
2. 해당 URL 입력 → "Request Indexing"
3. 보통 며칠 내 색인. 강제 보장은 아님

## Sitemap 제출

- 위치: Sitemaps 탭
- URL: `https://momopick.com/sitemap.xml`
- 상태가 "성공"이고 등록 URL ≈ sitemap의 `<url>` 수와 비슷한지 확인
- "couldn't fetch" 시: [../troubleshooting/search-console.md](../troubleshooting/search-console.md) 참조

## 점검할 보고서

| 보고서 | 의미 |
|---|---|
| Coverage / Pages | 색인된 페이지 수, 제외된 페이지 사유 |
| Mobile Usability | 모바일 친화도 (현재 viewport meta 정상 → 통과 예상) |
| Core Web Vitals | LCP, FID/INP, CLS — 광고 도입 전후 비교 |
| Manual Actions | 수동 패널티 (없어야 정상) |
| Security Issues | 해킹/맬웨어 (없어야 정상) |

## 자주 나오는 색인 제외 사유

| 사유 | 의미 / 대응 |
|---|---|
| Excluded by 'noindex' tag | 의도된 상태. feedback/login/saved/explore/today |
| Crawled — currently not indexed | Google이 봤지만 색인 안 함. 콘텐츠 품질 신호 보강 (내부 링크, 본문 확장) |
| Duplicate without user-selected canonical | canonical 누락 또는 다른 URL이 canonical로 선택됨 |
| Page with redirect | `www.momopick.com/*` → apex 301 (정상) |
| Soft 404 | 콘텐츠가 거의 없는 페이지. placeholder 글 의심 |

## 인기 검색어 / 페이지

Performance 탭에서:
- 평균 노출 / 클릭 수
- 검색어별 CTR
- 페이지별 성능

블로그 글 키워드 SEO 튜닝에 활용.

## 점검 주기

| 빈도 | 항목 |
|---|---|
| 매주 | Coverage 새 제외 사유 |
| 매월 | Performance 검색어 / 페이지 비교 |
| 새 페이지 배포 후 | URL Inspection으로 색인 요청 |

## 관련 문서

- sitemap·robots 관리: [sitemap-robots.md](./sitemap-robots.md)
- 트러블슈팅: [../troubleshooting/search-console.md](../troubleshooting/search-console.md)
