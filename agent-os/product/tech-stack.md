# Technology Stack & Architecture

## Core Extension (Backend)
The architectural backbone of Zero Gravity is a VS Code Extension running a persistent Agentic Engine.
*   **Platform**: VS Code Extension API (`^1.90.0`)
*   **Language**: TypeScript (Strict Mode)
*   **Runtime**: Node.js (via VS Code Host)

### AI & Agent Engine
*   **Orchestration**: **Mastra** (`@mastra/core`) - Primary agent framework.
*   **LLM Interface**: **Vercel AI SDK** (`ai`, `@ai-sdk/*`) - Standardized model interaction.
*   **Memory**: `@mastra/memory` - Context retention.
*   **Validation**: `zod` - Schema definition and structured output validation.
*   **Communication**: `ws` (WebSocket) - For real-time updates if needed.

## User Interface (Frontend / Webview)
The Agent Dashboard and interactive elements are built as a modern Single Page Application (SPA) embedded within VS Code.
*   **Framework**: **React 19**
*   **Build System**: **Vite** (with `rolldown-vite`)
*   **Styling**: **Tailwind CSS** + `clsx` + `tailwind-merge`
*   **Component Library**:
    *   **Radix UI** (Primitives for accessibility)
    *   **Assistant UI** (`@assistant-ui/react`) - Specialized AI chat components.
    *   **Lucide React** - Iconography.

## Development & Tooling
*   **Build/Bundler**: **esbuild** (Extension), **Vite** (Webview).
*   **Testing**:
    *   **Unit**: **Vitest** (`vitest`) - Fast, headless testing.
    *   **Integration**: **Mocha** (`mocha`) - VS Code extension host testing.
    *   **Coverage**: `@vitest/coverage-v8`.
*   **Linting**: ESLint (`@typescript-eslint/*`).

## Key Architectural Decisions
1.  **React 19 & Vite**: Utilizing the latest React features for a responsive, high-performance UI within the webview.
2.  **Mastra Integration**: Embedding the Mastra agent engine directly into the extension process for autonomous capabilities.
3.  **Strict TypeScript**: Enforcing type safety across the entire stack (`strict: true` in `tsconfig.json`).
4.  **No Mocking (Testing)**: (inferred from user preference) Testing relies on real implementations where possible or dedicated test doubles, avoiding fragile mocking frameworks.
