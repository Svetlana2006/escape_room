const KEY = "escape_room_quiz_v1";

export type Persisted = {
  email?: string;
  attemptId?: string;
  adminToken?: string;
};

export function readPersisted(): Persisted {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Persisted;
  } catch {
    return {};
  }
}

export function writePersisted(update: Partial<Persisted>) {
  const cur = readPersisted();
  const next = { ...cur, ...update };
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearAttempt() {
  const cur = readPersisted();
  writePersisted({ ...cur, attemptId: undefined, email: undefined });
}

export function clearAdmin() {
  const cur = readPersisted();
  writePersisted({ ...cur, adminToken: undefined });
}

