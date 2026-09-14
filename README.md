# 🚇 Tokyo Railway Guide

> **한국인 여행자를 위한 도쿄 철도 여행 가이드**

Tokyo Railway Guide는 복잡한 도쿄 철도를 처음 이용하는 한국인 여행자가
**“지금 어떤 열차를 타고, 어디서 환승하고, 언제 도착하는지”**
쉽게 판단할 수 있도록 만드는 모바일 애플리케이션입니다.

단순히 철도 API 데이터를 보여주는 앱이 아니라,

> **지금 무엇을 해야 하는가.**

를 여행자에게 알려주는 것을 목표로 합니다.

React Native + Expo + TypeScript 기반으로 개발하고 있으며,
JR East, Tokyo Metro, Toei Subway와 도쿄 주요 사철의 데이터를
하나의 공통 구조와 사용자 경험으로 통합하고 있습니다.

현재는 CULLINAN Journey Engine과 SPECTRE App Experience를 기반으로
현재 Journey를 이해하고 여행자의 질문에 답변하는
**PHANTOM AI Assistant**를 개발하고 있습니다.

> 🚧 현재 개발 중인 개인 프로젝트입니다.

---

# ✨ Core Features

## 🚆 Railway

* JR East / Tokyo Metro / Toei Subway / 주요 사철 통합
* 한국어 · 일본어 역명
* 한국어 행선지
* 열차 종류 및 운행 방향
* 다음 열차 정보
* 환승 경로 탐색
* 철도회사 간 통합 경로 탐색

## 🧭 Journey

* 출발역 / 도착역 검색
* 최소 환승 경로 탐색
* 실제 열차 후보 탐색
* 환승 시간을 고려한 순차 열차 선택
* 실제 출발 / 도착 예정시간
* Multi-operator Journey
* 실시간 Journey 계산
* Last Journey / 숙소 막차 안내

## 📍 Location

* GPS 현재 위치
* 가장 가까운 역 탐색
* 현재 위치 → 주변역 안내
* 숙소 및 숙소역 저장
* 숙소로 돌아가기

## ✈️ Airport Journey

* 나리타 국제공항 (NRT)
* 도쿄 국제공항 / 하네다공항 (HND)
* 귀국 항공편 출발시간 설정
* 권장 공항 도착시간 계산
* 저장된 숙소와 공항 이동 연결
* CULLINAN Journey Engine 연동
* PHANTOM Airport Guidance 연동 구조

## 👻 PHANTOM AI

현재 보고 있는 Journey를 기반으로 여행자의 질문에 답변하는
AI Railway Travel Assistant입니다.

* Floating PHANTOM Assistant
* Bottom Sheet 기반 Assistant UI
* 현재 CULLINAN Journey Context 전달
* Journey + 사용자 질문 처리
* 실제 열차 정보 기반 여행 안내
* 환승 / 출발 / 도착 관련 질문 지원 구조
* 확인되지 않은 열차 정보를 임의로 생성하지 않는 구조
* Journey 정보가 없을 경우 명확한 오류 안내
* API 실패 시 사용자 질문 유지
* Airport Guidance 연동

PHANTOM은 독립적으로 열차 정보를 추측하는 AI가 아니라,
**CULLINAN이 확인한 Railway / Journey 데이터를 여행자가 이해하기 쉽게 설명하는 계층**으로 설계하고 있습니다.

```text
Railway Data
      ↓
CULLINAN
      ↓
Confirmed Journey
      ↓
PHANTOM AI
      ↓
Traveler Guidance
```

## 🎫 Traveler Guide

* 여행자 교통패스
* IC카드 이용 가이드
* Suica / PASMO 안내
* 신용카드 컨택리스 승차 안내
* 일본 철도 이용 가이드
* 공항 교통 안내

## ⭐ Personal

* 즐겨찾는 역
* 숙소 저장
* 앱 설정
* Local First 데이터 관리

---

# 🛠 Tech Stack

### Application

```text
React Native
Expo
Expo Router
TypeScript
AsyncStorage
```

### Railway / Backend

```text
Next.js Railway API
ODPT / Railway Data
Railway Provider / Adapter Architecture
```

### AI

```text
PHANTOM AI
Gemini API
CULLINAN Journey Context
```

---

# 🏗 Architecture

```text
Railway Data
      │
      ▼
Railway API
      │
      ▼
Provider / Service
      │
      ▼
Adapter
      │
      ▼
Common Railway Model
      │
      ▼
CULLINAN Journey Engine
      │
      ├───────────────┐
      ▼               ▼
React Native UI   PHANTOM AI
                      │
                      ▼
                Traveler Guidance
```

철도회사마다 서로 다른 데이터 구조를 UI에서 직접 처리하지 않고
Provider / Adapter 계층을 통해 공통 모델로 변환합니다.

CULLINAN은 이 데이터를 기반으로 실제 이용 가능한 Journey를 계산하고,
PHANTOM은 CULLINAN이 확인한 Journey를 기반으로 여행자에게 필요한 정보를 설명합니다.

---

# 🚇 Railway Coverage

| Railway     | Status |
| ----------- | ------ |
| JR East     | ✅      |
| Tokyo Metro | ✅      |
| Toei Subway | ✅      |
| Keisei      | ✅      |
| Keikyu      | ✅      |
| Seibu       | ✅      |
| Tokyu       | ✅      |

현재 주요 철도사업자의 노선 / 역 / 시간표 데이터를
공통 Journey 구조에서 사용할 수 있도록 통합하고 있습니다.

> 노선 및 역 조합별 실제 데이터 검증은 계속 진행 중입니다.

---

# 💎 CULLINAN Journey Engine

> **Realtime Journey Engine**

Tokyo Railway Guide의 핵심 경로 및 실제 열차 선택 엔진입니다.

```text
출발역
   ↓
findStationRoute()
   ↓
RouteStep[]
   ↓
buildJourneySegments()
   ↓
JourneyStructure
   ↓
Live Train Candidates
   ↓
CULLINAN
   ↓
실제 이용 가능한 Journey
```

CULLINAN은 단순 최단경로 계산에서 끝나지 않고
각 구간에서 실제 이용 가능한 열차를 찾아 다음 환승 열차까지 연결합니다.

예:

```text
신주쿠
  │
  │ JR 사이쿄선
  ▼
이케부쿠로
  │
  │ 세이부 이케부쿠로선
  ▼
나카무라바시
```

철도회사가 달라져도 하나의 Journey로 처리하는 것이 핵심입니다.

---

# 🧭 Development Principles

```text
No Login
Local First
Minimal Backend
Traveler First
No Railway Guessing
```

회원가입이나 불필요한 서버 기능보다는
실제 도쿄에서 철도를 이용하는 경험에 집중합니다.

즐겨찾기, 숙소, 설정 등 개인 데이터는 가능한 한 기기에 저장하고,
서버는 Railway API Key 보호와 외부 철도 데이터 정규화 등
필요한 역할에 집중합니다.

또한 실제 열차와 시간표를 다루는 기능에서는
확인할 수 없는 데이터를 임의로 생성하지 않는 것을 중요한 원칙으로 합니다.

---

# 🏷 Version Roadmap

Tokyo Railway Guide의 주요 버전에는 각각 코드네임이 있습니다.

| Version | Codename         | Theme                            | Status         |
| ------- | ---------------- | -------------------------------- | -------------- |
| v3.0    | 💎 CULLINAN      | Realtime Journey Engine          | ✅ Complete     |
| v4.0    | 👻 SPECTRE       | App Experience / Airport Journey | ✅ Complete     |
| v4.5    | 🤖 PHANTOM AI    | AI Travel Assistance             | 🚧 In Progress |
| v5.0    | 🍎 PLATINO       | iOS Native Experience            | ⏭️ Next        |
| v6.0    | 🏛️ PARTHENON    | Kansai — Osaka / Kyoto           | Planned        |
| v7.0    | 🌊 ODYSSEUS      | Future Expansion                 | Planned        |
| v8.0    | 🪽 HERMES        | Future Expansion                 | Planned        |
| v9.0    | ⚔️ PERSEUS       | Future Expansion                 | Planned        |
| v10.0   | 🌏 GENESIS       | Japan Nationwide Railway Network | Planned        |
| v11.0   | 🚢 THESEUS' SHIP | Major Architecture Refactoring   | Planned        |
| v12.0   | ✨ IOANNES        | Future Milestone                 | Planned        |

---

# 💎 v3.0 — CULLINAN

> **Realtime Journey Engine**

CULLINAN은 Tokyo Railway Guide의 핵심 철도 엔진을 구축한 버전입니다.

### Implemented

* [x] 철도 그래프 기반 경로 탐색
* [x] 최소 환승 경로 탐색
* [x] Journey Segment 생성
* [x] 철도회사별 Live Candidate 구조
* [x] JR East 연동
* [x] Tokyo Metro 연동
* [x] Toei Subway 연동
* [x] Keisei 연동
* [x] Keikyu 연동
* [x] Seibu 연동
* [x] Tokyu 연동
* [x] Multi-operator Journey
* [x] 실제 열차 기반 Journey Resolver
* [x] Last Journey 구조
* [x] 숙소 귀환 막차 안내
* [x] 공항 Journey 연결 구조

### Continuous Validation

* [ ] 다양한 노선 조합 실제 데이터 검증
* [ ] 자정 전후 Service Day 추가 검증
* [ ] 실제 스마트폰 / 도쿄 현지 최종 검증

---

# 👻 v4.0 — SPECTRE

> **App Experience & Airport Journey**

철도 엔진 위에 실제 여행자가 사용하는 모바일 경험을 구축한 버전입니다.

### App Experience

* [x] Main Journey UI
* [x] GPS 현재 위치
* [x] 가장 가까운 역
* [x] 숙소 저장
* [x] 숙소로 돌아가기
* [x] 즐겨찾는 역
* [x] 여행정보 메뉴
* [x] Main Video Hero

### Airport Journey

* [x] 공항 이동 허브
* [x] 나리타 국제공항
* [x] 도쿄 국제공항 / 하네다공항
* [x] 항공편 출발시간 선택
* [x] 공항 도착 목표시간 계산
* [x] 저장 숙소 연동
* [x] CULLINAN Journey 연결
* [x] PHANTOM Airport Guidance 구조

---

# 🤖 v4.5 — PHANTOM AI

> **AI Railway Travel Assistant**

PHANTOM은 현재 Journey를 이해하고
여행자가 지금 무엇을 해야 하는지 설명하는 AI Assistant입니다.

단순한 일반 챗봇이 아니라 CULLINAN의 실제 Journey 결과를 Context로 사용합니다.

```text
사용자 질문
     +
현재 Journey
     +
실제 열차 정보
     ↓
PHANTOM AI
     ↓
여행자가 지금 해야 할 행동
```

### Implemented

* [x] PHANTOM API
* [x] Gemini API 연동 구조
* [x] CULLINAN Journey → PHANTOM Context
* [x] Journey 자동 여행 안내
* [x] Journey + Message 질문 구조
* [x] Airport Guidance
* [x] Floating PHANTOM Button
* [x] Bottom Sheet Assistant UI
* [x] 질문 입력 UI
* [x] 질문 전송 처리
* [x] Loading State
* [x] Journey 데이터 없음 처리
* [x] API 실패 처리
* [x] 실패 시 사용자 질문 유지
* [x] 확인되지 않은 Railway 정보 추측 방지

### Remaining

* [ ] 실제 CULLINAN Journey → Gemini → PHANTOM End-to-End 최종 검증
* [ ] macOS / iOS 환경 통합 테스트
* [ ] 실제 iPhone PHANTOM UI 검증
* [ ] 긴 AI 응답 UI 검증
* [ ] 최종 모바일 UX 조정

> 회사 개발 환경에서는 외부 Railway API 및 Gemini 요청에
> CORS / 인증서 제약이 있어 최종 End-to-End 검증은 macOS 환경에서 진행합니다.

---

# 🍎 v5.0 — PLATINO

> **iOS Native Journey Experience**

PLATINO부터는 Expo 기반 애플리케이션을
실제 iOS Native 환경과 더욱 깊게 연결합니다.

PHANTOM 4.5의 최종 통합 검증 이후
macOS + Xcode + 실제 iPhone을 중심으로 개발합니다.

### Planned

* [ ] Xcode / iOS Native Build
* [ ] Expo Development Build
* [ ] 실제 iPhone 테스트
* [ ] iOS Permission 검증
* [ ] Movement Mode
* [ ] 이동 중 Journey 표시
* [ ] 남은 역 표시
* [ ] 하차 안내
* [ ] Live Activities
* [ ] Dynamic Island
* [ ] App Icon / Splash Screen
* [ ] Production API 검증
* [ ] EAS Production Build
* [ ] TestFlight
* [ ] Android 실제 기기 검증
* [ ] Google Play 테스트
* [ ] App Store / Google Play Release 준비

---

# 🗾 Long-Term Roadmap

## 🏛️ v6.0 — PARTHENON

도쿄를 넘어 오사카 / 교토 등
간사이 철도권으로 확장합니다.

## 🌏 v10.0 — GENESIS

```text
Tokyo
   ↓
Kansai
   ↓
Regional Networks
   ↓
Japan
```

장기적으로 일본 전국 철도 네트워크를 하나의 Journey 구조에서
다루는 것을 목표로 합니다.

## 🚢 v11.0 — THESEUS' SHIP

프로젝트가 장기간 성장했을 때 진행할 대규모 구조 개선 버전입니다.

> 수많은 부품을 교체하고도 같은 배라고 할 수 있는가?

기존 사용자 경험을 유지하면서
내부 구조를 현대화하는 것을 목표로 합니다.

---

# 🇯🇵 Tokyo Field Test

최종적으로 실제 스마트폰에 앱을 설치하고
도쿄 현지에서 직접 사용하는 것을 중요한 개발 단계로 보고 있습니다.

테스트 대상:

* Tokyo Metro 실제 탑승
* JR East 실제 탑승
* Toei Subway 실제 탑승
* 사철 실제 탑승
* 철도회사 간 환승
* GPS 주변역 정확도
* 숙소 → 목적지
* 목적지 → 숙소
* 숙소 → 공항
* PHANTOM 실제 Journey 안내
* 이동 중 Journey UI
* 실제 이동 중 UI 가독성
* 모바일 네트워크 환경

---

# 🎯 Project Goal

이 프로젝트의 목표는 거대한 철도 플랫폼을 만드는 것이 아닙니다.

> **직접 만든 앱을 스마트폰에 설치하고,
> 실제 도쿄에서 이 앱만 보고 철도를 이동할 수 있는 수준까지 완성하는 것.**

철도 API의 JSON을 화면에 표시하는 데서 끝나지 않고,

```text
Where am I?
     ↓
Where am I going?
     ↓
Which train should I take?
     ↓
Where should I transfer?
     ↓
When will I arrive?
     ↓
What should I do now?
```

를 하나의 Journey로 연결합니다.

CULLINAN이 실제 Journey를 계산하고,
SPECTRE가 여행자가 사용할 경험을 만들며,
PHANTOM이 그 Journey를 여행자의 언어로 설명합니다.

그리고 최종적으로 Tokyo Railway Guide가 답해야 하는 질문은 하나입니다.

> ## 지금 무엇을 해야 하는가.

---

# 📌 Disclaimer

Tokyo Railway Guide is an independent personal development project.

This project is not an official application of JR East, Tokyo Metro,
Toei Transportation, or any other railway operator.

Railway names, trademarks, data, and related information belong to
their respective owners.

Data licenses, commercial-use conditions, AI-generated guidance,
and attribution requirements will be reviewed before public distribution.
