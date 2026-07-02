import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Riveted, Inc. — Fractional CTO & Web App Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(
  family: string,
  text: string
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const resource = css.match(
      /src: url\((.+?)\) format\('(opentype|truetype)'\)/
    );
    if (!resource) return null;
    const res = await fetch(resource[1]);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OGImage() {
  const headline = "Build what's next with AI-first engineering Riveted";
  const accent = "Build what's next";
  const [interTight, playfair] = await Promise.all([
    loadGoogleFont("Inter+Tight:wght@500", headline),
    loadGoogleFont("Playfair+Display:ital@1", accent),
  ]);

  const fonts = [];
  if (interTight) {
    fonts.push({
      name: "Inter Tight",
      data: interTight,
      style: "normal" as const,
      weight: 500 as const,
    });
  }
  if (playfair) {
    fonts.push({
      name: "Playfair Display",
      data: playfair,
      style: "italic" as const,
      weight: 400 as const,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#141413",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontFamily: interTight ? "Inter Tight" : "sans-serif",
              fontSize: 44,
              color: "#9E948B",
              marginBottom: 28,
            }}
          >
            Riveted
          </div>
          <div
            style={{
              fontFamily: playfair ? "Playfair Display" : "serif",
              fontStyle: "italic",
              fontSize: 88,
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            Build what&rsquo;s next
          </div>
          <div
            style={{
              fontFamily: interTight ? "Inter Tight" : "sans-serif",
              fontSize: 88,
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            with AI-first engineering
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
