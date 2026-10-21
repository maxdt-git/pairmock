# OAUTH — Quick Reference

Visit https://console.cloud.google.com/auth/
1. Connect with your google account
2. Configure all required values (audience is External)
3. Create a Web Application Client
4. JS URL is http://localhost:3000
5. Authorized URI is http://localhost:4000/api/auth/callback/google (given to us by BetterAuth)
6. Copy the ClientId and the ClientSecret to your .env file

# Prisma — Quick Reference

Run these commands **from the `Transcendence-React` project root**, with the `backend` and `db` containers running (`make up`).

## Workflow: Add or update a model

1. Edit `backend/prisma/schema.prisma`.
2. Validate the schema:
   ```bash
   podman-compose exec backend npx --no-install prisma validate
   ```
3. **Create and apply** the migration to PostgreSQL (use a descriptive name):
   ```bash
   podman-compose exec backend npx --no-install prisma migrate dev --name add_interview
   ```
4. Regenerate the TypeScript client used by Express:
   ```bash
   podman-compose exec backend npx --no-install prisma generate
   ```
5. Type-check the backend:
   ```bash
   podman-compose exec backend npm run typecheck
   ```

## Other useful commands

| Command | Purpose |
| --- | --- |
| `podman-compose exec backend npx --no-install prisma format` | Format `schema.prisma`. |
| `podman-compose exec backend npx --no-install prisma migrate status` | Show the status of migrations. |
| `podman-compose exec backend npx --no-install prisma migrate deploy` | Apply **existing migrations** (deployment; does not create new migrations). |

## Key points

- **`schema.prisma`**: Defines the desired structure of tables and relationships.
- **`prisma/migrations/`**: SQL migration history; **commit it to Git**.
- **`migrate dev`**: Updates the actual PostgreSQL schema during development.
- **`generate`**: Updates Prisma Client; **does not change** the database. With Prisma 7, run it separately.
- **`DATABASE_URL`**: Connection string passed to the backend by Compose; never commit secrets from `.env`.
- **Caution**: Migrations can be destructive (dropping a table or column). Read warnings carefully, and never accept a database `reset` without checking the data first.
