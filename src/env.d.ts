/// <reference path="../.astro/types.d.ts" />

type KhatmaD1 = import('./lib/khatma').D1;

declare namespace App {
  interface Locals {
    runtime: {
      // Bindings configured on the Cloudflare Pages project.
      // DB is optional: the site is mostly static and every page other than the
      // khatma feature renders fine without it, so the code checks rather than
      // assumes, and the khatma pages explain themselves if it is missing.
      env: { DB?: KhatmaD1 } & Record<string, unknown>;
      cf?: Record<string, unknown>;
      ctx?: { waitUntil(p: Promise<unknown>): void };
    };
  }
}
