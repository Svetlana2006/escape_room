import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import RulesButton from "../components/RulesButton";
import { getAttempt } from "../lib/api";
import { clearAttempt, readPersisted } from "../lib/storage";
import { formatClock } from "../lib/time";
import PageShell from "../components/PageShell";

export default function DonePage() {
  const nav = useNavigate();
  const persisted = useMemo(() => readPersisted(), []);
  const attemptId = persisted.attemptId;
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<Awaited<ReturnType<typeof getAttempt>> | null>(null);

  useEffect(() => {
    if (!attemptId) nav("/");
  }, [attemptId, nav]);

  useEffect(() => {
    if (!attemptId) return;
    (async () => {
      try {
        const s = await getAttempt(attemptId);
        setState(s);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      }
    })();
  }, [attemptId]);

  if (!attemptId) return null;

  const startedAt = state?.attempt.startedAt;
  const finishedAt = state?.attempt.finishedAt;
  const penalty = state?.attempt.penaltySeconds ?? 0;
  const baseSeconds = startedAt && finishedAt ? Math.max(0, (finishedAt - startedAt) / 1000) : null;
  const totalSeconds = baseSeconds == null ? null : baseSeconds + penalty;

  return (
    <PageShell variant="center">
      <div className="container enter">
        <RulesButton />
        <div className="brand">
          <span className="brand-dot" />
          <span>Debrief</span>
        </div>
        <div className="panel card" style={{ marginTop: 18 }}>
          <h1 className="h1">Attempt recorded</h1>
          {error ? (
            <div className="bad" style={{ marginTop: 12, fontFamily: "var(--mono)" }}>
              {error}
            </div>
          ) : null}
          {state ? (
            <div className="panel-soft card" style={{ marginTop: 14 }}>
              <div style={{ display: "grid", gap: 10 }}>
                <div className="pill">
                  <span style={{ fontFamily: "var(--mono)" }}>Status</span>
                  <span style={{ fontFamily: "var(--mono)" }}>{state.attempt.status}</span>
                </div>
                <div className="pill">
                  <span style={{ fontFamily: "var(--mono)" }}>Solved</span>
                  <span style={{ fontFamily: "var(--mono)" }}>{state.solvedCount}/20</span>
                </div>
                <div className="pill">
                  <span style={{ fontFamily: "var(--mono)" }}>Penalty</span>
                  <span style={{ fontFamily: "var(--mono)", color: "var(--warn)" }}>+{formatClock(penalty)}</span>
                </div>
                <div className="pill">
                  <span style={{ fontFamily: "var(--mono)" }}>Total</span>
                  <span style={{ fontFamily: "var(--mono)" }}>{totalSeconds == null ? "—" : formatClock(totalSeconds)}</span>
                </div>
              </div>
              <p className="sub" style={{ marginTop: 12 }}>
                You may close this tab now. The operator dashboard will show your final time and solved count.
              </p>
            </div>
          ) : (
            <p className="sub" style={{ marginTop: 14 }}>
              Loading…
            </p>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                clearAttempt();
                nav("/");
              }}
            >
              New attempt
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
