# Session foundation

Login fails closed with HTTP 503 until the provider integration is implemented and approved. The server-only session interface is not wired into routes or a store. Expiry is expressed in Unix milliseconds and must be bounded by access-token expiry and the session lifetime. The proposed cookie lifetime is 30 minutes; no cookie is issued yet.

Future implementation must generate 32 cryptographically random bytes encoded as unpadded base64url for opaque session IDs, rotate on login, use a protected persistent store with TTL and revocation, validate OIDC code/PKCE/state/nonce and token claims, protect mutations against CSRF, and handle logout and token refresh. Never serialize the Session object into page data. Only verified server-side access tokens may reach the Core client. Store failures must deny access. No mock identity or authentication bypass is provided.

Before activation, test Authentik discovery, exact issuer, callback and Core audience compatibility. No real login, callback, session issuance or customer API access is enabled.
