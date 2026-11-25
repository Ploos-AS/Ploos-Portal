# Ploos Portal

Customer portal frontend for **Ploos AS**, separate from [Ploos Core](https://github.com/Ploos-AS/Ploos-Core).

This repository starts with a **non-authenticated pilot shell**. It deliberately does not fetch or display customer data, offer sign-in, or create organizations until an identity provider, session handling, and Core API integration have been reviewed.

## Run locally

Requires Node.js 22 or later.

```sh
npm install
npm run check
npm run dev
```

Open the URL printed by Vite.

## Architecture boundaries

- **Ploos Portal**: customer-facing UI and eventually secure browser sessions.
- **Ploos Core**: source of truth for organizations, memberships, products and subscriptions.
- **Identity provider**: OIDC Authorization Code + PKCE; provider selection is pending.
- **Provisioning providers**: backend integrations, never called directly from browser code.

The initial UI lists product families only. It contains no real organization, subscription, billing or provisioning state. It must **not** be deployed as an authenticated customer portal in this form.

## Next steps

1. Select and verify an OIDC provider against Core's identity contract.
2. Define server-side session and callback routes, CSRF protection, cookie policy, logout and token refresh behavior.
3. Add a server-only Core API client and typed read-only organization/subscription views, with authorization enforced by Core.
4. Add integration tests and deployment configuration before exposing `account.ploos.no`.

See [Core's identity and portal roadmap](https://github.com/Ploos-AS/Ploos-Core/blob/main/docs/identity-portal-roadmap.md).
