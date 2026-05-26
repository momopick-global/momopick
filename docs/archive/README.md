# Archive — Deprecated Documents

> 이 폴더의 문서는 **현재 운영 기준과 맞지 않거나 무관한 문서**입니다. 참고용으로 보존하지만 운영 의사결정에는 사용하지 마세요.

## 파일 목록 및 이동 사유

| 파일 | 원래 위치 | 이동 사유 |
|---|---|---|
| `GEMINI.md` | 레포 루트 | Firebase Studio Gemini AI 운영 가이드 — **모모픽과 무관한 템플릿**. 옛 스캐폴드 잔재 |
| `blueprint.md` | 레포 루트 | "framework-less starter" 일반 템플릿 — **모모픽과 무관**. 옛 스캐폴드 잔재 |
| `2026-q2-planning-docs-readme.md` | `docs/README.md` | 2026 Q2 1차 오픈 기획용 문서 허브. 현재 운영 사정과 다름 (예: "1차 오픈 기준", 푸망/소울블렌드 레퍼런스 언급). 신규 README가 대체 |
| `2026-q2-planning-api-spec.md` | `docs/api-spec.md` | 1차 오픈 기획 API 명세. 실제 운영은 정적 export + Cloudflare Functions + Supabase 직접 호출. 일부 사실과 어긋남 (`functions/api/health.ts`만 존재) |
| `2026-q2-planning-data-model.md` | `docs/data-model.md` | 1차 오픈 기획 데이터 모델. 실제 운영은 `quiz_stats` 테이블 중심. 다른 엔티티(`locales`, `categories`, `quizzes` 등)는 미구현 |
| `2026-q2-planning-design-system.md` | `docs/design-system.md` | 1차 오픈 기획 디자인 시스템. **다크 베이스 + 퍼플** 기준으로 작성되어 있으나 **실제 운영은 라이트 베이스 (`#f4f2fb`) + 퍼플 액센트 (`#5a67f2`)**. 핵심 토큰은 새 `docs/design/color-system.md`로 추출 |
| `2026-q2-planning-folder-structure.md` | `docs/folder-structure.md` | 1차 오픈 기획 폴더 구조. 일부 사실과 어긋남 (예: `src/app/api/`는 비어있고 `functions/api/`만 동작). 새 `docs/project/overview.md`로 갱신 |

## 참고 — 어떤 정보가 옮겨졌나

옛 문서에서 **여전히 유효한** 부분들:
- `2026-q2-planning-design-system.md`의 브랜드 원칙 ("가볍게 시작 / 결과가 보상 / 신뢰") → `docs/design/design-overview.md`
- `2026-q2-planning-design-system.md`의 카피 톤 카테고리별 가이드 → `docs/content/content-tone.md`
- `2026-q2-planning-folder-structure.md`의 단일 레포·정적 export 원칙 → `docs/project/overview.md` + `docs/setup/cloudflare-pages.md`

옛 문서에서 **무시한** 부분들:
- "1차 오픈" 시점 가정 — 이미 오픈 운영 중
- 푸망/소울블렌드/청월당 레퍼런스 — 별개 서비스, 모모픽 운영 결정과 분리
- `src/app/api/` Route Handler 가정 — 정적 export 모드에선 동작 안 함 (`functions/`로 대체)
- 다크 모드 가정 — 실제 운영은 라이트 모드

## 향후

- 위 문서들은 **삭제하지 않음** (이력 보존)
- 새 운영 결정이 옛 기획과 충돌하면 새 문서를 단일 진실로 (이 archive는 참고만)
- 옛 기획 중 의미 있는 부분은 새 문서로 점차 추출
