import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../lib/api";
import { readPersisted, writePersisted } from "../lib/storage";
import PageShell from "../components/PageShell";

export default function AdminLoginPage() {
  const nav = useNavigate();
  const persisted = useMemo(() => readPersisted(), []);
  const [email] = useState(persisted.email ?? "");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) nav("/", { replace: true });
  }, [email, nav]);

  if (!email) return null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await adminLogin(email, password);
      writePersisted({ adminToken: res.token });
      nav("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell variant="center">
      <div className="container enter">
      <div className="brand">
        <span className="brand-dot" />
        <span>Operator Console</span>
      </div>
      <div className="panel card" style={{ maxWidth: 560, marginTop: 18 }}>
        <h1 className="h1">Admin Login</h1>
        <p className="sub">Restricted access. This is validated on the server.</p>
        <form onSubmit={onSubmit}>
          <div className="field">
            <div className="label">Email</div>
            <input className="input" value={email} disabled />
          </div>
          <div className="field">
            <div className="label">Password</div>
            <input
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
            />
          </div>
          {error ? (
            <div className="bad" style={{ marginTop: 12, fontFamily: "var(--mono)" }}>
              {error}
            </div>
          ) : null}
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button className="btn btn-primary" disabled={busy}>
              {busy ? "Authenticating…" : "Enter Dashboard"}
            </button>
          </div>
        </form>
      </div>
      </div>
    </PageShell>
  );
}
