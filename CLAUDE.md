# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite, with API proxy to dummyjson.com)
npm run build     # TypeScript compile + Vite production build
npm run lint      # ESLint (flat config, TS-aware)
npm run preview   # Preview production build locally
```

No test runner is configured.

## Architecture

**Dummy Shop** is a React 19 + TypeScript e-commerce demo app backed by the public [dummyjson.com](https://dummyjson.com) API.

### State split: Redux vs React Query

- **Redux Toolkit** (`src/redux/`) owns UI and client state: categories menu open/closed, search query, cart items, and current breakpoint. Cart state is persisted to `localStorage` via `redux-persist`.
- **React Query** owns all server state: product listings, product details, categories, user profile. Query hooks live alongside the features they serve (e.g. `src/features/shop/`).

Use `useAppDispatch` / `useAppSelector` (typed wrappers in `src/features/hooks/`) instead of the raw Redux hooks.

### Feature folder convention

`src/features/` is organized by domain:

| Folder | Contents |
|---|---|
| `authentication/` | Login/logout/current-user React Query hooks |
| `cart/` | Cart components + `useUserCart` hook |
| `shop/` | Product list, product details, search, categories + query hooks |
| `user/` | `UserMenu`, `UserSection`, `LoginButton`, `ProtectedRoute` |

Shared, domain-agnostic components live in `src/ui/`. Page-level route components are in `src/pages/`.

### Routing

React Router 7 using `createBrowserRouter` + `RouterProvider` with a nested layout. `AppLayout` (Header + Footer + `<Outlet>`) is the root layout. Protected routes are wrapped by `ProtectedRoute` in `src/features/user/`. Low-traffic routes (`/login`, `/profile`) use `lazy:` async imports for code splitting.

### API layer

`src/services/apiDummyShop.ts` — products, categories, carts  
`src/services/apiAuth.ts` — login, logout, current user  

Vite proxies `/api/*` to `https://dummyjson.com` in development (`vite.config.js`).

## Styling

**Tailwind CSS v4** (`@tailwindcss/vite` plugin). Global styles are in `src/index.css`. Use Tailwind utility classes for all styling.

## TypeScript

Strict mode is on. ESLint's `varsIgnorePattern` allows unused variables that start with a capital letter or underscore (useful for type-only imports and destructured-but-ignored values).
