import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const TABLE = "quiz_stats";

/** 개발 시 중복 호출 점검용(모듈 스코프) */
let increaseQuizCountCallSeq = 0;

function getClient() {
  try {
    return createSupabaseBrowserClient();
  } catch (e) {
    logQuizStatsError("[quiz_stats] Supabase client unavailable", e);
    return null;
  }
}

/** Next.js 오버레이에서 `{}`만 보이는 경우 대비 — message/code/details/hint를 풀어서 로그 */
function logQuizStatsError(scope: string, err: unknown): void {
  if (err == null) {
    console.error(scope, "(error is null/undefined)");
    return;
  }
  if (err instanceof Error) {
    console.error(scope, err.message, err.cause ?? "", err.stack ?? "");
    return;
  }
  if (typeof err === "object") {
    const r = err as {
      message?: string;
      code?: string;
      details?: string;
      hint?: string;
    };
    const line = [r.message, r.code && `code=${r.code}`, r.details && `details=${r.details}`, r.hint && `hint=${r.hint}`]
      .filter(Boolean)
      .join(" | ");
    console.error(scope, line || JSON.stringify(err));
    return;
  }
  console.error(scope, String(err));
}

function rpcCountValue(data: unknown): number | null {
  if (data === null || data === undefined) return null;
  if (typeof data === "number" && Number.isFinite(data)) return data;
  if (typeof data === "bigint") return Number(data);
  if (typeof data === "string" && data.trim() !== "") {
    const n = Number(data);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

/**
 * RPC 없이 +1: 기존 행이면 update, 없으면 insert (upsert는 RLS/PostgREST에서 막히는 경우가 있어 분리).
 */
async function increaseQuizCountFallback(
  supabase: NonNullable<ReturnType<typeof getClient>>,
  quizId: string,
): Promise<number> {
  const { data: row, error: selErr } = await supabase
    .from(TABLE)
    .select("count")
    .eq("id", quizId)
    .maybeSingle();
  if (selErr) {
    logQuizStatsError("[quiz_stats] increaseQuizCountFallback select", selErr);
    return 0;
  }
  const current = typeof row?.count === "number" ? row.count : Number(row?.count ?? 0);
  if (row) {
    const next = current + 1;
    const { error: upErr } = await supabase.from(TABLE).update({ count: next }).eq("id", quizId);
    if (upErr) {
      logQuizStatsError("[quiz_stats] increaseQuizCountFallback update", upErr);
      return current;
    }
    return next;
  }
  const { error: insErr } = await supabase.from(TABLE).insert({ id: quizId, count: 1 });
  if (insErr) {
    logQuizStatsError("[quiz_stats] increaseQuizCountFallback insert", insErr);
    return 0;
  }
  return 1;
}

/**
 * quiz id(slug) 기준 현재 참여 수 조회. 행이 없으면 0.
 */
export async function getQuizCount(quizId: string): Promise<number> {
  const supabase = getClient();
  if (!supabase) return 0;
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("count")
      .eq("id", quizId)
      .maybeSingle();
    if (error) {
      logQuizStatsError("[quiz_stats] getQuizCount", error);
      return 0;
    }
    const n = data?.count;
    return typeof n === "number" ? n : Number(n ?? 0);
  } catch (e) {
    logQuizStatsError("[quiz_stats] getQuizCount", e);
    return 0;
  }
}

/**
 * 참여 수 +1. RPC `increment_quiz_stat`가 있으면 원자적으로 처리,
 * RPC 오류일 때만 클라이언트 폴백(추가 +1).
 *
 * 주의: RPC가 성공(error 없음)이면 DB는 이미 +1 된 상태다. 응답 파싱만 실패했을 때
 * 폴백으로 또 +1 하면 2칸 뛴다 → 이 경우엔 `getQuizCount`로만 동기화한다.
 */
export async function increaseQuizCount(quizId: string): Promise<number> {
  increaseQuizCountCallSeq += 1;
  const callNo = increaseQuizCountCallSeq;
  console.info(`[quiz_stats] increaseQuizCount() #${callNo} quizId=${quizId}`);

  const supabase = getClient();
  if (!supabase) return 0;
  try {
    const { data, error } = await supabase.rpc("increment_quiz_stat", { p_id: quizId });
    if (error) {
      logQuizStatsError("[quiz_stats] increaseQuizCount RPC", error);
      return increaseQuizCountFallback(supabase, quizId);
    }

    const n = rpcCountValue(data);
    if (n !== null) {
      console.info(`[quiz_stats] increaseQuizCount #${callNo} RPC return`, n);
      return n;
    }

    console.warn(
      `[quiz_stats] increaseQuizCount #${callNo} RPC ok but unparseable data; re-fetch only (no second increment)`,
      data,
    );
    return getQuizCount(quizId);
  } catch (e) {
    logQuizStatsError("[quiz_stats] increaseQuizCount", e);
    return getQuizCount(quizId);
  }
}

/**
 * 페이지 로드 후 1회 조회해 UI에 반영.
 */
export async function initQuizCount(
  quizId: string,
  onReady: (count: number) => void,
): Promise<void> {
  try {
    const n = await getQuizCount(quizId);
    onReady(n);
  } catch (e) {
    logQuizStatsError("[quiz_stats] initQuizCount", e);
    onReady(0);
  }
}
