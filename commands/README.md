# Cursor Commands

Reusable workflows triggered with `/` in agent input.

## Available Commands

| Command | Description |
|---------|-------------|
| `/pr` | Create PR and monitor CI until green |
| `/fix-issue [id]` | Fetch issue, implement fix, open PR |
| `/review` | Analyze changes for issues |
| `/test-loop` | Run tests until all pass |
| `/lint-fix` | Fix all lint errors |
| `/migrate` | Safe database migration workflow |
| `/refactor` | Systematic refactoring with tests |
| `/performance` | Performance audit checklist |
| `/security-audit` | Security review workflow |

## Usage

Type `/command-name` in the Cursor agent input.

## Creating Custom Commands

1. Create a `.md` file in this directory
2. Name it `command-name.md`
3. Include:
   - Title with `# /command-name`
   - Description
   - Step-by-step instructions
   - Rules/constraints

## CI Loop Behavior

Commands that push code (`/pr`, `/fix-issue`) automatically trigger the CI loop hook, which keeps the agent running until all pipeline checks pass.
