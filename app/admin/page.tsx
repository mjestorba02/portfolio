"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AuthUI } from "@/components/ui/auth-fuse";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace("/admin/dashboard");
      else setChecking(false);
    });
  }, [router]);

  const handleSignIn = async (email: string, password: string) => {
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
      <div
        style={{
          minHeight: "100vh",
          background: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "2px solid rgba(91,79,255,0.25)",
            borderTopColor: "#5B4FFF",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <AuthUI
      onSignIn={handleSignIn}
      error={error}
      loading={loading}
      signInContent={{
        image: {
          src: "https://i.ibb.co/XrkdGrrv/original-ccdd6d6195fff2386a31b684b7abdd2e-removebg-preview.png",
          alt: "Admin panel",
        },
        quote: {
          text: "Manage your portfolio. Craft your story.",
          author: "MJE Portfolio Admin",
        },
      }}
    />
  );
}
