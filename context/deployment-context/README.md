# Deployment Context

Environments, deployment strategies, scaling, monitoring.

---

## Environments

**Development:** Local docker-compose, all services

**Staging:** VPS with real infrastructure, pre-production testing

**Production:** KVM VPS with Traefik, PostgreSQL replication, R2 storage

---

## Deployment Strategy

- **Blue-green:** Deploy to inactive environment, switch traffic
- **Rolling:** Gradually roll out new versions
- **Rollback:** Instant revert to previous version

---

## Scaling

- **Horizontal:** Add more service replicas
- **Vertical:** Increase machine resources
- **Database:** Connection pooling, replication
- **Cache:** Redis sharding if needed

---

## Monitoring

- Service healthchecks
- Error tracking (Sentry, etc.)
- Performance monitoring (slow endpoints)
- Audit log monitoring

---

## Key Files

- `environments.md` → Environment specs
- `deployment-strategies.md` → How to deploy
- `scaling.md` → Scaling strategies

---

**Priority:** 5 | **Status:** Stub | **Last Updated:** 2026-05-16
