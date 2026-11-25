# Forseti pilot deployment

Operator-reported deployment verified on 2026-11-25.

- Origin: https://beta.account.ploos.no
- Host: Forseti; Compose project: ploos-portal
- Loopback binding: 127.0.0.1:18091
- Configuration: /etc/ploos-apps/ploos-portal/compose.yaml and .env
- Release: a29677d0f4899c8bd582f7b5e84f5c0145d2cad0
- Image: ghcr.io/ploos-as/ploos-portal@sha256:3dc2a13a726d3ad72e474e8d122e9ab7225e49a40cd2fe04248cd61e28d62c52

Local health and all six preview routes returned 200. Login returned 503 as intended. Container healthy. Caddy reload succeeded and Let's Encrypt certificate issuance completed. HTTPS root and health returned 200; login returned 503. X-Robots-Tag noindex, nofollow present. This is a public fictional-data preview, not access-controlled. Core integration and real login remain disabled.

Caddy reverse proxies the beta hostname to loopback port 18091. Before updates record previous image digest, validate Compose and Caddy configuration, and verify health and disabled login. Rollback by restoring previous reviewed image configuration and recreating only the portal service. No rollback exercise has been performed.

Pending: browser and accessibility checks, independent IPv4/IPv6 checks, Mimir monitoring, dependency locking, Identity integration and Core integration. No production readiness claim.
