# d1-sveltekit-repro

Demonstration of an issue with Cloudflare D1 in a SvelteKit app.

## Update 2023-02-22

It actually works now with the `--bundle` flag.
Run `wrangler pages publish .svelte-kit/cloudflare --bundle` to try it.

## Repro

1. Make sure you have `wrangler` installed locally and are logged in.
2. Install dependencies with `npm install`.
3. Create a D1 DB with `wrangler d1 create d1-sveltekit-repro-db`.
4. Create a KV namespace with `wrangler kv:namespace create kv`. This is used
   as a smoke test to prove that bindings in general do work.
5. Run a build with `npm run build`.
6. Create the pages project with
   `wrangler pages publish .svelte-kit/cloudflare`.
7. Configure the production bindings for your project in the Cloudflare
   dashboard.
   - KV namespace binding: `KV=d1-sveltekit-repro-kv`
   - D1 database binding: `DB=d1-sveltekit-repro-db`
8. Publish again to trigger a new deployment that has access to the bindings
   with `wrangler pages publish .svelte-kit/cloudflare`.

Now you can check the three different API routes to see what works and doesn't
(change the domain to your project).

- https://d1-sveltekit-repro.pages.dev/api/hello is a dependency-free SvelteKit
  API route that works just fine.
- https://d1-sveltekit-repro.pages.dev/api/kv lists entries from the KV
  namespace. Of course there aren't any unless you create some, but the
  operation is successful.
- https://d1-sveltekit-repro.pages.dev/api/d1 reads the SQLite schema table
  which usually works (you can check with
  `wrangler d1 execute d1-sveltekit-repro-db --command 'SELECT name FROM sqlite_schema'`)
  but it results in an internal error here.

## License

[MIT License](LICENSE)
