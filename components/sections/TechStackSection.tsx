"use client";

import { useRef, useEffect } from "react";

const tools = [
  { name: "React", logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
  { name: "Next.js", logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
  { name: "TypeScript", logo: "https://cdn.worldvectorlogo.com/logos/typescript.svg" },
  { name: "Laravel", logo: "https://cdn.worldvectorlogo.com/logos/laravel-2.svg" },
  { name: "Angular", logo: "https://cdn.worldvectorlogo.com/logos/angular-icon-1.svg" },
  { name: "PHP", logo: "https://cdn.worldvectorlogo.com/logos/php-1.svg" },
  { name: "MySQL", logo: "https://cdn.worldvectorlogo.com/logos/mysql-6.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" },
  { name: "Figma", logo: "https://cdn.worldvectorlogo.com/logos/figma-icon-one-color.svg" },
  { name: "JavaScript", logo: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg" },
];

// Triplicate so when we snap back mid-copy, it's invisible
const tripled = [...tools, ...tools, ...tools];

const ITEM_WIDTH = 90;
const ITEM_GAP = 16;
const STEP = ITEM_WIDTH + ITEM_GAP; // 106px per item
const SINGLE_SET_WIDTH = tools.length * STEP; // width of one full set

export default function TechStackSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Start at second copy (offset = 1 set width) so we can scroll into first or third
    posRef.current = -SINGLE_SET_WIDTH;
    track.style.transform = `translateX(${posRef.current}px)`;

    const speed = 0.6; // px per frame

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current -= speed;

        // When we've scrolled through one full set, snap back by exactly one set
        // (jumping from copy 3 boundary → copy 2 boundary — visually identical)
        if (posRef.current <= -SINGLE_SET_WIDTH * 2) {
          posRef.current += SINGLE_SET_WIDTH;
        }

        if (track) {
          track.style.transform = `translateX(${posRef.current}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

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
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)" }} />

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "'Space Grotesk', sans-serif",
            margin: 0,
          }}
        >
          Tools I Work With
        </h2>
      </div>

      {/* Scrolling strip */}
      <div
        style={{ position: "relative", overflow: "hidden" }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {/* Left fade */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "180px", background: "linear-gradient(to right, #000000 30%, transparent)", zIndex: 10, pointerEvents: "none" }} />
        {/* Right fade */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "180px", background: "linear-gradient(to left, #000000 30%, transparent)", zIndex: 10, pointerEvents: "none" }} />

        {/* Track — translated by JS, overflow:visible so items aren't clipped */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: `${ITEM_GAP}px`,
            willChange: "transform",
            width: "max-content",
          }}
        >
          {tripled.map((tool, i) => (
            <div
              key={`${tool.name}-${i}`}
              style={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                padding: "10px 0",
                width: `${ITEM_WIDTH}px`,
                cursor: "default",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.03)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.3s, background 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(91,79,255,0.4)";
                  el.style.background = "rgba(91,79,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  style={{
                    width: "22px",
                    height: "22px",
                    objectFit: "contain",
                    filter: "brightness(0) invert(1)",
                    opacity: 0.55,
                  }}
                />
              </div>
              <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif", textAlign: "center", whiteSpace: "nowrap" }}>
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
