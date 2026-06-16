import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");
    const description = searchParams.get("description");
    const category = searchParams.get("category") || "Projet";

    return new ImageResponse(
      <div
        style={{
          background: "linear-gradient(to right, #0f172a, #1e293b)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "white",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <span
            style={{
              color: "#3b82f6",
              fontSize: "32px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {category}
          </span>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              lineHeight: 1.1,
              margin: 0,
              color: "white",
            }}
          >
            {title || "Portfolio Antoine Richard"}
          </h1>
          {description && (
            <p
              style={{
                fontSize: "36px",
                lineHeight: 1.4,
                color: "#94a3b8",
                maxWidth: "900px",
                margin: 0,
              }}
            >
              {description.length > 120 ? `${description.slice(0, 120)}...` : description}
            </p>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: "auto", gap: "20px" }}>
          <div
            style={{ width: "60px", height: "60px", borderRadius: "30px", background: "#3b82f6" }}
          ></div>
          <span style={{ fontSize: "32px", fontWeight: "bold" }}>Antoine Richard</span>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error("Error generating OG image:", e);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
