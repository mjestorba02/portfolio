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
      {/* ── PURPLE LIGHTNING — z:0, sits BEHIND the Spline robot ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
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
            <radialGradient id="purple-aura" cx="50%" cy="45%" r="35%">
              <stop offset="0%" stopColor="#7B5FFF" stopOpacity="0.22" />
              <stop offset="50%" stopColor="#5B4FFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#5B4FFF" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx="400" cy="400" rx="260" ry="320" fill="url(#purple-aura)" />

          <polyline
            points="400,20 378,160 396,160 362,340 388,340 340,560"
            stroke="url(#bolt-grad-1)"
            strokeWidth="3"
            fill="none"
            filter="url(#lightning-glow)"
            opacity="0.85"
          />
          <polyline
            points="400,20 378,160 396,160 362,340 388,340 340,560"
            stroke="white"
            strokeWidth="1"
            fill="none"
            opacity="0.45"
          />
          <polyline
            points="310,60 292,170 308,170 276,310 298,310 258,460"
            stroke="url(#bolt-grad-2)"
            strokeWidth="2"
            fill="none"
            filter="url(#lightning-glow)"
            opacity="0.55"
          />
          <polyline
            points="490,80 508,190 492,190 522,320 502,320 540,490"
            stroke="url(#bolt-grad-3)"
            strokeWidth="2"
            fill="none"
            filter="url(#lightning-glow)"
            opacity="0.45"
          />
          <polyline
            points="336,220 324,270 334,270 316,330"
            stroke="#a89dff"
            strokeWidth="1.5"
            fill="none"
            filter="url(#lightning-glow)"
            opacity="0.5"
          />
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

      {/* Spline 3D — z:1, sits ABOVE the lightning ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Bottom-to-top gradient */}
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

      {/* Grain */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.025,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <filter id="grain-hero">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-hero)" />
      </svg>

      {/* ── LEFT TEXT BLOCK — vertically centered, all content grouped ── */}
      <div
        style={{
          position: "absolute",
          left: "clamp(32px, 6vw, 80px)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "0",
          maxWidth: "520px",
          pointerEvents: "none",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            marginBottom: "20px",
            padding: "4px 12px",
            borderRadius: "9999px",
            border: "1px solid rgba(91,79,255,0.35)",
            background: "rgba(91,79,255,0.1)",
            width: "fit-content",
            pointerEvents: "auto",
          }}
        >
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#5B4FFF",
              display: "inline-block",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "10px",
              color: "#a89dff",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Available for Projects
          </span>
        </div>

        {/* Name block */}
        <div style={{ lineHeight: 1, marginBottom: "16px" }}>
          {/* MARK JOHN — solid white */}
          <div
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
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
          {/* ESTORBA — outlined */}
          <div
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              fontFamily: "'Space Grotesk', sans-serif",
              textTransform: "uppercase",
              lineHeight: 1,
              WebkitTextStroke: "1.5px rgba(255,255,255,0.7)",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            ESTORBA
          </div>
        </div>

        {/* Role + location */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "28px" }}>
          <span
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.08em",
              marginTop: "2px",
            }}
          >
            //
          </span>
          <div>
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              FULL STACK DEVELOPER
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.25)",
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              PHILIPPINES
            </div>
          </div>
        </div>

        {/* CTA */}
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
            transition: "border-color 0.2s, color 0.2s, background 0.2s",
            width: "fit-content",
            pointerEvents: "auto",
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

      {/* Scroll hint — bottom center */}
      <div
        style={{
          position: "absolute",
          bottom: "44px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: "9px",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "32px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
          }}
        />
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
