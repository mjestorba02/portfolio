"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { Card3D } from "@/components/ui/card-3d";
import { supabase, type Project } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useEmblaCarousel from "embla-carousel-react";

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-4xl rounded-3xl border border-white/10 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #12121A 0%, #0A0A0F 100%)",
            boxShadow: "0 0 80px rgba(91,79,255,0.2), 0 30px 60px rgba(0,0,0,0.8)",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Image — taller, clearer */}
          {project.picture_url && (
            <div className="relative w-full overflow-hidden" style={{ height: "320px", flexShrink: 0 }}>
              <img
                src={project.picture_url}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{ objectPosition: "top center" }}
              />
              {/* Very light bottom fade only */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#12121A]" />
            </div>
          )}

          {/* Content — scrollable */}
          <div className="p-8 overflow-y-auto flex-1">
            <div className="flex items-start justify-between gap-4">
              <h3
                className="text-2xl font-black text-white tracking-tight"
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
              >
                {project.title}
              </h3>
              <button
                onClick={onClose}
                className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {project.description && (
              <div
                className="mt-5 prose prose-sm prose-invert max-w-none text-white/60 leading-relaxed modal-markdown"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.description}</ReactMarkdown>
              </div>
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5B4FFF] text-white text-sm font-semibold hover:bg-[#7B6FFF] transition-colors"
                style={{ boxShadow: "0 4px 20px rgba(91,79,255,0.4)" }}
              >
                Visit Website
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Mobile-only stories-style horizontal carousel ──────────────────────────
function MobileProjectCarousel({
  projects,
  onProjectClick,
}: {
  projects: Project[];
  onProjectClick: (p: Project) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleEmblaSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", handleEmblaSelect);
    return () => { emblaApi.off("select", handleEmblaSelect); };
  }, [emblaApi, handleEmblaSelect]);

  return (
    <div>
      {/* Embla viewport */}
      <div ref={emblaRef} style={{ overflow: "hidden", margin: "0 -24px" }}>
        <div style={{ display: "flex", gap: "12px", paddingLeft: "24px", paddingRight: "24px" }}>
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => onProjectClick(project)}
              style={{
                flexShrink: 0,
                width: "160px",
                cursor: "pointer",
              }}
            >
              {/* Story-style card: 3/4 aspect ratio */}
              <div
                style={{
                  position: "relative",
                  width: "160px",
                  height: "213px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "transform 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(91,79,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                {/* Image */}
                {project.picture_url ? (
                  <img
                    src={project.picture_url}
                    alt={project.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, rgba(91,79,255,0.15) 0%, rgba(9,9,11,0.9) 100%)",
                    }}
                  />
                )}

                {/* Top gradient */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "48px",
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
                    pointerEvents: "none",
                  }}
                />
                {/* Bottom gradient + title */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "10px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                    paddingTop: "32px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "#FAFAFA",
                      fontFamily: "'Space Grotesk', sans-serif",
                      lineHeight: 1.3,
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {project.title}
                  </p>
                </div>

                {/* Purple glow badge on hover */}
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#5B4FFF",
                    boxShadow: "0 0 6px rgba(91,79,255,0.8)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      {projects.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "16px" }}>
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              style={{
                width: i === selectedIndex ? "16px" : "6px",
                height: "6px",
                borderRadius: "9999px",
                background: i === selectedIndex ? "#5B4FFF" : "rgba(255,255,255,0.2)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 0.3s, background 0.3s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data: featured } = await supabase
        .from("projects")
        .select("*")
        .eq("featured", true)
        .order("featured_order", { ascending: true })
        .limit(5);

      const { data: all } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      setFeaturedProjects(featured || []);
      setAllProjects(all || []);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  // Strip markdown syntax and collapse newlines for card preview
  const stripMarkdown = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/#{1,6}\s/g, "")
      .replace(/\n\s*[-*]\s/g, " · ")
      .replace(/\n{2,}/g, " — ")
      .replace(/\n/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();

  const featuredItems: CardStackItem[] = featuredProjects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description ? stripMarkdown(p.description).slice(0, 100) : "",
    imageSrc: p.picture_url || undefined,
  }));

  return (
    <section id="projects" style={{ position: "relative", width: "100%", background: "#000000", padding: "96px 0", overflow: "hidden" }}>
      {/* Smooth ambient glow — large, soft, centered */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "1000px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(91,79,255,0.12) 0%, rgba(91,79,255,0.04) 45%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-[#5B4FFF]/30 bg-[#5B4FFF]/10">
            <span className="text-xs text-[#a89dff] font-medium tracking-wider uppercase">
              My Work
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-white tracking-[-0.03em]"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            Featured Projects
          </h2>
          <p className="mt-3 text-white/40 text-sm max-w-md mx-auto">
            A selection of projects I&apos;ve built — drag the cards or click to explore
          </p>
        </div>

        {/* ── Desktop: CardStack ── */}
        {loading ? (
          <div className="hidden md:flex justify-center py-32">
            <div className="w-10 h-10 border-2 border-[#5B4FFF]/30 border-t-[#5B4FFF] rounded-full animate-spin" />
          </div>
        ) : featuredItems.length > 0 ? (
          <div className="hidden md:block">
            <CardStack
              items={featuredItems}
              autoAdvance
              intervalMs={3000}
              pauseOnHover
              showDots
              cardWidth={500}
              cardHeight={300}
            />
          </div>
        ) : (
          <div className="hidden md:block text-center py-20 text-white/30">No featured projects yet.</div>
        )}

        {/* ── Mobile: Stories carousel ── */}
        {loading ? (
          <div className="md:hidden flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#5B4FFF]/30 border-t-[#5B4FFF] rounded-full animate-spin" />
          </div>
        ) : featuredProjects.length > 0 ? (
          <div className="md:hidden">
            <MobileProjectCarousel
              projects={featuredProjects}
              onProjectClick={(p) => setSelectedProject(p)}
            />
          </div>
        ) : (
          <div className="md:hidden text-center py-16 text-white/30 text-sm">No projects yet.</div>
        )}

        {/* View All button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/70 text-sm font-semibold hover:border-[#5B4FFF]/50 hover:text-white hover:bg-[#5B4FFF]/10 transition-all duration-300"
          >
            View All Projects
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* All Projects Modal / Overlay */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#000000]/95 backdrop-blur-md" onClick={() => setShowAll(false)} />
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
              <div className="flex items-center justify-between mb-12">
                <h2
                  className="text-3xl font-black text-white tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
                >
                  All Projects
                </h2>
                <button
                  onClick={() => setShowAll(false)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProjects.map((project) => (
                  <div
                    key={project.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Card3D
                      imageUrl={project.picture_url || "https://placehold.co/800x600/111111/ffffff?text=Project"}
                      title={project.title}
                      description={project.description?.replace(/\*\*/g, "").replace(/\*/g, "").split("\n")[0]}
                      link={project.link}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
