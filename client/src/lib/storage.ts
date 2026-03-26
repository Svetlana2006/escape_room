const KEY = "escape_room_quiz_v1";

export type Persisted = {
  teamName?: string;
  teamLeaderName?: string;
  email?: string;
  contactNumber?: string;
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
  writePersisted({
    ...cur,
    attemptId: undefined,
    email: undefined,
    teamName: undefined,
    teamLeaderName: undefined,
    contactNumber: undefined
  });
}

export function clearAdmin() {
  const cur = readPersisted();
  writePersisted({ ...cur, adminToken: undefined });
}

