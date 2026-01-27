# Security Audit Command

## Purpose
Systematic security review to identify vulnerabilities before deployment.

## Quick Checks

### 1. Dependencies
```bash
# Check for vulnerable packages
npm audit

# Fix automatically where possible
npm audit fix
```

### 2. Secrets
```bash
# Scan for secrets in code
# Check: API keys, passwords, tokens, private keys
```

#### Files to Check
- [ ] `.env` files not committed
- [ ] No hardcoded credentials
- [ ] Secrets in CI/CD are masked
- [ ] Private keys not in repo

### 3. Authentication
- [ ] Passwords hashed (bcrypt/argon2)
- [ ] Tokens expire appropriately
- [ ] Rate limiting on auth endpoints
- [ ] Secure session configuration

### 4. Authorization
- [ ] Every endpoint checks permissions
- [ ] No IDOR vulnerabilities
- [ ] Multi-tenant data isolation
- [ ] Admin functions protected

## OWASP Top 10 Checklist

| Vulnerability | Check |
|---------------|-------|
| Injection | Using parameterized queries/ORM |
| Broken Auth | Session management secure |
| Sensitive Data | Encryption at rest and transit |
| XXE | XML parsing disabled/secured |
| Broken Access | Authorization on every request |
| Misconfiguration | Security headers set |
| XSS | Output encoding, CSP headers |
| Deserialization | No untrusted data deserialization |
| Known Vulnerabilities | Dependencies audited |
| Logging | Sensitive data not logged |

## Security Headers

```typescript
// Required headers
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000
X-XSS-Protection: 1; mode=block
```

## Input Validation Checklist

For every endpoint:
- [ ] Input types validated
- [ ] Input length limited
- [ ] Special characters escaped
- [ ] File uploads validated
- [ ] SQL injection prevented

## Data Protection

- [ ] PII encrypted at rest
- [ ] HTTPS enforced
- [ ] Sensitive data not logged
- [ ] Data retention policy implemented
- [ ] GDPR/privacy compliance

## Penetration Testing Areas

1. **Authentication bypass**
2. **Authorization escalation**
3. **SQL/NoSQL injection**
4. **XSS (stored, reflected)**
5. **CSRF attacks**
6. **API rate limiting**
7. **File upload vulnerabilities**
8. **Information disclosure**

## Audit Commands

```bash
# Dependency audit
npm audit --json > audit-report.json

# Static analysis (if configured)
npm run lint:security

# Check for secrets
git log -p | grep -i "password\|secret\|key\|token"
```

## Checklist
- [ ] npm audit clean (no high/critical)
- [ ] No secrets in code
- [ ] Authentication secure
- [ ] Authorization enforced
- [ ] Input validation complete
- [ ] Security headers configured
- [ ] Logging sanitized
- [ ] HTTPS enforced
