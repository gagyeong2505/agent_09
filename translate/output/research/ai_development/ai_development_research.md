# 자료조사 정리: 인공지능(AI)의 발전 (2026년 10월 기준)

> 주제: AI 발전
> 조사일: 2026-10-04 (웹 검색)
> 참고: [2차]로 표시한 수치는 원 보고서가 아닌 블로그나 요약 기사에서 가져온 것이다. 공식 인용 전에 원문과 대조해야 한다.

---

## 1. 기술 역량의 발전

### 1.1 전반적 추세 (Stanford AI Index 2026)
- AI 역량은 정체되지 않고 오히려 **가속**하고 있으며, 그 어느 때보다 많은 사람에게 닿고 있다.
- 2025년 주요 프런티어 모델의 **90% 이상**을 산업계가 만들었다.
- 여러 모델이 박사급 과학 문제, 멀티모달 추론, 경시 수학에서 인간 기준선과 같거나 더 높은 성능을 낸다.
- **SWE-bench Verified**(소프트웨어 공학) 성능은 1년 만에 **약 60%에서 100% 가까이** 올랐다.
- 출처: Stanford HAI, *The 2026 AI Index Report*

### 1.2 벤치마크
- **MMLU-Pro**: 2026년 초 이미 최고 점수가 약 90%에 이르러 포화에 가깝다. [2차]
- **GPQA Diamond**(박사급 과학): 프런티어 모델이 박사급 전문가를 앞섰다. 보도된 상위 모델은 Gemini 3.1 Pro(94.3%), Claude Fable 5(94.1%), Claude Opus 4.8(93.6%)이다. [2차]
- **Humanity's Last Exam(HLE)**: 수십 개 분야 전문가가 출제한 2,500문항으로, 현재 폐쇄형 평가의 상한선으로 여겨진다. 최근 한 모델이 64.7%를 기록했다고 한다. [2차]
- 벤치마크가 포화되면 더 어려운 것으로 대체되는 주기가 계속 빨라지고 있다.

### 1.3 AI 에이전트
- **WebArena**(자율 웹 작업): 성공률이 15%(2023)에서 **74.3%**(2026년 초)로 올랐다.
- **Cybench**(전문가 수준 사이버보안 과제 40개): 프런티어 모델이 93%를 풀었다.
- 실제 프로덕션 환경에서는 여전히 **약 3번 중 1번** 실패한다(VentureBeat).
- 취약점: 도구 사용, 계획 수립, 다단계 추론, 환각.

### 1.4 '들쭉날쭉한 프런티어(Jagged Frontier)'
- 국제수학올림피아드에서 금메달 수준을 내는 모델이 아날로그 시계는 **50.1%**만 정확히 읽는다(AI Index 2026).
- 대표 벤치마크 점수는 실제 업무에서의 성능을 가늠하기에 부족한 지표다.

### 1.5 지정학: 미국 대 중국
- 미국과 중국 모델 간 성능 격차는 **사실상 사라졌다**. 2025년 초 이후 선두가 여러 차례 바뀌었다.
- 2026년 3월 기준 미국 최고 모델(Anthropic)의 우위는 약 2.7%에 불과하다.

---

## 2. 도입과 투자

### 2.1 도입
- 조직의 AI 도입률은 **88%**, 생성형 AI의 세계 인구 도입률은 **53%**다(AI Index 2026).
- 생성형 AI는 3년 만에 세계 인구의 53%에 닿았다. PC나 인터넷보다 빠른 속도다.

### 2.2 투자
- 기업 AI 투자액: **5,816.9억 달러**(AI Index 2026).
- Gartner는 2026년 데이터센터 지출이 **55.8%** 늘어 **7,880억 달러**를 넘을 것으로 전망한다.
- 미국 5대 하이퍼스케일러(Amazon, Alphabet, Microsoft, Meta, Oracle)는 2026년 설비투자로 **6,600억~6,900억 달러**를 약정했다. 이 중 약 75%(약 4,500억 달러)가 AI 인프라에 쓰인다. (Futurum)
- Goldman Sachs 기본 모델은 2026년 AI 설비투자를 약 **7,650억 달러**로 보고, **2031년에는 연 1.6조 달러**로 늘 것으로 전망한다.
- McKinsey는 2030년까지 전 세계 데이터센터 투자가 약 **7조 달러**에 이르고, 그중 5조 달러 이상이 AI와 관련될 것으로 전망한다.

### 2.3 에너지
- IEA에 따르면 데이터센터 전력 소비는 2022년 460TWh였고, **2026년에는 650~1,050TWh**로 예상된다(높은 시나리오 기준 약 2배).
- 미국 데이터센터: 200TWh(2022) → 260TWh(2026), 미국 전체 전력의 약 6%.
- 전력 공급이 AI 인프라의 병목이 되고 있다.

---

## 3. 응용: 과학과 의료
- **Insilico Medicine**: AI가 설계한 특발성 폐섬유증 치료제가 임상 2a상을 마쳤고, 결과가 *Nature Medicine*에 실렸다. AI가 처음부터 끝까지 발굴한 약물의 첫 임상적 개념 증명이다. 2a상까지 약 18개월, 약 600만 달러가 들었다. 기존 방식은 6~8년, 1억~2억 달러가 든다.
- AI가 발굴한 분자 **75개 이상**이 인체 임상 중이다. 전임상 단계의 시간과 비용은 약 50~70% 줄었다.
- 대형 계약: Eli Lilly–Insilico(최대 27.5억 달러), Sanofi–Owkin(신약 개발용 에이전트형 AI).

---

## 4. 노동시장 영향
- **Anthropic(2026.3)**: ChatGPT 출시 이후 AI 노출도가 높은 노동자의 전체 실업률이 늘었다는 증거는 발견되지 않았다.
- **S&P Global**: 지난 1년간 순고용 영향은 -5포인트였고, 2026년에는 소폭 감소(-2포인트)가 예상된다.
- **HBR(2026)**: ChatGPT 이후 자동화되기 쉬운 반복 업무 채용은 13% 줄었고, 분석·기술·창의 직무 수요는 20% 늘었다.
- **Goldman Sachs(2026.8)**: 선진국에서 콜센터, 소프트웨어 출판, 경영 컨설팅, 광고 분야 고용이 추세보다 크게 낮아졌다.
- **PwC 2026 Global AI Jobs Barometer**: '투 트랙' 노동시장이 생기고 있다. AI가 전문가의 생산성을 끌어올리는 '전문화된' 직무가 '대중화된' 직무보다 인원과 임금 모두 더 크게 늘고 있다.
- AI 노출도가 가장 높은 직무의 종사자는 여성, 고령, 고학력, 고소득인 경우가 상대적으로 많다.

---

## 5. 안전, 거버넌스, 규제

### 5.1 위험 지표
- 기록된 AI 사고는 1년 사이 **233건에서 362건**으로 늘었다(AI Index 2026).
- 미국 중·고등학교 중 AI 정책이 있는 곳은 절반 정도다.
- 'AI가 업무에 도움이 될 것인가'에 대해 전문가와 일반 대중의 인식 차이가 **50%포인트**에 이른다.

### 5.2 EU AI Act
- 범용 AI(GPAI) 규정은 2025년 8월, 대부분의 조항은 2026년 8월부터 적용됐다.
- 최근의 간소화 합의로 고위험 AI 규정 시행일이 2026년 8월에서 **2027년 12월 2일**로 미뤄졌다.

### 5.3 한국 AI 기본법
- **2026년 1월 22일** 시행. EU와 함께 포괄적 AI 법이 시행 중인 몇 안 되는 국가다.
- 한국 이용자에게 서비스하는 해외 기업도 적용 대상이다.
- 주요 의무: 생성형 AI 투명성(표시 등), 일정 연산량 이상으로 학습한 모델의 안전성 의무, 의료·채용·대출·에너지 등 고영향 AI에 대한 의무.
- 산업 진흥과 사회적 위험 관리 사이의 균형을 목표로 한다.

---

## 6. 보고서를 위한 핵심 시사점
1. **속도**: 역량, 도입, 투자 모두 역사적으로 유례없는 속도로 늘고 있다.
2. **불균형**: 벤치마크 성과는 높지만 실제 환경에서의 신뢰성(실패율, 들쭉날쭉한 프런티어)은 아직 뒤처진다.
3. **인프라와 에너지**: 컴퓨팅 투자가 조 달러 규모에 이르렀고, 전력이 새로운 제약이 됐다.
4. **사회적 영향**: 대량 실업은 아직 없지만 직무 구조가 재편되고 양극화되고 있다.
5. **거버넌스 격차**: 사고는 늘고 있는데 규제는 아직 자리 잡는 중이다(EU는 연기, 한국은 시행).

---

## 출처
- Stanford HAI, The 2026 AI Index Report — https://hai.stanford.edu/ai-index/2026-ai-index-report
- Stark Insider, Stanford's 2026 AI Index — https://www.starkinsider.com/2026/04/stanford-2026-ai-index-report.html
- Kili Technology, AI Benchmarks 2026 — https://kili-technology.com/blog/ai-benchmarks-guide-the-top-evaluations-in-2026-and-why-theyre-not-enough
- VentureBeat, Frontier models are failing one in three production attempts — https://venturebeat.com/security/frontier-models-are-failing-one-in-three-production-attempts-and-getting-harder-to-audit
- arXiv, Beyond the Leaderboard (에이전트 실패 종합) — https://arxiv.org/pdf/2607.05775
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
