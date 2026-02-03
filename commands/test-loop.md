# /test-loop - Run Tests Until Pass

Iterate on code until all tests pass.

## Steps

1. **Run tests**
   - Use project's test command
   - Capture output and failures

2. **If tests fail**
   - Analyze error messages
   - Identify root cause
   - Fix the issue (code or test)
   - Run tests again

3. **Repeat until green**
   - Max 10 iterations to prevent infinite loops
   - If stuck after 5 attempts, reassess approach

4. **Report results**
   - Summary of what was fixed
   - Final test output

## Rules

- One fix at a time
- Don't modify tests to make them pass (unless test is wrong)
- Read full error messages before fixing
- When the task was planned with test scenarios (see `rules/97-plan-test-scenarios.mdc`), passing tests means those scenarios are the acceptance criteria — ensure they are covered and passing
