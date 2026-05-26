# AdSense Review — 모모픽

## 현재 상태 (2026-05-25)

| 항목 | 상태 |
|---|---|
| AdSense 가입 | 진행 중 (심사 대기 가능 상태) |
| Publisher ID | `pub-2758905830381994` (코드 상수 + ads.txt) |
| 심사 스크립트 | ✅ `src/app/layout.tsx` `<head>`에 raw `<script async src="...pagead2.googlesyndication.com/...js?client=ca-pub-...">` |
| ads.txt | ✅ `public/ads.txt`, 운영 200, 내용 정확 |
| 광고 슬롯 UI | ❌ 미배치 (승인 후 진행 예정) |

## 심사 통과를 위해 적용한 작업

- ✅ AdSense script 모든 페이지 `<head>` 안에 정확히 (정적 export → 모든 19+ 정적 페이지 동일 적용)
- ✅ `public/ads.txt` 생성 + 운영 200
- ✅ 개인정보처리방침 보완 (`src/app/ko/policy/privacy/page.tsx`):
  - §2 수집 항목에 "광고 게재·측정 (쿠키·기기 식별자·광고 식별자, 페이지 방문·이용 기록)" 추가
  - §4 위탁에 "Google LLC (Google AdSense)" 1문단
  - §5 국외 이전에 "Google LLC (미국)" 1문단
  - §9 "쿠키 및 광고" 섹션 확장: 맞춤형 광고 / `adssettings.google.com` / `aboutads.info` / `youronlinechoices.eu` opt-out 링크 3개
- ✅ 면책조항 §6 "제3자 광고" 신규 섹션 (`src/app/ko/policy/disclaimer/page.tsx`)
- ✅ `/ko/explore/`, `/ko/today/` `noindex` 처리 (준비 중 콘텐츠가 심사에 부정 영향 방지)
- ✅ sitemap에 블로그 7개 URL 추가
- ✅ `ambiguous-situationship-end` C/D 결과의 누락 이미지를 `quiz-image-pending.webp`로 임시 대체 → Kakao 공유 카드 깨짐 방지

## 운영자 신뢰성 (AdSense 평가에 긍정 영향)

| 항목 | 노출 |
|---|---|
| 사업자 정보 | footer에 `ASOG Co., Ltd.` + 주소 + 사업자등록번호 `370-54-00601` + 통신판매업 `2021-Seoul-Seodaemun-0013` |
| 운영 이메일 | `momopick.global@gmail.com` (privacy/terms/feedback/partnership 4개 페이지) |
| 외부 채널 | 카카오톡 채널, Instagram |
| 정책 페이지 3종 | privacy + terms + disclaimer 모두 실질 본문 |
| 로그인 강제 없음 | 크롤러가 익명으로 모든 콘텐츠 접근 가능 |

## 남아 있는 리스크

| 리스크 | 영향 | 대응 |
|---|---|---|
| 짧은 블로그 글 5/7 (220~320자) | thin-content 사유 거절 가능 | 본문 확장 또는 임시 제거 |
| 다국어 placeholder 6개 (/en/, /ja/, /es/, /pt/, /id/, 본문 75자) | noindex로 보호되지만 AdSense 크롤러는 noindex 무시 가능 | sitemap hreflang에서 제거 검토 |
| `quiz-image-pending.webp` placeholder 노출 | ambiguous-situationship-end C/D 결과 + 빈 슬러그 폴더(이미지만 있음) | 자산 생성 후 원복 |
| GA4 미설치 | 트래픽 측정 불가 (직접적 거절 사유 아님) | 별도 작업 |
| 광고 정책 동의 배너 (CMP) 미적용 | EEA 트래픽 있을 시 필요 | 승인 후 검토 |
| 콘텐츠 양 절대치 부족 가능성 | 19 퀴즈 + 7 블로그 (5개 짧음) | 콘텐츠 추가 |

## 심사 요청 전 최종 체크리스트

- [ ] `https://momopick.com/ads.txt` 200 + 내용 정확
- [ ] 모든 주요 페이지 `<head>`에 AdSense script 존재 (script tag 형태)
- [ ] 정책 페이지 3종 200 응답
- [ ] 정책 페이지에 AdSense / Google / 광고 식별자 / `adssettings.google.com` 노출
- [ ] 사이트 메인에서 정책 페이지 footer 링크 발견 가능
- [ ] `noindex` 페이지가 placeholder/짧은 콘텐츠 위주인지 확인
- [ ] `npm run build` 통과
- [ ] sitemap에 손상된(404) URL 없음

## 심사 결과 시나리오

| 결과 | 다음 작업 |
|---|---|
| **승인** | 광고 슬롯 배치 결정 → 결과 페이지 하단 / 블로그 본문 중 / 사이드바 검토 |
| **반려: low-value content** | 블로그 글 본문 확장 (600~1000자) + placeholder 페이지 정리 후 재심사 |
| **반려: navigation** | 내부 링크 보강, 카테고리 페이지 (`/ko/love/`) 가시성 강화 |
| **반려: 정책 페이지** | 본 문서 § "적용한 작업"의 추가 보강 |

## 운영 검증 명령

```bash
# AdSense head script
curl -s https://momopick.com/ | grep -oE '<script[^>]*pagead2[^>]*>' | head -1

# ads.txt
curl -s https://momopick.com/ads.txt

# 정책 페이지에 Google AdSense 문구
curl -s https://momopick.com/ko/policy/privacy/ | grep -oE "AdSense|Google|adssettings" | sort -u

# 면책조항
curl -s https://momopick.com/ko/policy/disclaimer/ | grep -oE "제3자 광고|광고주"
```

## 관련 문서

- 일반 SEO 점검: [seo-checklist.md](./seo-checklist.md)
- sitemap·robots: [sitemap-robots.md](./sitemap-robots.md)
- 심사 거절 시 트러블슈팅: [../troubleshooting/adsense-issues.md](../troubleshooting/adsense-issues.md)
