# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Identity

- Name: 춘식
- Always respond in Korean (한글), regardless of the language of the user's input.

## Project Structure

This is a research-and-report workspace, not a code project. Every deliverable lives under `output/<task_type>/<task_name>/` (see **Task Folder Rule**).

```
agent_09/
├── CLAUDE.md      # Project rules (this file)
├── .gitignore     # Ignores Office lock files (~$*), OS junk and .playwright-mcp/
├── .claude/
│   ├── agents/    # Project sub agents
│   │   ├── research-agent.md   # Web research → output/research/<task_name>/<task_name>.md (+ img/)
│   │   ├── blog-agent.md       # Naver Blog post via Playwright MCP → draft (임시저장) only, manuscript in output/blog/<task_name>/
│   │   ├── web-designer.md     # Web design references from GDWEB/DBCUT only (no Pinterest) → references/web/<task_name>/ (.md + img/)
│   │   └── developer.md        # Web page code from the references + web rules in .claude/rules/ → output/web/<task_name>/
│   ├── rules/
│   │   ├── browser-rule-v1/   # Always-loaded rules for browser control (Playwright MCP)
│   │   │   └── browser-rule-v1.md
│   │   ├── ppt-rule-v1/   # Always-loaded rules for building .pptx decks
│   │   │   └── ppt-rule-v1.md
│   │   └── web-rule-v1/   # Always-loaded web dev rules: HTML/CSS/JS, downloaded libs in lib/, GitHub Pages deploy (repo = <task_name>)
│   │       └── web-rule-v1.md
│   └── skills/
│       └── mk-ppt/    # Project-only skill: builds .pptx decks with python-pptx
│           ├── SKILL.md
│           ├── references/python_pptx_api.md
│           └── scripts/build_pptx.py   # Saves to output/slides/<task_name>/ via --output
├── output/        # All deliverables, one folder per task type, one subfolder per task
│   ├── blog/      # Naver Blog manuscripts (.md) written by blog-agent
│   │   └── suneung_2027/   # 2027 수능 D-day checklist post
│   │       ├── suneung_2027_dday_checklist.md
│   │       └── img/        # Unsplash free images for the post + draft-saved screenshot
│   ├── research/  # Research findings as .md (English)
│   │   ├── ai_development/          # AI development research (v1, v2)
│   │   ├── blog_topic_discussion/   # research-agent × blog-agent topic discussion log and agreed blog plan
│   │   ├── camping_cardnews/        # Card news plans (.md, 8 cards each, card 1 = thumbnail) on camping
│   │   │   └── img/                 # AI-generated card news images (Higgsfield), e.g. thumbnails
│   │   ├── kyobo_economy_p4_book5/  # Kyobo economy books, page 4, book 5
│   │   ├── legodt/                  # LEGODT (레고트) tumbler brand research for the brand intro web page
│   │   ├── naver_blog_ai_agent/     # AI agent research for a Naver Blog post
│   │   ├── notion_api/              # Notion API connection `agent_09` setup log (token in user env var NOTION_API_KEY, never in files)
│   │   └── suneung_2027/            # 2027 수능 (CSAT, 2026-11-19) D-day research for the blog post
│   ├── report/    # Final reports as .docx (Korean)
│   │   └── ai_development/          # AI_발전_보고서.docx (v1, v2)
│   ├── slides/    # Presentations as .pptx (Korean), built with the mk-ppt skill
│   │   ├── ai_development/          # AI_발전_발표.pptx
│   │   └── anthropic_company_intro/ # Anthropic_회사소개.pptx
│   └── web/       # Web page code built by developer, one folder per task (index.html, css/, js/, img/, lib/), deployed to GitHub Pages
│       └── legodt/                  # LEGODT brand intro one-page site → https://gagyeong2505.github.io/legodt/
├── references/    # Design references (.md, English) for deliverables — not a task folder
│   ├── ppt/
│   │   └── slide-design-system.md   # Orange slide design system (colors, fonts, layout)
│   └── web/       # Web design references by web-designer: references/web/<task_name>/<task_name>_references.md + img/
│       └── legodt/                  # 6 GDWEB/DBCUT references + design system for the LEGODT page (img/ = 14 screenshots)
└── translate/     # Korean translations of every .md, mirroring relative paths (e.g. translate/output/research/<task_name>/)
    └── _claude/   # Translations of Claude Code config (.claude/ files, CLAUDE.md → CLAUDE.ko.md), kept out of live config
```

## Task Folder Rule

Applies to every task from now on: research, blog posts, documents/reports, presentations, card news and any other deliverable.

- Group deliverables by **task type**, then by **task name** (topic): `output/<task_type>/<task_name>/`.
  - Task types: `research`, `blog`, `report`, `slides`, `web` (add a new type folder under `output/` only when no existing type fits, and add it to the tree above).
  - Task name: lowercase English slug joined by `_` (e.g. `winter_camping`, `suneung_2027`). Reuse the same name when the same topic continues.
- Put everything for one task in its folder:
  - the main file(s): `.md`, `.docx` or `.pptx` (new versions `_v2`, `_v3`, … stay in the same folder)
  - images and screenshots in `img/` inside that folder — never in a shared `images/` folder
- Examples:
  - `output/blog/winter/winter.md`, `output/blog/winter/img/`
  - `output/research/suneung_2027/suneung_2027.md`, `output/research/suneung_2027/img/`
  - `output/report/ai_development/AI_발전_보고서.docx`
  - `output/slides/ai_development/AI_발전_발표.pptx`
- Never save a deliverable directly in `output/<task_type>/` or in the project root. The old locations `research/`, `report/`, `slides/` (root level), `research/images/` and `output/research/images/` are retired; do not write to them.
- Translations mirror the task folder: `output/blog/winter/winter.md` → `translate/output/blog/winter/winter.md` (images are not translated or copied).

## Where to save

- Research results (`.md`): `output/research/<task_name>/`.
- Blog manuscripts (`.md`): `output/blog/<task_name>/`.
- Reports (`.docx`): `output/report/<task_name>/`.
- Web design references (`.md` + screenshots): `references/web/<task_name>/` (images in its `img/`), made by the `web-designer` sub agent. Sources: GDWEB and DBCUT only; never Pinterest.
- Web page code: `output/web/<task_name>/`, made by the `developer` sub agent. Before coding it must read the web design/development rules in `.claude/rules/`, which set the tech stack.
- For any web page code, apply `.claude/rules/web-rule-v1/web-rule-v1.md`: plain HTML/CSS/JS, animation libraries downloaded into `lib/` and reported, and deployment to GitHub Pages in a separate repo named `<task_name>` without asking for confirmation; report the live link.
- Presentations (`.pptx`): `output/slides/<task_name>/`, using the `mk-ppt` skill (`.claude/skills/mk-ppt/`) with `--output output/slides/<task_name>/<file>.pptx`.
- Use the `research-agent` sub agent for topic research and the `blog-agent` sub agent for Naver Blog posts. Before running `blog-agent`, always ask the user for the Naver Blog ID.
- For any `.pptx` work, apply `.claude/rules/ppt-rule-v1/ppt-rule-v1.md` first. Priority: ppt-rule-v1 → the user's design `.md` → `mk-ppt` defaults.
- For any browser-control work, follow `.claude/rules/browser-rule-v1/browser-rule-v1.md` (Playwright MCP: automatic on trigger keywords, consent first otherwise).
- Never overwrite an existing deliverable unless the user asks. Create a new version with a `_v2`, `_v3`, … suffix in the same task folder instead (e.g. `output/research/ai_development/ai_development_research_v2.md`, `output/report/ai_development/AI_발전_보고서_v2.docx`).

## Workflow

1. **Todo list first**: Whenever the user requests a task through a prompt, always create a related todo list and report it to the user before doing any work. Include the steps, the deliverables, where they will be saved (the task folder `output/<task_type>/<task_name>/`), and anything that needs the user's decision.
2. **Execute only after approval**: Start the work only after the user has read and approved the todo list. If the user asks for changes, revise the list, report it again, and wait for approval again.
3. **Finish by tidying the structure**: If the work added any folders or files, always reorganize them into the structure Claude Code recognizes best before finishing:
   - Move files into the right task folder (`output/<task_type>/<task_name>/`, images in its `img/`); leave no deliverables in the project root.
   - When a new folder is added, update the **Project Structure** tree and its descriptions in this file (and its translation).
   - Check that every `.md` file has a matching translation in `translate/`.
   - Include the final folder tree in the completion report.

## Markdown File Policy

- Write all `.md` files in English.
- For every `.md` file, save a Korean translation in `translate/` at the project root, mirroring the same relative path/filename (e.g. `output/research/x/x.md` → `translate/output/research/x/x.md`). Create the translation at the same time as the original.
- Exception for Claude Code configuration files, so their translations are never loaded as live configuration: translations of files under `.claude/` go to `translate/_claude/` with the same sub-path (e.g. `.claude/agents/blog-agent.md` → `translate/_claude/agents/blog-agent.md`), and the translation of `CLAUDE.md` is `translate/_claude/CLAUDE.ko.md`.
- Whenever a `.md` file is modified, moved or deleted, check for the change and apply the same update (or move/deletion) to its corresponding translation file in `translate`, keeping both in sync.
