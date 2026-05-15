# Canvas Service API Contract

## Overview
Scene graph and canvas management. Handles projects and semantic nodes (CRUD operations).

**Base URL:** `http://canvas-service:3002`  
**Gateway Route:** `/projects`  
**Auth Required:** Yes (JWT bearer token)

---

## Projects Endpoints

### GET /projects
List all projects for authenticated user.

**Response (200):**
```json
[
  {
    "id": "uuid",
    "owner_id": "uuid",
    "name": "Project Name",
    "description": "Optional description",
    "created_at": "2026-05-16T10:00:00Z",
    "updated_at": "2026-05-16T10:00:00Z"
  }
]
```

---

### POST /projects
Create new project.

**Request:**
```json
{
  "name": "New Project",
  "description": "Optional description"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "owner_id": "uuid",
  "name": "New Project",
  "description": "Optional description",
  "created_at": "2026-05-16T10:00:00Z",
  "updated_at": "2026-05-16T10:00:00Z"
}
```

---

### GET /projects/:id
Get project with all nodes.

**Response (200):**
```json
{
  "id": "uuid",
  "owner_id": "uuid",
  "name": "Project Name",
  "description": "Optional",
  "created_at": "2026-05-16T10:00:00Z",
  "updated_at": "2026-05-16T10:00:00Z"
}
```

---

### DELETE /projects/:id
Delete project.

**Response (200):**
```json
{
  "success": true
}
```

---

## Nodes Endpoints

### GET /projects/:projectId/nodes
List all nodes in project.

**Response (200):**
```json
[
  {
    "id": "uuid",
    "project_id": "uuid",
    "type": "section",
    "semantic_role": "header",
    "label": "Main Header",
    "properties": {},
    "position": { "x": 0, "y": 0 },
    "size": { "width": 100, "height": 100 },
    "parent_id": null,
    "z_index": 0,
    "created_at": "2026-05-16T10:00:00Z",
    "updated_at": "2026-05-16T10:00:00Z"
  }
]
```

---

### POST /projects/:projectId/nodes
Create semantic node.

**Request:**
```json
{
  "type": "section",
  "semanticRole": "header",
  "label": "Main Header",
  "properties": {},
  "position": { "x": 0, "y": 0 },
  "size": { "width": 100, "height": 100 },
  "parentId": null
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "project_id": "uuid",
  "type": "section",
  "semantic_role": "header",
  "label": "Main Header",
  "properties": {},
  "position": { "x": 0, "y": 0 },
  "size": { "width": 100, "height": 100 },
  "parent_id": null,
  "z_index": 0,
  "created_at": "2026-05-16T10:00:00Z",
  "updated_at": "2026-05-16T10:00:00Z"
}
```

---

### PATCH /projects/:projectId/nodes/:nodeId
Update node.

**Request:**
```json
{
  "label": "Updated Label",
  "position": { "x": 10, "y": 10 },
  "properties": { "color": "red" }
}
```

**Response (200):**
Updated node object (same as POST response)

---

### DELETE /projects/:projectId/nodes/:nodeId
Delete node.

**Response (200):**
```json
{
  "success": true
}
```

---

## Node Types

Semantic types:
- `section` - Layout container (header, footer, sidebar)
- `component` - Reusable component
- `text` - Text element
- `container` - Generic container
- `media` - Image, video, etc.

---

## Health Check

### GET /health
Service health status.

**Response (200):**
```json
{
  "status": "ok",
  "service": "canvas-service"
}
```
