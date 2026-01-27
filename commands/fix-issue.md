# /fix-issue [id] - Fix Issue from Tracker

Fetch issue details, implement fix, and open PR.

## Arguments

- `id`: Issue identifier (GitHub issue number, Linear ID, Jira key, etc.)

## Steps

1. **Fetch issue details**
   ```bash
   gh issue view <id>
   ```
   Or use appropriate MCP tool for your issue tracker.

2. **Understand requirements**
   - Read issue description and comments
   - Identify acceptance criteria
   - Ask clarifying questions if ambiguous

3. **Find relevant code**
   - Search codebase for related files
   - Understand current implementation

4. **Implement fix**
   - Follow existing patterns
   - Write/update tests if applicable
   - Ensure code compiles and lints

5. **Create PR with CI loop**
   - Use `/pr` command workflow
   - Reference issue in PR: `Fixes #<id>` or `Closes <ID>`

## Rules

- Understand before coding
- Follow project conventions
- Ensure CI passes before completing
