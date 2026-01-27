# /review - Review Current Changes

Analyze staged/unstaged changes for issues.

## Steps

1. **Gather changes**
   ```bash
   git diff
   git diff --staged
   ```

2. **Run available checks**
   - Lint (if configured)
   - Type check (if applicable)
   - Tests (if applicable)

3. **Analyze for issues**
   - Security concerns (secrets, vulnerabilities)
   - Performance problems (N+1 queries, memory leaks)
   - Logic errors
   - Missing error handling
   - Breaking changes

4. **Report findings**
   - List issues by severity (critical, warning, info)
   - Suggest fixes
   - Highlight what looks good

## Output Format

```
## Critical
- [file:line] Description

## Warnings
- [file:line] Description

## Suggestions
- [file:line] Description

## Looks Good
- Brief summary of well-implemented parts
```
