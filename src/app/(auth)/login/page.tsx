"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Layers, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("signup") === "success") {
      setSuccess("Account created successfully! Please log in.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        throw new Error("Invalid email or password");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-8 sm:px-6 lg:px-8 relative overflow-hidden text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Animated Grid Mesh & Radial Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/10 via-purple-600/10 to-blue-600/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Floating Header */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <Link 
          href="/" 
          className="flex items-center gap-2 bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-xl border border-slate-800/80 hover:border-indigo-500/40 rounded-full px-4 py-2 text-xs font-bold text-slate-300 hover:text-indigo-400 transition-all duration-300 shadow-xl group active:scale-95"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-indigo-400 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[11px] font-semibold text-indigo-300">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-spin-slow" />
          Enterprise Multi-Tenant SaaS
        </div>
      </div>

      {/* Main Glassmorphic Auth Card */}
      <div className="w-full max-w-md relative z-10 my-auto">
        <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/80 relative overflow-hidden">
          {/* Top Decorative Card Highlight Line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-600/30 border border-indigo-400/30">
              <Layers className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Project LOOP
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-1">
                AI Customer Feedback Intelligence Platform
              </p>
            </div>
          </div>

          {/* Feedback Banners */}
          {error && (
            <div className="mt-4 rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-400 text-center font-medium animate-in fade-in duration-200">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-400 text-center font-medium animate-in fade-in duration-200">
              {success}
            </div>
          )}

          {/* Main Credentials Form */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail className="h-4 w-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all font-mono"
                    placeholder="admin@loop.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="h-4 w-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all font-mono"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 group relative flex w-full justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 px-4 py-3.5 text-sm font-bold text-white hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 transition-all duration-300 shadow-xl shadow-indigo-600/25 active:scale-[0.98]"
            >
              {loading ? (
                <span className="animate-pulse">Signing in...</span>
              ) : (
                <>
                  Sign In to Workspace
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400 pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <span>New tenant workspace?</span>
            <Link href="/signup" className="font-bold text-indigo-400 hover:text-indigo-300 transition">
              Register Workspace &rarr;
            </Link>
          </div>
        </div>

        {/* Footer Credit & Badges */}
        <div className="mt-6 text-center text-[11px] text-slate-500 space-y-1">
          <p>Protected by PostgreSQL Row-Level Workspace Isolation</p>
          <p className="text-[10px] text-slate-600">Project LOOP Platform v2.4 • Anthropic Claude 3.5 Sonnet</p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500 text-xs animate-pulse font-mono">
        Loading authentication...
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
