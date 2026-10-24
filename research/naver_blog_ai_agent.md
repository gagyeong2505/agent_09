# Research Notes: AI Agents (for a Naver Blog post)

- Date: 2026-10-24
- Purpose: Source material for a friendly-tone Naver blog post on "AI agents"
- Deliverable: Naver blog draft (saved as a temporary draft, not published)

## 1. Definition

- An AI agent is a system that works autonomously to complete tasks by breaking goals into steps and using available tools. Built on LLMs, it can make decisions and take actions beyond generating text. (IBM)
- Anthropic separates "agentic systems" into two kinds:
  - **Workflows**: LLMs and tools run through predefined code paths.
  - **Agents**: LLMs dynamically direct their own processes and tool usage.

## 2. How it works

- Common loop: **perceive → reason (plan) → act → observe**, repeated until the goal is met (often called the ReAct pattern).
- Key components (IBM):
  - **Planning**: break the goal into tasks and subtasks.
  - **Tool use**: web search, databases, APIs, other agents.
  - **Memory**: keep past interactions and solutions to avoid repeating mistakes.

## 3. Chatbot vs. agent

| Item | Chatbot | AI agent |
|------|---------|----------|
| Role | Answers a question | Achieves a goal |
| Mode | Reactive (one prompt, one answer) | Autonomous (plans its next step) |
| Tools | Mostly none | Search, files, email, code execution |
| Risk/cost | Low | Higher; needs guardrails |

## 4. Market outlook (Gartner)

- 40% of enterprise apps will feature task-specific AI agents by end of 2026, up from less than 5% in 2025 (press release, 2025-08-26).
- Path: embedded assistants → task-specific agents (2026) → multi-agent ecosystems (2029).
- Caution: over 40% of agentic AI projects will be canceled by end of 2027 because of cost, unclear value or weak risk controls (press release, 2025-06-25).

## 5. Practical advice

- Start with the simplest solution; many tasks need only a single well-built LLM call. (Anthropic)
- Agents trade latency and cost for better task performance.
- Start with a small, easy-to-review repetitive task and widen the scope gradually.
- Grant only the permissions the task needs, and review results before sending or paying.

## 6. Format reference (top Naver blog posts for "AI 에이전트란")

- Top post (diu_lab, "AI에이전트란? 챗봇 차이부터 업무 자동화 활용법까지"): about 3,200 characters, 4 images, 1 comparison table.
- Structure: one-line definition → chatbot comparison (table) → use cases → cautions → recommendation and closing.

## 7. Images (Unsplash, free license)

| File | Photo | Photographer |
|------|-------|--------------|
| 01_CjWsslYVnPI.jpg | White robot on black background | Gabriele Malaspina |
| 02_X9Cemmq4YjM.jpg | Robot and human hands | Cash Macanaya |
| 03_cckf4TsHAuw.jpg | MacBook, mug and phone on a table | Andrew Neel |
| 04_sz1CHL7Pky0.jpg | Blue industrial robot arm | Homa Appliances |

Saved in `research/images/naver_blog_ai_agent/`.

## Sources

- IBM, "What are AI agents?" — https://www.ibm.com/think/topics/ai-agents
- Anthropic, "Building effective agents" — https://www.anthropic.com/engineering/building-effective-agents
- Gartner press release (2025-08-26) — https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025
- Gartner press release (2025-06-25) — https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027
- Salesforce Korea, "AI 에이전트와 챗봇의 차이점" — https://www.salesforce.com/kr/agentforce/ai-agent-vs-chatbot/
- Format reference: https://blog.naver.com/diu_lab/224450263688
- Images: https://unsplash.com
