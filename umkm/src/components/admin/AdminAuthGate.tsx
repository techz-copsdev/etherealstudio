"use client";

import { useEffect, useState } from "react";
import { config } from "@/config/app.config";

const STORAGE_KEY = "umkm-admin-auth";

interface Props {
  children: React.ReactNode;
}

/**
 * Lightweight admin gate. Compares an access code stored in localStorage
 * against `config.admin.accessCode`. NOT real auth — it just keeps casual
 * users out of admin pages on a self-hosted/demo deploy. For production,
 * front this with a reverse proxy / SSO.
 */
export function AdminAuthGate({ children }: Props) {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && stored === config.admin.accessCode) {
        setAuthed(true);
      }
    } catch {
      // ignore
    }
    setChecked(true);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code === config.admin.accessCode) {
      try {
        window.localStorage.setItem(STORAGE_KEY, code);
      } catch {
        // ignore — auth still works for this session
      }
      setAuthed(true);
      setError(null);
    } else {
      setError("Kode admin salah.");
    }
  }

  function handleLogout() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setAuthed(false);
    setCode("");
  }

  if (!checked) return null;

  if (!authed) {
    return (
      <div className="section">
        <div className="container">
          <div className="card" style={{ maxWidth: 420, margin: "0 auto" }}>
            <h2>Login Admin</h2>
            <p className="muted small">
              Masukkan kode akses admin. Bukan login user — hanya gate
              ringan untuk halaman admin.
            </p>
            <form onSubmit={handleSubmit} className="stack-tight">
              <label htmlFor="code">Kode akses</label>
              <input
                id="code"
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                autoFocus
              />
              {error && <div className="small" style={{ color: "#B91C1C" }}>{error}</div>}
              <button type="submit" className="btn btn-block">Masuk</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      <div className="container" style={{ paddingTop: 16, paddingBottom: 24 }}>
        <button className="btn btn-ghost small" onClick={handleLogout}>
          Logout admin
        </button>
      </div>
    </>
  );
}
