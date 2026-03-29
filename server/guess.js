import crypto from "node:crypto";

async function hashPassword(password, saltHex) {
  const salt = Buffer.from(saltHex, "hex");
  const key = await new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 32, { cost: 16384, blockSize: 8, parallelization: 1 }, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });
  return key.toString("hex");
}

async function check() {
  const salt = 'f20c47a0cf2b576f486117aaca636c07';
  const target = 'b9aa6403195305882080b2312439fbe391c868c9aca5d8be468700d9ba0c664b';
  const words = ['admin', 'password', 'admin123', 'admin1234', 'operator', 'escape', 'room', 'svetlana', '123456', 'test', 'password123'];
  for (const w of words) {
    if (await hashPassword(w, salt) === target) {
      console.log('FOUND PWD:', w);
      return;
    }
  }
  console.log('Not found');
}
check();
