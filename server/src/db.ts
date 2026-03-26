import fs from "node:fs";
import path from "node:path";

export type AttemptStatus = "created" | "in_progress" | "completed" | "abandoned";

export type Attempt = {
  id: string;
  email: string;
  teamName: string;
  teamLeaderName: string;
  contactNumber: string;
  createdAt: number;
  startedAt?: number;
  finishedAt?: number;
  status: AttemptStatus;
  penaltySeconds: number;
  assignedQuestions?: Record<string, string[]>;
};

export type AttemptAnswer = {
  attemptId: string;
  segmentId: string;
  questionId: string;
  normalizedAnswer: string;
  correct: boolean;
  answeredAt: number;
  hintUsed: boolean;
};

export type DbShape = {
  attempts: Record<string, Attempt>;
  answers: AttemptAnswer[];
  quizOpen: boolean;
};

const EMPTY_DB: DbShape = { attempts: {}, answers: [], quizOpen: false };

export class JsonDb {
  private filePath: string;
  private data: DbShape;

  constructor(dataDir: string) {
    fs.mkdirSync(dataDir, { recursive: true });
    this.filePath = path.join(dataDir, "db.json");
    this.data = this.load();
  }

  private load(): DbShape {
    if (!fs.existsSync(this.filePath)) return structuredClone(EMPTY_DB);
    const raw = fs.readFileSync(this.filePath, "utf8");
    const parsed = JSON.parse(raw) as DbShape;
    return {
      attempts: parsed.attempts ?? {},
      answers: parsed.answers ?? [],
      quizOpen: parsed.quizOpen ?? false
    };
  }

  isQuizOpen(): boolean {
    return this.data.quizOpen;
  }

  setQuizOpen(open: boolean): void {
    this.data.quizOpen = open;
    this.persist();
  }

  private persist(): void {
    const tmp = `${this.filePath}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(this.data, null, 2), "utf8");
    fs.renameSync(tmp, this.filePath);
  }

  getAttempt(id: string): Attempt | undefined {
    return this.data.attempts[id];
  }

  upsertAttempt(attempt: Attempt): void {
    this.data.attempts[attempt.id] = attempt;
    this.persist();
  }

  listAttempts(): Attempt[] {
    return Object.values(this.data.attempts).sort((a, b) => b.createdAt - a.createdAt);
  }

  getAnswersForAttempt(attemptId: string): AttemptAnswer[] {
    return this.data.answers.filter((a) => a.attemptId === attemptId);
  }

  getAnswer(attemptId: string, questionId: string): AttemptAnswer | undefined {
    return this.data.answers.find((a) => a.attemptId === attemptId && a.questionId === questionId);
  }

  upsertAnswer(answer: AttemptAnswer): void {
    const idx = this.data.answers.findIndex((a) => a.attemptId === answer.attemptId && a.questionId === answer.questionId);
    if (idx >= 0) this.data.answers[idx] = answer;
    else this.data.answers.push(answer);
    this.persist();
  }

  countHintUsed(attemptId: string, segmentId: string): number {
    return this.data.answers.filter((a) => a.attemptId === attemptId && a.segmentId === segmentId && a.hintUsed).length;
  }
}

