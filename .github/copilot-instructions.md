# Project instructions

This repository is for a TOB tool that helps calculate and pay Belgian tax on beursverrichtingen.

## Stack and architecture

- Frontend: Astro with React components and Fluent UI React v9.
- Backend: FastAPI managed with `uv`.
- Deployment target: Azure.
- Version control and collaboration: GitHub.

## Copilot routing

- For frontend tasks, use the repository custom agent named `frontend-agent` as the main entry point when available.
- For Astro frontend work, consult the installed Astro MCP server before changing pages, routing, integrations, islands, hydration, or client directives.
- For Fluent UI work, apply the `fluent` skill when available and consult the installed `fluent-agent` MCP server before writing code.
- Keep repository-wide instructions high-level. Detailed frontend workflow belongs in `.github\agents\frontend-agent.agent.md`; detailed Fluent UI component, icon, token, accessibility, and migration workflow belongs in `.github\skills\fluent\SKILL.md` and `.github\instructions\frontend-fluent.instructions.md`.

## General engineering expectations

- Prefer clear, typed, maintainable code over shortcuts.
- Keep frontend and backend concerns separate unless a task explicitly spans both.
- Use Azure-friendly configuration patterns and avoid hardcoded environment-specific values.
- Do not add frontend dependencies or bootstrap React/Fluent UI unless the task explicitly asks for implementation beyond Copilot configuration.
