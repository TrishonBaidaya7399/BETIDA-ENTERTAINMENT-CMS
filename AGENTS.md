<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work:

- Read docs from `node_modules/next/dist/docs/`
- Do NOT rely on outdated knowledge

<!-- END:nextjs-agent-rules -->

# Project Overview

This is a casino and sports betting platform built with Next.js App Router, with Telegram Mini App integration and multi-tenant support.

# Commands

- `npm run dev` → start dev server
- `npm run build` → production build
- `npm run lint` → lint check
- `npx vitest` → run tests

# Core Rules

- Use App Router (`src/app/[locale]`)
- Use `@/` alias for imports
- Use Zustand for client state
- Use React Query for server state
- Use next-intl for translations

# Architecture Rules

- Server fetchers → `src/lib/fetchers`
- Client services → `src/lib/services`
- API routes → `src/app/api`
- Stores → `src/store`
- Hooks → `src/hooks`

Do NOT mix responsibilities between layers.

# Authentication (CRITICAL)

- NextAuth v4 with:
  - Keycloak
  - Telegram Mini App (hash verification)

Protected routes:

- `/my-bets`
- `/settings`
- `/transactions`
- `/wallet`

🚨 Do NOT:

- Break authentication flow
- Modify Telegram auth logic
- Change middleware behavior without full understanding

# Real-time (CRITICAL)

- WebSocket hooks in `src/hooks`
- SSE endpoint: `/api/sse`

🚨 Do NOT:

- Refactor WebSocket logic without tracing usage
- Break real-time subscriptions

# Internationalization

- next-intl
- Messages in `/messages`
- Default locale: `en`

🚨 Do NOT hardcode strings

# Critical Safety Rules

❌ DO NOT:

- Break auth flow
- Modify API contracts blindly
- Remove Zustand stores without checking usage
- Introduce new state management libraries

✅ ALWAYS:

- Follow existing patterns
- Keep changes minimal and safe
- always use the global.css variable for ui don't add any custom variable like hash code or directly using like eg: "bg-purple-400"
- don't write any inline style instead use tailwind classes.
