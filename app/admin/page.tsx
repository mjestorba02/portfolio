"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace("/admin/dashboard");
      else setChecking(false);
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.replace("/admin/dashboard");
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#5B4FFF]/30 border-t-[#5B4FFF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] flex">
      {/* Left — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Logo / brand */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#5B4FFF] flex items-center justify-center">
                <span className="text-white text-sm font-bold">M</span>
              </div>
              <span
                className="text-white font-bold text-lg tracking-tight"
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
              >
                Portfolio Admin
              </span>
            </div>
            <h1
              className="text-3xl font-black text-white tracking-tight"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              Welcome back
            </h1>
            <p className="text-white/40 text-sm mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              Sign in to manage your portfolio
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                className="block text-xs text-white/40 mb-2 font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#5B4FFF]/60 focus:bg-[#5B4FFF]/5 transition-all"
                autoComplete="email"
              />
            </div>

            <div>
              <label
                className="block text-xs text-white/40 mb-2 font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-white/[0.03] border border-white/8 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#5B4FFF]/60 focus:bg-[#5B4FFF]/5 transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#5B4FFF] text-white text-sm font-semibold hover:bg-[#7B6FFF] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mt-2"
              style={{ boxShadow: "0 4px 20px rgba(91,79,255,0.3)" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <a
              href="/"
              className="text-xs text-white/30 hover:text-white/50 transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              ← Back to portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Right — decorative panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0D0D1A 0%, #000000 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at 60% 40%, #5B4FFF 0%, transparent 60%)",
          }}
        />
        {/* SVG grain */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          <filter id="admin-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#admin-grain)" />
        </svg>

        <div className="relative z-10 text-center px-12">
          <div
            className="text-6xl font-black text-white tracking-[-0.04em] mb-4"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            Admin
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #5B4FFF 0%, #a89dff 100%)" }}
            >
              Panel
            </span>
          </div>
          <p className="text-white/30 text-sm max-w-xs mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Manage your projects, view contact messages, and keep your portfolio up to date.
          </p>
        </div>
      </div>
    </div>
  );
}
