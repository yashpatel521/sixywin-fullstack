# Project Architecture Guidelines

1. **Page-Specific Components**:
   - Always create dedicated sub-directories under `src/components/` grouped by page/feature (e.g. `src/components/landing/`, `src/components/games/`, `src/components/auth/`, `src/components/layout/`).
   - Keep page files (`src/app/games/page.tsx`, `src/app/login/page.tsx`) lightweight, focusing on data fetching and state orchestration while delegating rendering to page components.

2. **Reusable UI Primitives**:
   - Place all generic, reusable UI primitive components in `src/components/ui/` (e.g., `Skeleton.tsx`, `Button.tsx`, `Modal.tsx`, `Input.tsx`, `Badge.tsx`, `Toaster.tsx`).

3. **Feature-Wise Database Queries**:
   - Place all database queries in dedicated sub-directories under `src/db/queries/` grouped by feature/page (e.g., `src/db/queries/auth/userQueries.ts`, `src/db/queries/games/gameQueries.ts`, `src/db/queries/lottery/lotteryQueries.ts`).

4. **Feature-Wise Server Actions**:
   - Place all Server Actions in dedicated sub-directories under `src/actions/` grouped by feature/page (e.g., `src/actions/auth/authActions.ts`, `src/actions/games/gameActions.ts`, `src/actions/lottery/lotteryActions.ts`).
