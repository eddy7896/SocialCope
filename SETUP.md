# Development Setup

Quick start guide for local development.

---

## Prerequisites

Install these first:
- **Docker** (https://www.docker.com/products/docker-desktop)
- **Docker Compose** (included with Docker Desktop)
- **Node.js** 18+ (https://nodejs.org/)
- **Git** (for version control)

Verify:
```bash
docker --version
docker-compose --version
node --version
git --version
```

---

## Project Structure

```
socialCOPE/
├── services/
│   ├── frontend/              # Next.js UI
│   ├── canvas-service/        # Scene graph API
│   ├── gateway-service/       # API gateway
│   ├── auth-service/          # Authentication
│   ├── realtime-service/      # Hocuspocus (multiplayer)
│   ├── ai-service/            # AI orchestration
│   ├── export-service/        # PSD/SVG/PDF export
│   ├── asset-service/         # Asset management (R2)
│   ├── analytics-service/     # Analytics
│   ├── notification-service/  # Notifications
│   └── search-service/        # Search/indexing
├── docker-compose.yml         # Local environment
├── .env.example               # Configuration template
├── context/                   # Architecture governance
└── [documentation files]
```

---

## Quick Start (5 minutes)

### Step 1: Clone & Setup

```bash
cd f:\Devlopment Projects\SocialCOPE

# Copy environment file
cp .env.example .env

# (Windows PowerShell):
# copy .env.example .env
```

### Step 2: Start Services

```bash
# Start all services (postgres, redis, frontend, all 11 services)
docker-compose up

# First time takes 2-3 minutes (building images)
```

Wait for:
```
gateway-service    | listening on http://0.0.0.0:3000
frontend           | ▲ Next.js ready - started server on 0.0.0.0:3001
canvas-service     | Canvas service listening on http://0.0.0.0:3002
```

### Step 3: Access

- **Frontend**: http://localhost:3001
- **API Gateway**: http://localhost:3000
- **Traefik Dashboard**: http://localhost:8080
- **PostgreSQL**: localhost:5432 (user: postgres, pass: postgres)
- **Redis**: localhost:6379

### Step 4: Stop Services

```bash
docker-compose down
```

---

## Development Workflow

### Working on Frontend

```bash
# Option 1: Let docker handle it (auto-reload)
docker-compose up frontend

# Option 2: Local Node (faster feedback)
cd services/frontend
npm install
npm run dev
# Runs on http://localhost:3001
```

### Working on Backend Service (e.g., canvas-service)

```bash
# Option 1: Docker
docker-compose up canvas-service

# Option 2: Local Node (faster feedback)
cd services/canvas-service
npm install
npm run dev
# Runs on http://localhost:3002
```

### Database Access

```bash
# Connect to PostgreSQL
docker-compose exec postgres psql -U postgres -d socialcope

# Or use GUI: pgAdmin (optional)
```

### Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f canvas-service

# With timestamps
docker-compose logs -f --timestamps
```

---

## Rebuilding Services

If you modify Dockerfile or package.json:

```bash
# Rebuild one service
docker-compose build canvas-service

# Rebuild all
docker-compose build

# Then restart
docker-compose up
```

---

## Useful Commands

```bash
# Check service status
docker-compose ps

# Restart one service
docker-compose restart canvas-service

# View service logs
docker-compose logs canvas-service

# Execute command in container
docker-compose exec canvas-service npm run lint

# Remove all containers (WARNING: data loss)
docker-compose down -v
```

---

## Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3001 | http://localhost:3001 |
| Gateway | 3000 | http://localhost:3000 |
| Canvas | 3002 | http://localhost:3002 |
| Auth | 3003 | http://localhost:3003 |
| Realtime | 1234 | ws://localhost:1234 |
| AI | 3004 | http://localhost:3004 |
| Export | 3005 | http://localhost:3005 |
| Asset | 3006 | http://localhost:3006 |
| Analytics | 3007 | http://localhost:3007 |
| Notification | 3008 | http://localhost:3008 |
| Search | 3009 | http://localhost:3009 |
| PostgreSQL | 5432 | localhost:5432 |
| Redis | 6379 | localhost:6379 |
| Traefik | 8080 | http://localhost:8080 |

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port (e.g., 3001)
# Linux/Mac:
lsof -i :3001
# Windows:
netstat -ano | findstr :3001

# Kill process
kill -9 <PID>  # Linux/Mac
taskkill /PID <PID> /F  # Windows
```

### Docker Build Fails
```bash
# Clear Docker cache
docker-compose down
docker system prune -a
docker-compose up
```

### Service Won't Start
```bash
# Check logs
docker-compose logs service-name

# Rebuild
docker-compose build service-name
docker-compose up service-name
```

### Permission Denied (Linux)
```bash
# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

---

## Environment Variables

Edit `.env` to configure:
- Database URL
- Redis URL
- JWT secret
- API URLs
- Feature flags
- LLM settings (Ollama)
- R2 credentials (when ready)

See `.env.example` for all available options.

---

## Next Steps

1. **Understand Architecture** → Read `context/architecture-context/README.md`
2. **Learn Governance** → Read `context/source-of-truth-policy.md`
3. **Check Phase 1 Tasks** → Read `PHASE_CHECKLIST.md` (Phase 1 section)
4. **Start Coding** → Pick a task from `PROGRESS.md`
5. **Follow Context** → Everything in `context/` is immutable source of truth

---

## Support

- **Architecture questions** → `context/README.md`
- **Tech decisions** → `context/architecture-locks.md`
- **What's allowed/forbidden** → `context/anti-hallucination-rules.md`
- **Phase details** → `PROJECT_PLAN.md`
- **Progress tracking** → `PROGRESS.md`

---

**Last Updated:** 2026-05-16  
**Status:** Phase 1 - Foundation starting
