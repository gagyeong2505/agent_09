# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code(claude.ai/code)에게 제공하는 가이드입니다.

## 정체성

- 이름: 춘식
- 사용자 입력 언어와 관계없이 항상 한글로 답변합니다.

## 프로젝트 구조

이 폴더는 코드 프로젝트가 아니라 자료조사와 보고서 작성을 위한 작업 공간입니다. 모든 산출물은 `output/<작업종류>/<작업명>/` 아래에 둡니다(**작업 폴더 규칙** 참고).

```
agent_09/
├── CLAUDE.md      # 프로젝트 규칙 (이 파일)
├── .gitignore     # Office 잠금 파일(~$*), OS 임시 파일, .playwright-mcp/ 제외
├── .claude/
│   ├── agents/    # 프로젝트 sub agent
│   │   ├── research-agent.md   # 웹 자료조사 → output/research/<작업명>/<작업명>.md (+ img/)
│   │   ├── blog-agent.md       # Playwright MCP로 네이버 블로그 작성 → 임시저장만, 원고는 output/blog/<작업명>/
│   │   ├── web-designer.md     # GDWEB/DBCUT에서만(핀터레스트 금지) 웹 디자인 레퍼런스 탐색 → references/web/<작업명>/ (.md + img/)
│   │   └── developer.md        # 레퍼런스 + .claude/rules/의 웹 규칙으로 웹 페이지 코드 작성 → output/web/<작업명>/
│   ├── rules/
│   │   ├── browser-rule-v1/   # 브라우저 제어(Playwright MCP) 시 항상 로드되는 규칙
│   │   │   └── browser-rule-v1.md
│   │   ├── ppt-rule-v1/   # .pptx 제작 시 항상 로드되는 규칙
│   │   │   └── ppt-rule-v1.md
│   │   └── web-rule-v1/   # 항상 로드되는 웹 개발 규칙: HTML/CSS/JS, 라이브러리는 lib/에 내려받기, GitHub Pages 배포 (레포 = <작업명>)
│   │       └── web-rule-v1.md
│   └── skills/
│       └── mk-ppt/    # 이 프로젝트 전용 스킬: python-pptx로 .pptx 발표 자료 생성
│           ├── SKILL.md
│           ├── references/python_pptx_api.md
│           └── scripts/build_pptx.py   # --output으로 output/slides/<작업명>/에 저장
├── output/        # 모든 산출물. 작업 종류별 폴더 → 작업별 하위 폴더
│   ├── blog/      # blog-agent가 작성한 네이버 블로그 원고 .md
│   │   └── suneung_2027/   # 2027 수능 D-day 체크리스트 글
│   │       ├── suneung_2027_dday_checklist.md
│   │       └── img/        # 글에 쓸 Unsplash 무료 이미지 + 임시저장 확인 스크린샷
│   ├── research/  # 자료조사 결과 .md (영어)
│   │   ├── ai_development/          # AI 발전 자료조사 (v1, v2)
│   │   ├── blog_topic_discussion/   # research-agent × blog-agent 주제 토론 기록과 합의된 블로그 계획
│   │   ├── camping_cardnews/        # 캠핑 카드뉴스 기획안 .md (기획안당 8장, 1장 = 썸네일)
│   │   │   └── img/                 # AI로 생성한 카드뉴스 이미지 (Higgsfield), 예: 썸네일
│   │   ├── kyobo_economy_p4_book5/  # 교보 경제 도서 4페이지 5번째 책
│   │   ├── legodt/                  # 브랜드 소개 웹 페이지용 LEGODT(레고트) 텀블러 브랜드 자료조사
│   │   ├── naver_blog_ai_agent/     # 네이버 블로그용 AI 에이전트 자료조사
│   │   ├── notion_api/              # 노션 API 연결 `agent_09` 설정 기록 (토큰은 사용자 환경 변수 NOTION_API_KEY에만, 파일 저장 금지)
│   │   └── suneung_2027/            # 블로그용 2027 수능(2026-11-19) D-day 자료조사
│   ├── report/    # 최종 보고서 .docx (한글)
│   │   └── ai_development/          # AI_발전_보고서.docx (v1, v2)
│   ├── slides/    # 발표 자료 .pptx (한글), mk-ppt 스킬로 생성
│   │   ├── ai_development/          # AI_발전_발표.pptx
│   │   └── anthropic_company_intro/ # Anthropic_회사소개.pptx
│   └── web/       # developer가 만든 웹 페이지 코드, 작업별 폴더 (index.html, css/, js/, img/, lib/), GitHub Pages로 배포
│       └── legodt/                  # LEGODT 브랜드 소개 원페이지 → https://gagyeong2505.github.io/legodt/
├── references/    # 산출물 제작용 디자인 참고 자료 .md (영어) — 작업 폴더 아님
│   ├── ppt/
│   │   └── slide-design-system.md   # 오렌지 슬라이드 디자인 시스템 (색상, 폰트, 레이아웃)
│   └── web/       # web-designer가 정리한 웹 디자인 레퍼런스: references/web/<작업명>/<작업명>_references.md + img/
│       └── legodt/                  # LEGODT 페이지용 GDWEB/DBCUT 레퍼런스 6개 + 디자인 시스템 (img/ = 스크린샷 14장)
└── translate/     # 모든 .md의 한글 번역본 (같은 상대 경로, 예: translate/output/research/<작업명>/)
    └── _claude/   # Claude Code 설정 번역본 (.claude/ 파일, CLAUDE.md → CLAUDE.ko.md), 실제 설정과 분리
```

## 작업 폴더 규칙

지금부터 진행하는 모든 작업에 적용합니다: 자료조사, 블로그 작성, 문서·보고서 작성, 발표 자료 제작, 카드뉴스 등 모든 산출물.

- 산출물은 **작업 종류**별로, 그 안에서 **작업명**(주제)별로 묶습니다: `output/<작업종류>/<작업명>/`.
  - 작업 종류: `research`, `blog`, `report`, `slides`, `web` (기존 종류에 맞는 것이 없을 때만 `output/` 아래에 새 종류 폴더를 만들고 위 트리에 추가합니다).
  - 작업명: `_`로 이은 소문자 영어 slug (예: `winter_camping`, `suneung_2027`). 같은 주제를 이어서 작업하면 같은 이름을 다시 씁니다.
- 한 작업에 속한 것은 모두 그 폴더에 둡니다:
  - 주요 파일: `.md`, `.docx`, `.pptx` (새 버전 `_v2`, `_v3`, …도 같은 폴더에 둡니다)
  - 이미지와 스크린샷은 그 폴더 안의 `img/`에 둡니다 — 공용 `images/` 폴더에 두지 않습니다
- 예시:
  - `output/blog/winter/winter.md`, `output/blog/winter/img/`
  - `output/research/suneung_2027/suneung_2027.md`, `output/research/suneung_2027/img/`
  - `output/report/ai_development/AI_발전_보고서.docx`
  - `output/slides/ai_development/AI_발전_발표.pptx`
- 산출물을 `output/<작업종류>/` 바로 아래나 프로젝트 루트에 저장하지 않습니다. 옛 위치인 루트의 `research/`, `report/`, `slides/`와 `research/images/`, `output/research/images/`는 더 이상 쓰지 않으며, 여기에 저장하지 않습니다.
- 번역본도 작업 폴더를 그대로 따릅니다: `output/blog/winter/winter.md` → `translate/output/blog/winter/winter.md` (이미지는 번역·복사하지 않습니다).

## 저장 위치

- 자료조사 결과(`.md`): `output/research/<작업명>/`.
- 블로그 원고(`.md`): `output/blog/<작업명>/`.
- 보고서(`.docx`): `output/report/<작업명>/`.
- 웹 디자인 레퍼런스(`.md` + 스크린샷): `references/web/<작업명>/` (이미지는 그 안의 `img/`), `web-designer` sub agent가 작성합니다. 출처는 GDWEB과 DBCUT만 사용하며 핀터레스트는 사용하지 않습니다.
- 웹 페이지 코드: `output/web/<작업명>/`, `developer` sub agent가 작성합니다. 코딩 전에 `.claude/rules/`의 웹 디자인/개발 규칙을 반드시 읽으며, 기술 스택은 이 규칙이 정합니다.
- 웹 페이지 코드 작업에는 `.claude/rules/web-rule-v1/web-rule-v1.md`를 적용합니다: 순수 HTML/CSS/JS, 애니메이션 라이브러리는 `lib/`에 내려받고 보고, `<작업명>` 이름의 별도 레포로 확인 없이 GitHub Pages에 배포하고 실제 링크를 전달합니다.
- 발표 자료(`.pptx`): `mk-ppt` 스킬(`.claude/skills/mk-ppt/`)에 `--output output/slides/<작업명>/<파일>.pptx`를 지정해 `output/slides/<작업명>/`에 저장합니다.
- 주제 자료조사에는 `research-agent` sub agent를, 네이버 블로그 글 작성에는 `blog-agent` sub agent를 사용합니다. `blog-agent`를 실행하기 전에는 항상 사용자에게 네이버 블로그 ID를 확인합니다.
- `.pptx` 작업에는 `.claude/rules/ppt-rule-v1/ppt-rule-v1.md`를 가장 먼저 적용합니다. 우선순위: ppt-rule-v1 → 사용자의 디자인 `.md` → `mk-ppt` 기본값.
- 브라우저 제어 작업에는 `.claude/rules/browser-rule-v1/browser-rule-v1.md`를 따릅니다(Playwright MCP: 트리거 키워드가 있으면 자동 호출, 없으면 먼저 동의 확인).
- 사용자가 요청하지 않는 한 기존 산출물을 덮어쓰지 않습니다. 대신 같은 작업 폴더에 `_v2`, `_v3`, … 접미사를 붙인 새 버전을 만듭니다(예: `output/research/ai_development/ai_development_research_v2.md`, `output/report/ai_development/AI_발전_보고서_v2.docx`).

## 작업 방식

1. **Todo list 먼저 보고**: 사용자가 프롬프트로 작업을 요청하면, 작업을 시작하기 전에 항상 관련 todo list를 만들어 사용자에게 먼저 보고합니다. 작업 단계, 산출물, 저장 위치(작업 폴더 `output/<작업종류>/<작업명>/`), 사용자가 결정해야 할 사항을 포함합니다.
2. **승인 후 실행**: 사용자가 todo list를 읽고 승인한 뒤에만 작업을 시작합니다. 수정을 요청받으면 목록을 고쳐 다시 보고하고, 다시 승인을 기다립니다.
3. **마무리 구조 정리**: 작업 결과로 폴더나 파일이 추가되었다면, 마무리하기 전에 항상 Claude Code가 가장 잘 인식할 수 있는 구조로 정리합니다.
   - 파일을 알맞은 작업 폴더(`output/<작업종류>/<작업명>/`, 이미지는 그 안의 `img/`)로 옮기고, 프로젝트 루트에는 산출물을 남기지 않습니다.
   - 새 폴더가 추가되면 이 파일(과 번역본)의 **프로젝트 구조** 트리와 설명을 갱신합니다.
   - 모든 `.md` 파일이 `translate/`에 대응하는 번역본을 갖고 있는지 확인합니다.
   - 완료 보고에 최종 폴더 트리를 포함합니다.

## 마크다운 파일 정책

- 모든 `.md` 파일은 영어로 작성합니다.
- 모든 `.md` 파일에 대해 프로젝트 루트의 `translate/`에 동일한 상대 경로/파일명으로 한글 번역본을 저장합니다(예: `output/research/x/x.md` → `translate/output/research/x/x.md`). 번역본은 원본과 동시에 만듭니다.
- Claude Code 설정 파일은 예외로, 번역본이 실제 설정으로 로드되지 않도록 합니다: `.claude/` 아래 파일의 번역본은 같은 하위 경로로 `translate/_claude/`에 저장하고(예: `.claude/agents/blog-agent.md` → `translate/_claude/agents/blog-agent.md`), `CLAUDE.md`의 번역본은 `translate/_claude/CLAUDE.ko.md`로 저장합니다.
- `.md` 파일이 수정·이동·삭제될 때마다 변경 사항을 확인하여 `translate`에 있는 대응 번역 파일에도 동일하게 수정(또는 이동·삭제)을 반영하여 두 파일을 동기화합니다.
