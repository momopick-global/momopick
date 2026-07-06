import Link from "next/link";
import { pickQuizText, type SnackQuizText } from "./types";
import { koTagFromLabel } from "@/lib/content/koTagRegistry";

type Props = {
  tags?: SnackQuizText[];
  locale: string;
  /** 결과 이미지 바로 아래(여백 조정) */
  afterImage?: boolean;
  className?: string;
};

export function QuizPackTags({ tags, locale, afterImage, className }: Props) {
  if (!tags?.length) return null;
  // 라벨 + (한국어 한정) 캐노니컬 slug. 레지스트리에 있으면 `/ko/tag/[slug]/`로 링크.
  const items = tags
    .map((t) => {
      const label = pickQuizText(locale, t).trim();
      const slug =
        locale === "ko" ? (koTagFromLabel(t?.ko) ?? koTagFromLabel(t?.en))?.slug : undefined;
      return { label, slug };
    })
    .filter((it) => it.label);
  if (!items.length) return null;

  const aria =
    locale === "ko" ? "태그" : locale === "ja" ? "タグ" : "Tags";

  const cn = [
    "quiz-result-tags",
    afterImage ? "quiz-result-tags--after-image" : "",
    className?.trim() ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ul className={cn} aria-label={aria}>
      {items.map((it, i) => (
        <li key={`${it.label}-${i}`} className="quiz-result-tag">
          {it.slug ? <Link href={`/ko/tag/${it.slug}/`}>{it.label}</Link> : it.label}
        </li>
      ))}
    </ul>
  );
}
