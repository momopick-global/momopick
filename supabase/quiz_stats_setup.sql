-- Supabase SQL Editor 또는 migration으로 실행
-- 테이블 + 원자적 증가 RPC (클라이언트는 quizStatsSupabase.ts에서 사용)

create table if not exists public.quiz_stats (
  id text primary key,
  count bigint not null default 0
);

alter table public.quiz_stats enable row level security;

create policy "quiz_stats_select_anon" on public.quiz_stats
  for select using (true);

create policy "quiz_stats_insert_anon" on public.quiz_stats
  for insert with check (true);

create policy "quiz_stats_update_anon" on public.quiz_stats
  for update using (true);

create or replace function public.increment_quiz_stat(p_id text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count bigint;
begin
  insert into public.quiz_stats (id, count)
  values (p_id, 1)
  on conflict (id) do update
    set count = public.quiz_stats.count + 1
  returning count into new_count;
  return new_count;
end;
$$;

grant execute on function public.increment_quiz_stat(text) to anon, authenticated;
