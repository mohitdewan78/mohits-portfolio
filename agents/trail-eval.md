# Trail Quality Eval Agent

Orchestrator prompt for the monthly learning trail quality check.
Run this on the 1st of each month, or manually anytime with: "run trail eval"

## What you're evaluating

`lib/learn.ts` contains 18 learning modules across 3 stages. Each module has `resources[]` — an array of links with `format`, `source`, `time`, and `blurb`. Your job is to check every resource and produce an actionable report.

## Steps

### 1. Extract all resources

Read `lib/learn.ts`. For every module, collect:
- `module.id`
- `module.title`
- `resource.title` (if present)
- `resource.url` (or `resource.href`)
- `resource.source`

### 2. Check each URL

For each URL, run: `curl -s -o /dev/null -w "%{http_code}" --max-time 10 -L "<url>"`

Flag:
- **Dead** — HTTP 404, 410, 000 (timeout), or redirect to a homepage/404 page
- **Redirected** — HTTP 301/302 to a different domain (may indicate content moved)
- **OK** — HTTP 200

### 3. Check freshness

Flag any resource where the `source` field or URL suggests it's from a publication date before **January 2024**. Common signals: year in URL path (e.g. `/2022/`), source name with dated series.

### 4. Write the report

Write a markdown report to `agents/reports/trail-eval-<YYYY-MM>.md` with this structure:

```markdown
# Trail Eval — <Month Year>

## Summary
- Total resources checked: N
- Dead links: N
- Stale (pre-2024): N
- Healthy: N

## Dead Links (fix these)

| Module | Resource | URL | Status |
|--------|----------|-----|--------|
| ...    | ...      | ... | 404    |

**Suggested replacements:**
- [Module]: [Old resource title] → suggest searching "[topic] site:huggingface.co OR site:developers.googleblog.com OR site:anthropic.com" for a current alternative

## Stale Resources (review these)

| Module | Resource | URL | Est. Date |
|--------|----------|-----|-----------|

## Healthy Resources

All other N resources passed.

## Recommended Actions

1. [Specific action]
2. [Specific action]
```

### 5. Report to Mohit

After writing the file, summarize:
- How many resources total
- How many are dead or stale
- The top 3 most urgent fixes
- Path to the full report
