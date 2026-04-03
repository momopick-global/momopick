# API Specification — 모모픽 (1차 오픈)

> **범위**: **Next.js 정적 export(Cloudflare Pages)** + **Supabase**(클라이언트/REST) + 필요 시 **Pages Functions**.  
> 원칙: **읽기 공개**는 CDN 친화적으로, **쓰기**는 인증·RLS 필수.

---

## 1. 베이스 URL

| 환경 | 예시 |
|------|------|
| 프로덕션 사이트 | `https://momopick.com` |
| Supabase REST | `https://<project>.supabase.co/rest/v1` |
| Supabase Auth | `https://<project>.supabase.co/auth/v1` |

### 1.1 Cloudflare Pages Functions (엣지)

Next `Route Handler`는 정적 export와 함께 쓰지 않고, **`web/functions/`** 에서 정의합니다.

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/health` | 서비스 헬스(JSON). 구현: `functions/api/health.ts` |

---

## 2. 인증

- **방식**: Supabase Auth (이메일 매직링크, OAuth는 2차 확장).
- **클라이언트**: `Authorization: Bearer <access_token>`
- **익명**: 공개 GET만 (RLS가 허용하는 범위).

---

## 3. REST (Supabase PostgREST 스타일)

헤더 공통:

```
apikey: <SUPABASE_ANON_KEY>
Authorization: Bearer <access_token>   # 선택
Accept: application/json
```

### 3.1 공개 콘텐츠

#### `GET /rest/v1/categories`

**Query**

| 파라미터 | 설명 |
|----------|------|
| `locale` | `eq.ko` |
| `select` | `id,slug,title,sort_order,description` |
| `order` | `sort_order.asc` |

**응답**: `200` 배열

---

#### `GET /rest/v1/quizzes`

**Query**

| 파라미터 | 설명 |
|----------|------|
| `locale` | `eq.ko` |
| `status` | `eq.published` |
| `category_id` | `eq.<uuid>` (선택) |
| `select` | 목록에 필요한 컬럼만 |
| `order` | `published_at.desc` |

---

#### `GET /rest/v1/quizzes?slug=eq.{slug}&locale=eq.ko`

단일 퀴즈 메타(문항은 `schema_json` 또는 별도 테이블 조인).

**select 예**: `id,slug,title,description,cover_image_url,estimated_minutes,schema_json,category_id`

---

### 3.2 사용자 결과 (로그인 시)

#### `POST /rest/v1/user_results`

**Body (예)**

```json
{
  "quiz_id": "uuid",
  "result_type_key": "your_love_type",
  "answers_snapshot": { "q1": "opt_a", "q2": "opt_c" }
}
```

**응답**: `201` + 생성 행  
**오류**: `401`, `403` (RLS), `400` (스키마)

#### `GET /rest/v1/user_results?user_id=eq.<self>&order=created_at.desc`

본인 히스토리만.

---

### 3.3 프로필

#### `GET /rest/v1/profiles?id=eq.<self>`
#### `PATCH /rest/v1/profiles?id=eq.<self>`

허용 필드: `display_name`, `avatar_url`, `locale_pref` (정책에 따라 제한)

---

## 4. Storage (이미지)

- **버킷 예**: `covers`, `og`, `blog`
- **공개 읽기**: 커버·OG만 `public` ACL 또는 signed URL 정책 선택.
- **업로드**: 인증 사용자 + Storage policy (관리자/에디터만 1차).

---

## 5. Edge / Cloudflare Pages

| 용도 | 구현 예 |
|------|---------|
| www → apex | 대시보드 Redirect Rule 또는 `public/_redirects` |
| 소형 API | **Pages Functions** (`functions/`) |
| 구 슬러그 301 | Redirect Rule 또는 `_redirects` |
| OG 동적 생성 | Functions 또는 외부 이미지 서비스(2차) |

풀스택 Next SSR이 필요해지면 Cloudflare **Workers** 가이드(OpenNext)로 이전하는 선택지가 있습니다.

---

## 6. 사이트 내 “가짜 API” (정적 전용 시)

1차에 DB 없이 진행할 경우:

- 문항·결과는 **빌드 산출물 JSON** (`/data/quizzes/{id}.json`)으로 배포.
- “API”는 **GET 정적 파일**로 문서화:

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/data/quizzes/{slug}.json` | 퀴즈 정의 |
| GET | `/data/results/{slug}.json` | 결과 템플릿(선택) |

→ 2차 Supabase 도입 시 동일 스키마로 이관.

---

## 7. 오류 형식 (Supabase/PostgREST)

```json
{
  "code": "PGRST116",
  "details": null,
  "hint": null,
  "message": "JSON object requested, multiple (or no) rows returned"
}
```

클라이언트는 `message` 사용자 노출 금지, 로깅만 권장.

---

## 8. 버저닝

- 1차: URL 버전 접두사 **불필요** (`/v1` 생략).
- 공개 계약 변경 시: [README.md](./README.md)에 breaking change 기록 + 클라이언트 배포 동기화.

---

## 9. 보안 체크리스트

- [ ] anon 키는 **RLS 없이 테이블 노출 금지**
- [ ] 서비스 롤 키는 **서버/CI만**, 프론트 번들 금지
- [ ] `answers_snapshot`에 PII·민감정보 저장 금지
- [ ] CORS: 프로덕션 도메인만

---

## 10. 문서 정합성

- 필드 정의: [data-model.md](./data-model.md)
- URL·페이지 매핑: [folder-structure.md](./folder-structure.md)
- UI 토큰: [design-system.md](./design-system.md)
