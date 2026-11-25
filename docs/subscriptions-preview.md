# Subscription preview

The isolated /preview/subscriptions route uses fictional data and demonstrates organization filtering, empty state and the four Core lifecycle statuses: pending, active, suspended, cancelled. Subscription status is not service health. No mutation, ordering, cancellation or billing is enabled.

The real Core subscriptions endpoint returns id, plan_id and status. Product, provider and plan metadata require an authorized server-side lookup; the enabled catalog alone may omit historical or disabled plans. Do not infer missing metadata or hide subscriptions when metadata is unavailable. Core must authorize every organization request independently of UI selection. No live API or session integration is included. CI and browser validation remain pending.
