# 노션 API 설정 — `agent_09` 연결

작성일: 2026-11-08

## 요약

| 항목 | 값 |
|---|---|
| 연결 이름 | `agent_09` |
| 인증 방식 | API 토큰 (내부용, 단일 워크스페이스) |
| 워크스페이스 | 가경 김의 Notion |
| 기능 | 콘텐츠 읽기, 콘텐츠 업데이트, 콘텐츠 삽입 (댓글: 꺼짐) |
| 토큰 저장 위치 | Windows **사용자** 환경 변수 `NOTION_API_KEY` (이 저장소의 어떤 파일에도 기록하지 않음) |
| 개발자 페이지 | https://www.notion.so/my-integrations → 개발자 도구 / 연결 / agent_09 |

## 진행한 단계

1. Playwright MCP로 `notion.so/my-integrations` 접속 (`app.notion.com/developers/connections`로 이동). 로그인은 사용자가 직접 진행.
2. **신규 연결** 클릭 → 이름 `agent_09` 입력, 인증 방법 **API 토큰** 유지 → 연결 생성.
3. 콘텐츠 기능(읽기/업데이트/삽입)이 켜져 있는지 확인.
4. 토큰 **복사하기** 버튼을 눌러 클립보드 값을 PowerShell에서 출력 없이 사용자 환경 변수로 저장한 뒤 클립보드를 비움:

   ```powershell
   $t = (Get-Clipboard | Out-String).Trim()
   [Environment]::SetEnvironmentVariable('NOTION_API_KEY', $t, 'User')
   ```

5. 토큰 테스트:
   - `GET /v1/users/me` → `name=agent_09`, `type=bot`, 워크스페이스 `가경 김의 Notion` ✅
   - `POST /v1/search` → 결과 0건 (아직 연결에 공유된 페이지 없음)

## 토큰 사용법

새 터미널(및 재시작한 Claude Code)에서 `NOTION_API_KEY`가 자동으로 적용됩니다.

```powershell
$h = @{ Authorization = "Bearer $env:NOTION_API_KEY"; 'Notion-Version' = '2022-06-28' }
Invoke-RestMethod -Uri 'https://api.notion.com/v1/users/me' -Headers $h
```

```bash
curl https://api.notion.com/v1/users/me \
  -H "Authorization: Bearer $NOTION_API_KEY" -H "Notion-Version: 2022-06-28"
```

## 연결에 페이지 접근 권한 주기

내부 연결은 공유된 페이지만 볼 수 있습니다. 노션에서 페이지 열기 → 오른쪽 위 `⋯` → **연결 (Connections)** → `agent_09` 추가. 하위 페이지는 권한을 상속합니다.

## 보안 참고

- 토큰은 비밀번호처럼 다루세요. 유출되면 연결 페이지에서 **API 토큰 새로 고침** 후 `NOTION_API_KEY`를 다시 등록하세요.
- 연결 페이지의 **삭제하기**로 연결을 삭제하면 토큰이 영구적으로 철회됩니다.

## API로 페이지 이름 변경 (2026-11-08)

`agent_09`에 공유된 유일한 페이지(워크스페이스 최상위, 기존 제목 없음)의 이름을 API로 변경했습니다.

| 항목 | 값 |
|---|---|
| 페이지 ID | `4129b096-dd3e-8032-b3a8-d14557765787` |
| 이전 제목 | (비어 있음 — "제목 없음"으로 표시) |
| 새 제목 | 노션 api 연동 실습 |
| URL | https://app.notion.com/p/api-4129b096dd3e8032b3a8d14557765787 |

요청: `PATCH /v1/pages/{page_id}`, 본문 `{"properties":{"title":{"title":[{"text":{"content":"노션 api 연동 실습"}}]}}}`. Windows PowerShell 5.1에서는 한글이 깨지지 않도록 본문을 UTF-8 바이트(`[Text.Encoding]::UTF8.GetBytes($body)`)로 보내야 합니다. 이후 `GET /v1/pages/{page_id}`로 새 제목을 확인했습니다.

## 페이지 안 인라인 데이터베이스 (2026-11-08)

`POST /v1/databases`(`parent.page_id` = 해당 페이지, `is_inline: true`)로 "노션 api 연동 실습" 페이지 안에 인라인 데이터베이스(표)를 만들고, `POST /v1/pages`(`parent.database_id`)로 예시 행 1개를 추가했습니다.

| 항목 | 값 |
|---|---|
| 데이터베이스 제목 | API 연동 실습 기록 |
| 데이터베이스 ID | `4129b096-dd3e-8111-9500-d6637ef346ef` |
| URL | https://app.notion.com/p/4129b096dd3e81119500d6637ef346ef |

| 열 | 유형 | 설명 |
|---|---|---|
| 실습 항목 | title | 실습 항목 |
| 상태 | select | 시작 전 (회색) / 진행 중 (노랑) / 완료 (초록) |
| API 엔드포인트 | rich_text | 사용한 엔드포인트 |
| 날짜 | date | 실습 날짜 |
| 메모 | rich_text | 결과, 주의할 점 |

예시 행: 페이지 이름 변경 · 완료 · `PATCH /v1/pages/{id}` · 2026-11-08 · 한글 본문은 UTF-8 바이트로 전송.

팁: 한글이 들어간 요청 본문은 UTF-8 `.json` 파일로 저장한 뒤 `[IO.File]::ReadAllBytes(...)`로 보내세요. 이후 조회(`POST /v1/databases/{id}/query`) 결과 1개 행이 확인되었습니다.

## 데이터베이스 삭제, 페이지 이름을 "내 일정 관리"로 변경 (2026-11-08)

- `DELETE /v1/blocks/{database_id}`로 인라인 데이터베이스 "API 연동 실습 기록"(`4129b096-dd3e-8111-9500-d6637ef346ef`)과 예시 행을 삭제했습니다 → `archived: true`, `in_trash: true`. 노션 휴지통에 있으며 30일 동안 복구할 수 있습니다.
- `PATCH /v1/pages/{page_id}`(UTF-8 JSON 파일 본문)로 페이지 `4129b096-dd3e-8032-b3a8-d14557765787`의 이름을 "노션 api 연동 실습"에서 **내 일정 관리**로 변경했습니다.
- `GET`으로 확인: 제목 = 내 일정 관리, 페이지에는 빈 문단 블록 1개(자동 생성된 빈 줄, 그대로 둠)만 남아 있습니다.
- URL: https://app.notion.com/p/4129b096dd3e8032b3a8d14557765787

## "내 일정 관리" 페이지에 인라인 데이터베이스 2개 (2026-11-08)

`POST /v1/databases`(`is_inline: true`)로 페이지에 인라인 데이터베이스 2개를 만들고, `POST /v1/pages`로 각각 예시 행 1개를 추가했습니다. 두 표 모두 확인(제목, 열, 행 1개씩)했습니다.

**개인 일정** — ID `4129b096-dd3e-8127-8c5a-f4c9eae5ff49`, https://app.notion.com/p/4129b096dd3e81278c5af4c9eae5ff49

| 열 | 유형 | 선택지 |
|---|---|---|
| 일정 | title | |
| 날짜 | date | |
| 분류 | select | 건강 / 약속 / 취미 / 공부 / 기타 |
| 상태 | select | 예정 / 완료 / 취소 |
| 장소 | rich_text | |
| 메모 | rich_text | |

예시 행: 헬스장 가기 · 2026-11-09 · 건강 · 예정

**업무 일정** — ID `4129b096-dd3e-81c8-9845-f9d273abbcf1`, https://app.notion.com/p/4129b096dd3e81c89845f9d273abbcf1

| 열 | 유형 | 선택지 |
|---|---|---|
| 업무 | title | |
| 마감일 | date | |
| 우선순위 | select | 높음 / 보통 / 낮음 |
| 상태 | select | 시작 전 / 진행 중 / 완료 / 보류 |
| 프로젝트 | select | (선택지 없음, 입력하면서 추가) |
| 진행률 | number (percent) | |
| 메모 | rich_text | |

예시 행: 주간 보고서 작성 · 2026-11-13 · 높음 · 시작 전 · 0%
