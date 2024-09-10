import * as crypto from "crypto";

var key = "H98zM6i/55yNJfkFsbu0HrzlFo17FtR9";
var iv = key.slice(0, 16);
// Function to encrypt a string using AES-256 encryption
export function encryptString(plaintext: string) {
  var key: string = "H98zM6i/55yNJfkFsbu0HrzlFo17FtR9";
  var iv = key.slice(0, 16);
  var cipher = crypto.createCipheriv("aes256", key, iv);
  var result = cipher.update(plaintext, "utf8", "base64");
  result += cipher.final("base64");
  return result;
}

// Function to decrypt a string using AES-256 decryption
export function decryptString(ciphertext: string, key: string = "hello") {
  const finalKey = crypto
    .createHash("sha256")
    .update(String(key))
    .digest("base64")
    .substr(0, 32);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(ciphertext, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
