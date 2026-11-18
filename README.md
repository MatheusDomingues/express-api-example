# Express API Example

A lightweight REST API starter with Express and TypeScript, using a layered structure and PostgreSQL via Prisma.

## What's inside

- **Layered architecture:** routes, controllers, services and repositories
- **Versioned routes** (`/api/v1/users`)
- **Request validation** with Zod
- **Swagger** docs at `/swagger`
- **Prisma** schema and migrations for PostgreSQL
- `.http` files to try the endpoints from the editor

## Stack

TypeScript · Node.js · Express · Prisma · PostgreSQL · Zod · Swagger

## Getting started

```bash
pnpm install
pnpm prisma migrate dev
pnpm dev
```
