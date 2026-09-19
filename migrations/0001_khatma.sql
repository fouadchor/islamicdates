-- Collective Quran khatma — schema.
--
-- One khatma row per group reading; thirty part rows created with it, so a
-- claim is a conditional UPDATE rather than an INSERT. That is what keeps two
-- people who tap the same juz at the same moment from both getting it: D1 runs
-- the UPDATE atomically and reports how many rows it changed, and only the
-- first one changes a row.

CREATE TABLE IF NOT EXISTS khatma (
  slug         TEXT    PRIMARY KEY,
  title        TEXT    NOT NULL,
  admin_key    TEXT    NOT NULL,
  lang         TEXT    NOT NULL DEFAULT 'ar',
  parts        INTEGER NOT NULL DEFAULT 30,
  -- Hours a reader may hold a part before it returns to the pool. The single
  -- most important field here: without it a forgotten juz freezes the khatma
  -- forever, which is the flaw every existing site in this space has.
  hold_hours   INTEGER NOT NULL DEFAULT 48,
  created_at   INTEGER NOT NULL,
  completed_at INTEGER
);

CREATE TABLE IF NOT EXISTS khatma_part (
  slug         TEXT    NOT NULL REFERENCES khatma(slug) ON DELETE CASCADE,
  part_no      INTEGER NOT NULL,
  -- 'free' | 'held' | 'done'
  status       TEXT    NOT NULL DEFAULT 'free',
  reader_name  TEXT,
  -- Random per-browser token. Proves the same visitor who claimed a part is the
  -- one confirming or releasing it, without accounts, e-mail or any personal data.
  reader_token TEXT,
  claimed_at   INTEGER,
  done_at      INTEGER,
  PRIMARY KEY (slug, part_no)
);

CREATE INDEX IF NOT EXISTS idx_khatma_part_held ON khatma_part (status, claimed_at);

-- Coarse abuse brake on the public create endpoint: one row per IP per hour.
CREATE TABLE IF NOT EXISTS khatma_rate (
  bucket  TEXT    PRIMARY KEY,
  count   INTEGER NOT NULL,
  expires INTEGER NOT NULL
);
