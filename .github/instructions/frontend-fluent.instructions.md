---
applyTo: "client/src/**/*.tsx,client/src/**/*.jsx"
---

# React frontend Fluent UI instructions

These instructions apply to React component files in the Astro frontend.

Use the `frontend-agent` custom agent as the main entry point for frontend work when available.

## Required Fluent workflow

Before writing or changing React frontend code that uses UI components, styling, accessibility behavior, icons, or Fluent UI:

1. Consult the installed Fluent MCP server with `ask_fluent_agent`.
2. For Fluent UI React v9 components, use `search_fluent_components` and verify selected components with `validate_fluent_component`.
3. For icons, use `search_fluent_icons` and verify selected icons with `validate_fluent_icon`.
4. For colors, spacing, typography, borders, shadows, and layout values, use `search_fluent_tokens` and verify important token names with `validate_fluent_token`.
5. Use `ask_fluent_agent` with the `react-v9` knowledge base for best practices, accessibility, and theming guidance.
6. For v8-to-v9 migration work, use `ask_fluent_agent` with the `v9-migration` knowledge base before changing imports or APIs.
7. For Astro integration, islands, hydration, or client directive decisions related to these React components, consult the Astro MCP docs with `astro-search_astro_docs`.

## Frontend conventions

- Use Fluent UI React v9 from `@fluentui/react-components`.
- Use `makeStyles`, `mergeClasses`, and Fluent design tokens instead of hardcoded colors, spacing, typography, or `mergeStyles`.
- Prefer composition with standard Fluent components over custom UI primitives.
- Keep accessibility explicit: labels, keyboard behavior, focus management, ARIA attributes, and readable text spacing must be checked.
- Astro pages should host React islands/components; React component files should stay focused on interactive UI. Use Astro MCP guidance for page, island, and hydration decisions.

## Migration conventions

- Replace `@fluentui/react` imports with `@fluentui/react-components`.
- Replace v8 components with validated v9 equivalents.
- Convert `PrimaryButton` to `Button` with `appearance="primary"` where appropriate.
- Replace v8 theme usage with Fluent UI React v9 tokens and `FluentProvider` patterns.
- Replace `mergeStyles` styling with `makeStyles`.

## Typography spacing

Fluent UI React v9 typography components do not automatically insert whitespace between adjacent elements. Use layout gaps or explicit separators so rendered text and screen-reader output do not concatenate words.
