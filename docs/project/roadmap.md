# Roadmap — 모모픽

> 확정된 일정이 아니라 **검토 중 백로그**. 실제 진행은 사용자 결정에 따름.

## 단기 (AdSense 심사 통과 전후)

- [ ] AdSense 심사 결과 모니터링 → 승인 시 광고 슬롯 배치 결정
- [ ] `ambiguous-situationship-end` result-3/4 실제 이미지 자산 추가 → JSON 원복
- [ ] 짧은 블로그 글 5개 본문 확장 (600~1000자 이상) 또는 임시 제거
- [ ] sitemap에 빠진 정적 페이지 추가 검토: `/ko/about/`, `/ko/blog/`(인덱스), `/ko/notice/`, `/ko/faq/`, `/ko/partnership/`, `/ko/policy/disclaimer/`

## 중기

- [ ] GA4 도입 (광고 도입 전 트래픽·전환 가시화)
- [ ] AdSense 광고 슬롯 배치 (상단·결과 페이지·블로그 본문 중)
- [ ] 빈 love 슬러그 정리 또는 출시:
  - 자산 보유 3개 (`dating-personality-type`, `ideal-type-reality-test`, `why-my-relationships-fail`) → 콘텐츠 JSON 작성 후 출시
  - 자산 0 1개 (`your-love-type`) → 정리 또는 자산 발주
- [ ] `/ko/explore/` 실 콘텐츠 구현 (현재 noindex placeholder)
- [ ] `/ko/today/` 실 콘텐츠 구현 (타로 일운 — 현재 noindex placeholder)

## 장기

- [ ] 다국어 본격 출시 (en/ja/es/pt/id) — 현재 placeholder
- [ ] sitemap 자동 생성 스크립트 (현재 수기 관리)
- [ ] 정책 페이지 다국어
- [ ] `tools/check-quiz-images.mjs` strict 모드를 빌드에 통합
- [ ] 다중 카테고리 확장 (현재는 `love` 카테고리만 — `personality`, `social`, `style` 등)

## 검토 필요 (사용자 결정 미정)

- [ ] 홈에 숨겨둔 스낵 퀴즈 섹션 재활성화 (`25194f7`에서 hide 처리됨)
- [ ] 광고 정책 강화 시 동의 배너 도입 (CMP)
- [ ] `<meta name="google-adsense-account">` 메타 태그 추가 검토

## 명시적으로 진행하지 않을 작업

- ❌ 카카오 공유 코드 시그니처 변경
- ❌ Supabase 스키마 마이그레이션 (현 `quiz_stats` 운영 중)
- ❌ 라우트 구조 변경 (`/ko/love/<slug>/` trailing slash)
- ❌ `output: "export"` → SSR 전환
