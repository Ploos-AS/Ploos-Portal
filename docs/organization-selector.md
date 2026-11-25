# Organization selector

The preview at /preview/organizations uses explicitly fictional organizations. The reusable component accepts a list and emits a selection; it never grants access. No selection is persisted or sent to Core. Real organization lists must come from the authenticated Core organizations endpoint through the server-side client. Revalidate membership for every protected request; clear stale selections and never infer authorization from browser state. No real session or API wiring is enabled. Norwegian and English labels are provided. Browser and CI validation remain pending.
