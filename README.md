# ObieMoney - Financial Management Platform

Monorepo managed with pnpm workspaces.

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 10+

### Install

```bash
pnpm install
```

### Run

```bash
# Start all workspace apps that expose a `start` script
pnpm dev

# Start a single app
pnpm dev:api
pnpm dev:webpanel-one
pnpm dev:webpanel-two
```

## Workspace Layout

- apps/api
- apps/webpanel-one
- apps/webpanel-two
- apps/api/lambdas/generate-invoice
- packages/components
- packages/hooks
- packages/messages
- packages/models
- packages/redux
- packages/theme
- packages/utils
- packages/eslint-config
- packages/typescript-config

## Root Scripts

- `pnpm build` runs build scripts recursively where present.
- `pnpm lint` runs lint scripts recursively where present.
- `pnpm test` runs test scripts recursively where present.
- `pnpm type-check` runs type-check scripts recursively where present.
- `pnpm format` runs Prettier on the repository.

## Notes

- Internal packages use `workspace:*` to guarantee local linking.
- A single shared lockfile is used at repo root.
