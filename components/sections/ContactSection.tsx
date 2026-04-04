"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase.from("contacts").insert([form]);
    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <section id="contact" style={{ position: "relative", width: "100%", background: "#000000", padding: "96px 0", overflow: "hidden" }}>
      {/* Background glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-15"
        style={{ background: "radial-gradient(ellipse, #5B4FFF 0%, transparent 70%)" }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — heading */}
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#5B4FFF]/30 bg-[#5B4FFF]/10">
              <span className="text-xs text-[#a89dff] font-medium tracking-wider uppercase">
                Contact
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-white leading-tight tracking-[-0.03em]"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              Let&apos;s Build
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #5B4FFF 0%, #a89dff 100%)",
                }}
              >
                Something Together
              </span>
            </h2>
            <p
              className="mt-6 text-base text-white/50 leading-relaxed max-w-md"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Have a project in mind? Need a capstone system, a custom web app, or just want to chat?
              Send me a message and I&apos;ll get back to you.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#5B4FFF]/15 flex items-center justify-center text-[#a89dff]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-white/30 mb-0.5">Email</div>
                  <a href="mailto:emjey.estorba.02@gmail.com" className="text-sm text-white/70 hover:text-white transition-colors">
                    emjey.estorba.02@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#5B4FFF]/15 flex items-center justify-center text-[#a89dff]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-white/30 mb-0.5">Location</div>
                  <div className="text-sm text-white/70">Philippines</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div
            className="rounded-3xl border border-white/5 p-8"
            style={{
              background: "linear-gradient(135deg, rgba(91,79,255,0.06) 0%, rgba(9,9,11,0.8) 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4 text-green-400 text-2xl">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/50 text-sm">I&apos;ll get back to you as soon as possible.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-[#a89dff] hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 font-medium">Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Mark John"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#5B4FFF]/50 focus:bg-[#5B4FFF]/5 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 font-medium">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#5B4FFF]/50 focus:bg-[#5B4FFF]/5 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-medium">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Project inquiry, collaboration..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#5B4FFF]/50 focus:bg-[#5B4FFF]/5 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-medium">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#5B4FFF]/50 focus:bg-[#5B4FFF]/5 transition-all resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 rounded-xl bg-[#5B4FFF] text-white text-sm font-semibold hover:bg-[#7B6FFF] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  style={{ boxShadow: "0 4px 20px rgba(91,79,255,0.3)" }}
                >
                  {status === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
