# Auth Service API Contract

## Overview
Authentication service. Handles user registration, login, JWT token generation and verification.

**Base URL:** `http://auth-service:3003`  
**Gateway Route:** `/auth`

---

## Endpoints

### POST /auth/register
Register new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "email": "user@example.com"
}
```

**Errors:**
- 400: Invalid email or password too short
- 409: User already exists

---

### POST /auth/login
Authenticate user and return JWT token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

**Errors:**
- 400: Invalid input
- 401: Invalid credentials

---

### GET /auth/me
Get current user profile. Requires JWT authorization.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "user@example.com"
}
```

**Errors:**
- 401: Unauthorized (missing or invalid token)

---

### GET /auth/health
Health check.

**Response (200):**
```json
{
  "status": "ok",
  "service": "auth-service"
}
```

---

## Authentication

All endpoints except `/register` and `/login` require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

Token format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.<payload>.<signature>`

Payload contains:
- `userId`: User UUID
- `email`: User email

---

## Error Responses

All errors follow format:

```json
{
  "error": "Error message"
}
```

Status codes:
- 400: Bad Request (validation error)
- 401: Unauthorized (invalid credentials or missing token)
- 409: Conflict (user already exists)
- 500: Internal Server Error

---

## Security

- Passwords hashed with bcrypt (cost factor 12)
- JWT signed with HS256
- Token expiry: 7 days
- All passwords validated (min 8 characters)
