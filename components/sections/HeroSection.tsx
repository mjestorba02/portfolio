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

      {/* ── PURPLE LIGHTNING — behind robot, above Spline ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <svg
          viewBox="0 0 800 900"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
        >
          <defs>
            <filter id="lightning-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur1" />
              <feGaussianBlur stdDeviation="14" result="blur2" in="SourceGraphic" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="lightning-glow-soft" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="22" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="bolt-grad-1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c4baff" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#7B5FFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#5B4FFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="bolt-grad-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a89dff" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#6B5FFF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#5B4FFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="bolt-grad-3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4cfff" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#8B7FFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#5B4FFF" stopOpacity="0" />
            </linearGradient>
            {/* Ambient purple radial glow behind robot */}
            <radialGradient id="purple-aura" cx="50%" cy="45%" r="35%">
              <stop offset="0%" stopColor="#7B5FFF" stopOpacity="0.22" />
              <stop offset="50%" stopColor="#5B4FFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#5B4FFF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient purple aura behind robot center */}
          <ellipse cx="400" cy="400" rx="260" ry="320" fill="url(#purple-aura)" />

          {/* Main center lightning bolt */}
          <polyline
            points="400,20 378,160 396,160 362,340 388,340 340,560"
            stroke="url(#bolt-grad-1)"
            strokeWidth="3"
            fill="none"
            filter="url(#lightning-glow)"
            opacity="0.85"
          />
          {/* Main bolt bright core */}
          <polyline
            points="400,20 378,160 396,160 362,340 388,340 340,560"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.45"
          />

          {/* Left branch bolt */}
          <polyline
            points="310,60 292,170 308,170 276,310 298,310 258,460"
            stroke="url(#bolt-grad-2)"
            strokeWidth="2"
            fill="none"
            filter="url(#lightning-glow)"
            opacity="0.55"
          />

          {/* Right branch bolt */}
          <polyline
            points="490,80 508,190 492,190 522,320 502,320 540,490"
            stroke="url(#bolt-grad-3)"
            strokeWidth="2"
            fill="none"
            filter="url(#lightning-glow)"
            opacity="0.45"
          />

          {/* Small spark — left */}
          <polyline
            points="336,220 324,270 334,270 316,330"
            stroke="#a89dff"
            strokeWidth="1.5"
            fill="none"
            filter="url(#lightning-glow)"
            opacity="0.5"
          />

          {/* Small spark — right */}
          <polyline
            points="464,240 476,290 466,290 484,355"
            stroke="#c4baff"
            strokeWidth="1.5"
            fill="none"
            filter="url(#lightning-glow)"
            opacity="0.4"
          />
        </svg>
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

      {/* ── TOP-LEFT: Badge + "MARK JOHN" ── */}
      <div
        style={{
          position: "absolute",
          top: "88px",
          left: "48px",
          zIndex: 10,
        }}
      >
        {/* Available for Projects badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            marginBottom: "18px",
            padding: "4px 12px",
            borderRadius: "9999px",
            border: "1px solid rgba(91,79,255,0.35)",
            background: "rgba(91,79,255,0.1)",
          }}
        >
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#5B4FFF", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
          <span style={{ fontSize: "10px", color: "#a89dff", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>
            Available for Projects
          </span>
        </div>

        {/* "MARK JOHN" — solid, like the reference "THE" line */}
        <div
          style={{
            fontSize: "clamp(2.2rem, 6.5vw, 6rem)",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            fontFamily: "'Space Grotesk', sans-serif",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          MARK JOHN
        </div>
      </div>

      {/* ── MIDDLE: "ESTORBA" — huge outlined text, full-width ── */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          padding: "0 32px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: "clamp(5rem, 19vw, 17rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            fontFamily: "'Space Grotesk', sans-serif",
            textTransform: "uppercase",
            lineHeight: 0.85,
            WebkitTextStroke: "2px rgba(255,255,255,0.85)",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          ESTORBA
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: "0 48px 44px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        {/* Left block — tagline */}
        <div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.08em", marginTop: "2px" }}>//</span>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                FULL STACK DEVELOPER
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "rgba(255,255,255,0.28)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
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

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
