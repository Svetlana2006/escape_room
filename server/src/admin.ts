import jwt from "jsonwebtoken";
import type { Env } from "./env.js";

export type AdminClaims = {
  email: string;
  kind: "admin";
};

export function signAdminToken(env: Env): string {
  const claims: AdminClaims = { email: env.ADMIN_EMAIL, kind: "admin" };
  return jwt.sign(claims, env.JWT_SECRET, { expiresIn: "12h" });
}

export function verifyAdminToken(env: Env, token: string): AdminClaims {
  const decoded = jwt.verify(token, env.JWT_SECRET) as AdminClaims;
  if (!decoded || decoded.kind !== "admin" || decoded.email !== env.ADMIN_EMAIL) {
    throw new Error("Invalid admin token");
  }
  return decoded;
}

