# PostgreSQL Quick Reference

Run these commands **from the project root**, where `compose.yaml` is located. The PostgreSQL service is named `db`.

## Connect to PostgreSQL

```bash
# Check that PostgreSQL is running
podman-compose ps

# Open an interactive psql shell in the database container
podman-compose exec db sh -c 'exec psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
```

## Useful commands inside `psql`

| Command | Description |
| --- | --- |
| `\l` | List databases |
| `\c transcendence` | Connect to the `transcendence` database |
| `\dt` | List tables in the current schema search path |
| `\dt *.*` | List tables across all schemas (including system tables) |
| `\d "TestEntry"` | Show the columns, indexes and constraints of `TestEntry` |
| `\d+ "TestEntry"` | Show more details about that table |
| `\dn` | List schemas |
| `\du` | List database roles |
| `\conninfo` | Show the current connection |
| `\q` | Exit `psql` |

> PostgreSQL identifiers are case-sensitive when quoted. Prisma's `TestEntry` table uses capital letters, so write `"TestEntry"` in SQL and `\d` commands.

## Query table contents

Run these **inside `psql`**:

```sql
-- Read all test entries
SELECT * FROM "TestEntry";

-- Count rows
SELECT COUNT(*) FROM "TestEntry";

-- List application tables in the public schema
SELECT tablename FROM pg_tables WHERE schemaname = 'public';

-- See which Prisma migrations have been applied
SELECT migration_name, finished_at FROM "_prisma_migrations"
ORDER BY started_at DESC;

-- see all slots and ids
SELECT id, "scheduledAt"
FROM "Slot";

-- update a slot
UPDATE "Slot"
SET "scheduledAt" = NOW() + INTERVAL '2 minutes'
WHERE id = 42
RETURNING id, "scheduledAt";
```

## Run a query without opening an interactive shell

```bash
podman-compose exec db sh -c \
  'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\''SELECT * FROM "TestEntry";'\'''
```

## Data persistence

- `podman-compose down` stops/removes Compose containers but keeps named volumes by default.
- **`podman-compose down -v` also removes Compose volumes and can delete the database data.**
- Database files live in the named `postgres_data` volume; they are not part of the backend source code.
