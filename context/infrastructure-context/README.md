# Infrastructure Context

Docker, deployment, Traefik, VPS, containerization, DevOps.

---

## Stack

- **Container Runtime:** Docker
- **Orchestration:** Docker Compose (local), Kubernetes or manual (prod)
- **Reverse Proxy:** Traefik (routing, SSL, load balancing)
- **Host:** KVM VPS
- **Networking:** Internal VPC + Traefik front

---

## Architecture

```
Internet → Traefik (port 80/443) → Services (in containers)
              └─ Routes to: frontend, gateway, canvas, etc.
              └─ SSL/TLS termination
              └─ Load balancing
```

**Each Service:**
- Own Docker container
- Own Dockerfile
- Own docker-compose service
- Isolated networking
- Environment variables per service

---

## Deployment

**Local Development:**
```bash
docker-compose up
# Starts all 11 services + PostgreSQL + Redis + Traefik
```

**Production:**
- Deploy to VPS with KVM
- Use Traefik for reverse proxy
- PostgreSQL for persistence
- R2 for object storage
- Redis for sessions/queues
- Healthchecks + monitoring

---

## Key Files

- `docker-spec.md` — Docker and Dockerfile standards
- `deployment-topology.md` — System topology diagram
- `docker-compose-template.md` — docker-compose.yml structure
- `networking.md` — Service networking

---

## Related Contexts

- [[deployment-context/]] — Deployment environments
- [[architecture-context/]] — System architecture
- [[service-context/]] — Services to containerize

---

**Priority:** 3 | **Status:** Stub | **Last Updated:** 2026-05-16
