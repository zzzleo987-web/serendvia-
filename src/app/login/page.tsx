"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import "./login.css";

/* ── Tiny inline SVGs ── */
const Eye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Alert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/* ── Variants ── */
const card: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.08, delayChildren: 0.2 },
  },
};
const row: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const vid = useRef<HTMLVideoElement>(null);

  useEffect(() => { vid.current?.play().catch(() => {}); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setErr(data.error || "Invalid credentials");
      }
    } catch {
      setErr("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-page">
      {/* Background */}
      <div className="login-bg">
        <video ref={vid} autoPlay loop muted playsInline poster="/images/hero.png">
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="login-bg-overlay" />
      </div>

      {/* Card */}
      <motion.div className="login-card" variants={card} initial="hidden" animate="show">
        {/* Header — no logo */}
        <motion.div className="login-header" variants={row}>
          <h1 className="login-title">Sign In</h1>
          <p className="login-subtitle">Access your account</p>
        </motion.div>

        <form onSubmit={submit} className="login-form">
          {/* Username */}
          <motion.div className="login-field" variants={row}>
            <label className="login-label" htmlFor="lu">Username</label>
            <div className="login-input-wrap">
              <input
                id="lu"
                type="text"
                className="login-input"
                placeholder="Enter username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div className="login-field" variants={row}>
            <label className="login-label" htmlFor="lp">Password</label>
            <div className="login-input-wrap">
              <input
                id="lp"
                type={show ? "text" : "password"}
                className="login-input"
                placeholder="Enter password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
                autoComplete="current-password"
                style={{ paddingRight: "2.5rem" }}
              />
              <button type="button" className="login-eye" onClick={() => setShow(!show)} aria-label="Toggle password">
                {show ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </motion.div>

          {/* Remember / Forgot */}
          <motion.div className="login-options" variants={row}>
            <label className="login-remember" onClick={() => setRemember(!remember)}>
              <span className={`login-check ${remember ? "on" : ""}`}><Check /></span>
              <span>Remember me</span>
            </label>
            <button type="button" className="login-forgot">Forgot?</button>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {err && (
              <motion.div
                className="login-error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Alert /><span>{err}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.div variants={row}>
            <motion.button
              type="submit"
              disabled={busy}
              className="login-btn"
              whileHover={!busy ? { scale: 1.01 } : {}}
              whileTap={!busy ? { scale: 0.98 } : {}}
            >
              <span className="login-btn-inner">
                {busy ? <><span className="login-spinner" /> Signing in…</> : "Sign In"}
              </span>
            </motion.button>
          </motion.div>
        </form>

        {/* Divider */}
        <motion.div className="login-divider" variants={row}>
          <span /><span className="login-divider-label">or</span><span />
        </motion.div>

        {/* Footer */}
        <motion.div className="login-footer" variants={row}>
          <p>No account? <a href="#">Register</a></p>
        </motion.div>
      </motion.div>
    </div>
  );
}
