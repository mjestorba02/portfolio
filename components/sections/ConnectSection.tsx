"use client";

const serviceHighlights = [
  {
    title: "Project Planning",
    description: "Scope, feature list, module flow, and database structure before development starts.",
    accent: "#5B4FFF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-8 w-8 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
      </svg>
    ),
  },
  {
    title: "System Development",
    description: "Frontend screens, backend logic, authentication, dashboards, and database-backed features.",
    accent: "#0077b5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-8 w-8 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
  },
  {
    title: "Presentation Support",
    description: "Clean implementation details that are easier to explain during demos and final defense.",
    accent: "#16a34a",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-8 w-8 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5h16v10H4zM8 19h8M12 15v4" />
      </svg>
    ),
  },
  {
    title: "Revision Ready",
    description: "Built with practical structure so changes, fixes, and feature adjustments stay manageable.",
    accent: "#f59e0b",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-8 w-8 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 11-2.64-6.36M21 3v6h-6" />
      </svg>
    ),
  },
];

export default function ConnectSection() {
  return (
    <section
      id="connect"
      style={{ position: "relative", width: "100%", background: "#000000", padding: "80px 0 60px", overflow: "hidden" }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#5B4FFF]/30 bg-[#5B4FFF]/10">
          <span className="text-xs text-[#a89dff] font-medium tracking-wider uppercase">
            Workflow
          </span>
        </div>

        <h2
          className="text-4xl md:text-5xl font-black text-white tracking-[-0.03em] mb-4"
          style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
        >
          Built for Capstone Delivery
        </h2>
        <p
          className="text-white/40 text-base mb-14 max-w-xl mx-auto"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          A focused service for turning academic requirements into complete, demo-ready web systems.
        </p>

        <div
          className="rounded-3xl border border-white/5 p-8 md:p-10 mx-auto"
          style={{
            background: "linear-gradient(135deg, rgba(91,79,255,0.06) 0%, rgba(9,9,11,0.9) 100%)",
            boxShadow: "0 0 60px rgba(91,79,255,0.12), 0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {serviceHighlights.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05]"
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10"
                  style={{
                    background: `${item.accent}22`,
                    boxShadow: `0 0 24px ${item.accent}33`,
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  className="text-sm font-bold text-white"
                  style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <a
          href="#contact"
          className="mt-12 inline-flex items-center gap-2 rounded-xl bg-[#5B4FFF] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7B6FFF]"
          style={{ boxShadow: "0 4px 20px rgba(91,79,255,0.3)" }}
        >
          Send Project Inquiry
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      <div className="mt-20 text-center">
        <div className="h-px max-w-sm mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
        <p className="text-white/20 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
          © {new Date().getFullYear()} Capstone Studio. Built with Next.js & Supabase.
        </p>
      </div>
    </section>
  );
}
