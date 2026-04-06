"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { QUIZ_IMAGE_PENDING_SRC } from "@/lib/content/quizImagePending";

export type QuizImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function QuizImageWithFallback({ src, alt, onError, ...rest }: QuizImageWithFallbackProps) {
  const initial = typeof src === "string" ? src : "";
  const [currentSrc, setCurrentSrc] = useState(initial);
  const fallbackApplied = useRef(false);

  useEffect(() => {
    const next = typeof src === "string" ? src : "";
    setCurrentSrc(next);
    fallbackApplied.current = false;
  }, [src]);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (fallbackApplied.current) return;
      fallbackApplied.current = true;
      setCurrentSrc(QUIZ_IMAGE_PENDING_SRC);
      onError?.(e);
    },
    [onError],
  );

  return (
    <img
      {...rest}
      src={currentSrc || QUIZ_IMAGE_PENDING_SRC}
      alt={alt ?? ""}
      onError={handleError}
    />
  );
}
