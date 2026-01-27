# Database Migration Command

## Purpose
Safe database migration workflow with proper testing and rollback strategy.

## Workflow

### 1. Create Migration
```bash
# Generate migration file
npx prisma migrate dev --name <migration_name>
```

### 2. Review Migration
- [ ] Check generated SQL is correct
- [ ] Verify indexes are created
- [ ] Confirm no data loss operations
- [ ] Check for breaking changes

### 3. Test Locally
```bash
# Reset and apply all migrations
npx prisma migrate reset

# Verify schema
npx prisma db pull
```

### 4. Test with Staging Data
- Apply to staging database first
- Verify application works
- Check query performance
- Monitor for errors

### 5. Production Deployment
- Schedule during low-traffic period
- Have rollback plan ready
- Monitor application logs
- Verify functionality

## Safe Migration Patterns

| Operation | Safe Approach |
|-----------|---------------|
| Add column | Add as nullable first |
| Remove column | Stop reading → deploy → remove |
| Rename column | Add new → copy → migrate code → remove old |
| Add index | Use CONCURRENTLY (if supported) |
| Change type | Add new column → migrate → remove old |

## Rollback Strategy

### If Migration Fails
1. Stop deployment immediately
2. Run rollback migration
3. Verify application works
4. Investigate failure cause

### Rollback Command
```bash
# Revert last migration
npx prisma migrate resolve --rolled-back <migration_name>
```

## Checklist
- [ ] Migration file reviewed
- [ ] Local tests pass
- [ ] Staging deployment successful
- [ ] Rollback plan documented
- [ ] Team notified of deployment
- [ ] Monitoring in place
