# Notion API Setup — `agent_09` Connection

Date: 2026-11-08

## Summary

| Item | Value |
|---|---|
| Connection name | `agent_09` |
| Auth method | API token (internal, single workspace) |
| Workspace | 가경 김의 Notion |
| Capabilities | Read content, Update content, Insert content (comments: off) |
| Token storage | Windows **user** environment variable `NOTION_API_KEY` (never written to any file in this repo) |
| Developer page | https://www.notion.so/my-integrations → 개발자 도구 / 연결 / agent_09 |

## Steps performed

1. Opened `notion.so/my-integrations` with the Playwright MCP (redirects to `app.notion.com/developers/connections`). The user logged in manually.
2. Clicked **신규 연결** (New connection), entered the name `agent_09`, kept the auth method **API 토큰**, created the connection.
3. Confirmed the content capabilities (read / update / insert) are enabled.
4. Clicked the token **복사하기** (Copy) button and stored the clipboard value as a user environment variable in PowerShell, without printing it, then cleared the clipboard:

   ```powershell
   $t = (Get-Clipboard | Out-String).Trim()
   [Environment]::SetEnvironmentVariable('NOTION_API_KEY', $t, 'User')
   ```

5. Tested the token:
   - `GET /v1/users/me` → `name=agent_09`, `type=bot`, workspace `가경 김의 Notion` ✅
   - `POST /v1/search` → 0 results (no pages shared with the connection yet)

## Using the token

New terminals (and a restarted Claude Code) pick up `NOTION_API_KEY` automatically.

```powershell
$h = @{ Authorization = "Bearer $env:NOTION_API_KEY"; 'Notion-Version' = '2022-06-28' }
Invoke-RestMethod -Uri 'https://api.notion.com/v1/users/me' -Headers $h
```

```bash
curl https://api.notion.com/v1/users/me \
  -H "Authorization: Bearer $NOTION_API_KEY" -H "Notion-Version: 2022-06-28"
```

## Giving the connection access to pages

An internal connection sees only pages shared with it. In Notion, open a page → `⋯` (top right) → **연결 (Connections)** → add `agent_09`. Child pages inherit the access.

## Security notes

- Treat the token like a password. If it leaks, use **API 토큰 새로 고침** (refresh) on the connection page, then update `NOTION_API_KEY`.
- Delete the connection from its page (**삭제하기**) to revoke the token permanently.

## Page rename via API (2026-11-08)

The only page shared with `agent_09` (workspace-level, previously untitled) was renamed through the API.

| Item | Value |
|---|---|
| Page ID | `4129b096-dd3e-8032-b3a8-d14557765787` |
| Old title | (empty — shown as "Untitled") |
| New title | 노션 api 연동 실습 |
| URL | https://app.notion.com/p/api-4129b096dd3e8032b3a8d14557765787 |

Request: `PATCH /v1/pages/{page_id}` with body `{"properties":{"title":{"title":[{"text":{"content":"노션 api 연동 실습"}}]}}}`. In Windows PowerShell 5.1, send the body as UTF-8 bytes (`[Text.Encoding]::UTF8.GetBytes($body)`) so Korean text is not garbled. A follow-up `GET /v1/pages/{page_id}` confirmed the new title.

## Inline database on the page (2026-11-08)

Created an inline database (table) inside the page "노션 api 연동 실습" with `POST /v1/databases` (`parent.page_id` = the page, `is_inline: true`), then added one sample row with `POST /v1/pages` (`parent.database_id`).

| Item | Value |
|---|---|
| Database title | API 연동 실습 기록 |
| Database ID | `4129b096-dd3e-8111-9500-d6637ef346ef` |
| URL | https://app.notion.com/p/4129b096dd3e81119500d6637ef346ef |

| Column | Type | Notes |
|---|---|---|
| 실습 항목 | title | Practice item |
| 상태 | select | 시작 전 (gray) / 진행 중 (yellow) / 완료 (green) |
| API 엔드포인트 | rich_text | Endpoint used |
| 날짜 | date | Practice date |
| 메모 | rich_text | Results, caveats |

Sample row: 페이지 이름 변경 · 완료 · `PATCH /v1/pages/{id}` · 2026-11-08 · 한글 본문은 UTF-8 바이트로 전송.

Tip: write request bodies with Korean text to a UTF-8 `.json` file and send `[IO.File]::ReadAllBytes(...)` as the body. A follow-up query (`POST /v1/databases/{id}/query`) returned 1 row.

## Database deleted, page renamed to "내 일정 관리" (2026-11-08)

- Deleted the inline database "API 연동 실습 기록" (`4129b096-dd3e-8111-9500-d6637ef346ef`) and its sample row with `DELETE /v1/blocks/{database_id}` → `archived: true`, `in_trash: true`. It sits in Notion's trash and can be restored from there for 30 days.
- Renamed the page `4129b096-dd3e-8032-b3a8-d14557765787` from "노션 api 연동 실습" to **내 일정 관리** with `PATCH /v1/pages/{page_id}` (UTF-8 JSON file body).
- Verified with `GET`: title = 내 일정 관리; the page now holds only one empty paragraph block (an auto-created blank line, left as is).
- URL: https://app.notion.com/p/4129b096dd3e8032b3a8d14557765787

## Two inline databases on "내 일정 관리" (2026-11-08)

Created two inline databases on the page with `POST /v1/databases` (`is_inline: true`) and added one sample row to each with `POST /v1/pages`. Verified both (title, columns, 1 row each).

**개인 일정** — ID `4129b096-dd3e-8127-8c5a-f4c9eae5ff49`, https://app.notion.com/p/4129b096dd3e81278c5af4c9eae5ff49

| Column | Type | Options |
|---|---|---|
| 일정 | title | |
| 날짜 | date | |
| 분류 | select | 건강 / 약속 / 취미 / 공부 / 기타 |
| 상태 | select | 예정 / 완료 / 취소 |
| 장소 | rich_text | |
| 메모 | rich_text | |

Sample row: 헬스장 가기 · 2026-11-09 · 건강 · 예정

**업무 일정** — ID `4129b096-dd3e-81c8-9845-f9d273abbcf1`, https://app.notion.com/p/4129b096dd3e81c89845f9d273abbcf1

| Column | Type | Options |
|---|---|---|
| 업무 | title | |
| 마감일 | date | |
| 우선순위 | select | 높음 / 보통 / 낮음 |
| 상태 | select | 시작 전 / 진행 중 / 완료 / 보류 |
| 프로젝트 | select | (no options yet; add while entering) |
| 진행률 | number (percent) | |
| 메모 | rich_text | |

Sample row: 주간 보고서 작성 · 2026-11-13 · 높음 · 시작 전 · 0%
