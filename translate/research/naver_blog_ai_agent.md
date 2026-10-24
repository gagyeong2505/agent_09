# 조사 노트: AI 에이전트 (네이버 블로그 글용)

- 작성일: 2026-10-24
- 목적: "AI 에이전트"를 주제로 한 친근한 말투의 네이버 블로그 글 자료
- 산출물: 네이버 블로그 임시저장 글 (발행하지 않음)

## 1. 정의

- AI 에이전트는 목표를 여러 단계로 나누고 사용 가능한 도구를 활용해 스스로 작업을 완수하는 시스템이다. LLM을 기반으로 텍스트 생성 이상의 의사결정과 행동을 할 수 있다. (IBM)
- Anthropic은 "에이전틱 시스템"을 두 가지로 구분한다.
  - **워크플로**: 미리 정해진 코드 경로를 따라 LLM과 도구가 실행된다.
  - **에이전트**: LLM이 스스로 진행 과정과 도구 사용을 동적으로 결정한다.

## 2. 작동 방식

- 일반적인 루프: **인식 → 추론(계획) → 행동 → 관찰**을 목표 달성까지 반복한다 (흔히 ReAct 패턴이라 부른다).
- 핵심 구성 요소 (IBM):
  - **계획**: 목표를 작업과 하위 작업으로 나눈다.
  - **도구 사용**: 웹 검색, 데이터베이스, API, 다른 에이전트를 활용한다.
  - **메모리**: 과거 상호작용과 해결 방법을 기억해 같은 실수를 반복하지 않는다.

## 3. 챗봇과 에이전트 비교

| 항목 | 챗봇 | AI 에이전트 |
|------|------|-------------|
| 역할 | 질문에 답변 | 목표를 달성 |
| 방식 | 반응형 (질문 하나에 답 하나) | 자율형 (다음 단계를 스스로 계획) |
| 도구 | 대부분 없음 | 검색, 파일, 이메일, 코드 실행 |
| 위험/비용 | 낮음 | 높음, 안전장치 필요 |

## 4. 시장 전망 (가트너)

- 2026년 말까지 기업용 앱의 40%에 업무 특화 AI 에이전트가 탑재된다. 2025년에는 5% 미만이었다 (보도자료, 2025-08-26).
- 발전 단계: 앱 내장 어시스턴트 → 업무 특화 에이전트 (2026) → 멀티 에이전트 생태계 (2029).
- 주의: 비용, 불분명한 가치, 부족한 위험 관리 때문에 2027년 말까지 에이전틱 AI 프로젝트의 40% 이상이 취소된다 (보도자료, 2025-06-25).

## 5. 실전 조언

- 가장 단순한 방법부터 시작한다. 많은 작업은 잘 설계된 LLM 호출 한 번으로 충분하다. (Anthropic)
- 에이전트는 더 나은 성능을 얻는 대신 지연 시간과 비용을 더 쓴다.
- 검토하기 쉬운 작은 반복 업무부터 맡기고 범위를 점차 넓힌다.
- 작업에 필요한 권한만 주고, 전송이나 결제 전에는 결과를 직접 확인한다.

## 6. 포맷 참고 ("AI 에이전트란" 네이버 상위 블로그)

- 상위 글 (diu_lab, "AI에이전트란? 챗봇 차이부터 업무 자동화 활용법까지"): 약 3,200자, 이미지 4장, 비교표 1개.
- 구성: 한 줄 정의 → 챗봇 비교 (표) → 활용 사례 → 주의할 점 → 추천과 마무리.

## 7. 이미지 (Unsplash 무료 라이선스)

| 파일 | 사진 | 작가 |
|------|------|------|
| 01_CjWsslYVnPI.jpg | 검은 배경 앞 흰색 로봇 | Gabriele Malaspina |
| 02_X9Cemmq4YjM.jpg | 로봇 손과 사람 손 | Cash Macanaya |
| 03_cckf4TsHAuw.jpg | 테이블 위 맥북, 머그잔, 스마트폰 | Andrew Neel |
| 04_sz1CHL7Pky0.jpg | 파란색 산업용 로봇 팔 | Homa Appliances |

`research/images/naver_blog_ai_agent/`에 저장했다.

## 출처

- IBM, "What are AI agents?" — https://www.ibm.com/think/topics/ai-agents
- Anthropic, "Building effective agents" — https://www.anthropic.com/engineering/building-effective-agents
- 가트너 보도자료 (2025-08-26) — https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025
- 가트너 보도자료 (2025-06-25) — https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027
- 세일즈포스 코리아, "AI 에이전트와 챗봇의 차이점" — https://www.salesforce.com/kr/agentforce/ai-agent-vs-chatbot/
- 포맷 참고: https://blog.naver.com/diu_lab/224450263688
- 이미지: https://unsplash.com
