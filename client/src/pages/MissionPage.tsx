import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAttempt, startAttempt } from "../lib/api";
import { clearAttempt, readPersisted } from "../lib/storage";
import RulesButton from "../components/RulesButton";
import PageShell from "../components/PageShell";

export default function MissionPage() {
  const nav = useNavigate();
  const persisted = useMemo(() => readPersisted(), []);
  const attemptId = persisted.attemptId;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState(persisted.email ?? "");

  useEffect(() => {
    if (!attemptId) nav("/");
  }, [attemptId, nav]);

  useEffect(() => {
    if (!attemptId) return;
    (async () => {
      try {
        const st = await getAttempt(attemptId);
        setEmail(st.attempt.email);
      } catch {
        clearAttempt();
        nav("/");
      }
    })();
  }, [attemptId, nav]);

  async function onContinue() {
    if (!attemptId) return;
    setBusy(true);
    setError(null);
    try {
      await startAttempt(attemptId);
      nav("/quiz/general");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell variant="center">
      <div className="container enter">
        <RulesButton />
        <div className="brand">
          <span className="brand-dot" />
          <span>Mission Briefing</span>
        </div>
        <div className="panel card" style={{ marginTop: 18 }}>
          <h1 className="h1">Your mission</h1>
          <p className="sub">
            Agent <span style={{ fontFamily: "var(--mono)" }}>{email}</span>, should you choose to accept it, is to solve
            the following segments. Each segment contains five locks. Only a fully unlocked segment grants access to the
            next.
          </p>
          <div className="panel-soft card" style={{ marginTop: 14 }}>
            <div className="label">Protocol</div>
            <div className="muted" style={{ marginTop: 10, lineHeight: 1.8 }}>
              Stopwatch begins when Segment 1 appears. Hints add <span className="warn">+1 minute</span> penalty. Only{" "}
              <span className="warn">2 hints</span> per segment.
            </div>
          </div>
          {error ? (
            <div className="bad" style={{ marginTop: 12, fontFamily: "var(--mono)" }}>
              {error}
            </div>
          ) : null}
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button className="btn btn-primary" onClick={onContinue} disabled={busy}>
              {busy ? "Initializing…" : "Continue"}
            </button>
            <button
              className="btn"
              onClick={() => {
                clearAttempt();
                nav("/");
              }}
              disabled={busy}
            >
              Use different email
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
