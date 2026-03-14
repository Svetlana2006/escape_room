import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminListAttempts } from "../lib/api";
import { clearAdmin, readPersisted } from "../lib/storage";
import { formatClock } from "../lib/time";
import PageShell from "../components/PageShell";

function fmt(ts: number | null) {
  if (!ts) return "—";
  return new Date(ts).toLocaleString();
}

export default function AdminDashboardPage() {
  const nav = useNavigate();
  const { adminToken } = useMemo(() => readPersisted(), []);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<
    Array<{
      id: string;
      email: string;
      status: string;
      createdAt: number;
      startedAt: number | null;
      finishedAt: number | null;
      penaltySeconds: number;
      totalSeconds: number | null;
      solvedCount: number;
    }>
  >([]);

  useEffect(() => {
    if (!adminToken) nav("/admin-login");
  }, [adminToken, nav]);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await adminListAttempts();
        if (!alive) return;
        setAttempts(res.attempts);
        setError(null);
      } catch (err) {
        if (!alive) return;
        setError(err instanceof Error ? err.message : "Failed to load");
      }
    }
    load();
    const t = setInterval(load, 5000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  return (
    <PageShell variant="center">
      <div className="container enter">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div className="brand">
          <span className="brand-dot" />
          <span>Dashboard</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="btn"
            onClick={() => {
              clearAdmin();
              nav("/");
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="panel card" style={{ marginTop: 18 }}>
        <h1 className="h1" style={{ fontSize: 28 }}>
          Attempts
        </h1>
        <p className="sub">Who logged in, how long they took (with penalties), and how many questions they solved.</p>
        {error ? (
          <div className="bad" style={{ marginTop: 12, fontFamily: "var(--mono)" }}>
            {error}
          </div>
        ) : null}
        <div style={{ overflowX: "auto", marginTop: 14 }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr style={{ textAlign: "left", color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 12 }}>
                <th style={{ padding: "10px 8px" }}>Email</th>
                <th style={{ padding: "10px 8px" }}>Status</th>
                <th style={{ padding: "10px 8px" }}>Solved</th>
                <th style={{ padding: "10px 8px" }}>Total Time</th>
                <th style={{ padding: "10px 8px" }}>Penalty</th>
                <th style={{ padding: "10px 8px" }}>Started</th>
                <th style={{ padding: "10px 8px" }}>Finished</th>
                <th style={{ padding: "10px 8px" }}>Attempt ID</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((a) => (
                <tr key={a.id} style={{ borderTop: "1px solid rgba(146, 175, 255, 0.12)" }}>
                  <td style={{ padding: "10px 8px" }}>{a.email}</td>
                  <td style={{ padding: "10px 8px", fontFamily: "var(--mono)" }}>
                    <span className={a.status === "completed" ? "good" : a.status === "abandoned" ? "bad" : "muted"}>
                      {a.status}
                    </span>
                  </td>
                  <td style={{ padding: "10px 8px", fontFamily: "var(--mono)" }}>{a.solvedCount}/20</td>
                  <td style={{ padding: "10px 8px", fontFamily: "var(--mono)" }}>
                    {a.totalSeconds == null ? "—" : formatClock(a.totalSeconds)}
                  </td>
                  <td style={{ padding: "10px 8px", fontFamily: "var(--mono)", color: "var(--warn)" }}>
                    +{formatClock(a.penaltySeconds)}
                  </td>
                  <td style={{ padding: "10px 8px" }}>{fmt(a.startedAt)}</td>
                  <td style={{ padding: "10px 8px" }}>{fmt(a.finishedAt)}</td>
                  <td style={{ padding: "10px 8px", fontFamily: "var(--mono)", color: "var(--muted)" }}>{a.id}</td>
                </tr>
              ))}
              {attempts.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: "14px 8px", color: "var(--muted)" }}>
                    No attempts yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </PageShell>
  );
}
