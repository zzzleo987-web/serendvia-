"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
  });

  useEffect(() => {
    fetch("/api/admin/account")
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          username: data.username || "",
          name: data.name || "",
          password: "", // Don't pre-fill password
        });
        setFetching(false);
      })
      .catch((err) => {
        setError("Failed to load profile data.");
        setFetching(false);
      });
  }, []);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/admin/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(data.error || "Failed to update profile.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/login");
  }


  if (fetching) {
    return (
      <div className="p-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-white/20 text-xs uppercase tracking-[0.5em] animate-pulse">Initializing...</div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#02210a] mb-2 font-bold">Secure Access</p>
        <h1 className="text-3xl font-serif font-black text-white">Profile & Account</h1>
        <p className="text-sm text-white/30 mt-1">Manage your administrative credentials and session.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Status & Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 text-center relative overflow-hidden group">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#02210a]/10 border border-[#02210a]/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-500">
                <span className="text-4xl font-serif font-black text-[#02210a]">
                  {formData.name?.charAt(0) || "A"}
                </span>
              </div>
              <h2 className="text-xl font-serif font-bold text-white">{formData.name}</h2>
              <p className="text-[11px] uppercase tracking-widest text-white/30 mt-1">Global Administrator</p>
              
              <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-3">
                <div className="flex items-center justify-center gap-2 text-[10px] text-green-400 font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Active Session
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 text-[10px] text-white/40 hover:text-red-400 font-black uppercase tracking-[0.3em] transition-colors"
                >
                  Terminate Session
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 space-y-4">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-2">Audit Info</h3>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-white/20">Version</span>
              <span className="text-white/60 font-mono">v1.2.0-STABLE</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-white/20">Last Updated</span>
              <span className="text-white/60">June 2024</span>
            </div>
          </div>
        </div>

        {/* Right Col: Edit Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleUpdate} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 space-y-8">
            <div>
              <h2 className="text-lg font-serif text-white mb-6">Modify Credentials</h2>
              
              <div className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 ml-1">Display Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-[#02210a]/40 outline-none transition-all"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 ml-1">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-[#02210a]/40 outline-none transition-all"
                    placeholder="admin"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 ml-1">New Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-[#02210a]/40 outline-none transition-all"
                    placeholder="Leave blank to keep current"
                  />
                  <p className="text-[10px] text-white/20 mt-2 ml-1 italic">Security Note: Use a strong, unique password.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-4">
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/5 border border-red-500/20 rounded-xl px-5 py-3 text-red-400 text-xs"
                  >
                    {error}
                  </motion.div>
                )}
                {saved && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/5 border border-green-500/20 rounded-xl px-5 py-3 text-green-400 text-xs flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Account information successfully updated.
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#02210a] hover:bg-[#C9960C] disabled:bg-white/5 disabled:text-white/20 text-white text-[11px] font-black uppercase tracking-[0.5em] rounded-full transition-all duration-500 shadow-xl shadow-[#02210a]/10"
              >
                {loading ? "Processing..." : "Commit Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

