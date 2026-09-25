import { ImageResponse } from "next/og";
import { loadCaseStudy, allSlugs } from "@/lib/work";
import { site } from "@/lib/site";

export const runtime = "nodejs";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = "Case study from Mohit Dewan's personal AI projects.";

// Tell Next.js which params to prerender OG images for.
export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = await loadCaseStudy(slug);
  const title = mod?.meta.title ?? "Case study";
  const hook = mod?.meta.hook ?? "";
  const tags = mod?.meta.tags ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          padding: 72,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          color: "#061b31",
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: "#4338ca",
            textTransform: "uppercase",
            letterSpacing: 4,
            
            display: "flex",
          }}
        >
          Case study
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 80,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: "flex",
            }}
          >
            {title}
          </div>
          {hook && (
            <div
              style={{
                fontSize: 32,
                
                color: "#50617a",
                lineHeight: 1.3,
                display: "flex",
              }}
            >
              {hook}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {tags.slice(0, 3).map((t) => (
              <span
                key={t}
                style={{
                  display: "flex",
                  border: "1px solid #e3e8ee",
                  padding: "6px 12px",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  fontSize: 16,
                  color: "#50617a",
                  fontFamily: "ui-sans-serif, system-ui, sans-serif",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, Menlo, monospace",
              color: "#64748d",
              fontSize: 18,
              display: "flex",
            }}
          >
            {site.name} · build-ai-with-mohit.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
