# Event System Context

Async communication via Redis Pub/Sub, event schemas, service notifications.

---

## Overview

Services communicate via events. One service publishes, others listen.

**Examples:**
- "canvas.mutation.created" → Export service renders, Analytics tracks
- "export.job.queued" → Export worker picks up job
- "user.loggedIn" → Analytics records event
- "template.applied" → Canvas updated, History recorded

---

## Event Format

```json
{
  "event": "domain.action.qualifier",
  "timestamp": "2026-05-16T10:30:00Z",
  "userId": "user_123",
  "projectId": "proj_001",
  "data": {
    /* event-specific data */
  }
}
```

---

## Event Categories

**Canvas Events:**
- `canvas.mutation.created` — Node changed
- `canvas.snapshot.created` — Version saved
- `canvas.organized` — Canvas auto-organized

**Export Events:**
- `export.job.queued` — Export requested
- `export.job.started` — Export processing
- `export.job.completed` — Export ready

**User Events:**
- `user.created` — New user registered
- `user.loggedIn` → User session started

**Presence Events:**
- `presence.cursorMoved` → Cursor position
- `presence.userJoined` → User connected
- `presence.userLeft` → User disconnected

---

## Pub/Sub Technology

- **Redis Pub/Sub** — Real-time, fire-and-forget
- **Persistence:** Not persistent (use BullMQ for durable jobs)
- **Multiple subscribers** — Event to N listeners
- **Best for:** Real-time notifications, presence

---

## Key Files

- `events-registry.md` — All event types and schemas
- `pubsub-spec.md` — Redis Pub/Sub setup and usage
- `event-contracts.md` — Event input/output contracts

---

## Related Contexts

- [[queue-system-context/]] — For durable job persistence
- [[service-context/]] — Services that publish events
- [[contracts/]] — Event schemas

---

**Priority:** 3 | **Status:** Stub | **Last Updated:** 2026-05-16
