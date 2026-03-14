import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.coerce.number().default(8787),
  DATA_DIR: z.string().default("./data"),
  JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 chars"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD_SALT: z.string().optional(),
  ADMIN_PASSWORD_HASH: z.string().optional()
});

export type Env = z.infer<typeof EnvSchema>;

export function loadEnv(raw: Record<string, string | undefined>): Env {
  const parsed = EnvSchema.safeParse(raw);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Invalid server env:\n${msg}`);
  }
  return parsed.data;
}
