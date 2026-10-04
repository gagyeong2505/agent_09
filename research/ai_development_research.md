# Research Notes: The Development of Artificial Intelligence (as of October 2026)

> Topic: AI development
> Collected: 2026-10-04 (web search)
> Note: Figures marked [secondary] come from blogs or summary articles, not from the original report. Check them against the primary source before citing them formally.

---

## 1. Technical Capability Progress

### 1.1 Overall trend (Stanford AI Index 2026)
- AI capability is not plateauing. It is **accelerating** and reaching more people than ever.
- Industry produced **over 90%** of notable frontier models in 2025.
- Several models now meet or exceed human baselines on PhD-level science questions, multimodal reasoning and competition mathematics.
- Performance on **SWE-bench Verified** (software engineering) rose from **about 60% to nearly 100%** in a single year.
- Source: Stanford HAI, *The 2026 AI Index Report*

### 1.2 Benchmarks
- **MMLU-Pro**: leading scores were already about 90% in early 2026, so the benchmark is close to saturation. [secondary]
- **GPQA Diamond** (PhD-level science): frontier models now beat PhD experts. Reported leaders are Gemini 3.1 Pro (94.3%), Claude Fable 5 (94.1%) and Claude Opus 4.8 (93.6%). [secondary]
- **Humanity's Last Exam (HLE)**: 2,500 expert-written questions across dozens of fields, regarded as the current ceiling for closed-ended evaluation. A recent model reportedly reached 64.7%. [secondary]
- Benchmarks keep saturating and being replaced by harder ones, and the cycle is speeding up.

### 1.3 AI agents
- **WebArena** (autonomous web tasks): success rate rose from 15% (2023) to **74.3%** (early 2026).
- **Cybench** (40 professional cybersecurity tasks): frontier models solved 93%.
- Agents still fail **about one in three** attempts in real production settings (VentureBeat).
- Weak spots: tool use, planning, multi-step reasoning, hallucination.

### 1.4 The "jagged frontier"
- The same models that win gold at the International Mathematical Olympiad read analog clocks correctly only **50.1%** of the time (AI Index 2026).
- Headline benchmark scores are a poor guide to how a model will perform on real work.

### 1.5 Geopolitics: US vs. China
- The performance gap between US and Chinese models has **effectively closed**. The lead has changed hands several times since early 2025.
- As of March 2026, the top US model (Anthropic) led by only about 2.7%.

---

## 2. Adoption and Investment

### 2.1 Adoption
- Organizational AI adoption: **88%**. Global population adoption of generative AI: **53%** (AI Index 2026).
- Generative AI reached 53% of the world's population within three years, faster than the PC or the internet.

### 2.2 Investment
- Corporate AI investment: **$581.69 billion** (AI Index 2026).
- Gartner expects data center spending to grow **55.8%** in 2026 to more than **$788 billion**.
- The five largest US hyperscalers (Amazon, Alphabet, Microsoft, Meta, Oracle) have committed **$660–690 billion** in 2026 capex. About 75% of it (roughly $450B) goes to AI infrastructure. (Futurum)
- Goldman Sachs' baseline model puts 2026 AI capex at about **$765B**, rising to **$1.6T a year by 2031**.
- McKinsey projects nearly **$7 trillion** in global data center investment through 2030, of which more than $5 trillion is tied to AI.

### 2.3 Energy
- The IEA estimates data centers used 460 TWh in 2022 and projects **650–1,050 TWh in 2026** (roughly a doubling in the high case).
- US data centers: 200 TWh (2022) → 260 TWh (2026), about 6% of national power use.
- Electricity supply is becoming a bottleneck for AI infrastructure.

---

## 3. Applications: Science and Healthcare
- **Insilico Medicine**: its AI-designed drug for idiopathic pulmonary fibrosis completed Phase IIa, with results published in *Nature Medicine*. This is the first clinical proof of concept for an end-to-end AI-discovered drug. It reached Phase IIa in about 18 months at a cost of about $6M, against a conventional $100–200M over 6–8 years.
- More than **75** AI-discovered molecules are in human trials. Preclinical time and cost have fallen by about 50–70%.
- Large deals: Eli Lilly–Insilico (up to $2.75B) and Sanofi–Owkin (agentic AI for drug development).

---

## 4. Labor Market Impact
- **Anthropic (Mar 2026)**: no detectable rise in aggregate unemployment among highly exposed workers since ChatGPT launched.
- **S&P Global**: net employment impact of -5 points over the past year, with a slight decline (-2 points) forecast for 2026.
- **HBR (2026)**: after ChatGPT, openings for routine, automation-prone roles fell 13%, while analytical, technical and creative roles grew 20%.
- **Goldman Sachs (Aug 2026)**: in developed markets, employment in call centers, software publishing, management consulting and advertising has fallen well below trend.
- **PwC 2026 Global AI Jobs Barometer**: a "two-track" labor market is forming. Professionalised roles, where AI multiplies expert output, grow faster in headcount and wages than democratised roles.
- Workers in the most exposed jobs are more likely to be female, older, more educated and higher paid.

---

## 5. Safety, Governance and Regulation

### 5.1 Risk indicators
- Documented AI incidents rose from **233 to 362** in a year (AI Index 2026).
- Only about half of US middle and high schools have an AI policy.
- Experts and the public differ by **50 points** on whether AI will help people do their jobs.

### 5.2 EU AI Act
- General-purpose AI (GPAI) rules applied from August 2025, and most provisions from August 2026.
- After a recent simplification agreement, the high-risk AI deadline moved from August 2026 to **December 2, 2027**.

### 5.3 South Korea AI Basic Act
- In force since **January 22, 2026**. Together with the EU, Korea is one of the few jurisdictions with a comprehensive AI law in force.
- It also covers foreign companies that serve Korean users.
- Main duties: transparency for generative AI (e.g., labeling), safety duties for models trained above a compute threshold, and obligations for high-impact AI in healthcare, hiring, lending and energy.
- Its aim is to balance promoting the industry with managing social risk.

---

## 6. Key Takeaways for the Report
1. **Speed**: capability, adoption and investment are all growing at historically unprecedented rates.
2. **Unevenness**: benchmark results are strong, but reliability in real environments (failure rates, the jagged frontier) still lags.
3. **Infrastructure and energy**: compute investment has hit trillion-dollar scale, and electricity is the new constraint.
4. **Social effects**: no mass unemployment yet, but job structures are being reorganized and polarized.
5. **Governance gap**: incidents are rising while regulation is still taking shape (EU delays, Korea's law now in force).

---

## Sources
- Stanford HAI, The 2026 AI Index Report — https://hai.stanford.edu/ai-index/2026-ai-index-report
- Stark Insider, Stanford's 2026 AI Index — https://www.starkinsider.com/2026/04/stanford-2026-ai-index-report.html
- Kili Technology, AI Benchmarks 2026 — https://kili-technology.com/blog/ai-benchmarks-guide-the-top-evaluations-in-2026-and-why-theyre-not-enough
- VentureBeat, Frontier models are failing one in three production attempts — https://venturebeat.com/security/frontier-models-are-failing-one-in-three-production-attempts-and-getting-harder-to-audit
- arXiv, Beyond the Leaderboard (agent failure synthesis) — https://arxiv.org/pdf/2607.05775
- CIO Dive, Global IT spend to reach $6.31T in 2026 — https://www.ciodive.com/news/global-it-spend-exceed-6T-2026/818356/
- Futurum, AI Capex 2026 — https://futurumgroup.com/insights/ai-capex-2026-the-690b-infrastructure-sprint/
- Goldman Sachs, Tracking Trillions — https://www.goldmansachs.com/insights/articles/tracking-trillions-the-assumptions-shaping-scale-of-the-ai-build-out
- IEA, Key Questions on Energy and AI — https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary
- DCD, Global data center electricity use to double by 2026 — https://www.datacenterdynamics.com/en/news/global-data-center-electricity-use-to-double-by-2026-report/
- Healthcare Discovery, AI-Designed Drugs in Human Trials 2026 — https://healthcarediscovery.ai/ai-designed-drugs-human-trials-2026-status-report/
- Drug Target Review, AI in drug discovery: predictions for 2026 — https://www.drugtargetreview.com/ai-in-drug-discovery-predictions-for-2026/1865962.article
- S&P Global, AI impact on employment 2026 — https://www.spglobal.com/en/research-insights/special-reports/ai-impact-on-employment-2026
- CNBC, Goldman studied where AI is squeezing labor markets — https://www.cnbc.com/2026/08/19/goldman-ai-impact-employment-jobs.html
- HBR, How AI Is Changing the Labor Market — https://hbr.org/2026/03/research-how-ai-is-changing-the-labor-market
- PwC, 2026 Global AI Jobs Barometer — https://www.pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-ai-jobs-barometer.html
- Stimson Center, South Korea's AI Basic Act — https://www.stimson.org/2026/south-koreas-ai-basic-act-seeking-balance-between-industry-innovation-and-social-risk/
- Cooley, South Korea's AI Basic Act: Overview — https://www.cooley.com/news/insight/2026/2026-01-27-south-koreas-ai-basic-act-overview-and-key-takeaways
- StationX, AI Regulations Around the World 2026 — https://app.stationx.net/articles/ai-regulations-around-the-world
