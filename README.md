# 🚇 Tokyo Railway Guide

> 한국인 여행자를 위한 도쿄 철도 안내 모바일 애플리케이션

**Tokyo Railway Guide**는 복잡한 도쿄 철도 정보를
한국인 여행자가 쉽고 빠르게 확인할 수 있도록 개발 중인 모바일 앱입니다.

React Native + Expo + TypeScript를 기반으로 개발하고 있으며,
JR 동일본, Tokyo Metro, Toei Subway 및 도쿄 주요 사철의
노선·역·열차 정보를 하나의 일관된 UI로 제공하는 것을 목표로 합니다.

> 🚧 현재 개발 중인 프로젝트입니다.  
> Application source code will be uploaded soon.

---

## ✨ 주요 목표

- 🇰🇷 한국인 여행자를 위한 철도 정보
- 🚇 여러 철도회사의 정보를 하나의 UI로 통합
- ⏰ 다음 열차 및 출발까지 남은 시간
- 🗺️ 한국어 행선지 및 운행 방향
- 🔄 환승 노선 정보
- 🔍 통합 역 검색
- ⭐ 즐겨찾기 / 최근 본 역
- 📍 GPS 기반 가장 가까운 역
- 🧭 여행 모드
- 🍎 향후 Live Activity / Dynamic Island 지원

---

## 🛠 Tech Stack

```text
React Native
Expo
Expo Router
TypeScript

Railway API
     ↓
Service
     ↓
Adapter
     ↓
Common Train / Station Model
     ↓
React Native UI
```

---

## 🚇 Development Status

### Tokyo Metro

| 노선 | Code | 상태 |
|---|:---:|:---:|
| 긴자선 | G | ✅ |
| 마루노우치선 | M | 🚧 |
| 히비야선 | H | 📋 |
| 도자이선 | T | 📋 |
| 지요다선 | C | 📋 |
| 유라쿠초선 | Y | 📋 |
| 한조몬선 | Z | 📋 |
| 난보쿠선 | N | 📋 |
| 후쿠토신선 | F | 📋 |

### Toei Subway

| 노선 | Code | 상태 |
|---|:---:|:---:|
| 오에도선 | E | ✅ |
| 아사쿠사선 | A | 📋 |
| 미타선 | I | 📋 |
| 신주쿠선 | S | 📋 |

### Other Railways

| Railway | Status |
|---|:---:|
| JR East | 🚧 |
| Keisei | 🚧 |
| Keikyu | 📋 |
| Seibu | 📋 |
| Tokyu | 📋 |

---

## 🏗 Architecture

철도회사마다 서로 다른 데이터 구조를
UI에서 직접 처리하지 않도록 Adapter 구조를 사용합니다.

```text
Railway API
      │
      ▼
   Service
      │
      ▼
   Adapter
      │
      ▼
Common Model
      │
      ▼
React Native UI
```

Tokyo Metro의 경우:

```text
Tokyo Metro API
        ↓
TokyoMetroUpcomingTrain[]
        ↓
TokyoMetroTrainAdapter
        ↓
Train[]
        ↓
TrainCard
```

각 철도회사의 서로 다른 데이터를 공통 모델로 변환하여
UI가 데이터 제공자의 구조에 직접 의존하지 않도록 설계하는 것을 목표로 합니다.

---

## 🧭 Development Principles

```text
No Login
Local First
Minimal Backend
```

회원가입이나 불필요한 서버 기능을 추가하기보다
철도 정보와 모바일 사용자 경험에 집중합니다.

즐겨찾기, 최근 본 역, 설정 등은 가능한 한 로컬에서 처리하고,
서버는 API Key 보호 및 외부 철도 데이터 중계 등 필요한 경우에만 사용합니다.

---

## 🗺 Roadmap

### Phase 1 — Railway Coverage

- [ ] Tokyo Metro 전체 노선
- [ ] Toei Subway 전체 노선
- [ ] JR East 주요 노선
- [ ] Keisei
- [ ] Keikyu
- [ ] Seibu
- [ ] Tokyu

### Phase 2 — Unified UX

- [ ] 한국어 / 일본어 역명
- [ ] 한국어 행선지
- [ ] 다음 열차
- [ ] 출발까지 남은 시간
- [ ] 환승 정보
- [ ] 종점 / 지선 처리
- [ ] 철도회사별 UI 통일

### Phase 3 — Traveler Features

- [ ] 통합 역 검색
- [ ] 즐겨찾기
- [ ] 최근 본 역
- [ ] 앱 설정

### Phase 4 — Location

- [ ] GPS 현재 위치
- [ ] 가장 가까운 역 검색
- [ ] 현재 위치 → 역 거리 표시

```text
📍 가장 가까운 역

G09 / M16 / H09
긴자역
銀座駅

30m
```

### Phase 5 — Journey Mode

- [ ] 출발역 / 목적지역 선택
- [ ] 이용 노선 안내
- [ ] 이동 중 현재 상태
- [ ] 남은 역 표시
- [ ] 목적지 도착 안내

### Phase 6 — Tokyo Beta Test 🇯🇵

실제 스마트폰에 앱을 설치한 후
도쿄 현지에서 직접 테스트하는 것을 목표로 합니다.

- Tokyo Metro 실제 탑승
- JR East 실제 탑승
- Toei Subway 실제 탑승
- 철도회사 간 환승
- GPS 주변역 정확도
- 실제 이동 중 UI 가독성
- 모바일 네트워크 환경 테스트

### Phase 7 — Live Journey Experience

#### iOS

- Live Activities
- Dynamic Island
- 남은 역 표시
- 하차 안내

#### Android

- Ongoing journey notification
- Background journey information

### Phase 8 — Release

- [ ] iOS Build
- [ ] Android Build
- [ ] App Icon
- [ ] Splash Screen
- [ ] Privacy Policy
- [ ] Railway Data Attribution
- [ ] Data License Review
- [ ] App Store
- [ ] Google Play

---

## 🎯 Project Goal

이 프로젝트의 첫 번째 목표는 거대한 철도 플랫폼을 만드는 것이 아닙니다.

> **직접 만든 앱을 스마트폰에 설치하고,
> 실제 도쿄에서 이 앱을 이용해 철도를 이동할 수 있는 수준까지 완성하는 것.**

단순히 API 데이터를 화면에 표시하는 것에서 끝나지 않고,
실제 여행 환경에서 사용할 수 있는 모바일 제품으로 발전시키는 것을 목표로 합니다.

---

## 🚧 Current Status

**Currently under active development.**

현재 Tokyo Metro를 중심으로
노선 및 실제 열차 데이터 연결 작업을 진행하고 있습니다.

```text
Tokyo Metro
     ↓
Toei Subway
     ↓
JR East
     ↓
Private Railways
     ↓
Traveler Features
     ↓
Tokyo Field Test 🇯🇵
```

Application source code will be uploaded soon.

---

## 📌 Disclaimer

Tokyo Railway Guide is an independent personal development project.

This project is not an official application of JR East, Tokyo Metro,
Toei Transportation, or any other railway operator.

Railway names, trademarks, data and related information belong to
their respective owners.

Data licenses and attribution requirements will be reviewed before public distribution.
