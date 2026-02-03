# Cursor Hooks

Hooks are scripts that run at specific points in the agent lifecycle.

## Available Hooks

### ci-loop.mjs

Keeps the agent running until CI/CD pipeline passes.

**Trigger**: Automatically when a PR exists
**Behavior**:
- Checks PR status via `gh pr checks`
- If failed → prompts agent to fix and push
- If pending → prompts agent to wait
- If passed → stops loop
- Max 10 iterations

### test-loop.mjs

Keeps the agent running until tests pass.

**Trigger**: When running `/test-loop` command
**Behavior**:
- Checks `.cursor/scratchpad.md` for completion markers
- Continues until "TESTS PASSING" or "DONE" found
- Max 10 iterations
- When the task was planned with test scenarios (see `rules/97-plan-test-scenarios.mdc`), passing tests implies those scenarios are covered and passing — they act as acceptance criteria

## Configuration

Edit `.cursor/hooks.json` to configure which hooks run:

```json
{
  "version": 1,
  "hooks": {
    "stop": [
      { "command": "node .cursor/hooks/ci-loop.mjs" }
    ]
  }
}
```

## Scratchpad

Hooks use `.cursor/scratchpad.md` for state. Write `DONE`, `COMPLETE`, or `TESTS PASSING` to stop loops.

## Requirements

- `gh` CLI installed and authenticated
- Node.js (any modern version)
