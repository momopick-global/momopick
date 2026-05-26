# Troubleshooting — Search Console

## 자주 마주치는 이슈

### "Couldn't fetch" — sitemap 제출 실패

체크리스트:
1. `https://momopick.com/sitemap.xml` 직접 브라우저/curl로 200 응답 확인
2. XML 유효성 검증:
   ```bash
   python3 -c "import xml.etree.ElementTree as ET; ET.parse('public/sitemap.xml')"
   ```
3. Cloudflare가 robots.txt에서 Googlebot 차단하지 않았는지
4. CDN 캐시로 옛 sitemap 응답 → Cloudflare 대시보드에서 "Purge Cache" (필요 시)
5. Search Console의 sitemap URL이 정확한지 (`/sitemap.xml` 끝)

### Submitted URL marked 'noindex'

- 의도된 경우(`/ko/feedback/` 등): sitemap에서 해당 URL 제거
- 의도하지 않은 경우: 해당 페이지의 `metadata.robots` 확인
- noindex 페이지를 sitemap에 넣으면 품질 점수 하락

### Submitted URL not found (404)

- 빌드 후 해당 URL이 실제 생성됐는지 확인:
  ```bash
  ls out/ko/<path>/index.html
  ```
- `generateStaticParams`에 누락된 dynamic route 가능성
- Cloudflare가 어떤 이유로 404 반환하는지: `curl -sI <URL>`

### Crawled — currently not indexed

- Google이 크롤링했지만 색인 보류
- 보통 콘텐츠 품질 신호 부족 (짧은 본문, 다른 페이지와 중복, 내부 링크 부족)
- 해결:
  - 본문 확장
  - 다른 페이지에서 내부 링크 추가
  - 내부 검색 / 카테고리에서 가시성 확보
- 시간 두고 재확인

### Duplicate without user-selected canonical

- 같은 콘텐츠에 여러 URL 존재 → canonical 미설정 또는 다른 URL이 canonical로 선택됨
- `<link rel="canonical">` 명시되어 있는지 확인:
  ```bash
  curl -s https://momopick.com/ko/<path>/ | grep -oE 'canonical[^>]*'
  ```
- 모모픽은 모든 페이지가 `metadata.alternates.canonical` 명시 → 발생 가능성 낮음

### Page with redirect

- Search Console이 redirect 페이지를 색인 안 함 (정상)
- `www.momopick.com/*`은 301로 흡수되므로 색인 대상 X

## sitemap 제출 절차

1. Search Console → Sitemaps 탭
2. URL: `sitemap.xml` (도메인 root 기준)
3. Submit 클릭
4. 상태: 보통 1~2일 내 "Success" (URL 수 표시됨)

## URL Inspection (개별 URL 검사)

새 페이지·중요 변경 후:
1. Search Console → URL Inspection
2. 전체 URL 입력 (`https://momopick.com/ko/...`)
3. "Test live URL" 또는 "Request indexing"
4. 결과:
   - "URL is on Google" — 색인됨
   - "URL is not on Google" — 미색인. "Request indexing" 클릭

색인 요청은 즉시 보장 아님. 보통 며칠 내 처리.

## robots.txt 점검

```bash
# 운영 robots.txt
curl -s https://momopick.com/robots.txt

# Mediapartners-Google 차단 없음을 확인
curl -s https://momopick.com/robots.txt | grep -iE "mediapartners|adsbot|googlebot"
```

자세한 건 [../seo/sitemap-robots.md](../seo/sitemap-robots.md).

## Coverage 보고서 점검 주기

| 빈도 | 항목 |
|---|---|
| 매주 | 새 제외 사유 |
| 새 페이지 배포 후 | URL Inspection으로 색인 요청 |
| 새 sitemap 변경 후 | Sitemaps 탭에서 "Last read" 시간 |

## 관련

- sitemap·robots 관리: [../seo/sitemap-robots.md](../seo/sitemap-robots.md)
- Search Console 운용: [../seo/search-console.md](../seo/search-console.md)
- 일반 SEO: [../seo/seo-checklist.md](../seo/seo-checklist.md)
