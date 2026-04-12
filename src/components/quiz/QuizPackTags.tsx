import { pickQuizText, type SnackQuizText } from "./types";

type Props = {
  tags?: SnackQuizText[];
  locale: string;
  /** 결과 이미지 바로 아래(여백 조정) */
  afterImage?: boolean;
  className?: string;
};

export function QuizPackTags({ tags, locale, afterImage, className }: Props) {
  if (!tags?.length) return null;
  const items = tags
    .map((t) => pickQuizText(locale, t).trim())
    .filter(Boolean);
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
      {items.map((label, i) => (
        <li key={`${label}-${i}`} className="quiz-result-tag">
          {label}
        </li>
      ))}
    </ul>
  );
}
