# Ploos Deploy adoption contract

Ploos Deploy is currently experimental according to its README. Do not run its Balder-only deployment command against the existing Portal project. Until adoption is implemented and tested, use the existing operator-managed Compose procedure.

## Existing target

- Host: Forseti
- Project: ploos-portal; service: portal
- Compose: /etc/ploos-apps/ploos-portal/compose.yaml
- Environment: /etc/ploos-apps/ploos-portal/.env
- Release directory: /srv/ploos-apps/ploos-portal/releases
- Image repository: ghcr.io/ploos-as/ploos-portal
- Binding: 127.0.0.1:18091:8080
- Origin: https://beta.account.ploos.no
- GHCR credentials: existing root-only Docker configuration

## Required adoption capabilities

Preserve project and service names, loopback binding, origin, non-root runtime, read-only filesystem, dropped capabilities and no-new-privileges. Accept only reviewed immutable image digests. Validate the existing Compose configuration before changing it. Serialize updates with a per-project lock, record the prior digest and configuration, pull the candidate before replacing the service, and never run compose down or remove volumes.

Require Docker health, local /healthz HTTP 200, public HTTPS /healthz and homepage HTTP 200, and /auth/login HTTP 503 while identity is disabled. Check preview routes. On failure restore the previous configuration and recreate only the portal service; verify recovery and report failure even if rollback succeeds. Keep credentials out of logs and deployment state.

## Acceptance gates

1. Implement or verify existing-project adoption in Ploos Deploy against its actual current code and manifest schema.
2. Exercise adoption, successful update, failed health check, rollback and concurrent-update rejection on a disposable project.
3. Confirm rendered configuration preserves the Portal security settings.
4. Obtain operator approval before adopting the live project.
5. Record the deployed digest and verification results.

This document is a proposed integration contract, not an executable manifest or proof of working integration. No live server changes are included.
