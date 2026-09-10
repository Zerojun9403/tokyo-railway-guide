# 🚇 Tokyo Railway Guide

> **한국인 여행자를 위한 도쿄 철도 여행 가이드**

**Tokyo Railway Guide**는 복잡한 도쿄 철도를 처음 이용하는 한국인 여행자가  
**“지금 어떤 열차을 타고, 어디서 환승하고, 언제 도착해야 하는지”**  
쉽게 판단할 수 있도록 만드는 모바일 애플리케이션입니다.

단순히 철도 API 데이터를 보여주는 앱이 아니라,

> **지금 무엇을 해야 하는가.**

를 여행자에게 알려주는 것을 목표로 합니다.

React Native + Expo + TypeScript 기반으로 개발하고 있으며,  
JR East, Tokyo Metro, Toei Subway와 도쿄 주요 사철의 데이터를  
하나의 공통 구조와 사용자 경험으로 통합하고 있습니다.

> 🚧 현재 개발 중인 개인 프로젝트입니다.

---

# ✨ Core Features

### 🚆 Railway

- JR East / Tokyo Metro / Toei Subway / 주요 사철 통합
- 한국어 · 일본어 역명
- 한국어 행선지
- 열차 종류 및 운행 방향
- 다음 열차 정보
- 환승 경로 탐색
- 철도회사 간 통합 경로 탐색

### 🧭 Journey

- 출발역 / 도착역 검색
- 최소 환승 경로 탐색
- 실제 열차 후보 탐색
- 환승 시간을 고려한 순차 열차 선택
- 출발 / 도착 예정시간
- 실시간 Journey 계산

### 📍 Location

- GPS 현재 위치
- 가장 가까운 역 탐색
- 현재 위치 → 주변역 안내
- 숙소 및 숙소역 저장
- 숙소로 돌아가기

### ✈️ Airport Journey

- 나리타 국제공항 (NRT)
- 도쿄 국제공항 / 하네다공항 (HND)
- 귀국 항공편 출발시간 설정
- 권장 공항 도착시간 계산
- 저장된 숙소와 공항 이동 연결
- CULLINAN Journey Engine 연동 구조

### 🎫 Traveler Guide

- 여행자 교통패스
- IC카드 이용 가이드
- Suica / PASMO 안내
- 신용카드 컨택리스 승차 안내
- 일본 철도 이용 가이드
- 공항 교통 안내

### ⭐ Personal

- 즐겨찾는 역
- 숙소 저장
- 앱 설정
- Local First 데이터 관리

---

# 🛠 Tech Stack

```text
React Native
Expo
Expo Router
TypeScript
AsyncStorage

Next.js Railway API
ODPT / Railway Data
```

### Data Architecture

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
      ▼
React Native UI
```

철도회사마다 서로 다른 데이터 구조를 UI에서 직접 처리하지 않고  
Provider / Adapter 계층을 통해 공통 모델로 변환합니다.

---

# 🚇 Railway Coverage

| Railway | Status |
|---|:---:|
| JR East | ✅ |
| Tokyo Metro | ✅ |
| Toei Subway | ✅ |
| Keisei | ✅ |
| Keikyu | ✅ |
| Seibu | ✅ |
| Tokyu | ✅ |

현재 주요 철도사업자의 노선 / 역 / 시간표 데이터를  
공통 Journey 구조에서 사용할 수 있도록 통합하고 있습니다.

> 노선 및 역 조합별 실제 데이터 검증은 계속 진행 중입니다.

---

# 💎 CULLINAN Journey Engine

Tokyo Railway Guide의 핵심 경로 및 열차 선택 엔진입니다.

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
각 구간에서 실제 이용 가능한 열차를 찾아 다음 환승 열차까지 연결하는 것을 목표로 합니다.

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
```

회원가입이나 불필요한 서버 기능보다는  
**실제 도쿄에서 철도를 이용하는 경험**에 집중합니다.

즐겨찾기, 숙소, 설정 등 개인 데이터는 가능한 한 기기에 저장하고,  
서버는 Railway API Key 보호와 외부 철도 데이터 정규화 등  
필요한 역할에 집중합니다.

---

# 🏷 Version Roadmap

Tokyo Railway Guide의 주요 버전에는 각각 코드네임이 있습니다.

| Version | Codename | Theme |
|:---:|---|---|
| **v3.0** | 💎 **CULLINAN** | Realtime Journey Engine |
| **v4.0** | 👻 **SPECTRE** | App Experience / Airport Journey |
| **v4.5** | 🤖 **PHANTOM AI** | AI Travel Assistance |
| **v5.0** | 🍎 **PLATINO** | iOS Native Experience |
| **v6.0** | 🏛️ **PARTHENON** | Kansai — Osaka / Kyoto |
| **v7.0** | 🌊 **ODYSSEUS** | Future Expansion |
| **v8.0** | 🪽 **HERMES** | Future Expansion |
| **v9.0** | ⚔️ **PERSEUS** | Future Expansion |
| **v10.0** | 🌏 **GENESIS** | Japan Nationwide Railway Network |
| **v11.0** | 🚢 **THESEUS' SHIP** | Major Architecture Refactoring |
| **v12.0** | ✨ **IOANNES** | Future Milestone |

---

# 💎 v3.0 — CULLINAN

> **Realtime Journey Engine**

CULLINAN은 Tokyo Railway Guide의 핵심 엔진을 완성하는 버전입니다.

### Implemented

- [x] 철도 그래프 기반 경로 탐색
- [x] 최소 환승 경로 탐색
- [x] Journey Segment 생성
- [x] 철도회사별 Live Candidate 구조
- [x] JR East 연동
- [x] Tokyo Metro 연동
- [x] Toei Subway 연동
- [x] Keisei 연동
- [x] Keikyu 연동
- [x] Seibu 연동
- [x] Tokyu 연동
- [x] Multi-operator Journey 기본 검증

### Remaining

- [ ] 종착역 실제 도착시간 처리
- [ ] 자정 이후 Service Day 처리
- [ ] Last Journey
- [ ] 숙소 귀환 최종 출발시간 계산
- [ ] 공항 Journey 연결
- [ ] 실제 스마트폰 최종 검증

---

# 👻 v4.0 — SPECTRE

> **App Experience & Airport Journey**

철도 엔진 위에 실제 여행자가 사용하는 모바일 경험을 완성하는 버전입니다.

### App Experience

- [x] Main Journey UI
- [x] GPS 현재 위치
- [x] 가장 가까운 역
- [x] 숙소 저장
- [x] 숙소로 돌아가기
- [x] 즐겨찾는 역
- [x] 여행정보 메뉴
- [x] Main Video Hero

### Airport Journey

- [x] 공항 이동 허브
- [x] 나리타 국제공항
- [x] 도쿄 국제공항 / 하네다공항
- [x] 항공편 출발시간 선택
- [x] 공항 도착 목표시간 계산
- [x] 저장 숙소 연동
- [ ] CULLINAN 실제 Journey 연결

---

# 🤖 v4.5 — PHANTOM AI

> **AI Travel Assistance**

향후 Journey 데이터를 기반으로  
여행자가 현재 상황을 더 쉽게 이해할 수 있도록 돕는 AI 기능을 연구합니다.

```text
현재 위치
   +
Journey
   +
Railway Status
   ↓
PHANTOM AI
   ↓
여행자가 지금 해야 할 행동
```

---

# 🍎 v5.0 — PLATINO

> **iOS Native Journey Experience**

Expo 기반 앱을 실제 iOS 환경과 더욱 깊게 연결하는 단계입니다.

### Planned

- [ ] Xcode / iOS Native Build
- [ ] 실제 iPhone 테스트
- [ ] Live Activities
- [ ] Dynamic Island
- [ ] 이동 중 Journey 표시
- [ ] 남은 역 표시
- [ ] 하차 안내
- [ ] App Store Release 준비

---

# 🗾 Long-Term Roadmap

### v6.0 — PARTHENON

도쿄를 넘어 **오사카 / 교토 등 간사이 철도권**으로 확장합니다.

### v10.0 — GENESIS

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

### v11.0 — THESEUS' SHIP

프로젝트가 장기간 성장했을 때 진행할 대규모 구조 개선 버전입니다.

> 수많은 부품을 교체하고도 같은 배라고 할 수 있는가?

기존 사용자 경험을 유지하면서 내부 구조를 현대화하는 것을 목표로 합니다.

---

# 🇯🇵 Tokyo Field Test

최종적으로 실제 스마트폰에 앱을 설치하고  
도쿄 현지에서 직접 사용하는 것을 중요한 개발 단계로 보고 있습니다.

테스트 대상:

- Tokyo Metro 실제 탑승
- JR East 실제 탑승
- Toei Subway 실제 탑승
- 사철 실제 탑승
- 철도회사 간 환승
- GPS 주변역 정확도
- 숙소 → 목적지
- 목적지 → 숙소
- 숙소 → 공항
- 실제 이동 중 UI 가독성
- 모바일 네트워크 환경

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
```

를 하나의 Journey로 연결합니다.

그리고 최종적으로 Tokyo Railway Guide가 답해야 하는 질문은 하나입니다.

> ## **지금 무엇을 해야 하는가.**

---

# 📌 Disclaimer

**Tokyo Railway Guide** is an independent personal development project.

This project is not an official application of JR East, Tokyo Metro,  
Toei Transportation, or any other railway operator.

Railway names, trademarks, data, and related information belong to  
their respective owners.

Data licenses, commercial-use conditions, and attribution requirements  
will be reviewed before public distribution.
