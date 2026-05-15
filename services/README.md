# Services

11 microservices for socialCOPE.

---

## Services

### Frontend
- **Location**: `frontend/`
- **Framework**: Next.js 14
- **Port**: 3001
- **Purpose**: Web UI, canvas editor, realtime sync
- **Tech**: React, Tailwind CSS, tldraw, Framer Motion

### Canvas Service
- **Location**: `canvas-service/`
- **Framework**: Fastify
- **Port**: 3002
- **Purpose**: Scene graph CRUD, semantic nodes, relationships
- **Tech**: Node.js, TypeScript, PostgreSQL

### Gateway Service
- **Location**: `gateway-service/`
- **Framework**: Fastify
- **Port**: 3000
- **Purpose**: API gateway, auth middleware, routing
- **Tech**: Node.js, TypeScript, JWT

### Auth Service
- **Location**: `auth-service/`
- **Framework**: Fastify
- **Port**: 3003
- **Purpose**: User authentication, JWT generation, token validation
- **Tech**: Node.js, TypeScript, PostgreSQL

### Realtime Service
- **Location**: `realtime-service/`
- **Framework**: Hocuspocus
- **Port**: 1234
- **Purpose**: Multiplayer presence, CRDT sync, WebSocket
- **Tech**: Node.js, Yjs, Hocuspocus

### AI Service
- **Location**: `ai-service/`
- **Framework**: Fastify
- **Port**: 3004
- **Purpose**: Intent classification, mutation planning, LLM integration
- **Tech**: Node.js, TypeScript, Ollama/vLLM

### Export Service
- **Location**: `export-service/`
- **Framework**: Fastify
- **Port**: 3005
- **Purpose**: PSD/SVG/PDF rendering, export jobs
- **Tech**: Node.js, ag-psd, Puppeteer

### Asset Service
- **Location**: `asset-service/`
- **Framework**: Fastify
- **Port**: 3006
- **Purpose**: Asset management, Cloudflare R2 integration, file storage
- **Tech**: Node.js, TypeScript, Cloudflare R2

### Analytics Service
- **Location**: `analytics-service/`
- **Framework**: Fastify
- **Port**: 3007
- **Purpose**: Event tracking, metrics, analytics queries
- **Tech**: Node.js, TypeScript, PostgreSQL

### Notification Service
- **Location**: `notification-service/`
- **Framework**: Fastify
- **Port**: 3008
- **Purpose**: Real-time notifications, WebSocket broadcasts
- **Tech**: Node.js, Redis Pub/Sub

### Search Service
- **Location**: `search-service/`
- **Framework**: Fastify
- **Port**: 3009
- **Purpose**: Full-text search, indexing, queries
- **Tech**: Node.js, TypeScript, PostgreSQL

---

## Service Communication

### REST APIs
- Gateway routes HTTP requests to services
- Each service exposes HTTP endpoints
- Request/response format: JSON

### Events (Redis Pub/Sub)
- Services publish events to Redis
- Other services subscribe to relevant events
- Async, decoupled communication

### Realtime WebSocket
- Frontend connects to realtime-service
- Hocuspocus manages CRDT sync
- Presence broadcasts via WebSocket

### Job Queues (BullMQ)
- Long-running tasks queued in Redis
- Workers process jobs asynchronously
- Used for exports, AI generation, asset optimization

---

## Development

### Get Started
```bash
# Start all services
docker-compose up

# Or start one service locally
cd canvas-service
npm install
npm run dev
```

See `../SETUP.md` for detailed instructions.

### Service Structure

Each service follows this structure:
```
service-name/
├── src/
│   ├── index.ts           # Main entry point
│   ├── middleware/        # Middleware (auth, logging)
│   ├── routes/            # HTTP route handlers
│   ├── services/          # Business logic
│   └── db/                # Database queries
├── package.json
├── Dockerfile
└── tsconfig.json
```

### TypeScript

All backend services use TypeScript strict mode:
```bash
npm run type-check   # Check types
npm run build        # Compile
npm run dev          # Development (tsx watch)
```

### Adding Dependencies

```bash
cd service-name
npm install package-name

# Commit package-lock.json
git add package.json package-lock.json
git commit -m "add: package-name to service-name"
```

### Logging

All services use Pino logger:
```typescript
app.log.info('Message');
app.log.error('Error');
app.log.debug('Debug');
```

Set `LOG_LEVEL` in `.env`:
- `fatal`
- `error`
- `warn`
- `info` (default)
- `debug`
- `trace`

---

## Database

All services connect to PostgreSQL:
```
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/socialcope
```

Use migration framework (TBD) for schema changes.

---

## Redis

Services use Redis for:
- Pub/Sub (events)
- Caching
- Sessions
- Job queues (BullMQ)

```
REDIS_URL=redis://redis:6379
```

---

## Health Checks

Every service exposes `/health`:
```bash
curl http://localhost:3002/health
# { "status": "ok", "service": "canvas-service" }
```

---

## Next Steps

1. Implement database migrations
2. Add service-to-service communication
3. Implement auth middleware in gateway
4. Add API contracts documentation
5. Write integration tests

See `../PROJECT_PLAN.md` Phase 1 for full task list.
