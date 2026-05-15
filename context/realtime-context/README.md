# Realtime Context

Multiplayer collaboration: Yjs, Hocuspocus, presence, CRDT.

---

## Technology

- **CRDT:** Yjs (conflict-free replicated data type)
- **Server:** Hocuspocus (Yjs server backend)
- **Transport:** WebSocket + HTTP fallback

---

## Features

- **Presence** → See other users' cursors and activity
- **Awareness** → Know who's editing what
- **Sync** → All changes automatically synchronized
- **Conflict-free** → Two edits don't conflict

---

## Architecture

```
User A edits canvas ← Yjs update → Server (Hocuspocus) → User B sees update
(offline capable)                                        (works without internet)
```

---

## Key Files

- `yjs-spec.md` → Yjs integration
- `presence-engine.md` → Presence synchronization
- `sync-spec.md` → Sync algorithm

---

**Priority:** 5 | **Status:** Stub | **Last Updated:** 2026-05-16
