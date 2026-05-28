# Dummy Shop

A React e-commerce demo app powered by the [dummyjson.com](https://dummyjson.com) public API.

## Features

- Browse products by category or search
- Product detail page with image gallery and reviews
- Cart with quantity controls, discounts, and checkout summary
- User authentication with a protected profile page
- Pagination

## Tech Stack

| Layer        | Library                                              |
| ------------ | ---------------------------------------------------- |
| UI           | React 19 + TypeScript                                |
| Routing      | React Router 7 (`createBrowserRouter`, lazy loading) |
| Server state | TanStack React Query v5                              |
| Client state | Redux Toolkit + redux-persist                        |
| Styling      | Tailwind CSS v4                                      |
| Build        | Vite 7                                               |
| API          | dummyjson.com                                        |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Other commands

```bash
npm run build    # Production build
npm run preview  # Preview production build locally
npm run lint     # ESLint
```

## Login

Use any user from [dummyjson.com/users](https://dummyjson.com/users). Example:

```
Username: emilys
Password: emilyspass
```
