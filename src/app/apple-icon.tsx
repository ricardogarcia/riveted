import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
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

export default async function AppleIcon() {
  const interTight = await loadGoogleFont("Inter+Tight:wght@500", "R");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#141413",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontFamily: interTight ? "Inter Tight" : "sans-serif",
            fontSize: 110,
            fontWeight: 500,
            color: "#ffffff",
          }}
        >
          R
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: "#9E948B",
              marginLeft: 8,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: interTight
        ? [
            {
              name: "Inter Tight",
              data: interTight,
              style: "normal" as const,
              weight: 500 as const,
            },
          ]
        : undefined,
    }
  );
}
