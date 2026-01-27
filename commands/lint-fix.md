# /lint-fix - Fix Lint Errors

Run linter and fix all errors iteratively.

## Steps

1. **Run linter**
   - Use project's lint command
   - Capture errors

2. **If errors exist**
   - Fix errors one file at a time
   - Prefer auto-fix when available
   - Re-run linter to verify

3. **Repeat until clean**
   - Max 10 iterations
   - If stuck, report remaining issues

4. **Report results**
   - Files fixed
   - Any unfixable issues

## Rules

- Follow existing code style
- Don't disable lint rules without justification
- Prefer fixing over suppressing
