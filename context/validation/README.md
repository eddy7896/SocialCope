# Validation

Testing strategies, verification procedures, acceptance criteria.

---

## Test Strategy

- **Unit tests** → Individual functions
- **Integration tests** → Services communicating
- **E2E tests** → Full user workflows
- **Determinism tests** → Same input = same output

---

## Verification Procedures

How to verify features work correctly.

- `mutation-engine-verification.md` → Verify mutations work
- `export-verification.md` → Verify exports generate correctly
- `responsive-generation-verification.md` → Verify mobile variants correct
- `realtime-verification.md` → Verify multiplayer sync works

---

## Acceptance Criteria

How to determine feature is complete.

- Feature works as specified
- No architecture-locks violations
- No anti-hallucination violations
- Tests pass
- Code reviewed
- Context files updated

---

## Performance Benchmarks

Target performance metrics.

- Mutation execution: <100ms
- Export generation: <10 seconds
- Responsive generation: <5 seconds
- Canvas sync latency: <200ms

---

**Status:** Pending implementation | **Last Updated:** 2026-05-16
