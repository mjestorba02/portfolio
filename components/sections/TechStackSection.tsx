"use client";

const tools = [
  { name: "React",        logo: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js",      logo: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "TypeScript",   logo: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Laravel",      logo: "https://cdn.simpleicons.org/laravel/FF2D20" },
  { name: "Angular",      logo: "https://cdn.simpleicons.org/angular/DD0031" },
  { name: "PHP",          logo: "https://cdn.simpleicons.org/php/777BB4" },
  { name: "MySQL",        logo: "https://cdn.simpleicons.org/mysql/4479A1" },
  {
    name: "HeidiSQL",
    // Inline SVG data URI — not on any CDN, guaranteed to render
    logo: "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a89dff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cellipse cx='12' cy='5' rx='9' ry='3'/%3E%3Cpath d='M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5'/%3E%3Cpath d='M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3'/%3E%3C/svg%3E",
  },
  { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Figma",        logo: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "JavaScript",   logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
];

// Duplicate so CSS translateX(-50%) snaps invisibly
const doubled = [...tools, ...tools];

const ITEM_WIDTH = 80;
const ITEM_GAP = 24;

export default function TechStackSection() {
  return (
    <section
      id="techstack"
      style={{
        position: "relative",
        width: "100%",
        background: "#000000",
        padding: "36px 0",
        overflow: "hidden",
      }}
    >
      {/* Divider lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
        }}
      />

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "22px" }}>
        <h2
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "'Space Grotesk', sans-serif",
            margin: 0,
          }}
        >
          Tools I Work With
        </h2>
      </div>

      {/* Scrolling strip */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Left fade */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "180px",
            background: "linear-gradient(to right, #000000 30%, transparent)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
        {/* Right fade */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "180px",
            background: "linear-gradient(to left, #000000 30%, transparent)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        {/* Track — CSS animation, pauses on hover */}
        <div
          className="carousel-track"
          style={{
            display: "flex",
            gap: `${ITEM_GAP}px`,
            width: "max-content",
            padding: "4px 0",
            willChange: "transform",
          }}
        >
          {doubled.map((tool, i) => (
            <div
              key={`${tool.name}-${i}`}
              style={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                width: `${ITEM_WIDTH}px`,
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const img = (e.currentTarget as HTMLElement).querySelector(
                  "img"
                ) as HTMLElement;
                if (img) img.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const img = (e.currentTarget as HTMLElement).querySelector(
                  "img"
                ) as HTMLElement;
                if (img) img.style.opacity = "0.55";
              }}
            >
              <img
                src={tool.logo}
                alt={tool.name}
                loading="eager"
                decoding="sync"
                style={{
                  width: "28px",
                  height: "28px",
                  objectFit: "contain",
                  opacity: 0.55,
                  transition: "opacity 0.25s",
                  display: "block",
                }}
              />
              <span
                style={{
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.28)",
                  fontFamily: "'Inter', sans-serif",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.04em",
                }}
              >
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .carousel-track {
          animation: carousel-scroll 28s linear infinite;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
        /*
          The track contains 2 identical sets.
          Translating by -50% moves exactly one set width,
          landing on a pixel-perfect copy = invisible snap.
        */
        @keyframes carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
