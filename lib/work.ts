// Work case study manifest.
//
// Each case study is an MDX file in content/work/. The meta is exported from
// the MDX file as `export const meta = {...}`. This file is the registry —
// adding a new case study means: (1) drop a new MDX file in content/work/,
// (2) add it to the array below.

export type WorkMeta = {
  slug: string;
  title: string;
  hook: string;
  oneLine: string; // shown on listing pages
  tags: readonly string[];
  status: "live" | "in-progress";
  order: number;
  // Optional external links
  links?: {
    live?: string;
    github?: string;
    external?: string;
  };
};

type Loader = () => Promise<{
  default: React.ComponentType;
  meta: WorkMeta;
}>;

// Order here doesn't matter — sort by `meta.order` after loading.
const registry: Record<string, Loader> = {
  "mcp-server": () => import("@/content/work/mcp-server.mdx"),
  "job-dashboard": () => import("@/content/work/job-dashboard.mdx"),
  "forge": () => import("@/content/work/forge.mdx"),
  "astrophotography": () => import("@/content/work/astrophotography.mdx"),
};

export const allSlugs = Object.keys(registry);

export async function loadCaseStudy(slug: string) {
  const loader = registry[slug];
  if (!loader) return null;
  return loader();
}

export async function loadAllMetas(): Promise<WorkMeta[]> {
  const modules = await Promise.all(
    Object.values(registry).map((load) => load()),
  );
  return modules
    .map((m) => m.meta)
    .sort((a, b) => a.order - b.order);
}
