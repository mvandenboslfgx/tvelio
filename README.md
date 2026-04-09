# Super TV Hub

Production-ready Next.js platform for IPTV + YouTube + VOD-ready expansion.

## Features
- Dual mode UI (Simple default + Advanced)
- IPTV: M3U parser, Xtream API proxy, XMLTV parser
- YouTube integration via official APIs (proxy routes + caching)
- Login + token persistence (localStorage + bearer validation)
- Human-readable error handling and auto-retry stream strategy
- A11Y-friendly TV-first navigation and large controls
- Remote family support architecture contracts

## Demo Login
- Email: `demo@supertvhub.local`
- Password: `demo1234`
- Override via `.env.local` using `DEMO_LOGIN_EMAIL` / `DEMO_LOGIN_PASSWORD`.

## Run
1. Copy `.env.example` to `.env.local`
2. Ensure registry is correct:

```bash
npm config set registry https://registry.npmjs.org/
npm config get registry
```

3. Install and start:

```bash
npm install
npm run dev
```
