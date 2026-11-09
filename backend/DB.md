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
SELECT id, "code"
FROM "Slot";
WHERE id = 49

-- update a slot
UPDATE "Slot"
SET "scheduledAt" = NOW() + INTERVAL '5 seconds'
WHERE id = 1
RETURNING id, "scheduledAt";
```
-- create finish slot with feedback 4 per days on 5 days - in db
INSERT INTO "Slot" ("imageSrc", "hostId", "bookerId", description, difficulty,
                    "scheduledAt", status, code, "hostFeedback", "bookerFeedback")
SELECT
  '',
  CASE WHEN i % 2 = 0 THEN 'RXJ1UcgyouPzAAQ4RGAQelFDNSurtY2u' ELSE '4dBgFgmcnZwpXLTnpG5IGUVSK3j1HjuB' END,
  CASE WHEN i % 2 = 0 THEN '4dBgFgmcnZwpXLTnpG5IGUVSK3j1HjuB' ELSE 'RXJ1UcgyouPzAAQ4RGAQelFDNSurtY2u' END,
  '[seed] interview #' || i,
  (ARRAY['EASY','MEDIUM','HARD'])[1 + i % 3]::"Difficulty",
  date_trunc('day', NOW())
    - (5 - (i - 1) / 4) * INTERVAL '1 day'      -- jour : 4 interviews par jour
    + (9 + ((i - 1) % 4) * 2) * INTERVAL '1 hour', -- heure : 9h, 11h, 13h, 15h
  'COMPLETED',
  '// seed',
  (SELECT jsonb_object_agg(k, LEAST(5, GREATEST(1, ROUND(1 + i*0.2 + random()*2 - 1)))::int::text)
     FROM unnest(ARRAY['problemSolving','codeQuality','complexityAnalysis','communication']) k),
  (SELECT jsonb_object_agg(k, LEAST(5, GREATEST(1, ROUND(1 + i*0.2 + random()*2 - 1)))::int::text)
     FROM unnest(ARRAY['problemSolving','codeQuality','complexityAnalysis','communication']) k)
FROM generate_series(1, 20) AS i;
INSERT 0 20

## Run a query without opening an interactive shell

```bash
podman-compose exec db sh -c \
  'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\''SELECT * FROM "TestEntry";'\'''
```

## Data persistence

- `podman-compose down` stops/removes Compose containers but keeps named volumes by default.
- **`podman-compose down -v` also removes Compose volumes and can delete the database data.**
- Database files live in the named `postgres_data` volume; they are not part of the backend source code.
