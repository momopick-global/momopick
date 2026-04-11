import type { User } from "@supabase/supabase-js";

export function supabaseDisplayName(u: User): string {
  const meta = u.user_metadata as Record<string, string | undefined> | undefined;
  return (
    meta?.full_name ??
    meta?.name ??
    u.email?.split("@")[0] ??
    "Google 사용자"
  );
}

export function supabaseAvatarUrl(u: User): string | null {
  const meta = u.user_metadata as Record<string, string | undefined> | undefined;
  return meta?.avatar_url ?? meta?.picture ?? null;
}

export function supabaseProviderLabel(u: User): string {
  const raw = u.app_metadata?.provider;
  if (raw === "google") return "Google";
  if (raw === "kakao") return "카카오";
  if (typeof raw === "string" && raw.length > 0) {
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }
  return "연동 계정";
}
