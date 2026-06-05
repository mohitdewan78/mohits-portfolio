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
          background: "#faf7f0",
          padding: 72,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "Georgia, serif",
          color: "#1c1a16",
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: "#b5482a",
            textTransform: "uppercase",
            letterSpacing: 4,
            fontStyle: "italic",
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
              color: "#837d6f",
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
