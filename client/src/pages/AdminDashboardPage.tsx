import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminListAttempts, adminSetQuizStatus, getQuizStatus } from "../lib/api";
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
  const [quizOpen, setQuizOpen] = useState(false);
  const [attempts, setAttempts] = useState<
    Array<{
      id: string;
      email: string;
      teamName: string;
      teamLeaderName: string;
      contactNumber: string;
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
        const [attRes, statusRes] = await Promise.all([adminListAttempts(), getQuizStatus()]);
        if (!alive) return;
        setAttempts(attRes.attempts);
        setQuizOpen(statusRes.open);
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

  async function onToggleQuiz() {
    try {
      const res = await adminSetQuizStatus(!quizOpen);
      setQuizOpen(res.open);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update quiz status");
    }
  }

  function onExportToExcel() {
    const headers = ["Team Name", "Leader Name", "Email", "Contact", "Status", "Solved Count", "Total Time (s)", "Penalty (s)", "Started", "Finished", "Attempt ID"];
    
    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      // If we just wrap everything in quotes, commas inside fields won't break columns
      return `"${str}"`;
    };

    const rows = attempts.map((a) => [
      a.teamName,
      a.teamLeaderName,
      a.email,
      a.contactNumber,
      a.status,
      a.solvedCount, // Export as integer to prevent Excel from converting fractions like '5/20' to 'May-20'
      a.totalSeconds ?? "—",
      a.penaltySeconds,
      fmt(a.startedAt),
      fmt(a.finishedAt),
      a.id
    ].map(escapeCsv));

    const csvContent = [headers.map(escapeCsv), ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `quiz_results_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <PageShell variant="center">
      <div className="container enter">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div className="brand">
          <span className="brand-dot" />
          <span>Dashboard</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className={`btn ${quizOpen ? "btn-danger" : "btn-primary"}`} onClick={onToggleQuiz}>
            {quizOpen ? "Stop Quiz" : "Launch Quiz"}
          </button>
          <button className="btn" onClick={onExportToExcel} disabled={attempts.length === 0}>
            Export to Excel
          </button>
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <h1 className="h1" style={{ fontSize: 28, margin: 0 }}>
              Attempts
            </h1>
            <p className="sub">Who logged in, how long they took (with penalties), and how many questions they solved.</p>
          </div>
          <div className="pill">
            <span style={{ fontFamily: "var(--mono)" }}>STATUS</span>
            <span className={quizOpen ? "good" : "bad"} style={{ fontFamily: "var(--mono)" }}>
              {quizOpen ? "OPEN / LIVE" : "CLOSED"}
            </span>
          </div>
        </div>
        
        {error ? (
          <div className="bad" style={{ marginTop: 12, fontFamily: "var(--mono)" }}>
            {error}
          </div>
        ) : null}
        <div style={{ overflowX: "auto", marginTop: 14 }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr style={{ textAlign: "left", color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 12 }}>
                <th style={{ padding: "10px 8px" }}>Team Name</th>
                <th style={{ padding: "10px 8px" }}>Leader</th>
                <th style={{ padding: "10px 8px" }}>Email</th>
                <th style={{ padding: "10px 8px" }}>Contact</th>
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
                  <td style={{ padding: "10px 8px" }}>{a.teamName}</td>
                  <td style={{ padding: "10px 8px" }}>{a.teamLeaderName}</td>
                  <td style={{ padding: "10px 8px" }}>{a.email}</td>
                  <td style={{ padding: "10px 8px" }}>{a.contactNumber}</td>
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
