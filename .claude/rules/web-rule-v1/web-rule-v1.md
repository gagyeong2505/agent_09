# Web Development Rules (v1)

These rules apply whenever web page code is written or edited in this project, including all work by the `developer` sub agent. They set the tech stack, file structure, library handling and deployment.

## 1. Tech stack and file structure

- Use plain **HTML / CSS / JavaScript** only. No frameworks, bundlers or build steps (no React, Vue, Tailwind build, Vite, etc.).
- Every task lives in `output/web/<task_name>/` with this default structure:

```
output/web/<task_name>/
├── index.html          # Entry page (extra pages: <name>.html at the same level)
├── css/
│   └── style.css       # Main stylesheet (split into more files only when large)
├── js/
│   └── main.js         # Main script
├── img/                # Images used by the page (+ img/screenshots/ for check captures)
└── lib/                # Downloaded third-party libraries (only if used), one folder per library
    └── <library>/
```

- Use relative paths only (`css/style.css`, `img/hero.jpg`), so the page works both locally and on GitHub Pages under `/<task_name>/`.
- Load CSS in `<head>`; load JS at the end of `<body>` or with `defer`. Load `lib/` files before `js/main.js`.

## 2. Coding standards

- **HTML**: semantic tags (`header`, `nav`, `main`, `section`, `article`, `footer`), one `h1` per page, logical heading order, `lang="ko"` for Korean content, `<meta charset="UTF-8">` and the viewport meta tag, a `<title>` and meta description.
- **CSS**:
  - Define colors, fonts, spacing and breakpoints as CSS custom properties in `:root`, taken from the reference analysis (`references/web/<task_name>/`).
  - Mobile-first: base styles for mobile, then `min-width` media queries (e.g. 768px, 1024px, 1280px).
  - Use Flexbox/Grid for layout; no fixed pixel widths that cause horizontal scrolling.
  - Web fonts: Google Fonts or font files saved in the task folder.
- **JS**:
  - Vanilla JS, `const`/`let`, no global pollution (wrap in a module pattern or `type="module"`).
  - Wait for the DOM (`defer` or `DOMContentLoaded`) before querying elements.
  - No console errors or warnings in the final result.
- **Accessibility**: `alt` text on every meaningful image, sufficient color contrast, visible focus states, keyboard-usable menus and buttons, and respect `prefers-reduced-motion` (disable or reduce animations).
- **Content**: use the real content from the research/reference files. Never invent facts or numbers; mark missing content with clear placeholders and list them in the report.
- **Images**: only images the project may use (own, generated, or free-licensed). Never use the reference screenshots from `references/web/` in the page.

## 3. Animation libraries

- When an animation or interaction needs a library (e.g. GSAP, AOS, Swiper, Lenis, Lottie), choose and install it yourself without asking the user. Prefer CSS or vanilla JS when it is enough; add a library only when it clearly helps.
- **Install by downloading, not by CDN link**:
  1. Install with npm into a temporary folder outside the project (e.g. the session scratchpad): `npm install <package>@<version> --prefix <temp_dir>`.
  2. Copy only the files the page needs (minified JS/CSS, required assets) plus the license file into `output/web/<task_name>/lib/<package>/`.
  3. Do not leave `node_modules/`, `package.json` or `package-lock.json` in the task folder or the project root.
- Pin an exact version and record it.
- Check that the library's license allows use and redistribution (MIT, Apache, BSD, or the GSAP standard license, etc.).
- **Always report** every installed library to the user: name, version, license, files copied to `lib/`, and what it is used for (which section/effect).

## 4. Deployment (GitHub Pages)

The user has authorized deployment **without asking for confirmation**. Deploy as soon as the page passes the checks in section 5.

- **Repository**: one separate GitHub repository per task, named exactly `<task_name>` (e.g. `suneung_2027`), public (required for free GitHub Pages), under the account logged into `gh` (`gh api user --jq .login`).
  - If a repository with that name already exists and it belongs to this same task, update it (redeploy). If it belongs to something else, do not overwrite it; stop and ask the main session.
- **Keep the project repo clean**: never run `git init` inside `output/web/<task_name>/` (a nested `.git` breaks the `agent_09` repository). Deploy from a temporary copy outside the project:
  1. Copy the contents of `output/web/<task_name>/` (excluding `img/screenshots/`) to a temporary folder (e.g. the session scratchpad).
  2. Add an empty `.nojekyll` file there.
  3. First deploy: `git init -b main`, commit, then `gh repo create <task_name> --public --source . --push`.
     Redeploy: `gh repo clone <owner>/<task_name>` into a temp folder, replace its files with the new copy, commit and push.
  4. Enable Pages from `main` / root (first deploy only):
     `gh api -X POST repos/<owner>/<task_name>/pages -f "source[branch]=main" -f "source[path]=/"`
  5. Wait for the build (`gh api repos/<owner>/<task_name>/pages/builds/latest` → `built`), then confirm the site URL returns HTTP 200 and open it with the Playwright MCP to check that CSS, JS, images and `lib/` files load.
- Commit messages: short Korean or English summary of the change.
- **Deliverable to the user**: the deployed URL as a clickable link — `https://<owner>.github.io/<task_name>/` — plus the repository URL.

## 5. Checks before deployment

- Open the page locally and check it with the Playwright MCP (follow `browser-rule-v1`):
  - desktop (1440px) and mobile (390px) widths
  - no console errors, no 404s for CSS/JS/images/libraries
  - no text overflow, no overlapping elements, no horizontal scroll
  - animations run, and are reduced under `prefers-reduced-motion`
- Save check screenshots to `output/web/<task_name>/img/screenshots/` (not deployed).
- Fix every issue and re-check before deploying. After deploying, repeat a quick check on the live URL.

## 6. Completion report

Report to the user:

1. File tree of `output/web/<task_name>/`
2. **Installed libraries**: name, version, license, files in `lib/`, purpose (or "none")
3. Which reference inspired which section
4. Check results (screenshots path, issues fixed)
5. **Repository URL** and **deployed URL (link)**
6. Placeholders or points the user should review
