-- «ادعوا لـ…» second release (25 Oct 2026): a browser may pray again on a later
-- day and be counted in `total`, and the creator may edit the page.
--
-- Production needs no manual step: src/lib/pray-for.ts (ensureSchema → UPGRADES)
-- adds these columns on first use and ignores "duplicate column" afterwards.
-- Recorded here for local databases created from 0002 before this change:
--
--   npx wrangler d1 execute islamicdates-khatma --local --config wrangler.dev.toml --file=./migrations/0003_pray_for_repeat.sql

ALTER TABLE pray_page ADD COLUMN total INTEGER NOT NULL DEFAULT 0;
UPDATE pray_page SET total = prayers WHERE total < prayers;
ALTER TABLE pray_mark ADD COLUMN times INTEGER NOT NULL DEFAULT 1;
