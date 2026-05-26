# Supabase Stats — 참여자 수 통계

> ⚠️ **Protected area** — Supabase 스키마/RPC 변경 시 운영 영향. [../project/protected-areas.md](../project/protected-areas.md) 참고.

## 개요

각 퀴즈의 누적 참여자 수를 Supabase Postgres에 기록 + 퀴즈 인트로 화면에 표시.

## 동작 흐름

1. 인트로 마운트 시 1회 fetch: 현재 `count`
2. 사용자가 "시작" 버튼 클릭 시 1회 RPC 호출: `increment_quiz_stat(quizId)`
3. fetch된 count + 클라이언트 측 1 증분으로 UI 즉시 반영

## 파일 구조

| 파일 | 역할 |
|---|---|
| `src/lib/quizStatsSupabase.ts` | `initQuizCount(quizId, onCount)` / `increaseQuizCount(quizId)` |
| `src/hooks/useQuizParticipantCount.ts` | 인트로용 훅 (중복 호출 가드 포함) |
| `src/components/quiz/SnackQuizIntroWithLiveCount.tsx` | 인트로 UI에 count 표시 |
| `supabase/quiz_stats_setup.sql` | 테이블 + RLS + RPC 정의 |
| `supabase/migrations/` | 추가 마이그레이션 |

## DB 스키마 (요약)

```sql
create table quiz_stats (
  quiz_id text primary key,
  count bigint not null default 0,
  updated_at timestamptz not null default now()
);

-- 익명 read 허용, write는 RPC만
create policy "Public read" on quiz_stats for select to anon, authenticated using (true);

-- RPC: 안전한 atomic increment (RLS 우회용 SECURITY DEFINER)
create or replace function increment_quiz_stat(quiz_id_input text)
returns bigint
language plpgsql
security definer
as $$
declare new_count bigint;
begin
  insert into quiz_stats(quiz_id, count) values (quiz_id_input, 1)
    on conflict (quiz_id) do update
    set count = quiz_stats.count + 1, updated_at = now()
    returning count into new_count;
  return new_count;
end;
$$;
```

자세한 건 `supabase/quiz_stats_setup.sql` 직접 확인.

## 클라이언트 사용 패턴

```ts
const { count, registerStart } = useQuizParticipantCount(quizId);

// 마운트 시 자동 fetch (Suspense 없음, count는 null → 숫자)
<p>{count == null ? "..." : `${count.toLocaleString()}명 참여`}</p>

// 시작 버튼
<button onClick={async () => {
  await registerStart();
  startQuiz();
}}>시작</button>
```

## 중복 호출 방지

`useQuizParticipantCount` 내부:
- `isCountingRef`: 동시 호출 가드
- `registerStartSeqRef`: 같은 마운트 내 재시작 시 일회성 호출
- 개발 환경에서 React 18+ Strict Mode가 effect를 2회 호출해도 incr는 1회만

## 에러 처리

- Supabase 미설정 환경: `getClient()` null → 조용히 무시 (count는 null로 유지)
- 네트워크 에러: console.error만, UI는 영향 받지 않음
- `logQuizStatsError`가 다양한 에러 형태(`{}`, `Error`, custom object)를 모두 파싱해서 로그

## RLS / 보안

- `quiz_stats` 테이블 직접 INSERT/UPDATE는 anon에게 차단
- 모든 증분은 RPC `increment_quiz_stat` 경유 (SECURITY DEFINER)
- 단점: 클라이언트가 임의 quizId로 RPC 호출 가능 → 가짜 quizId로 임의 행 생성 가능. 운영상 큰 위협은 아니지만 monitoring 필요 시 RPC 안에 화이트리스트 추가 검토.

## 새 퀴즈 추가 시

별도 작업 불필요. RPC가 첫 호출에서 `INSERT ... ON CONFLICT`로 자동 생성.

## 마이그레이션 관리

`supabase/migrations/`에 추가. Supabase CLI 또는 Dashboard SQL Editor로 적용. 이력 관리 권장.

## 모니터링

Supabase Dashboard → Database → Tables → `quiz_stats`로 직접 확인. 또는 SQL:

```sql
select quiz_id, count, updated_at
from quiz_stats
order by count desc
limit 20;
```
