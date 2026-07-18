# Architecture Overview

## Goals
- Keep the app maintainable and scalable.
- Preserve the existing Next.js App Router structure.
- Isolate reusable UI and shared logic into focused modules.

## Structure
- App routes live in src/app.
- Shared data helpers live in src/lib.
- Reusable UI components live in src/app/components.
- State hooks for local persistence live in src/app/hooks.

## Key refactors
- Consolidated question presentation into shared helpers and a reusable list item component.
- Centralized filter normalization and presentation styles in src/lib.
- Replaced imperative effect-based initialization with lazy initializers where appropriate.
