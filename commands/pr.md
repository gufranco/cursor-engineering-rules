# /pr - Create Pull Request

Create a pull request and ensure CI passes.

## Steps

1. **Analyze changes**
   ```bash
   git status
   git diff
   ```

2. **Commit** (if needed)
   - Stage relevant files
   - Write a commit message following project conventions

3. **Push**
   ```bash
   git push -u origin HEAD
   ```

4. **Create PR**
   ```bash
   gh pr create --title "<title>" --body "<summary>"
   ```

5. **CI Loop (MANDATORY)**
   ```bash
   gh pr checks --watch
   ```
   - If failed: `gh run view <id> --log-failed`
   - Fix → Push → Repeat until green

6. **Return PR URL**

## Rules

- NEVER complete while CI is running/failing
- Iterate until ALL checks pass
