# Client Changes

- 2025-10-13: Currency symbol changed from `$` to `₹`.

Notes:
- The currency symbol is read from `VITE_CURRENCY` in `client/.env` and used throughout the app via `import.meta.env.VITE_CURRENCY`.
- After pulling this change, restart the dev server to pick up the new environment variable:

  npm run dev

- If you use a build pipeline, ensure the production env is also updated with `VITE_CURRENCY=₹`.
