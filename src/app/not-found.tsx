import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";

/** `assets/img/mongpick-face.webp` → 빌드 시 `public/images/brand/mongpick-face.webp`와 동일 에셋 */
const FACE_SRC = "/images/brand/mongpick-face.webp";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <img
        className={styles.face}
        src={FACE_SRC}
        alt=""
        width={400}
        height={400}
        decoding="async"
        aria-hidden="true"
      />
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>여기는 길이 없어요</h1>
      <p className={styles.subtitle}>
        주소가 바뀌었거나, 페이지가 삭제됐을 수 있어요. 홈이나 한국어 홈으로 돌아가 볼까요?
      </p>
      <div className={styles.actions}>
        <Link className={styles.link} href="/ko/">
          한국어 홈
        </Link>
        <Link className={styles.linkSecondary} href="/">
          글로벌 홈
        </Link>
      </div>
    </div>
  );
}
