import Link from "next/link";
import { getKoQuizTags } from "@/lib/content/quizTags";
import type { KoMenuGroup } from "@/lib/content/homeRail";

/**
 * GNB(카테고리 바) 바로 아래 노출되는 태그 줄.
 * - 상단(스코프 없음): 전역 대표 태그(2회 이상) → `/ko/tag/[slug]/` → 심층·원픽·성향 전체 노출.
 * - 서브페이지(스코프 있음): 그 메뉴 퀴즈에 달린 태그만 → `/ko/tag/[slug]/?cat=<group>` → 그 메뉴만 노출.
 */
export function KoTagBar({ scope }: { scope?: KoMenuGroup }) {
  // 서브페이지에선 그 메뉴 콘텐츠의 태그만(최소 1회), 상단에선 전역 대표 태그(2회 이상).
  const tags = getKoQuizTags(scope ? 1 : 2, scope);
  if (tags.length === 0) return null;
  const query = scope ? `?cat=${scope}` : "";

  return (
    <div className="tag-bar" aria-label="태그 모아보기">
      <div className="tag-bar__inner">
        {tags.map((t) => (
          <Link key={t.slug} className="chip chip--tag" href={`/ko/tag/${t.slug}/${query}`}>
            #{t.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
