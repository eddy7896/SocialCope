# Queue System Context

Async job processing via BullMQ, durable queues, background workers.

---

## Overview

Long-running tasks queued in BullMQ. Frontend returns immediately. Workers process in background.

**Flow:**
```
User requests export → Queue job → Return immediately
Worker picks up job → Process for 10 seconds → Notify user
User sees notification → Download ready
```

---

## Queue Types

### Export Queue
- **Jobs:** PSD export, SVG export, PDF export
- **Duration:** 5-15 seconds
- **Workers:** Multiple export-service instances
- **Retry:** 3 times on failure

### AI Generation Queue
- **Jobs:** Responsive generation, canvas organization
- **Duration:** 5-30 seconds
- **Workers:** AI-orchestrator service
- **Retry:** 2 times

### Asset Optimization Queue
- **Jobs:** Image compression, thumbnail generation
- **Duration:** 2-10 seconds
- **Workers:** Asset-service workers
- **Retry:** 3 times

---

## Job Format

```json
{
  "id": "job_001",
  "type": "export_psd",
  "priority": "normal",
  "data": {
    "projectId": "proj_001",
    "format": "psd",
    "options": {}
  },
  "status": "pending|processing|completed|failed",
  "attempts": 1,
  "maxAttempts": 3
}
```

---

## Technology

- **BullMQ** — Job queue backed by Redis
- **Features:**
  - Persistent (survives restarts)
  - Retryable with exponential backoff
  - Priority levels
  - Schedulable
  - Observable (queue depth, worker status)

---

## Key Files

- `queue-spec.md` — Queue setup and usage
- `job-types.md` — All job types and schemas
- `worker-configuration.md` — Worker setup

---

## Related Contexts

- [[event-system-context/]] — For real-time events
- [[service-context/]] — Services with workers
- [[contracts/]] — Job contracts

---

**Priority:** 3 | **Status:** Stub | **Last Updated:** 2026-05-16
