# Feature Flags

- Flags originate from `GET /flags` and hydrate Zustand via `useFeatureFlagStore`.
- Expected keys:
  - `catalog.publicBrowse`
  - `search.enabled`
  - `rfq.enabled`
  - `wallet.basic`
- Provide sensible fallback defaults in `libs/store/feature-flag-store.ts`.
- Guard UI and routes using `isEnabled('flag')` to avoid rendering inaccessible flows.
- For new flags, document rollout strategy here and ensure backend returns defaults in non-production environments.
