# Security Context

Authentication, authorization, data protection, compliance.

---

## Authentication

- **Method:** JWT tokens
- **Flow:** Login → Token issued → Token in requests
- **Storage:** Secure cookie or localStorage
- **Expiry:** 24 hours (refresh token: 30 days)

---

## Authorization

- **Model:** Role-based access control (RBAC)
- **Roles:** Admin, Editor, Viewer
- **Enforcement:** API middleware checks permissions
- **Projects:** User has access to specific projects

---

## Data Protection

- **In transit:** HTTPS/TLS (Traefik manages SSL)
- **At rest:** PostgreSQL encryption
- **Secrets:** Environment variables (never in code)

---

## Key Files

- `authentication.md` — Auth flow
- `authorization.md` → Permissions model
- `data-protection.md` → Encryption standards

---

**Priority:** 5 | **Status:** Stub | **Last Updated:** 2026-05-16
