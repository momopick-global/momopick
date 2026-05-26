# Troubleshooting — Build Errors

## 빌드 명령

```bash
npm run build       # 정적 export → out/
```

전체 시간 보통 30~60초.

## 자주 발생하는 에러

### `Cannot find module './NNN.js'` (dev 또는 build)

- 원인: `.next` 또는 `.next-dev` 청크 캐시 손상 또는 dev/build 동시 실행
- 해결: `npm run clean` 후 다시 시도 (또는 `npm run dev:reset`)
- `next.config.ts`의 `distDir` 분기 (`.next-dev` vs `.next`)가 이 문제 완화용

### Type error: ... (TypeScript)

- `strict: true` 모드라 미세 타입 오류도 빌드 실패
- 보통 메시지의 파일 경로 + 라인으로 즉시 추적 가능
- VS Code의 TypeScript에러 표시와 빌드 에러는 동일 (`tsc --noEmit` 효과)

### ESLint 경고

빌드는 통과하지만 경고로 표시:
- `Warning: '<name>' is defined but never used.` — 미사용 변수/함수
- `Warning: Using '<img>' could result in slower LCP...` — `<img>` 권장 `<Image />`로

현재 경고:
- `buildArticleJsonLd` 미사용 (각 퀴즈 페이지에 정의되어 있으나 호출 안 됨)
- `<img>` 사용 (정적 export 모드라 `<Image />` 최적화 효과 제한적, 의도적 결정 가능)

빌드 차단 아님 — 무시 가능. 정리하고 싶으면 `npm run lint`로 전체 확인.

### `next/script`에서 raw `<script>`로 바꾼 후 `<head>`에 안 들어감

- 이미 해결됨: 현재 `src/app/layout.tsx`에서 raw `<script async ...>`을 `<head>` JSX에 직접 작성
- App Router에서 layout이 `<head>` JSX를 렌더링하면 Next.js가 metadata-생성 head와 병합
- AdSense 심사용으로 명시적으로 `<head>`에 raw script 필요한 케이스. [project/protected-areas.md](../project/protected-areas.md) 참고.

### 정적 export 모드에서 API route 호출 시도

- `src/app/api/*/route.ts`는 정적 export에 **포함되지 않음**
- API는 `functions/api/*.ts` (Cloudflare Pages Functions)에서만
- 잘못 만들면 빌드는 통과하지만 런타임 404

### `generateStaticParams` 누락

dynamic route(`[slug]`)에서 정적 export 시 필수:
```tsx
export function generateStaticParams() {
  return getKoBlogSlugs().map((slug) => ({ slug }));
}
```

없으면 빌드 시 `Page "/[slug]" missing "generateStaticParams"` 에러.

### 이미지 누락 (런타임 깨짐, 빌드는 통과)

- 빌드는 JSON·코드 경로 검증 안 함
- `node tools/check-quiz-images.mjs`로 별도 검증
- AdSense 심사·Kakao 공유 카드 영향

### `next-env.d.ts`가 매번 수정됨

- Next.js가 자동 갱신. 무시 가능
- 보통 커밋에서 제외 (변경분이 의미 없음)

### Cloudflare Pages 빌드 실패

원인:
- `npm ci` 실패: `package-lock.json` 변경 후 푸시 안 함
- 메모리 부족 (큰 이미지 다수)
- Node 버전 불일치 (현재 22 기본)

대시보드 → Deployments → 실패한 빌드 → View build log.

## 점검 명령

```bash
# 전체 빌드
npm run build

# 타입체크만 (빌드 없이)
npx tsc --noEmit

# Lint 전체
npm run lint:all

# 이미지 누락
node tools/check-quiz-images.mjs

# 빌드 출력 크기
du -sh out/

# 산출된 페이지 수
find out -name "index.html" | wc -l
```

## 빌드 실패 시 디버깅 흐름

1. 에러 메시지의 파일 + 라인 확인
2. 해당 파일에서 최근 변경분 검토
3. `npm run clean && npm run build` 재시도 (캐시 이슈 가능성)
4. 변경 전 커밋으로 일시적으로 돌려서 빌드 통과하는지 확인 (`git stash`)
5. 의존성 이슈면 `rm -rf node_modules && npm install`
