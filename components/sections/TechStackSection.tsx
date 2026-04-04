"use client";

import { useRef, useEffect } from "react";

const tools = [
  { name: "React",        logo: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js",      logo: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "TypeScript",   logo: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Laravel",      logo: "https://cdn.simpleicons.org/laravel/FF2D20" },
  { name: "Angular",      logo: "https://cdn.simpleicons.org/angular/DD0031" },
  { name: "PHP",          logo: "https://cdn.simpleicons.org/php/777BB4" },
  { name: "MySQL",        logo: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Figma",        logo: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "JavaScript",   logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
];

// Triplicate so snap is invisible
const tripled = [...tools, ...tools, ...tools];

const ITEM_WIDTH = 80;
const ITEM_GAP = 24;
const STEP = ITEM_WIDTH + ITEM_GAP;
const SINGLE_SET_WIDTH = tools.length * STEP;

export default function TechStackSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    posRef.current = -SINGLE_SET_WIDTH;
    track.style.transform = `translateX(${posRef.current}px)`;

    const speed = 0.55;

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current -= speed;
        if (posRef.current <= -SINGLE_SET_WIDTH * 2) {
          posRef.current += SINGLE_SET_WIDTH;
        }
        if (track) track.style.transform = `translateX(${posRef.current}px)`;
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
      <div
        style={{ position: "relative", overflow: "hidden" }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {/* Left fade */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "180px", background: "linear-gradient(to right, #000000 30%, transparent)", zIndex: 10, pointerEvents: "none" }} />
        {/* Right fade */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "180px", background: "linear-gradient(to left, #000000 30%, transparent)", zIndex: 10, pointerEvents: "none" }} />

        {/* Track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: `${ITEM_GAP}px`,
            willChange: "transform",
            width: "max-content",
            padding: "4px 0",
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
                width: `${ITEM_WIDTH}px`,
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const img = (e.currentTarget as HTMLElement).querySelector("img") as HTMLElement;
                if (img) img.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const img = (e.currentTarget as HTMLElement).querySelector("img") as HTMLElement;
                if (img) img.style.opacity = "0.55";
              }}
            >
              <img
                src={tool.logo}
                alt={tool.name}
                style={{
                  width: "28px",
                  height: "28px",
                  objectFit: "contain",
                  opacity: 0.55,
                  transition: "opacity 0.25s",
                  display: "block",
                }}
              />
              <span style={{
                fontSize: "0.6rem",
                color: "rgba(255,255,255,0.28)",
                fontFamily: "'Inter', sans-serif",
                textAlign: "center",
                whiteSpace: "nowrap",
                letterSpacing: "0.04em",
              }}>
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
