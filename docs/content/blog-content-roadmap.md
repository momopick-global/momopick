# Blog Content Roadmap — 블로그 콘텐츠 계획표

> 작성 기준일: 2026-07-06
> 목적: `/ko/blog/` 글을 (1) AdSense thin-content 리스크 해소, (2) 퀴즈와 내부 링크로 연결해 SEO·회유(回遊) 강화하는 방향으로 확장.
> 데이터: `src/content/blog/koSamplePosts.ts` · 작성법: [blog-writing-guide.md](./blog-writing-guide.md) · 기능 구조: [../features/blog.md](../features/blog.md)

## 현황 요약 (2026-07-09 갱신)

**운영 중인 글 18편.** 길이 리스크 해소(대부분 600자+), 이미지 17/18편 연결, 신규 글 전부 **자체 유형 렌즈** 적용.

- 카테고리 분포: love 7 · personality 4 · fun 3 · story 3 · tarot 1
- 남은 할 일: `island-one-pick-values` 커버 1장, `new-quizzes-rhythm` 소폭 확장(584자)
- 남은 후보: T1~T2(타로), F1(원픽 즐기는 법)
- 글별 상세 목록은 [../features/blog.md](../features/blog.md#운영-중인-글-17개-2026-07-09-확인) 참고 (중복 관리 방지)

이제 로드맵의 초점은 **남은 후보(T1~T2 타로, F1·F3 원픽) 발행 + 유형 렌즈 유지**에 있다.

| slug | 제목 | 카테고리 | 본문 | 상태 |
|---|---|---|---|---|
| `signs-som-turning-into-love` | 썸에서 연애로 넘어가는 신호 | love | ~1,541자 | ✅ 양호 |
| `what-is-tarot` | 🔮 타로 카드란 무엇인가? | tarot | ~1,271자 | ✅ 양호 |
| `why-som-always-ends-awkwardly` | 📌 썸이 항상 애매하게 끝나는 이유 | love | ~1,220자 | ✅ 양호 |
| `mbti-not-diagnosis` | MBTI·성향 퀴즈, 진단이 아니라는 걸… | story | ~1,118자 | ✅ 양호(확장 완료) |
| `snack-test-what` | 스낵 테스트가 뭐예요? | fun | ~972자 | ✅ 양호(확장 완료) |
| `love-category-editor` | 연애 테스트, 웃으면서 보는 게 포인트 | love | ~972자 | ✅ 양호(확장 완료) |
| `share-result` | 테스트 결과, 친구에게 공유해 보세요 | story | ~956자 | ✅ 양호(확장 완료) |
| `new-quizzes-rhythm` | 앞으로도 테스트는 꾸준히 늘어납니다 | story | ~775자 | ✅ 양호(확장 완료) |

퀴즈는 현재 31개(썸·연애 중심 + 원픽 + 성격·심리). 블로그 글마다 **연결 퀴즈**를 지정해 본문 끝에서 유도하면, 콘텐츠 두께와 페이지 회유를 동시에 얻는다.

## 우선순위 원칙

1. ~~**P0 — 기존 thin 글 확장**~~ ✅ **완료** (5개 전부 600자+ 확장됨, 2026-07-06).
2. **P1 — 필러(pillar) 글**: 카테고리별 대표 글. 검색 유입 노림, 1,000자+.
3. **P2 — 원픽·재미 글**: 가볍게, 600~800자. 발행 리듬 유지용.
4. **P3 — 운영/업데이트 글**: 월 1회 "이번 달 새 테스트" 정례.

발행 리듬 권장: **주 1편** (P0 소진 → P1 → P2 순환, 매월 말 P3).

---

## P0 — 기존 글 확장 ✅ 완료 (2026-07-06)

아래 5개는 전부 600자+로 확장 완료. 기록 보존용.

| # | 대상 slug | 확장 방향 | 연결 퀴즈 | 결과 |
|---|---|---|---|---|
| A1 | `snack-test-what` | "스낵 테스트란?" + 왜 3분인지 + 즐기는 법 3가지 + 대표 원픽 소개 | `color-mood-onepick`, `dessert-love-onepick` | ✅ ~972자 |
| A2 | `share-result` | 공유가 재미있는 이유 + 상황별 공유 멘트 예시 + 캡처 팁 | `who-likes-you-type` | ✅ ~956자 |
| A3 | `love-category-editor` | "웃으면서 보기"의 의미 + 연애 테스트 활용 사례 + 대표 3선 | `dating-expert-or-beginner`, `love-temperature-test` | ✅ ~972자 |
| A4 | `new-quizzes-rhythm` | → P3 월간 업데이트 글로 흡수 검토 (중복 축소) | — | ✅ ~775자 |
| A5 | `mbti-not-diagnosis` | 진단이 아닌 이유 + 재미로 보는 법 + 면책 톤 강화 | `personality-psychology-test`, `logical-or-emotional` | ✅ ~1,118자 |

> A4는 `new-quizzes-rhythm`과 P3(월간 업데이트)이 주제가 겹침 — 향후 하나로 합치거나 story 카테고리 대표글로 재구성 검토(선택).

---

## P1 — 카테고리별 필러 글 (신규)

> ✅ 발행: L1·L2·L3·L4·L5·P1·P2·P3(2026-07-06), P4(2026-07-09) — 총 9편. 전부 유형 렌즈 적용, 연결 퀴즈 실제 유형 인용. 남은 후보: T1~T2(타로), F1~F3(원픽·재미).

### 썸·연애 (love)

| # | 제목안 | 연결 퀴즈 | 태그 |
|---|---|---|---|
| L1 | 썸에서 연애로 넘어가는 신호 5가지 | `ambiguous-situationship-end`, `confession-success-rate` | 가이드 |
| L2 | 고백 타이밍, 언제가 진짜 적기일까 | `confession-success-rate`, `love-temperature-test` | 가이드 |
| L3 | 자꾸 연애를 망치는 습관, 이렇게 알아챈다 | `love-pattern-destroying-habit`, `relationship-balance-test` | 에디터노트 |
| L4 | "식었다"는 신호, 오해와 진짜 | `when-men-lose-interest`, `who-likes-you-type` | 에디터노트 |
| L5 | 먼저 연락 못 하는 사람의 심리 | `why-cant-you-text-first`, `emotional-sensitivity` | 가이드 |

### 성격·심리 (personality)

| # | 제목안 | 연결 퀴즈 | 태그 |
|---|---|---|---|
| P1 | 계획형 vs 즉흥형, 뭐가 더 좋을까 | `planner-or-spontaneous`, `logical-or-emotional` | 가이드 |
| P2 | 자존감이 낮을 때 나타나는 신호 | `self-esteem-level`, `mental-strength-test` | 에디터노트 |
| P3 | 혼자 있을 때 진짜 성격이 나온다 | `true-self-alone`, `hidden-dark-side` | 가이드 |
| P4 | 예민함은 단점이 아니다 | `emotional-sensitivity`, `trust-level-test` | 에디터노트 |

### 타로 (tarot) — `what-is-tarot` 후속

| # | 제목안 | 연결 | 태그 |
|---|---|---|---|
| T1 | 타로 3장 스프레드, 쉽게 보는 법 | `what-is-tarot`(내부), `/ko/today/` | 가이드 |
| T2 | 오늘의 타로, 이렇게 활용하세요 | `/ko/today/` | 팁 |

---

## P2 — 원픽·재미 글 (신규, 가볍게)

| # | 제목안 | 연결 퀴즈 | 태그 |
|---|---|---|---|
| F1 | 원픽 테스트 200% 즐기는 법 | `color-mood-onepick`, `dessert-love-onepick`, `flower-charm-onepick` | 팁 |
| F2 | ✅ 발행(2026-07-09) 오늘 끌리는 색으로 보는 지금의 기분 → `color-mood-today` | `color-mood-onepick`, `night-sky-mood-onepick` | 가이드 |
| F3 | 무인도에 딱 하나 가져간다면? — 선택으로 보는 가치관 | `island-value-onepick`, `travel-need-onepick` | 팁 |

---

## P3 — 운영/업데이트 (정례)

| # | 제목안 | 주기 | 태그 |
|---|---|---|---|
| S1 | 이번 달 새로 추가된 테스트 모음 | 매월 말 | 업데이트 |
| S2 | 모모픽 사용법 한눈에 보기 | 필요 시 갱신 | 가이드 |

---

## 발행 체크리스트 (글마다)

- [ ] 본문 600자+ (필러는 1,000자+)
- [ ] 연결 퀴즈 1~2개를 본문 끝에서 자연스럽게 유도
- [ ] `excerpt` 60~120자, 제목 이모지 1개
- [ ] `category` / `tag` 지정
- [ ] `src/content/blog/koSamplePosts.ts`에 객체 추가
- [ ] `public/sitemap.xml`에 `<url>` 등록
- [ ] `npm run build` 통과 → `/ko/blog/`, `/ko/blog/<slug>/` 확인

## 다음 액션 (제안)

1. ~~P0 A1~A5 확장~~ ✅ 완료 — 길이 리스크 해소됨.
2. **주 1편 P1**부터 발행, 매월 말 **P3 S1** 정례.
3. 성격·심리 글이 쌓이면 nav의 `personality`(현재 `live: false`)를 켜는 시점 검토.
