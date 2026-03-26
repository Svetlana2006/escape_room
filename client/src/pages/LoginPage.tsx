import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startAuth } from "../lib/api";
import { readPersisted, writePersisted } from "../lib/storage";
import PageShell from "../components/PageShell";

export default function LoginPage() {
  const nav = useNavigate();
  const persisted = useMemo(() => readPersisted(), []);
  const [teamName, setTeamName] = useState(persisted.teamName ?? "");
  const [teamLeaderName, setTeamLeaderName] = useState(persisted.teamLeaderName ?? "");
  const [email, setEmail] = useState(persisted.email ?? "");
  const [contactNumber, setContactNumber] = useState(persisted.contactNumber ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await startAuth(teamName, teamLeaderName, email, contactNumber);
      if (res.kind === "admin") {
        writePersisted({ teamName, teamLeaderName, email, contactNumber });
        nav("/admin-login");
      } else {
        writePersisted({ teamName, teamLeaderName, email, contactNumber, attemptId: res.attemptId });
        nav("/mission");
      }
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
        <span>Competition Console</span>
      </div>
      <div className="row">
        <div className="panel card">
          <h1 className="h1">Access Portal</h1>
          <p className="sub">
            Enter your team details to receive your mission. If you are the operator, use admin credentials.
          </p>
          <form onSubmit={onSubmit}>
            <div className="field">
              <div className="label">Team Name</div>
              <input
                className="input"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Team X"
                required
              />
            </div>
            <div className="field">
              <div className="label">Team Leader Name</div>
              <input
                className="input"
                value={teamLeaderName}
                onChange={(e) => setTeamLeaderName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="field">
              <div className="label">Email</div>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                type="email"
                required
              />
            </div>
            <div className="field">
              <div className="label">Contact Number</div>
              <input
                className="input"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="9999999999"
                required
              />
            </div>
            {error ? (
              <div className="bad" style={{ marginTop: 12, fontFamily: "var(--mono)" }}>
                {error}
              </div>
            ) : null}
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button className="btn btn-primary" disabled={busy}>
                {busy ? "Verifying…" : "Continue"}
              </button>
            </div>
          </form>
        </div>
        <div className="panel-soft card">
          <div className="pill">Techy mode: ON</div>
          <h3 style={{ margin: "14px 0 6px", fontFamily: "var(--mono)" }}>Tip</h3>
          <p className="sub" style={{ fontSize: 14 }}>
            Use the rules tab during the mission. Hints are powerful, but they cost time.
          </p>
          <div style={{ marginTop: 14, padding: 14 }} className="panel-soft">
            <div className="label">Keyboard</div>
            <div className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>
              Type letters directly into the boxes. Paste works too.
            </div>
          </div>
        </div>
      </div>
      <p className="muted" style={{ marginTop: 18, fontFamily: "var(--mono)", fontSize: 12 }}>
        Note: This is a competition app. Do not reuse your personal passwords.
      </p>
      </div>
    </PageShell>
  );
}
