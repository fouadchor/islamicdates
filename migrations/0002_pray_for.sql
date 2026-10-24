-- «ادعوا لـ…» — a shared page of supplication for someone who has died or is ill.
--
-- One row per page; one mark per browser that pressed «دعوت له». The mark's
-- primary key is what keeps the counter honest: a second press from the same
-- browser inserts nothing, so `prayers` only ever moves when a new person prays.
--
-- The same statements run lazily from src/lib/pray-for.ts (ensureSchema) the
-- first time an isolate touches the feature, so production needs no manual
-- migration step. This file is for local development and for the record:
--
--   npx wrangler d1 execute islamicdates-khatma --local --config wrangler.dev.toml --file=./migrations/0002_pray_for.sql

CREATE TABLE IF NOT EXISTS pray_page (
  slug       TEXT    PRIMARY KEY,
  -- The person's name exactly as the family typed it.
  name       TEXT    NOT NULL,
  -- 'deceased' | 'sick'
  kind       TEXT    NOT NULL,
  -- 'm' | 'f' — only to put the supplications in the right grammatical form.
  gender     TEXT    NOT NULL,
  admin_key  TEXT    NOT NULL,
  lang       TEXT    NOT NULL DEFAULT 'ar',
  prayers    INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS pray_mark (
  slug  TEXT    NOT NULL REFERENCES pray_page(slug) ON DELETE CASCADE,
  -- Random per-browser token; not linked to anyone's identity.
  token TEXT    NOT NULL,
  at    INTEGER NOT NULL,
  PRIMARY KEY (slug, token)
);

-- Rate limits reuse khatma_rate from 0001_khatma.sql (buckets prefixed pc:/pp:).
