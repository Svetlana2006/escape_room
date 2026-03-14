import crypto from "node:crypto";

export function makeSalt(bytes = 16): string {
  return crypto.randomBytes(bytes).toString("hex");
}

export async function hashPassword(password: string, saltHex: string): Promise<string> {
  const salt = Buffer.from(saltHex, "hex");
  const key = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, 32, { cost: 16384, blockSize: 8, parallelization: 1 }, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey as Buffer);
    });
  });
  return key.toString("hex");
}

export async function constantTimeEqualHex(a: string, b: string): Promise<boolean> {
  const ba = Buffer.from(a, "hex");
  const bb = Buffer.from(b, "hex");
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

