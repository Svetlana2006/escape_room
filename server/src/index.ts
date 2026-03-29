import "dotenv/config";
import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import { z } from "zod";

import { loadEnv } from "./env.js";
import { Attempt, JsonDb } from "./db.js";
import { getPublicQuiz, getQuestionById, normalizeAnswer, RANDOM_SEGMENT_SIZES, SEGMENTS, QUESTIONS } from "./quiz.js";
import { constantTimeEqualHex, hashPassword } from "./security.js";
import { signAdminToken, verifyAdminToken } from "./admin.js";

console.log("Starting server initialization...");
const env = loadEnv(process.env);
console.log(`Environment loaded. Port: ${env.PORT}`);

console.log("Initializing database...");
const db = new JsonDb(env.DATA_DIR);
console.log(`Database initialized at: ${env.DATA_DIR}`);

const app = express();
app.use(express.json({ limit: "256kb" }));
app.use(cors()); // Simplest, most permissive CORS for competition

function getSegmentQuestions(attempt: Attempt, segmentId: string) {
  let qs = QUESTIONS.filter((qq) => qq.segmentId === segmentId);
  const assignedIds = attempt.assignedQuestions?.[segmentId];
  if (assignedIds) {
    qs = qs.filter((qq) => assignedIds.includes(qq.id));
  }
  return qs;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}


app.get("/", (_req, res) => res.json({ status: "alive", service: "escape-room-quiz-api" }));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/quiz/status", (_req, res) => res.json({ open: db.isQuizOpen() }));
app.get("/api/quiz", (_req, res) => res.json(getPublicQuiz()));

app.post("/api/auth/start", (req, res) => {
  const Body = z.object({
    teamName: z.string().trim().min(1),
    teamLeaderName: z.string().trim().min(1),
    email: z.string().trim().toLowerCase().email(),
    contactNumber: z.string().trim().min(1)
  });
  const { teamName, teamLeaderName, email, contactNumber } = Body.parse(req.body);

  // Hardcoded Admin Check
  if (email === env.ADMIN_EMAIL.toLowerCase()) {
    return res.json({ kind: "admin", requiresPassword: true });
  }

  if (!db.isQuizOpen()) {
    return res.status(403).json({ error: "Quiz is not open please contact admin" });
  }

  const assignedQuestions = Object.fromEntries(
    Object.entries(RANDOM_SEGMENT_SIZES).map(([segmentId, count]) => {
      const questionIds = QUESTIONS.filter((q) => q.segmentId === segmentId).map((q) => q.id);
      return [segmentId, shuffle(questionIds).slice(0, count)];
    })
  );

  const attemptId = nanoid(12);
  const now = Date.now();
  db.upsertAttempt({
    id: attemptId,
    email,
    teamName,
    teamLeaderName,
    contactNumber,
    createdAt: now,
    status: "created",
    penaltySeconds: 0,
    assignedQuestions
  });
  return res.json({ kind: "player", attemptId });
});

app.post("/api/auth/admin", async (req, res) => {
  const Body = z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(1) });
  const { email, password } = Body.parse(req.body);

  if (email !== env.ADMIN_EMAIL.toLowerCase()) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  if (!env.ADMIN_PASSWORD_SALT || !env.ADMIN_PASSWORD_HASH) {
    return res.status(500).json({ error: "Admin password not configured on server" });
  }

  const computed = await hashPassword(password, env.ADMIN_PASSWORD_SALT);
  const ok = await constantTimeEqualHex(computed, env.ADMIN_PASSWORD_HASH);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = signAdminToken(env);
  return res.json({ token });
});

app.get("/api/attempts/:attemptId", (req, res) => {
  const Params = z.object({ attemptId: z.string().min(1) });
  const { attemptId } = Params.parse(req.params);
  const attempt = db.getAttempt(attemptId);
  if (!attempt) return res.status(404).json({ error: "Attempt not found" });
  const answers = db.getAnswersForAttempt(attemptId);

  const solvedQuestionIds = new Set(answers.filter((a) => a.correct).map((a) => a.questionId));
  const solvedBySegment = Object.fromEntries(
    SEGMENTS.map((s) => {
      const qs = getSegmentQuestions(attempt, s.id);
      return [
        s.id,
        qs.filter((qq) => solvedQuestionIds.has(qq.id)).length
      ];
    })
  );

  return res.json({
    attempt,
    answers,
    solvedCount: solvedQuestionIds.size,
    solvedBySegment
  });
});

app.post("/api/attempts/:attemptId/start", (req, res) => {
  if (!db.isQuizOpen()) {
    return res.status(403).json({ error: "Quiz is not open please contact admin" });
  }
  const Params = z.object({ attemptId: z.string().min(1) });
  const { attemptId } = Params.parse(req.params);
  const attempt = db.getAttempt(attemptId);
  if (!attempt) return res.status(404).json({ error: "Attempt not found" });
  if (!attempt.startedAt) {
    attempt.startedAt = Date.now();
    attempt.status = "in_progress";
    db.upsertAttempt(attempt);
  }
  return res.json({ attempt });
});

app.post("/api/attempts/:attemptId/hint", (req, res) => {
  const Params = z.object({ attemptId: z.string().min(1) });
  const Body = z.object({ segmentId: z.string().min(1), questionId: z.string().min(1) });
  const { attemptId } = Params.parse(req.params);
  const { segmentId, questionId } = Body.parse(req.body);
  const attempt = db.getAttempt(attemptId);
  if (!attempt) return res.status(404).json({ error: "Attempt not found" });
  if (!attempt.startedAt) return res.status(409).json({ error: "Quiz not started" });
  if (segmentId === "logic") return res.status(409).json({ error: "Hints are disabled for the Logic segment" });

  const question = getQuestionById(questionId);
  if (!question || question.segmentId !== segmentId) return res.status(404).json({ error: "Question not found" });

  const existing = db.getAnswer(attemptId, questionId);
  if (existing?.hintUsed) {
    return res.json({ hint: question.hint, hintsUsedInSegment: db.countHintUsed(attemptId, segmentId), penaltySeconds: attempt.penaltySeconds });
  }

  const used = db.countHintUsed(attemptId, segmentId);
  if (used >= 2) return res.status(409).json({ error: "Hint limit reached for this segment" });

  attempt.penaltySeconds += 60;
  db.upsertAttempt(attempt);
  db.upsertAnswer({
    attemptId,
    segmentId,
    questionId,
    normalizedAnswer: existing?.normalizedAnswer ?? "",
    correct: existing?.correct ?? false,
    answeredAt: existing?.answeredAt ?? Date.now(),
    hintUsed: true
  });

  return res.json({ hint: question.hint, hintsUsedInSegment: used + 1, penaltySeconds: attempt.penaltySeconds });
});

app.post("/api/attempts/:attemptId/answer", (req, res) => {
  const Params = z.object({ attemptId: z.string().min(1) });
  const Body = z.object({ segmentId: z.string().min(1), questionId: z.string().min(1), answer: z.string().default("") });
  const { attemptId } = Params.parse(req.params);
  const { segmentId, questionId, answer } = Body.parse(req.body);

  const attempt = db.getAttempt(attemptId);
  if (!attempt) return res.status(404).json({ error: "Attempt not found" });
  if (!attempt.startedAt) return res.status(409).json({ error: "Quiz not started" });
  if (attempt.status === "completed" || attempt.status === "abandoned") return res.status(409).json({ error: "Attempt already finished" });

  const question = getQuestionById(questionId);
  if (!question || question.segmentId !== segmentId) return res.status(404).json({ error: "Question not found" });

  const normalized = normalizeAnswer(answer);
  const expected = normalizeAnswer(question.answer);
  const correct = normalized === expected;
  const prev = db.getAnswer(attemptId, questionId);
  const hintUsed = prev?.hintUsed ?? false;

  db.upsertAnswer({
    attemptId,
    segmentId,
    questionId,
    normalizedAnswer: normalized,
    correct,
    answeredAt: Date.now(),
    hintUsed
  });

  const answers = db.getAnswersForAttempt(attemptId);
  const solvedQuestionIds = new Set(answers.filter((a) => a.correct).map((a) => a.questionId));
  const segmentQuestions = getSegmentQuestions(attempt, segmentId);
  const segmentSolved = segmentQuestions.filter((qq) => solvedQuestionIds.has(qq.id)).length;
  const segmentCompleted = segmentSolved === segmentQuestions.length;

  const allCompleted = SEGMENTS.every((s) => {
    const qs = getSegmentQuestions(attempt, s.id);
    const solved = qs.filter((qq) => solvedQuestionIds.has(qq.id)).length;
    return solved === qs.length;
  });

  if (allCompleted) {
    attempt.status = "completed";
    attempt.finishedAt = Date.now();
    db.upsertAttempt(attempt);
  }

  return res.json({
    correct,
    segmentCompleted,
    allCompleted,
    attempt,
    solvedCount: solvedQuestionIds.size
  });
});

app.post("/api/attempts/:attemptId/finish", (req, res) => {
  const Params = z.object({ attemptId: z.string().min(1) });
  const Body = z.object({ status: z.enum(["abandoned", "completed"]) });
  const { attemptId } = Params.parse(req.params);
  const { status } = Body.parse(req.body);

  const attempt = db.getAttempt(attemptId);
  if (!attempt) return res.status(404).json({ error: "Attempt not found" });

  if (!attempt.finishedAt) attempt.finishedAt = Date.now();
  attempt.status = status;
  db.upsertAttempt(attempt);
  return res.json({ attempt });
});

app.get("/api/admin/attempts", (req, res) => {
  const auth = req.header("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice("Bearer ".length) : "";
  try {
    verifyAdminToken(env, token);
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const now = Date.now();
  const payload = db.listAttempts().map((a) => {
    const answers = db.getAnswersForAttempt(a.id);
    const solved = answers.filter((x) => x.correct).length;
    const startedAt = a.startedAt ?? null;
    const finishedAt = a.finishedAt ?? null;
    const baseSeconds =
      startedAt == null ? null : Math.max(0, Math.floor(((finishedAt ?? now) - startedAt) / 1000));
    const totalSeconds = baseSeconds == null ? null : baseSeconds + a.penaltySeconds;
    return {
      id: a.id,
      email: a.email,
      teamName: a.teamName,
      teamLeaderName: a.teamLeaderName,
      contactNumber: a.contactNumber,
      status: a.status,
      createdAt: a.createdAt,
      startedAt,
      finishedAt,
      penaltySeconds: a.penaltySeconds,
      baseSeconds,
      totalSeconds,
      solvedCount: solved
    };
  });

  return res.json({ attempts: payload });
});

app.post("/api/admin/quiz/status", (req, res) => {
  const auth = req.header("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice("Bearer ".length) : "";
  try {
    verifyAdminToken(env, token);
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const Body = z.object({ open: z.boolean() });
  const { open } = Body.parse(req.body);
  db.setQuizOpen(open);
  return res.json({ open: db.isQuizOpen() });
});

const HOST = "0.0.0.0";
app.listen(env.PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://${HOST}:${env.PORT}`);
});
