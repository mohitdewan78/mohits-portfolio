import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "nodejs";

export const alt = "Mohit Dewan — Personal AI projects + the playbook for building your own";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          Field notes from building with AI
        </div>

        <div
          style={{
            fontSize: 88,
            lineHeight: 1.05,
            letterSpacing: -2,
            display: "flex",
          }}
        >
          Personal AI projects, and the playbook for building your own.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex" }}>{site.name}</div>
          <div
            style={{
              fontFamily: "ui-monospace, Menlo, monospace",
              color: "#64748d",
              fontSize: 20,
              display: "flex",
            }}
          >
            build-ai-with-mohit.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
