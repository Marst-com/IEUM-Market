
# IEUM Market

쿠팡형 온라인 마켓과 당근형 동네거래를 결합한 커뮤니티 거래 플랫폼.

## Tech Stack

- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express, TypeScript
- Database: Firebase Firestore
- Authentication: Firebase Authentication
- Deployment: Vercel + Render

## Project Structure

- `frontend/`: 사용자 인터페이스
- `backend/`: 인증, 상품, 주문, 지갑, 신고, 채팅 API

## Requirements

- Node.js 20+
- npm

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Security

- 잔액 및 주문 검증은 서버에서 처리한다.
- Firebase Admin 비밀 키는 서버 환경 변수에만 저장한다.
- 가상 포인트는 실제 현금과 구분한다.
- 실제 거래 기능은 인증, 권한 검사, 신고 처리 정책을 갖춘 뒤 운영한다.
