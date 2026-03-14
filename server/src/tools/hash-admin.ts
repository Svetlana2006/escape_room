import "dotenv/config";
import { z } from "zod";
import { makeSalt, hashPassword } from "../security.js";

function parseArgs(argv: string[]): { password: string } {
  const idx = argv.findIndex((a) => a === "--password");
  const pw = idx >= 0 ? argv[idx + 1] : undefined;
  const Schema = z.object({ password: z.string().min(1) });
  return Schema.parse({ password: pw });
}

async function main() {
  const { password } = parseArgs(process.argv.slice(2));
  const salt = makeSalt(16);
  const hash = await hashPassword(password, salt);
  // eslint-disable-next-line no-console
  console.log(`ADMIN_PASSWORD_SALT=${salt}`);
  // eslint-disable-next-line no-console
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

