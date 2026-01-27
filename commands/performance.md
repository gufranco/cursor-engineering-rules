# Performance Audit Command

## Purpose
Systematic performance audit to identify and fix bottlenecks.

## Quick Checks

### 1. Database Queries
```bash
# Check for slow queries
# Look for queries > 100ms
```

#### Common Issues
- [ ] N+1 queries
- [ ] Missing indexes
- [ ] SELECT * instead of specific columns
- [ ] No pagination on list endpoints

### 2. API Response Times
```bash
# Check p50, p95, p99 latencies
# Target: p95 < 500ms
```

#### Common Issues
- [ ] Synchronous external calls
- [ ] No caching
- [ ] Large payloads
- [ ] Missing compression

### 3. Frontend Performance
```bash
# Run Lighthouse audit
npx lighthouse <url> --view
```

#### Common Issues
- [ ] Large bundle size
- [ ] Unoptimized images
- [ ] No code splitting
- [ ] Blocking resources

## Performance Budget

| Metric | Target | Max |
|--------|--------|-----|
| API Response | < 100ms | 500ms |
| Database Query | < 50ms | 200ms |
| Cache Read | < 5ms | 20ms |
| Page Load | < 2s | 4s |
| Bundle Size | < 200KB | 500KB |

## Optimization Strategies

### Database
1. Add missing indexes
2. Use eager loading
3. Implement pagination
4. Cache frequent queries

### API
1. Add response caching
2. Use compression (gzip)
3. Implement pagination
4. Parallelize independent calls

### Frontend
1. Code split by route
2. Lazy load images
3. Use CDN for assets
4. Minimize bundle size

## Profiling Commands

### Node.js
```bash
# CPU profiling
node --prof app.js

# Memory profiling
node --inspect app.js
```

### Database
```sql
EXPLAIN ANALYZE SELECT ...;
```

### Frontend
```javascript
// Browser DevTools
Performance.mark('start');
// ... code ...
Performance.mark('end');
Performance.measure('operation', 'start', 'end');
```

## Checklist
- [ ] Database queries analyzed
- [ ] API latencies measured
- [ ] Frontend performance audited
- [ ] Bottlenecks identified
- [ ] Optimizations implemented
- [ ] Results verified
