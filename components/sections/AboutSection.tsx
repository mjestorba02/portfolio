"use client";

import dynamic from "next/dynamic";

const WovenCanvas = dynamic(
  () => import("@/components/ui/woven-canvas").then((m) => m.WovenCanvas),
  { ssr: false }
);

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#000000",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* WovenCanvas Three.js interactive background */}
      <WovenCanvas />

      {/* Light overlay — just enough to read text, but canvas still glows through */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(8,8,8,0.42)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      {/* Top/bottom gradient fades */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, #000000 0%, transparent 15%, transparent 85%, #000000 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "96px 48px",
          display: "flex",
          flexDirection: "row",
          gap: "64px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Left — text */}
        <div style={{ flex: "1 1 400px", maxWidth: "560px" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "24px",
              padding: "5px 14px",
              borderRadius: "9999px",
              border: "1px solid rgba(91,79,255,0.3)",
              background: "rgba(91,79,255,0.08)",
            }}
          >
            <span style={{ fontSize: "11px", color: "#a89dff", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>
              About Me
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3rem)",
              fontWeight: 900,
              color: "#FAFAFA",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              fontFamily: "'Space Grotesk', sans-serif",
              margin: 0,
            }}
          >
            Turning ideas into
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #5B4FFF 0%, #a89dff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              working systems
            </span>
          </h2>

          <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "18px" }}>
            <p style={{ fontSize: "0.95rem", color: "rgba(250,250,250,0.55)", lineHeight: 1.8, fontFamily: "'Inter', sans-serif", margin: 0 }}>
              I&apos;m a <strong style={{ color: "#FAFAFA", fontWeight: 600 }}>Full Stack Developer</strong> specializing
              in building dynamic and functional web applications. I work as a freelance developer helping
              students create their capstone website projects, turning their ideas into fully working systems.
            </p>
            <p style={{ fontSize: "0.95rem", color: "rgba(250,250,250,0.55)", lineHeight: 1.8, fontFamily: "'Inter', sans-serif", margin: 0 }}>
              I also develop custom game servers, particularly in{" "}
              <strong style={{ color: "#FAFAFA", fontWeight: 600 }}>GTA SA-MP</strong>, where I focus on creating
              optimized and realistic multiplayer experiences.
            </p>
          </div>

          {/* Feature cards */}
          <div style={{ marginTop: "36px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { icon: "⚡", title: "Fast Delivery", desc: "Clean code shipped on schedule" },
              { icon: "🎯", title: "Detail Oriented", desc: "Pixel-perfect implementation" },
              { icon: "🔧", title: "Full Stack", desc: "Frontend + Backend + DB" },
              { icon: "🎮", title: "Game Dev", desc: "SA-MP server scripting" },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  transition: "border-color 0.3s, background 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(91,79,255,0.3)";
                  el.style.background = "rgba(91,79,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                  el.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <div style={{ fontSize: "1.4rem", marginBottom: "8px" }}>{item.icon}</div>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#FAFAFA", fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: "3px", fontFamily: "'Inter', sans-serif" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — skill card */}
        <div style={{ flex: "1 1 300px", maxWidth: "380px" }}>
          <div
            style={{
              borderRadius: "24px",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "32px",
              background: "linear-gradient(135deg, rgba(91,79,255,0.1) 0%, rgba(9,9,11,0.85) 100%)",
              boxShadow: "0 0 60px rgba(91,79,255,0.12), 0 20px 40px rgba(0,0,0,0.5)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-48px",
                right: "-48px",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                opacity: 0.18,
                background: "radial-gradient(circle, #5B4FFF 0%, transparent 70%)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(91,79,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                  👨‍💻
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FAFAFA", fontFamily: "'Space Grotesk', sans-serif" }}>Mark John Estorba</div>
                  <div style={{ fontSize: "0.72rem", color: "#a89dff", fontFamily: "'Inter', sans-serif" }}>Full Stack Developer</div>
                </div>
              </div>

              {[
                { label: "Frontend", value: "React / Next.js / Angular", pct: 90 },
                { label: "Backend", value: "Laravel / PHP", pct: 85 },
                { label: "Database", value: "MySQL / Supabase", pct: 80 },
              ].map((skill) => (
                <div key={skill.label} style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}>{skill.label}</span>
                    <span style={{ fontSize: "0.72rem", color: "#a89dff", fontFamily: "'Inter', sans-serif" }}>{skill.value}</span>
                  </div>
                  <div style={{ height: "3px", borderRadius: "9999px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: "9999px", width: `${skill.pct}%`, background: "linear-gradient(to right, #5B4FFF, #a89dff)" }} />
                  </div>
                </div>
              ))}

              <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", marginBottom: "4px", fontFamily: "'Inter', sans-serif" }}>Email</div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif" }}>emjey.estorba.02@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
