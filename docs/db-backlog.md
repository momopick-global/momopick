# DB 백로그 — quiz_stats 관련 미해결 항목

> 2026-07-14 기준. 퍼널 계측·결과 피드백·참여 수 확대 작업은 **코드만으로 완료**됐고
> (기존 `quiz_stats` 테이블 + `increment_quiz_stat` RPC 재사용, 스키마 변경 없음),
> 아래는 나중에 DB 쪽에서 일괄 처리할 항목들이다.

## 현재 구조 요약

- 테이블: `public.quiz_stats (id text pk, count bigint)` — 단순 카운터.
- RPC: `increment_quiz_stat(p_id)` — upsert 방식이라 새 행 자동 생성. `supabase/quiz_stats_setup.sql` 참고.
- 행 id 규칙 (코드: `src/lib/quizFunnel.ts`, `src/components/quiz/QuizResultFeedback.tsx`):

| 행 id | 의미 | 어디서 +1 |
|---|---|---|
| `{slug}` | 시작(참여) 수 | 인트로 시작 버튼 / 원픽 응답 시 |
| `{slug}__complete` | 완료(결과 도달) | 마지막 문항 응답 시 |
| `{slug}__share` | 결과 공유 클릭 | 결과 카드 공유 버튼(채널 무관, 로드당 1회) |
| `{slug}__fb_fit` | 결과 만족 "잘 맞아요" | 결과 피드백 위젯 |
| `{slug}__fb_miss` | 결과 불만족 "안 맞아요" | 결과 피드백 위젯 |

- 파생 지표: 완료율 = `__complete` ÷ `{slug}`, 공유율 = `__share` ÷ `__complete`, 만족도 = `fb_fit` ÷ (`fb_fit` + `fb_miss`).

## 미해결 항목

### 1. RLS가 anon 전체 쓰기 허용 — 어뷰징 리스크 (우선순위: 높음)

- 현황: `quiz_stats_insert_anon` / `quiz_stats_update_anon` 정책이 `with check (true)` — 누구나 아무 행이나 무한 +1 가능. 클라이언트 update 폴백 경로는 임의 값 set도 가능.
- SQL 파일 주석에도 이미 "운영에서 필요 시 Edge Function + service role 로 이전 권장"이라고 적혀 있음.
- 제안:
  - 1단계(간단): anon의 직접 insert/update 정책 제거, 증가는 `increment_quiz_stat` RPC(security definer)로만 허용. 코드의 `increaseQuizCountFallback`(select→update 폴백)은 제거하거나 RPC 전용으로 정리.
  - 2단계(선택): RPC에 id 형식 검증 추가 — 허용 패턴 `^[a-z0-9-]+(__(complete|share|fb_fit|fb_miss))?$` 외 거부. 임의 문자열 행 생성 방지.
  - 3단계(선택): Edge Function + rate limit. 트래픽 커지기 전엔 과할 수 있음.

### 2. 지표 조회용 뷰/쿼리 없음 (우선순위: 높음)

- 현황: 대시보드 없이 행이 흩어져 있어 완료율·공유율을 매번 수동 계산해야 함.
- 제안: 뷰 하나 추가.

```sql
create or replace view public.quiz_funnel as
select
  base.id as slug,
  base.count as starts,
  coalesce(c.count, 0) as completes,
  coalesce(s.count, 0) as shares,
  coalesce(f.count, 0) as fb_fit,
  coalesce(m.count, 0) as fb_miss,
  round(coalesce(c.count, 0)::numeric / nullif(base.count, 0), 3) as complete_rate,
  round(coalesce(s.count, 0)::numeric / nullif(c.count, 0), 3) as share_rate,
  round(coalesce(f.count, 0)::numeric / nullif(f.count + m.count, 0), 3) as fit_rate
from public.quiz_stats base
left join public.quiz_stats c on c.id = base.id || '__complete'
left join public.quiz_stats s on s.id = base.id || '__share'
left join public.quiz_stats f on f.id = base.id || '__fb_fit'
left join public.quiz_stats m on m.id = base.id || '__fb_miss'
where base.id not like '%\_\_%' escape '\'
order by base.count desc;
```

- 주의: 이 뷰는 anon select가 열려 있으면 외부에서도 조회 가능. 내부용이면 뷰에 별도 RLS/권한 설정.

### 3. 시계열 없음 — 추세·A/B 비교 불가 (우선순위: 중간)

- 현황: 단일 누적 카운터라 "이번 주 완료율이 올랐는지", 제목 A/B 실험 전후 비교가 불가능.
- 제안(택1):
  - a. 가벼움: `pg_cron`으로 일 1회 `quiz_stats` 스냅샷을 `quiz_stats_daily(id, count, snapshot_date)`에 복사. 코드 변경 없음. ← 권장
  - b. 제대로: 이벤트 로그 테이블(`quiz_events(slug, event, created_at)`)로 전환. 쓰기 폭증·정리 정책 필요, 코드도 변경.
- 보고서(딥리서치)의 A/B 실험 축(제목/문항 수/결과 카드)을 하려면 최소 a는 필요.

### 4. 결과 유형별 분포 미집계 (우선순위: 중간)

- 현황: 어떤 결과 유형(밀당형/직진형 등)이 몇 % 나오는지 모름. 결과 밸런스 튜닝(특정 유형 쏠림 방지)과 "당신은 상위 N%" 류 카피에 필요.
- 제안: 완료 시 `{slug}__r_{resultKey}` 행 +1 (퍼센트형은 구간 인덱스 `{slug}__r_{i}`). 스키마 변경 없이 행 규칙만 추가 — 코드 몇 줄이라 DB 정리(1번) 후 같이 넣는 게 좋음. RPC id 검증(1-2단계)을 넣는다면 허용 패턴에 `__r_*` 포함할 것.

### 5. 만족도의 결과 유형별 세분화 (우선순위: 낮음)

- 현황: `__fb_fit/miss`가 퀴즈 단위 집계 — "이 퀴즈의 C 결과만 유독 안 맞는다"를 알 수 없음.
- 제안: 4번 도입 시 `{slug}__fb_fit__{resultKey}`로 확장. 행 수가 늘어나므로 4번과 함께 결정.

### 6. 초기 수치 시딩 여부 (우선순위: 낮음 / 정책 결정)

- 현황: 기존 퀴즈 대부분 시작 카운트 행이 없어 참여 수 라인이 숨겨진 상태로 시작(0이면 자동 숨김). 데이터가 쌓여야 사회적 증거가 작동.
- 결정 필요: 실제 수치만 쓸지(현 상태 유지), 과거 GA/서버 로그 기반 백필을 할지. 임의 부풀리기는 비추천 — 완료율 등 파생 지표가 왜곡됨. 백필한다면 시작 수(`{slug}`)만 넣고 `__complete` 이하는 비워둘 것(완료율이 0으로 보이는 기간 감수).

### 7. 봇/크롤러 필터링 (우선순위: 낮음)

- 현황: anon 키가 클라이언트에 노출되는 정적 사이트 특성상, JS 실행 크롤러가 버튼을 누르면 집계에 섞일 수 있음. 이벤트가 전부 사용자 인터랙션 기반이라 리스크는 낮은 편.
- 제안: 당장 조치 불필요. 수치가 이상하게 튀면 1번(RPC 전용화 + rate limit)으로 대응.

## 처리 순서 제안

1 (RLS 정리) → 2 (뷰) → 3a (일별 스냅샷) → 4 (결과 분포, 코드 변경 동반) → 5·6·7 은 필요 시.
