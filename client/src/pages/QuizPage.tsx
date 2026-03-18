import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LetterBoxesInput from "../components/LetterBoxesInput";
import Modal from "../components/Modal";
import RulesButton from "../components/RulesButton";
import Stopwatch from "../components/Stopwatch";
import PageShell from "../components/PageShell";
import { finishAttempt, getAttempt, getQuiz, startAttempt, submitAnswer, useHint } from "../lib/api";
import { clearAttempt, readPersisted } from "../lib/storage";

function normalize(raw: string): string {
  return raw.replace(/[^a-z0-9]/gi, "").toUpperCase();
}

function segmentComplete(solved: number) {
  return solved >= 5;
}

export default function QuizPage() {
  const nav = useNavigate();
  const { segmentId } = useParams();
  const persisted = useMemo(() => readPersisted(), []);
  const attemptId = persisted.attemptId;

  const [quiz, setQuiz] = useState<Awaited<ReturnType<typeof getQuiz>> | null>(null);
  const [state, setState] = useState<Awaited<ReturnType<typeof getAttempt>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyQ, setBusyQ] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Record<string, "correct" | "wrong" | undefined>>({});
  const [hintModal, setHintModal] = useState<{ title: string; body: string } | null>(null);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  useEffect(() => {
    if (!attemptId) nav("/");
  }, [attemptId, nav]);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const [q, s] = await Promise.all([getQuiz(), attemptId ? getAttempt(attemptId) : Promise.resolve(null as never)]);
        if (!alive) return;
        setQuiz(q);
        setState(s);
        setError(null);
      } catch (err) {
        if (!alive) return;
        setError(err instanceof Error ? err.message : "Failed to load");
      }
    }
    if (attemptId) load();
    return () => {
      alive = false;
    };
  }, [attemptId]);

  useEffect(() => {
    if (!quiz) return;
    if (!segmentId) return;
    const exists = quiz.segments.some((s) => s.id === segmentId);
    if (!exists) nav("/quiz/general", { replace: true });
  }, [quiz, segmentId, nav]);

  useEffect(() => {
    if (!quiz || !state || !segmentId) return;
    const requestedIdx = quiz.segments.findIndex((s) => s.id === segmentId);
    if (requestedIdx < 0) return;
    let maxUnlocked = 0;
    for (let i = 1; i < quiz.segments.length; i++) {
      const prev = quiz.segments[i - 1].id;
      if (segmentComplete(state.solvedBySegment[prev] ?? 0)) maxUnlocked = i;
      else break;
    }
    if (requestedIdx > maxUnlocked) {
      nav(`/quiz/${quiz.segments[maxUnlocked].id}`, { replace: true });
    }
  }, [quiz, state, segmentId, nav]);

  useEffect(() => {
    if (!quiz || !state) return;
    if (state.attempt.status === "completed" || state.attempt.status === "abandoned") {
      nav("/done", { replace: true });
    }
  }, [quiz, state, nav]);

  useEffect(() => {
    if (!attemptId) return;
    if (!state) return;
    if (state.attempt.startedAt) return;
    (async () => {
      try {
        await startAttempt(attemptId);
        await refreshAttempt();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to start attempt");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId, state?.attempt.startedAt]);

  if (!quiz || !state || !segmentId) {
    return (
      <div className="container">
        <div className="brand">
          <span className="brand-dot" />
          <span>Loading</span>
        </div>
        <div className="panel card" style={{ marginTop: 18 }}>
          <div className="muted" style={{ fontFamily: "var(--mono)" }}>
            {error ?? "Initializing…"}
          </div>
        </div>
      </div>
    );
  }

  const currentSegment = quiz.segments.find((s) => s.id === segmentId)!;
  let questions = quiz.questions.filter((qq) => qq.segmentId === segmentId);
  const assignedIds = state.attempt.assignedQuestions?.[segmentId];
  if (assignedIds) {
    questions = questions.filter(qq => assignedIds.includes(qq.id));
  }
  const answerMap = new Map(state.answers.map((a) => [a.questionId, a]));
  const solvedInSegment = state.solvedBySegment[segmentId] ?? 0;
  const hintsUsedInSegment = state.answers.filter((a) => a.segmentId === segmentId && a.hintUsed).length;
  const remainingHints = Math.max(0, 2 - hintsUsedInSegment);

  const segmentIndex = quiz.segments.findIndex((s) => s.id === segmentId);
  const nextSegment = quiz.segments[segmentIndex + 1];

  const canGoToSegment = (targetId: string) => {
    const idx = quiz.segments.findIndex((s) => s.id === targetId);
    for (let i = 0; i < idx; i++) {
      const sid = quiz.segments[i].id;
      if (!segmentComplete(state.solvedBySegment[sid] ?? 0)) return false;
    }
    return true;
  };

  async function refreshAttempt() {
    if (!attemptId) return;
    const s = await getAttempt(attemptId);
    setState(s);
  }

  async function onHint(questionId: string) {
    if (!attemptId) return;
    setError(null);
    setBusyQ(questionId);
    try {
      const q = questions.find((x) => x.id === questionId)!;
      const res = await useHint(attemptId, segmentId!, questionId);
      setHintModal({ title: `Hint — ${q.title}`, body: res.hint });
      await refreshAttempt();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hint failed");
    } finally {
      setBusyQ(null);
    }
  }

  async function onSubmitAnswer(questionId: string) {
    if (!attemptId) return;
    setError(null);
    setBusyQ(questionId);
    try {
      const raw = answers[questionId] ?? "";
      const res = await submitAnswer(attemptId, segmentId!, questionId, raw);
      setResult((p) => ({ ...p, [questionId]: res.correct ? "correct" : "wrong" }));
      await refreshAttempt();
      if (res.allCompleted) nav("/done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submit failed");
    } finally {
      setBusyQ(null);
    }
  }

  async function onFinishEarly() {
    if (!attemptId) return;
    setBusyQ("finish");
    setError(null);
    try {
      await finishAttempt(attemptId, "abandoned");
      nav("/done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submit failed");
    } finally {
      setBusyQ(null);
      setConfirmSubmit(false);
    }
  }

  return (
    <PageShell variant="wide">
      <div className="container enter">
        <RulesButton />
        <Stopwatch
          startedAt={state.attempt.startedAt}
          finishedAt={state.attempt.finishedAt}
          penaltySeconds={state.attempt.penaltySeconds}
        />

      <div className="bottom-right" style={{ display: "flex", gap: "10px" }}>
        <button
          className="btn btn-primary"
          disabled={!segmentComplete(solvedInSegment) || !nextSegment}
          onClick={() => nextSegment && nav(`/quiz/${nextSegment.id}`)}
          title={!segmentComplete(solvedInSegment) ? "Solve all 5 questions to unlock next segment" : "Go next"}
        >
          {nextSegment ? "Next segment" : "Final segment"}
        </button>
        <button className="btn btn-danger" onClick={() => setConfirmSubmit(true)} disabled={busyQ === "finish"}>
          Submit Quiz
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div className="brand">
          <span className="brand-dot" />
          <span>Segment</span>
          <span style={{ color: "var(--text)" }}>{currentSegment.name}</span>
        </div>
        <div className="pill" title="Hints used in this segment">
          <span style={{ fontFamily: "var(--mono)" }}>HINTS</span>
          <span style={{ fontFamily: "var(--mono)" }}>
            {hintsUsedInSegment}/2 ({remainingHints} left)
          </span>
        </div>
      </div>

      <div className="row" style={{ gridTemplateColumns: "0.42fr 1fr", marginTop: 18 }}>
        <div className="panel card">
          <div className="label">Segments</div>
          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
            {quiz.segments.map((s) => {
              const solved = state.solvedBySegment[s.id] ?? 0;
              const done = segmentComplete(solved);
              const locked = !canGoToSegment(s.id);
              const active = s.id === segmentId;
              return (
                <button
                  key={s.id}
                  className={`btn ${active ? "btn-primary" : ""}`}
                  disabled={locked}
                  onClick={() => nav(`/quiz/${s.id}`)}
                  title={locked ? "Locked until previous segment is solved" : "Open segment"}
                  style={{ textAlign: "left", display: "flex", justifyContent: "space-between", gap: 10 }}
                >
                  <span>
                    {s.name} {done ? "✓" : ""}
                  </span>
                  <span style={{ color: "var(--muted)", fontFamily: "var(--mono)" }}>{solved}/5</span>
                </button>
              );
            })}
          </div>

          <div className="panel-soft card" style={{ marginTop: 14 }}>
            <div className="label">Description</div>
            <div className="muted" style={{ marginTop: 10, lineHeight: 1.6 }}>
              {currentSegment.description}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button
              className="btn btn-primary"
              disabled={!segmentComplete(solvedInSegment) || !nextSegment}
              onClick={() => nextSegment && nav(`/quiz/${nextSegment.id}`)}
              title={!segmentComplete(solvedInSegment) ? "Solve all 5 questions to unlock next segment" : "Go next"}
            >
              {nextSegment ? "Next segment" : "Final segment"}
            </button>
            <button
              className="btn"
              onClick={() => {
                clearAttempt();
                nav("/");
              }}
            >
              Exit
            </button>
          </div>
          {error ? (
            <div className="bad" style={{ marginTop: 12, fontFamily: "var(--mono)" }}>
              {error}
            </div>
          ) : null}
        </div>

        <div className="panel card">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "end" }}>
            <div>
              <h2 style={{ margin: 0, fontFamily: "var(--mono)" }}>{currentSegment.name}</h2>
              <p className="sub" style={{ marginTop: 6 }}>
                Solve all 5 to proceed. You can answer in any order.
              </p>
            </div>
            <div className="pill">
              <span style={{ fontFamily: "var(--mono)" }}>SOLVED</span>
              <span style={{ fontFamily: "var(--mono)" }}>
                {solvedInSegment}/5 (total {state.solvedCount}/20)
              </span>
            </div>
          </div>

          <div style={{ display: "grid", gap: 14, marginTop: 16 }}>
            {questions.map((q) => {
              const a = answerMap.get(q.id);
              const isCorrect = a?.correct ?? false;
              const hasHint = a?.hintUsed ?? false;
              const current = answers[q.id] ?? (a?.normalizedAnswer ?? "");
              const disabled = isCorrect;
              const busy = busyQ === q.id;
              const r = result[q.id];
              return (
                <div key={q.id} className="panel-soft" style={{ overflow: "hidden" }}>
                  {q.image && q.image.trim() !== "" && (
                    <img
                      src={q.image.startsWith("http") ? q.image : `/${q.image}`}
                      alt=""
                      style={{
                        width: "100%",
                        aspectRatio: "16 / 9",
                        objectFit: "cover",
                        display: "block",
                        borderBottom: "1px solid rgba(146, 175, 255, 0.14)",
                        opacity: 0.95
                      }}
                    />
                  )}
                  <div className="card">
                    <div className="brand">
                      <span className="brand-dot" />
                      <span style={{ color: "var(--text)" }}>{q.title}</span>
                    </div>
                    <div className="muted" style={{ marginTop: 10, lineHeight: 1.7 }}>
                      {q.prompt}
                    </div>

                    <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
                      <LetterBoxesInput
                        length={q.answerLength}
                        value={current}
                        disabled={disabled}
                        onChange={(v) => setAnswers((p) => ({ ...p, [q.id]: normalize(v) }))}
                      />
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <button
                          className={`btn ${isCorrect ? "" : "btn-primary"}`}
                          disabled={busy || disabled}
                          onClick={() => onSubmitAnswer(q.id)}
                        >
                          {isCorrect ? "Solved" : busy ? "Checking…" : "Submit"}
                        </button>
                        <button
                          className="btn"
                          onClick={() => onHint(q.id)}
                          disabled={busy || (remainingHints <= 0 && !hasHint)}
                        >
                          {hasHint ? "Hint used" : "Use hint (+1:00)"}
                        </button>
                        <div className="pill">
                          <span style={{ fontFamily: "var(--mono)" }}>{isCorrect ? "UNLOCKED" : "LOCKED"}</span>
                          <span className={isCorrect ? "good" : "muted"} style={{ fontFamily: "var(--mono)" }}>
                            {isCorrect ? "✓" : "—"}
                          </span>
                        </div>
                      </div>
                      {r === "wrong" ? (
                        <div className="bad" style={{ fontFamily: "var(--mono)", fontSize: 12 }}>
                          Incorrect. Try again.
                        </div>
                      ) : r === "correct" ? (
                        <div className="good" style={{ fontFamily: "var(--mono)", fontSize: 12 }}>
                          Correct.
                        </div>
                      ) : null}
                      {!isCorrect && a && a.normalizedAnswer ? (
                        <div className="muted" style={{ fontFamily: "var(--mono)", fontSize: 12 }}>
                          Last attempt recorded.
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>

      {hintModal ? (
        <Modal
          title={hintModal.title}
          onClose={() => setHintModal(null)}
          footer={
            <button className="btn btn-primary" onClick={() => setHintModal(null)}>
              Got it
            </button>
          }
        >
          <div className="panel-soft card">
            <div className="muted" style={{ lineHeight: 1.75 }}>
              {hintModal.body}
            </div>
            <div className="muted" style={{ marginTop: 12, fontFamily: "var(--mono)", fontSize: 12 }}>
              Penalty applied: <span className="warn">+1:00</span> (only 2 hints per segment)
            </div>
          </div>
        </Modal>
      ) : null}

      {confirmSubmit ? (
        <Modal
          title="Submit quiz early?"
          onClose={() => setConfirmSubmit(false)}
          footer={
            <>
              <button className="btn" onClick={() => setConfirmSubmit(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={onFinishEarly} disabled={busyQ === "finish"}>
                {busyQ === "finish" ? "Submitting…" : "Submit"}
              </button>
            </>
          }
        >
          <div className="panel-soft card">
            <div className="muted" style={{ lineHeight: 1.75 }}>
              This will end your attempt and record your current time and solved count. You cannot resume this attempt.
            </div>
          </div>
        </Modal>
      ) : null}
    </PageShell>
  );
}
