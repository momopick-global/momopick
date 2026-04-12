import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const TABLE = "quiz_stats";

function getClient() {
  try {
    return createSupabaseBrowserClient();
  } catch (e) {
    console.error("[quiz_stats] Supabase client unavailable", e);
    return null;
  }
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
      console.error("[quiz_stats] getQuizCount", error);
      return 0;
    }
    const n = data?.count;
    return typeof n === "number" ? n : Number(n ?? 0);
  } catch (e) {
    console.error("[quiz_stats] getQuizCount", e);
    return 0;
  }
}

/**
 * 참여 수 +1. RPC `increment_quiz_stat`가 있으면 원자적으로 처리,
 * 없거나 실패 시 select + upsert로 폴백(비권장·동시성 약함).
 */
export async function increaseQuizCount(quizId: string): Promise<number> {
  const supabase = getClient();
  if (!supabase) return 0;
  try {
    const { data, error } = await supabase.rpc("increment_quiz_stat", { p_id: quizId });
    if (!error && data != null) {
      return typeof data === "number" ? data : Number(data);
    }
    if (error) {
      console.error("[quiz_stats] increaseQuizCount RPC", error);
    }

    const current = await getQuizCount(quizId);
    const next = current + 1;
    const { error: upErr } = await supabase.from(TABLE).upsert(
      { id: quizId, count: next },
      { onConflict: "id" },
    );
    if (upErr) {
      console.error("[quiz_stats] increaseQuizCount upsert fallback", upErr);
      return current;
    }
    return next;
  } catch (e) {
    console.error("[quiz_stats] increaseQuizCount", e);
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
    console.error("[quiz_stats] initQuizCount", e);
    onReady(0);
  }
}
