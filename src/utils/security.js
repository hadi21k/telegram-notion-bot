const crypto = require("crypto");

function encrypt(data) {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.ENCRYPTION_KEY, "hex"),
    iv
  );

  let encryptedData = cipher.update(data, "utf-8", "hex");
  encryptedData += cipher.final("hex");

  const encryptedDataWithIV = iv.toString("hex") + encryptedData;

  return encryptedDataWithIV;
}

function decrypt(encryptedDataWithIV) {
  const extractedIV = Buffer.from(encryptedDataWithIV.slice(0, 32), "hex");

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.ENCRYPTION_KEY, "hex"),
    extractedIV
  );

  let decryptedData = decipher.update(
    encryptedDataWithIV.slice(32),
    "hex",
    "utf-8"
  );
  decryptedData += decipher.final("utf-8");

  return decryptedData;
}

module.exports = { encrypt, decrypt };
