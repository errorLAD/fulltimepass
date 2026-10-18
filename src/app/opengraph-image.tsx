import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FullTimePass.in — India's Desi Timepass Hub 🔥";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#0B0F19",
          backgroundImage:
            "radial-gradient(circle at 20% 25%, rgba(245, 158, 11, 0.25) 0%, transparent 45%), radial-gradient(circle at 80% 75%, rgba(234, 88, 12, 0.28) 0%, transparent 50%)",
          padding: "50px 65px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #F59E0B, #EA580C)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                boxShadow: "0 10px 25px rgba(245, 158, 11, 0.4)",
              }}
            >
              🔥
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 900,
                  color: "#FFFFFF",
                  letterSpacing: "-1px",
                }}
              >
                FULLTIME<span style={{ color: "#F59E0B" }}>PASS</span>
                <span style={{ fontSize: "22px", color: "#94A3B8", marginLeft: "4px" }}>
                  .in
                </span>
              </span>
              <span style={{ fontSize: "14px", color: "#CBD5E1", fontWeight: 600 }}>
                Desi Timepass &amp; Comedy Playground 🇮🇳
              </span>
            </div>
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: "999px",
              backgroundColor: "rgba(245, 158, 11, 0.15)",
              border: "1.5px solid rgba(245, 158, 11, 0.45)",
              color: "#FCD34D",
              fontSize: "16px",
              fontWeight: 800,
            }}
          >
            20 Viral Tools • 100% Free
          </div>
        </div>

        {/* Center Main Stage */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "960px",
            gap: "18px",
          }}
        >
          <div
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FBBF24",
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            Bore ho rahe ho? Kuch timepass karte hain!
          </div>

          <h1
            style={{
              fontSize: "56px",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "-1.5px",
            }}
          >
            Savage Roasts, Red Flag Meters &amp;
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #F59E0B, #FB923C, #F43F5E)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Shareable WhatsApp Cards! 😂
            </span>
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#CBD5E1",
              maxWidth: "840px",
              margin: 0,
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            Treat Roulette • Udhaar Recovery Notices • Group Chat Cabinets • Shaadi Kalesh &amp; Aukaat Checkers
          </p>
        </div>

        {/* Footer Feature Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            <div
              style={{
                padding: "8px 18px",
                borderRadius: "12px",
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.35)",
                color: "#6EE7B7",
                fontSize: "15px",
                fontWeight: 700,
              }}
            >
              💬 1-Click WhatsApp Share
            </div>
            <div
              style={{
                padding: "8px 18px",
                borderRadius: "12px",
                backgroundColor: "rgba(244, 63, 94, 0.15)",
                border: "1px solid rgba(244, 63, 94, 0.35)",
                color: "#FDA4AF",
                fontSize: "15px",
                fontWeight: 700,
              }}
            >
              🚩 Red Flag &amp; Ex Meters
            </div>
            <div
              style={{
                padding: "8px 18px",
                borderRadius: "12px",
                backgroundColor: "rgba(59, 130, 246, 0.15)",
                border: "1px solid rgba(59, 130, 246, 0.35)",
                color: "#93C5FD",
                fontSize: "15px",
                fontWeight: 700,
              }}
            >
              📜 Reserve Bank of Bhaichara
            </div>
          </div>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "#F59E0B",
            }}
          >
            fulltimepass.in
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
