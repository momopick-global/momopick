"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { KoLoveQuizListView } from "./KoLoveQuizListView";
import type { KoHomeRailItem, KoMenuGroup } from "@/lib/content/homeRail";

const GROUP_META: readonly { key: KoMenuGroup; emoji: string; label: string; hubHref: string }[] = [
  { key: "deep", emoji: "💌", label: "심층 테스트", hubHref: "/ko/love/" },
  { key: "onepick", emoji: "🎯", label: "원픽 테스트", hubHref: "/ko/onepick/" },
  { key: "personality", emoji: "🧠", label: "성향 테스트", hubHref: "/ko/personality-test/" },
];

function isGroup(v: string | null): v is KoMenuGroup {
  return v === "deep" || v === "onepick" || v === "personality";
}

/**
 * 태그 페이지의 그룹 렌더러.
 * - 스코프 없음: 심층·원픽·성향 전체 그룹 노출 (GNB 상단 태그에서 진입).
 * - `?cat=<group>` 있음: 해당 메뉴 그룹만 노출 (서브페이지 태그에서 진입).
 * 정적 export이므로 SSR은 전체를 그리고, 마운트 후 쿼리로 좁힌다(SEO엔 전체 노출).
 */
export function KoTagGroups({ groups }: { groups: Record<KoMenuGroup, KoHomeRailItem[]> }) {
  const [cat, setCat] = useState<KoMenuGroup | null>(null);

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("cat");
    setCat(isGroup(c) ? c : null);
  }, []);

  const clearCat = () => {
    setCat(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  const scopedLabel = cat ? GROUP_META.find((g) => g.key === cat)?.label : null;
  const visible = GROUP_META.filter((g) => groups[g.key].length && (!cat || cat === g.key));

  return (
    <>
      {cat ? (
        <section className="section" aria-label="필터 안내">
          <p className="sec-lead tag-scope-note">
            <span>
              <b>{scopedLabel}</b> 안에서만 보고 있어요.
            </span>
            <button type="button" className="link-all tag-scope-clear" onClick={clearCat}>
              전체 메뉴 보기
            </button>
          </p>
        </section>
      ) : null}

      {cat && groups[cat].length === 0 ? (
        <section className="section" aria-label="빈 결과">
          <div className="empty-state">
            <p>이 메뉴에는 해당 태그의 테스트가 없어요.</p>
            <div className="cta-row">
              <button type="button" className="btn primary sm" onClick={clearCat}>
                전체 메뉴에서 보기
              </button>
            </div>
          </div>
        </section>
      ) : (
        visible.map((g) => (
          <section key={g.key} id={g.key} className="section" aria-label={g.label}>
            <div className="sec-hd">
              <h2>
                {g.emoji} {g.label}{" "}
                <small style={{ fontWeight: 600, color: "var(--muted)" }}>{groups[g.key].length}</small>
              </h2>
              <Link className="link-all" href={g.hubHref}>
                허브
              </Link>
            </div>
            <KoLoveQuizListView items={groups[g.key]} />
          </section>
        ))
      )}
    </>
  );
}
