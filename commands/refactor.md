# Safe Refactoring Command

## Purpose
Systematic approach to refactoring code while maintaining functionality and test coverage.

## Workflow

### 1. Prepare
- [ ] Identify code to refactor
- [ ] Ensure tests exist for current behavior
- [ ] When the refactor was planned with test scenarios (see `rules/97-plan-test-scenarios.mdc`), treat those scenarios as acceptance criteria — refactoring must not break them
- [ ] Create backup branch: `git checkout -b refactor/<name>`

### 2. Analyze
- [ ] Run existing tests: `npm run test`
- [ ] Check test coverage: `npm run test:coverage`
- [ ] Document current behavior

### 3. Refactor (Small Steps)
```
For each change:
1. Make ONE small change
2. Run tests
3. Commit if green
4. Repeat
```

### 4. Verify
- [ ] All tests pass
- [ ] Coverage maintained or improved
- [ ] No new linting errors
- [ ] Code review completed

### 5. Deploy
- [ ] Merge to main branch
- [ ] Monitor for regressions
- [ ] Be ready to revert

## Refactoring Patterns

### Extract Function
```typescript
// Before
function process() {
  // 50 lines of code
}

// After
function process() {
  validateInput();
  transformData();
  saveResult();
}
```

### Replace Conditional with Polymorphism
```typescript
// Before
if (type === 'A') { doA(); }
else if (type === 'B') { doB(); }

// After
const handlers = { A: doA, B: doB };
handlers[type]();
```

### Introduce Parameter Object
```typescript
// Before
function create(name, email, phone, address) {}

// After
function create(userData: UserData) {}
```

## Rules
- Never refactor without tests
- One refactoring at a time
- Commit after each successful change
- Keep refactoring separate from feature work
- Don't change behavior while refactoring
- When a plan included test scenarios (`97-plan-test-scenarios.mdc`), those scenarios define "don't break behavior" — all must keep passing

## Verification Commands
```bash
npm run test           # All tests pass
npm run lint           # No errors
npm run build          # Compiles successfully
npm run test:coverage  # Coverage maintained
```

## Checklist
- [ ] Tests exist for code being refactored
- [ ] Branch created for refactoring
- [ ] Small, incremental changes
- [ ] Tests pass after each change
- [ ] No behavior changes
- [ ] Code review completed
