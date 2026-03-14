import { readPersisted } from "./storage";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://escape-room-quiz-api.onrender.com";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {})
    }
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = (data && (data.error as string)) || `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return data as T;
}

export type PublicQuiz = {
  segments: Array<{ id: string; name: string; description: string }>;
  questions: Array<{
    id: string;
    segmentId: string;
    title: string;
    prompt: string;
    image: string;
    answerLength: number;
    hint: string;
  }>;
};

export type Attempt = {
  id: string;
  email: string;
  createdAt: number;
  startedAt?: number;
  finishedAt?: number;
  status: "created" | "in_progress" | "completed" | "abandoned";
  penaltySeconds: number;
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

export type AttemptState = {
  attempt: Attempt;
  answers: AttemptAnswer[];
  solvedCount: number;
  solvedBySegment: Record<string, number>;
};

export async function startAuth(email: string) {
  return request<{ kind: "admin"; requiresPassword: true } | { kind: "player"; attemptId: string }>("/api/auth/start", {
    method: "POST",
    body: JSON.stringify({ email })
  });
}

export async function adminLogin(email: string, password: string) {
  return request<{ token: string }>("/api/auth/admin", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
}

export async function getQuiz() {
  return request<PublicQuiz>("/api/quiz");
}

export async function getAttempt(attemptId: string) {
  return request<AttemptState>(`/api/attempts/${encodeURIComponent(attemptId)}`);
}

export async function startAttempt(attemptId: string) {
  return request<{ attempt: Attempt }>(`/api/attempts/${encodeURIComponent(attemptId)}/start`, {
    method: "POST",
    body: "{}"
  });
}

export async function useHint(attemptId: string, segmentId: string, questionId: string) {
  return request<{ hint: string; hintsUsedInSegment: number; penaltySeconds: number }>(
    `/api/attempts/${encodeURIComponent(attemptId)}/hint`,
    {
      method: "POST",
      body: JSON.stringify({ segmentId, questionId })
    }
  );
}

export async function submitAnswer(attemptId: string, segmentId: string, questionId: string, answer: string) {
  return request<{
    correct: boolean;
    segmentCompleted: boolean;
    allCompleted: boolean;
    attempt: Attempt;
    solvedCount: number;
  }>(`/api/attempts/${encodeURIComponent(attemptId)}/answer`, {
    method: "POST",
    body: JSON.stringify({ segmentId, questionId, answer })
  });
}

export async function finishAttempt(attemptId: string, status: "abandoned" | "completed") {
  return request<{ attempt: Attempt }>(`/api/attempts/${encodeURIComponent(attemptId)}/finish`, {
    method: "POST",
    body: JSON.stringify({ status })
  });
}

export async function adminListAttempts() {
  const { adminToken } = readPersisted();
  return request<{
    attempts: Array<{
      id: string;
      email: string;
      status: string;
      createdAt: number;
      startedAt: number | null;
      finishedAt: number | null;
      penaltySeconds: number;
      baseSeconds: number | null;
      totalSeconds: number | null;
      solvedCount: number;
    }>;
  }>("/api/admin/attempts", {
    headers: {
      authorization: adminToken ? `Bearer ${adminToken}` : ""
    }
  });
}

