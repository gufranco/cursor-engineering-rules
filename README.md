# Cursor Engineering Rules

A comprehensive collection of AI-powered coding standards, agent definitions, and automation workflows for [Cursor IDE](https://cursor.com).

## What's Inside

```
.cursor/
├── agents/           # Specialized AI agent personas
├── commands/         # Reusable workflows (slash commands)
├── hooks/            # Automation scripts (CI loops, test loops)
├── plans/            # Implementation plans storage
├── rules/            # Coding standards and patterns
├── hooks.json        # Hook configuration
└── scratchpad.md     # Agent state tracking
```

## Quick Start

### Option 1: Clone directly into your project

```bash
# From your project root
git clone https://github.com/gufranco/cursor-engineering-rules.git .cursor
rm -rf .cursor/.git
```

### Option 2: Use as a Git submodule (recommended for multiple projects)

Each project can add this repo as a submodule. Paths in `hooks.json` (e.g. `node .cursor/hooks/ci-loop.mjs`) are relative to that project's root.

```bash
git submodule add https://github.com/gufranco/cursor-engineering-rules.git .cursor
```

### Option 3: Cherry-pick what you need

Copy specific folders or files to your `.cursor/` directory.

## Rules

Standards that guide AI behavior based on file patterns.

### Core Rules (Always Applied)
| Rule | Description |
|------|-------------|
| `00-core` | Fundamental principles, confidence, anti-hallucination, README checks |
| `01-git-workflow` | Commit conventions, branching, CI monitoring |
| `02-task-completion` | Pre-completion checklist, verification |
| `03-security` | OWASP, secrets, input validation |
| `99-agent-router` | Agent selection guide with decision tree |

### TypeScript/JavaScript Rules
| Rule | Description | Applies To |
|------|-------------|------------|
| `04-error-handling` | Error categories, retry, circuit breaker | `*.ts, *.tsx` |
| `05-logging` | Structured logging, log levels | `*.ts, *.tsx` |
| `06-i18n` | Internationalization, translation patterns | `*.ts, *.tsx` |
| `07-observability` | Tracing, health checks, route metadata | `*.ts, *.tsx` |
| `08-external-services` | Timeout, retry, fallback patterns | `*.ts` |
| `10-typescript` | Type safety, path aliases, no `any` | `*.ts, *.tsx` |
| `11-testing` | AAA pattern, mocks policy, coverage, API tests (Docker, env) | `*.test.ts` |
| `12-database` | ORM rules, migrations, Prisma extensions | `*.prisma` |
| `13-api-design` | REST conventions, webhooks, pagination | `api/**` |
| `14-react-nextjs` | Components, server components, hooks | `*.tsx` |
| `15-dependencies` | Package management | `package.json` |
| `16-accessibility` | WCAG, ARIA, keyboard navigation | `*.tsx` |
| `17-api-documentation` | OpenAPI, examples | `api/**/*.ts` |
| `18-caching` | Redis patterns, TTL, invalidation | `*.ts` |

### Architecture Patterns
| Rule | Description | Applies To |
|------|-------------|------------|
| `20-monorepo` | Workspaces, shared packages, Turborepo | `pnpm-workspace.yaml` |
| `21-websocket` | Real-time connections, scaling, backpressure | `websocket/**` |
| `22-mobile` | Offline-first, deep linking, push notifications | `App.tsx` |
| `23-partner-api` | B2B auth, HMAC signatures, webhooks | `partner/**` |
| `24-background-jobs` | Queues, retry strategies, idempotency | `jobs/**` |
| `25-feature-flags` | Rollout strategies, flag lifecycle | `*.ts` |
| `26-rate-limiting` | Limit tiers, algorithms, headers | `middleware/**` |

### Language-Specific Rules
| Rule | Description | Applies To |
|------|-------------|------------|
| `30-ruby` | Rails conventions, interactors, RSpec | `*.rb` |
| `31-go` | Error handling, interfaces, concurrency | `*.go` |
| `32-python` | Type hints, Pydantic, pytest | `*.py` |

## Agents

Specialized AI personas for different tasks (24 total).

### Engineering (17 agents)
| Agent | Use For |
|-------|---------|
| `api-designer` | API design, endpoints, REST |
| `backend-architect` | System architecture, patterns |
| `database-specialist` | Queries, indexes, schema |
| `debugging-specialist` | Bug hunting, root cause analysis |
| `devops-engineer` | CI/CD, Docker, infrastructure |
| `frontend-specialist` | React, Next.js, UI |
| `mobile-specialist` | React Native, Flutter, offline-first |
| `migration-specialist` | Schema changes, data migrations |
| `monorepo-architect` | Turborepo, pnpm workspaces, shared packages |
| `performance-engineer` | Optimization, latency, memory |
| `realtime-engineer` | WebSocket, SSE, pub/sub scaling |
| `security-engineer` | Auth, vulnerabilities, OWASP |
| `accessibility-specialist` | Screen readers, WCAG, a11y |
| `code-archeologist` | Git history, code evolution |
| `ruby-specialist` | Rails, RSpec, service objects |
| `go-specialist` | Go idioms, concurrency, interfaces |
| `python-specialist` | FastAPI, Pydantic, pytest |

### Testing (3 agents)
| Agent | Use For |
|-------|---------|
| `test-architect` | Test strategy, coverage |
| `api-tester` | API/endpoint testing |
| `e2e-tester` | Browser, Playwright, Cypress |

### Code Quality (2 agents)
| Agent | Use For |
|-------|---------|
| `code-reviewer` | PR review, feedback |
| `refactoring-expert` | Code smells, cleanup |

### Other (2 agents)
| Agent | Use For |
|-------|---------|
| `technical-writer` | README, docs, ADRs |
| `incident-responder` | Outages, incidents |

## Commands

Slash commands for common workflows. Type `/command` in Cursor.

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

## Hooks

Automation scripts that run during agent lifecycle.

### CI Loop (`ci-loop.mjs`)
Keeps the agent running until CI/CD pipeline passes.
- Monitors PR checks via `gh pr checks`
- Prompts agent to fix failures
- Max 10 iterations

### Test Loop (`test-loop.mjs`)
Keeps the agent running until tests pass.
- Checks scratchpad for completion markers
- Max 10 iterations

### Configuration

Edit `hooks.json` to enable/disable hooks:

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

## Customization

### Adding Rules

1. Create a `.mdc` file in `rules/`
2. Add frontmatter:
   ```yaml
   ---
   description: Rule description
   globs: "**/*.ts"
   alwaysApply: false
   ---
   ```
3. Write your rules in Markdown

### Adding Agents

1. Create a `.md` file in the appropriate `agents/` subdirectory
2. Include:
   - Role description
   - Critical actions (pre-work checklist)
   - When to invoke
   - Expertise areas
   - Approach/methodology
   - Response style

### Adding Commands

1. Create a `.md` file in `commands/`
2. Include:
   - Title with `/command-name`
   - Steps to execute
   - Rules/constraints

## Requirements

- [Cursor IDE](https://cursor.com)
- Node.js (for hooks: `ci-loop.mjs`, `test-loop.mjs`)
- `gh` CLI (for CI loop): must be installed and authenticated in each project that uses the CI loop (`gh auth status`)

This repo is intended to be reused across many projects (as a submodule or copied into each project's `.cursor/`). Hooks and paths in `hooks.json` run in the context of whichever project contains `.cursor`.

## Philosophy

1. **Confidence over guessing** - 95%+ certainty before acting
2. **Real tests over mocks** - Integration tests with real dependencies
3. **Evidence over claims** - Show proof, don't just assert
4. **Patterns over preferences** - Follow established conventions
5. **Security by default** - Never commit secrets, validate input

## Contributing

1. Fork this repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - See [LICENSE](LICENSE) for details.

---

