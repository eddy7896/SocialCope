# Docker Build Optimization

Strategies to speed up builds while keeping microservices architecture.

---

## 1. Layer Caching

**Current:** Dockerfiles copy `package*.json` first, then `npm install`, then code.

**Why:** If dependencies haven't changed, Docker reuses cached layer. Much faster rebuilds.

**Already implemented:** Each Dockerfile follows this pattern.

---

## 2. .dockerignore

**What:** Exclude unnecessary files from Docker build context.

**Files excluded:**
- node_modules (gets reinstalled in container)
- .git (unnecessary in image)
- .env (secrets not in image)
- *.md (docs not needed)
- .vscode, .idea (IDE files)
- coverage, dist, .next (build outputs)

**Effect:** Smaller context = faster build.

---

## 3. Multi-Stage Builds

**Frontend:** Uses multi-stage build (builder stage + runtime stage).
- Builder: installs all deps (dev + prod), builds Next.js
- Runtime: copies only built artifacts + prod deps
- **Result:** ~60% smaller image

**Backend:** Could use multi-stage, but TypeScript compile is fast. Current approach fine.

---

## 4. Alpine Linux

**Current:** All images use `node:18-alpine` (slim base).

**Size:** ~150MB vs 500MB+ with full Node image.

**Trade-off:** Smaller download + faster startup, but missing some system packages (rarely needed).

---

## 5. Production Dependencies Only

**In Dockerfiles:** `npm install --only=production` skips dev dependencies in images.

**Not used yet:** Dev dependencies installed in dev builds. Can optimize in ci/cd.

---

## 6. BuildKit (Docker 18.09+)

**Enable BuildKit:**
```bash
export DOCKER_BUILDKIT=1
docker-compose build
```

**Benefits:**
- Parallel layer building (multiple services build simultaneously)
- Better caching
- ~30-50% faster builds

---

## 7. Docker Compose Build Caching

**Current:** `docker-compose up` rebuilds all images if Dockerfile changes.

**Optimize:**
```bash
DOCKER_BUILDKIT=1 docker-compose build --parallel
```

Builds all services in parallel instead of sequentially.

---

## Build Time Estimate

**First build:** ~3-5 min (downloads images, installs all deps)

**Rebuild (no changes):** ~10-15 sec (uses cached layers)

**Rebuild (deps changed):** ~30-45 sec (reinstalls npm only)

**Rebuild (code changed):** ~10-15 sec (uses npm cache)

---

## Optimization Checklist

- [x] .dockerignore created
- [x] package.json copied before code (layer caching)
- [x] Alpine base images (lightweight)
- [x] Multi-stage frontend build (smaller image)
- [ ] Production-only deps in CI/CD
- [ ] BuildKit enabled locally (manual: `export DOCKER_BUILDKIT=1`)
- [ ] Parallel builds (manual: `--parallel` flag)

---

## Quick Start (Fastest Builds)

```bash
# Enable BuildKit + parallel builds
export DOCKER_BUILDKIT=1

# Build all services in parallel
docker-compose build --parallel

# Start services
docker-compose up
```

**Result:** 30-50% faster builds, no architecture changes.

---

## Templates

- `Dockerfile.backend.template` — Optimized backend service template
- `Dockerfile.frontend.template` — Optimized frontend (multi-stage)

Copy to services and adjust PORT as needed.
