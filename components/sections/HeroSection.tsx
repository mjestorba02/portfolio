"use client";

import dynamic from "next/dynamic";

const SplineScene = dynamic(
  () => import("@/components/ui/spline-scene").then((m) => m.SplineScene),
  { ssr: false }
);

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#000000",
        overflow: "hidden",
      }}
    >
      {/* Spline 3D — full page background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Bottom-to-top gradient blending into next section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "260px",
          background: "linear-gradient(to bottom, transparent, #000000)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Subtle grain */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.025, zIndex: 3, pointerEvents: "none" }}
      >
        <filter id="grain-hero">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-hero)" />
      </svg>

      {/* BOTTOM TEXT LAYER — spread across bottom like reference */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: "0 48px 48px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        {/* Left block — tagline */}
        <div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.08em", marginTop: "2px" }}>//</span>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.55)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                FULL STACK DEVELOPER
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.35)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                PHILIPPINES
              </div>
            </div>
          </div>
        </div>

        {/* Center — scroll hint */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", paddingBottom: "4px" }}>
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.28em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>SCROLL</span>
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)" }} />
        </div>

        {/* Right block — CTA */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 22px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.8)",
              fontSize: "0.8rem",
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              backdropFilter: "blur(6px)",
              background: "rgba(255,255,255,0.04)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.4)";
              el.style.color = "#fff";
              el.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.15)";
              el.style.color = "rgba(255,255,255,0.8)";
              el.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            // LET&apos;S TALK
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>

      {/* MAIN HEADING — full-width massive text */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "100px",
          zIndex: 10,
          padding: "0 40px",
          pointerEvents: "none",
        }}
      >
        {/* Available badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            marginBottom: "12px",
            padding: "4px 12px",
            borderRadius: "9999px",
            border: "1px solid rgba(91,79,255,0.35)",
            background: "rgba(91,79,255,0.1)",
            pointerEvents: "auto",
          }}
        >
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#5B4FFF", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
          <span style={{ fontSize: "10px", color: "#a89dff", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>
            Available for Projects
          </span>
        </div>

        {/* Name — massive */}
        <div style={{ lineHeight: 0.88, marginBottom: "0" }}>
          <div
            style={{
              fontSize: "clamp(3.5rem, 11.5vw, 10.5rem)",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              fontFamily: "'Space Grotesk', sans-serif",
              textTransform: "uppercase",
              display: "block",
            }}
          >
            MARK JOHN
          </div>
          <div
            style={{
              fontSize: "clamp(4rem, 17vw, 15.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              fontFamily: "'Space Grotesk', sans-serif",
              textTransform: "uppercase",
              display: "block",
              lineHeight: 0.85,
              // Outlined / stroke style like reference's hollow text
              WebkitTextStroke: "2px rgba(255,255,255,0.9)",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            ESTORBA
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
