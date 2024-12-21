import crypto from "crypto";

// Replace this with your own secret key and IV
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY; // 32 bytes for AES-256
const IV = process.env.NEXT_PUBLIC_IV ; // 16 bytes for AES

export function encryptData(data) {
  try {
    const cipher = crypto.createCipheriv("aes-256-cbc", SECRET_KEY, IV);
    let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (error) {
    console.error("Encryption Error:", error.message);
    throw error;
  }
}

export function decryptData(encryptedData) {
  try {
    const decipher = crypto.createDecipheriv("aes-256-cbc", SECRET_KEY, IV);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Decryption Error:", error.message);
    throw error;
  }
}
