# Core API client

The server-only client accepts a trusted configured HTTPS origin and a verified session's delegated access token. Never derive the origin from a browser request. Core remains responsible for tenant authorization. Redirects are rejected, requests time out after five seconds, and responses are not cached.

The client is not wired to any route or session. Type declarations describe expected responses; only the top-level array is validated currently. Runtime field validation, response size limits and integration tests are required before live use. No credentials or live endpoint are configured. A private TLS path to Core must be established before activation.
