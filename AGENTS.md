# AGENTS.md — Meta-Wallet

> Context file for AI coding assistants working on this repository.

## Project Overview

**Meta-Wallet** is a landing page with MetaMask wallet integration built as a
single-page application (SPA). It is deployed to GitHub Pages under the
`/meta-wallet/` base path.

### Functional Scope

1. Connect MetaMask wallet:
   - Implement "Connect Wallet" button
   - Handle MetaMask connection flow
   - Display appropriate states (connected/disconnected)
2. Balance Display:
   - After wallet connection, display the user's ETH balance on Ethereum Mainnet
   - Display the user's USDT balance on Ethereum Mainnet
   - Balances should update upon connection

This is a lightweight production-style frontend assignment. Avoid
overengineering.

## Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| Language     | TypeScript 5.9 (strict mode)                    |
| UI Framework | React 19 (functional components, hooks)         |
| Bundler      | Vite 7 (`base: '/meta-wallet/'`)                |
| Styling      | Tailwind CSS 4 (via `@tailwindcss/vite` plugin) |
| Web3         | ethers.js 6                                     |
| Fonts        | Self-hosted Roboto (woff2, 400/500/700)         |
| Deployment   | GitHub Pages via `gh-pages` package             |

## Architecture Principles

### 1. Separation of Responsibilities

- UI components → presentational only
- Web3 logic → custom hooks
- Constants (addresses, config) → `/lib`
- No business logic inside JSX

### 2. Hooks Standards

Custom hooks must:

- Handle loading and error states
- Clean up event listeners (`accountsChanged`, `chainChanged`)
- Avoid unnecessary re-renders
- Use strict typing (no `any`)
- Return explicit, typed interfaces

### 3. Ethereum Constraints

- Only Ethereum Mainnet (`chainId === 1`)
- Detect MetaMask before connection
- Handle rejected connection requests
- Handle account switching
- Handle network switching
- No private key handling
- No write operations

## Project Structure

```
meta-wallet/
├── public/              # Static assets served as-is (favicon.svg, robots.txt)
├── src/
│   ├── components/      # Presentational React components (UI only)
│   │   ├── ConnectButton.tsx
│   │   └── BalanceDisplay.tsx
│   ├── hooks/           # Custom React hooks (Web3 / business logic)
│   │   ├── useWallet.ts
│   │   └── useBalance.ts
│   ├── lib/             # Constants, config, pure utilities
│   │   └── constants.ts
│   ├── types/           # Shared TypeScript interfaces
│   │   └── wallet.ts
│   ├── assets/
│   │   └── fonts/       # Self-hosted Roboto font files (.woff2)
│   ├── styles/
│   │   ├── global.css   # Tailwind import, font & theme imports, base element styles
│   │   ├── theme.css    # Design tokens (@theme): colors, spacing, typography, radii, shadows
│   │   └── fonts.css    # @font-face declarations for Roboto
│   ├── App.tsx          # Root component — composes hooks + components
│   └── main.tsx         # Entry point — renders <App /> into #root
├── index.html           # HTML shell (entry point for Vite)
├── vite.config.ts       # Vite config — React plugin, Tailwind plugin, base path
├── tsconfig.json        # Root TS config
├── tsconfig.app.json    # App-specific TS config (strict, bundler resolution, react-jsx)
├── tsconfig.node.json   # Node-side TS config (for vite.config.ts)
├── eslint.config.js     # ESLint flat config
├── .prettierrc          # Prettier config
└── .lintstagedrc.json   # Lint-staged config (runs on pre-commit via Husky)
```

Do not mix responsibilities between folders.

## Commands

| Command                | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start Vite dev server (http://localhost:5173)   |
| `npm run build`        | Type-check with `tsc` then build for production |
| `npm run preview`      | Preview production build locally                |
| `npm run lint`         | Run ESLint on all files                         |
| `npm run format`       | Format all files with Prettier                  |
| `npm run check:format` | Check formatting without writing                |
| `npm run deploy`       | Build and deploy to GitHub Pages                |

## Development Philosophy (AI-First)

This project follows an **AI-assisted development workflow**.

AI may be used for:

- Boilerplate generation
- TypeScript typing improvements
- Hook structure suggestions
- Edge-case analysis
- Code reviews
- Refactoring proposals

AI-generated code must:

- Be manually reviewed
- Be simplified when possible
- Follow React best practices
- Respect strict TypeScript rules
- Avoid unnecessary abstractions

## Code Style & Conventions

### TypeScript

- `strict: true`
- No unused locals or parameters
- Use `import type` where required
- Avoid unsafe casting
- Never introduce `any`
- Explicit return types for hooks
- Target: ES2022
- Module resolution: Bundler
- JSX: `react-jsx`

### React

- Functional components only
- Hooks for all state management and side effects
- Prefer early returns
- Avoid deeply nested conditionals
- Keep components small and composable
- JSX transform: `react-jsx` (no need to `import React`).

### Styling

- **Tailwind CSS 4** with the `@tailwindcss/vite` plugin — utility classes in JSX.
- Design tokens are defined in `src/styles/theme.css` using the `@theme` directive.
- Color palette uses **OKLCH** color space for perceptual uniformity (blue scale: 50–900).
- Custom CSS variables: `--color-*`, `--font-*`, `--text-*`, `--spacing-*`, `--radius-*`, `--shadow`.
- Base element styles (body, h1–h6, p) are set in `src/styles/global.css`.
- When adding new design tokens, add them to `theme.css` under the `@theme` block.

### Formatting (Prettier)

- Semicolons: **yes**
- Quotes: **single**
- Trailing commas: **es5**
- Print width: **80**
- Tab width: **2** (spaces, not tabs)
- Arrow parens: **always**
- End of line: **lf**

### Linting (ESLint)

- Flat config format (`eslint.config.js`).
- Extends: `@eslint/js` recommended, `typescript-eslint` recommended, `react-hooks`, `react-refresh`, and `eslint-config-prettier` (last, to disable conflicting rules).
- Only `*.ts` and `*.tsx` files are linted.

### Git Hooks

- **Husky** runs pre-commit hooks.
- **lint-staged** on commit:
  - `prettier --write` on `*.{js,jsx,ts,tsx,json,css,scss,md,html}`
  - `eslint --fix` on `*.{ts,tsx}`

## Important Notes

- **Base path**: Vite is configured with `base: '/meta-wallet/'`. All absolute asset
  references in `index.html` must include this prefix (e.g., `/meta-wallet/favicon.svg`),
  or use relative paths so Vite can resolve them automatically.
- **Deployment target**: GitHub Pages — the `dist/` directory is published via the
  `gh-pages` package. The `dist/` folder is git-ignored.
- **No routing library** is currently installed — the app is a single-page landing.
- **Web3 integration**: `ethers` v6 is available for MetaMask / Ethereum wallet
  interactions. Follow the ethers v6 API (e.g., `BrowserProvider`, `JsonRpcSigner`).

## Performance Guidelines

- Do not recreate providers on every render
- Avoid duplicate state
- Memoize when necessary
- Keep dependency arrays correct
- Prevent unnecessary balance refetching

---

## Security & Safety

- Never log wallet private data
- No sensitive data storage
- No direct RPC writes
- Only read blockchain state
- Validate provider availability before usage

---

## Definition of Done

The application is complete when:

- Wallet connects reliably
- ETH balance displays correctly
- USDT balance displays correctly
- Network validation works
- Errors are handled gracefully
- No TypeScript errors
- No ESLint warnings
- Deployed over HTTPS
- No console errors

---

## Change Management Rules for AI Agents

When modifying this repository:

1. Do not introduce new dependencies without justification.
2. Do not refactor architecture unless explicitly requested.
3. Keep changes incremental.
4. Explain structural changes clearly.
5. Prefer clarity over cleverness.
6. Avoid enterprise-level complexity.

---

Clarity > Cleverness  
Stability > Abstraction  
Functionality > Overengineering
