import { useEffect, useMemo, useState } from "react";
import { formatClock } from "../lib/time";

export default function Stopwatch({
  startedAt,
  finishedAt,
  penaltySeconds
}: {
  startedAt?: number;
  finishedAt?: number;
  penaltySeconds: number;
}) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!startedAt) return;
    if (finishedAt) return;
    const t = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(t);
  }, [startedAt, finishedAt]);

  const totalSeconds = useMemo(() => {
    if (!startedAt) return 0;
    const end = finishedAt ?? now;
    const base = Math.max(0, (end - startedAt) / 1000);
    return base + penaltySeconds;
  }, [startedAt, finishedAt, now, penaltySeconds]);

  return (
    <div className="top-float top-right">
      <div className="pill" title="Stopwatch (includes hint penalties)">
        <span style={{ fontFamily: "var(--mono)", color: "var(--muted)" }}>TIME</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 14, letterSpacing: "0.06em" }}>{formatClock(totalSeconds)}</span>
        {penaltySeconds > 0 ? (
          <span style={{ fontFamily: "var(--mono)", color: "var(--warn)" }}>+{formatClock(penaltySeconds)}</span>
        ) : null}
      </div>
    </div>
  );
}

