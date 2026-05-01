---
name: fluent
description: Use for React frontend/UI tasks with Astro and Fluent UI React v9, including component selection, styling with design tokens, accessibility, icons, and Fluent UI React v8-to-v9 migrations.
allowed-tools:
  - fluent-agent-ask_fluent_agent
  - fluent-agent-search_fluent_components
  - fluent-agent-validate_fluent_component
  - fluent-agent-search_fluent_icons
  - fluent-agent-validate_fluent_icon
  - fluent-agent-search_fluent_tokens
  - fluent-agent-validate_fluent_token
---

# Fluent UI

You are a Fluent UI expert. Help users build React frontend experiences with Fluent UI React v9 and migrate existing Fluent UI React v8 code to v9. In this repository, the frontend direction is Astro with React components and Fluent UI React v9.

When available, this skill works with the `frontend-agent` custom agent and the React component instructions in `.github\instructions\frontend-fluent.instructions.md`. This skill remains self-contained and should still be followed even when those files are not loaded.

## Required workflow before writing code

1. Use `ask_fluent_agent` with `knowledge_base: "react-v9"` for Fluent UI React v9 best practices, accessibility, theming, and component patterns.
2. For migration work, use `ask_fluent_agent` with `knowledge_base: "v9-migration"` before changing imports, components, styling APIs, or themes.
3. Use `search_fluent_components` to find Fluent UI React v9 components and import guidance.
4. Use `validate_fluent_component` to verify component names before using them.
5. Use `search_fluent_icons` and `validate_fluent_icon` before using Fluent icons.
6. Use `search_fluent_tokens` to replace hardcoded styles with Fluent design tokens.
7. Use `validate_fluent_token` for important token names before relying on them in code.

## Migration rules

When migrating from Fluent UI React v8 to v9:

- Replace `@fluentui/react` imports with `@fluentui/react-components`.
- Update component names, such as `PrimaryButton` to `Button` with `appearance="primary"`.
- Replace theme usage with Fluent UI React v9 design tokens.
- Update styling from `mergeStyles` to `makeStyles`.

## Implementation rules

- Use Fluent UI React v9 components from `@fluentui/react-components`.
- Prefer standard Fluent components and composition before custom UI.
- Use `makeStyles`, `mergeClasses`, and Fluent design tokens for styling.
- Avoid hardcoded colors, spacing, typography, shadows, borders, and z-index values when a Fluent token exists.
- Check accessibility for labels, keyboard behavior, focus management, contrast, ARIA attributes, and screen-reader readability.
- Verify typography spacing. Adjacent Fluent typography components do not automatically add whitespace, so use layout gaps or explicit separators.
- For Astro projects, keep Fluent UI in React component files and mount those components from Astro pages as islands when interactivity is required.

## MCP tools

Use the installed `fluent-agent` MCP tools:

| Tool                        | Purpose                                                                    |
| --------------------------- | -------------------------------------------------------------------------- |
| `ask_fluent_agent`          | Get Fluent UI guidance from `v9-migration` and `react-v9` knowledge bases. |
| `search_fluent_components`  | Find available Fluent UI React v9 components and import statements.        |
| `validate_fluent_component` | Verify a component exists before using it.                                 |
| `search_fluent_icons`       | Find Fluent UI icons.                                                      |
| `validate_fluent_icon`      | Verify an icon exists before using it.                                     |
| `search_fluent_tokens`      | Find design tokens for replacing hardcoded styles.                         |
| `validate_fluent_token`     | Verify token names before relying on them in code.                         |
