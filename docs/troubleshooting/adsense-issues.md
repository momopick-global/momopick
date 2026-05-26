# Troubleshooting — AdSense Issues

## 심사 거절 가능 사유

### Low value content (콘텐츠 부족)

- 짧은 본문 (블로그 글 200~300자) — **현재 5/7 글이 해당**
- 페이지 수 부족 — 19 퀴즈 + 7 블로그는 통과 가능 범위지만 절대치 부족 평가 가능
- 중복 콘텐츠 — 모모픽은 슬러그별 콘텐츠 독립

**대응**:
- 짧은 블로그 글 본문 확장 (600~1000자 이상)
- 또는 임시로 짧은 글 5개 비공개 처리

### Insufficient content (콘텐츠 부적합)

- 결과 페이지가 이미지 위주 — 텍스트 본문 충분히
- "준비 중" / placeholder 페이지 — **`/ko/explore/`, `/ko/today/` 이미 noindex 처리**
- 404 페이지 다수 — 빈 슬러그 4개는 라우트가 없어 404 (영향 적음)

**대응**:
- placeholder 노출 페이지 noindex
- 결과 페이지 본문 충분히 채움 (이미 운영 결과는 본문 있음)

### Navigation issues (탐색성)

- 메뉴 구조 불명확
- 정책 페이지 못 찾음
- 외부 링크만 가득

**대응**:
- 모모픽 footer에 정책 링크 명확 ✅
- 카테고리 허브 `/ko/love/` 존재 ✅
- About 페이지 존재 ✅

### Policy violations (정책 위반)

- 성인 콘텐츠 / 도박 / 마약 / 폭력 / 혐오
- 의학적 진단 표현
- 과장된 약효·과학 주장
- 저작권 침해 콘텐츠

**대응**:
- 모모픽 콘텐츠는 의학적 단정 X (톤 가이드)
- 면책 톤 ("재미 + 자기이해 목적")

### Mobile usability

- 모바일 사용성 점수 낮음
- 텍스트 너무 작음
- 터치 영역 너무 작음

**대응**:
- viewport meta ✅
- 모바일 우선 디자인 ✅
- 터치 영역 44px+ (대부분 만족)

### Required content (필수 정책 페이지)

- Privacy Policy ❌ → ✅ (`/ko/policy/privacy/`)
- Terms of Service ❌ → ✅ (`/ko/policy/terms/`)
- Disclaimer (선택) → ✅ (`/ko/policy/disclaimer/`)
- About (선택) → ✅ (`/ko/about/`)
- Contact (선택) → ✅ (footer + `/ko/feedback/`, `/ko/partnership/`)

## 재심사 전 체크리스트

### 기술
- [ ] `https://momopick.com/ads.txt` 200 + 내용 정확
- [ ] 모든 페이지 `<head>`에 AdSense raw `<script>` 존재
- [ ] `<script async src="...pagead2...">` 형태 확인:
  ```bash
  curl -s https://momopick.com/ | grep -oE '<script[^>]*pagead2[^>]*>'
  ```
- [ ] Mediapartners-Google, AdsBot-Google 차단 없음 (robots.txt)
- [ ] sitemap 정상 200, XML 유효
- [ ] 모든 등록 URL 200

### 콘텐츠
- [ ] 블로그 글 모두 600자 이상 (또는 짧은 글 임시 제거)
- [ ] 모든 결과 페이지에 본문 250~400자 이상
- [ ] placeholder 페이지 noindex 또는 콘텐츠 추가
- [ ] 404 페이지 없음 (sitemap URL 전부 200)

### 정책 페이지
- [ ] 개인정보처리방침에 AdSense / Google / 광고 식별자 / adssettings.google.com 노출
- [ ] 면책조항에 제3자 광고 면책 1문단
- [ ] 이용약관에 광고·결제 정책 (있을 경우)

### 운영자 신뢰성
- [ ] footer에 운영자 정보 (사업자명·주소·등록번호) ✅ (현재)
- [ ] 연락 가능한 이메일 노출 ✅
- [ ] 외부 채널 (Kakao 채널, Instagram 등) 노출 ✅

### 모바일
- [ ] 모든 페이지 viewport meta
- [ ] Mobile-friendly test (Google) 통과
- [ ] 카카오톡 인앱에서도 깨지지 않음

## 거절 메일 받았을 때

1. 거절 사유 정확히 확인 ("Low value content" 등 카테고리)
2. AdSense Help 문서에서 해당 사유 페이지 확인
3. 모모픽 측 대응:
   - 사유에 해당하는 페이지 식별
   - 콘텐츠 보강 또는 noindex
   - 재배포 + 대기 (보통 며칠~1주 후 재심사 가능)
4. AdSense 대시보드에서 "Request review" 다시 요청

## 심사 자체 모니터링

- Google AdSense Dashboard에서 상태 확인
- 보통 1~2주 내 결과 (최대 1개월)
- 결과 메일 + 대시보드 상태 변경

## 광고 표시 안 됨 (심사 통과 후)

- 심사 통과해도 광고가 즉시 표시되지 않을 수 있음 (수십분~수시간)
- `adsbygoogle` 슬롯이 페이지에 추가되어 있어야 광고 노출
- 현재 슬롯 미배치 → 승인 후 별도 작업

## 광고 정책 변경 추적

- Google AdSense Help / Program policies 주기적 확인
- 한국어 콘텐츠 정책: https://support.google.com/adsense/answer/9335564

## 관련 문서

- AdSense 심사 준비 요약: [../seo/adsense-review.md](../seo/adsense-review.md)
- AdSense 코드 위치: [../project/protected-areas.md](../project/protected-areas.md)
