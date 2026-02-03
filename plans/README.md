# Plans

This directory stores implementation plans created by Cursor agents.

## Purpose

- Document design decisions for the team
- Resume interrupted work
- Provide context for future agents

## Usage

When using Plan Mode (`Shift+Tab`), click "Save to workspace" to store plans here.

Every plan must include a **Test Scenarios** section per `rules/97-plan-test-scenarios.mdc`: requirement traceability, happy path, edge cases, error handling, and (when relevant) security and integration. Scenarios act as acceptance criteria — the task is done when all pass.

## Naming Convention

Plans are auto-generated with timestamps. Rename for clarity:

```
YYYY-MM-DD-short-description.md
```
