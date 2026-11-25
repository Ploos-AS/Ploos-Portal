# Expanded preview release candidate

Not deployed yet. Includes product previews from PRs 31–39, delegated zones, canonical name servers, billing and support. All data is fictional. Login must remain disabled (503); no live Core, registrar, mail, payment or support integration.

## Release gate

- All PR checks green, including expanded mobile browser coverage.
- Publish reviewed main commit through existing manual GHCR workflow. Record commit and immutable digest.
- On Forseti record current running image and back up /etc/ploos-apps/ploos-portal/.env with root-only permissions.
- Pull reviewed digest using /etc/ploos-apps/docker-auth. Change only PLOOS_PORTAL_IMAGE. Validate Compose and recreate only portal service using --no-deps --wait.
- Verify loopback and public HTTPS health, root, /preview, /preview/organizations, /preview/products, /preview/catalog, /preview/subscriptions, /preview/members, /preview/billing, /preview/support and /preview/products/{domains,dns,hosting,mail,cloud,forenio} return 200. Login returns 503. Check X-Robots-Tag and visual rendering.
- Verify Core readiness and unrelated containers remain unchanged.
- On failure restore previous .env and recreate only portal; repeat health checks.
- Record actual digest, checks, timestamp and outstanding gaps after deployment.

Public noindex preview is not access-controlled. No production readiness claim. Identity, live authorization and Mimir activation remain separate work.
