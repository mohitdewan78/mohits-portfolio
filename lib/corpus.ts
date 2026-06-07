// Server-only. Builds the full knowledge-base string for the AI agents.
// Imported by API route handlers; never imported by client components.
import fs from "fs";
import path from "path";
import { homeOpinions, site } from "@/lib/site";
import { stage1Modules, stage2Modules, stage3Modules } from "@/lib/learn";

function readMdx(slug: string): string {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "content/work", `${slug}.mdx`),
    "utf-8",
  );
  return raw
    // strip meta export block
    .replace(/export const meta\s*=\s*\{[\s\S]*?\};\n*/g, "")
    // strip JSX components (Mermaid, etc.) — match <UpperCase ...> to closing />
    .replace(/<[A-Z][a-zA-Z]*[\s\S]*?\/>/g, "")
    // strip any remaining JSX open/close tags
    .replace(/<[A-Z][a-zA-Z]*[^>]*>[\s\S]*?<\/[A-Z][a-zA-Z]*>/g, "")
    .trim();
}

function formatModules(
  modules: typeof stage1Modules,
  stageLabel: string,
): string {
  const lines: string[] = [`[LEARNING TRAIL — ${stageLabel}]`];
  for (const m of modules) {
    lines.push(`\n## ${m.title}`);
    lines.push(m.note);
    if (m.resources.length > 0) {
      lines.push(
        "Resources: " +
          m.resources.map((r) => `${r.label} (${r.source}) — ${r.blurb}`).join("; "),
      );
    }
    if (m.linkedProject) {
      lines.push(`See case study: ${m.linkedProject.label}`);
    }
  }
  return lines.join("\n");
}

function buildCorpus(): string {
  const sections: string[] = [];

  // About
  sections.push(
    `[ABOUT MOHIT]
${site.name} is based in Pittsburgh. By day a product manager working on AI features inside enterprise workflows. On weekends, he builds personal AI projects — and documents the playbook.

${site.positioningSub}`,
  );

  // Opinions
  const opinionsText = homeOpinions
    .map((o, i) => `${i + 1}. ${o.title}\n   ${o.body}`)
    .join("\n\n");
  sections.push(`[OPINIONS — 5 principles Mohit builds by]\n${opinionsText}`);

  // Case studies
  for (const [slug, label] of [
    ["mcp-server", "MCP Document Tools Server"],
    ["job-dashboard", "Job Radar"],
    ["forge", "Forge"],
    ["astrophotography", "Astrophotography Vlog"],
  ] as const) {
    sections.push(`[CASE STUDY: ${label}]\n${readMdx(slug)}`);
  }

  // Learning trail
  sections.push(
    formatModules(stage1Modules, "Stage 1 — Get your bearings"),
  );
  sections.push(
    formatModules(stage2Modules, "Stage 2 — Build your first thing"),
  );
  sections.push(
    formatModules(stage3Modules, "Stage 3 — Go deeper"),
  );

  return sections.join("\n\n---\n\n");
}

export const CORPUS: string = buildCorpus();
