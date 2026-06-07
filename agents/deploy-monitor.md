# Deployment Monitor Agent

Run this after any `git push` to confirm the Vercel build succeeded and all routes are healthy.
Trigger: "check my deploy" or "did the build pass?"

## Steps

### 1. Find the latest deployment

Use the Vercel MCP:
- `list_deployments` for project `build-ai-with-mohit` on team `mohitdewandce-3596s-projects`
- Pick the most recent deployment

### 2. Check build status

- If state is `READY` → go to step 3
- If state is `ERROR` or `CANCELED`:
  - Call `get_deployment_build_logs` for the deployment ID
  - Find the first ERROR line
  - Map it to a plain-English cause:
    - `Type error:` → TypeScript error, show file:line
    - `Module not found:` → missing import, show which file
    - `SyntaxError:` → MDX or JS syntax, show file
    - `ENOENT:` → missing file referenced in config
  - Report: "Build failed — [cause in plain English]. Fix: [specific suggestion]."
  - Stop here.

### 3. Verify routes

Using `web_fetch_vercel_url` or direct fetch, hit these 5 routes and confirm each returns 200:
- `https://build-ai-with-mohit.vercel.app/`
- `https://build-ai-with-mohit.vercel.app/work`
- `https://build-ai-with-mohit.vercel.app/learn`
- `https://build-ai-with-mohit.vercel.app/about`
- `https://build-ai-with-mohit.vercel.app/work/forge` (canary case study)

### 4. Report

**If all pass:**
```
Build PASSED — deployed in Xs.
All 5 routes returned 200.
Live at: https://build-ai-with-mohit.vercel.app
```

**If a route fails:**
```
Build deployed but route check failed:
- /work/forge → 500

Likely cause: MDX compilation error in content/work/forge.mdx.
Check: pnpm build locally to reproduce.
```
