# Browser Control Rules (v1)

These rules apply whenever a task in this project could involve opening or controlling a web browser (navigating, clicking, typing, taking screenshots, collecting page content or images).

## 1. Automatic call (trigger keywords)

- When the user's message contains a browser-control keyword, call the Playwright MCP (`mcp__playwright__*`) right away without asking for consent.
- Trigger keywords (including similar phrasings and their English equivalents):
  - "브라우저를 열어서", "브라우저로", "브라우저 열고"
  - "웹 제어", "웹에서 직접", "사이트에 접속해서", "들어가서"
  - "직접 작업", "직접 해줘", "직접 확인"
  - "클릭해줘", "입력해줘", "스크린샷 찍어줘"
  - "open the browser", "control the web", "do it directly", "take a screenshot"

## 2. Consent-first call (no keyword)

- When the message has no trigger keyword but the task could be done better with the Playwright MCP, ask the user for consent before calling it. Examples:
  - pages that need a login or render content dynamically (JavaScript)
  - collecting images or screenshots for research or posts
  - checking how a page actually looks or behaves
- In one or two lines, explain why the browser is needed and what will be done, then wait for the answer.
- Consent covers only that task; ask again for the next one.
- If the user declines, use other means (WebSearch, WebFetch, etc.) or report the limitation.

## 3. Tool priority

- Use the Playwright MCP as the default browser tool.
- Use Claude in Chrome (`mcp__claude-in-chrome__*`) only when the user names it explicitly.

## 4. Safety

- Even when the task started from a trigger keyword, confirm again right before any hard-to-reverse or outward-facing action: payments, posting, sending messages or email, deleting, submitting forms.
- Never type passwords or other credentials yourself; let the user enter them in the browser.
- Close the browser (`browser_close`) when the work is finished.
- Save screenshots and collected files in the right purpose-based folder (e.g. `research/images/<topic>/`), not in the project root. The `.playwright-mcp/` folder is git-ignored and is for temporary output only.
