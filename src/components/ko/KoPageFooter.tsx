import Link from "next/link";
import { KoFooterNav, KoFooterLegal } from "./KoFooterNav";

type Props = {
  /**
   * - `"nav"`: 사이트 정보·소셜·법적 표기 전체 (홈·허브·유틸 페이지).
   * - `"quiz"`: "다른 테스트 보기" 링크 + 법적 표기만 (퀴즈 상세 페이지).
   */
  variant?: "nav" | "quiz";
  /** quiz variant의 "다른 테스트" 이동 링크 */
  moreHref?: string;
  moreLabel?: string;
};

/**
 * /ko 공통 페이지 푸터 — `<footer className="ko-ft">` 래퍼를 단일 소스로 관리한다.
 * 페이지마다 footer 마크업을 하드코딩하지 않고 이 컴포넌트만 배치한다.
 */
export function KoPageFooter({
  variant = "nav",
  moreHref = "/ko/explore/",
  moreLabel = "다른 테스트 보기",
}: Props) {
  return (
    <footer className="ko-ft">
      <div className="ko-ft__inner">
        {variant === "quiz" ? (
          <>
            <div>
              <Link href={moreHref}>{moreLabel}</Link>
            </div>
            <KoFooterLegal />
          </>
        ) : (
          <KoFooterNav />
        )}
      </div>
    </footer>
  );
}
