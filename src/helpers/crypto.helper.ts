import * as crypto from 'crypto';
export class CryptoHelper {
  // Create hash and salt for the password using Password Based Key Derivative Function 2 (PBKDF2)
  public static hashPassword(password: string) {
    if (!password) {
      return { salt: undefined, hash: undefined };
    }
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto
      .pbkdf2Sync(password, salt, 2048, 32, 'sha512')
      .toString('base64');
    return { salt, hash };
  }

  // Verify if the stored hash and salt match the given password
  public static verifyHash(
    password: string,
    originalHash: string,
    originalSalt: string,
  ) {
    const hash = crypto
      .pbkdf2Sync(password, originalSalt, 2048, 32, 'sha512')
      .toString('base64');
    return hash === originalHash;
  }

  public static encryptBase64(text) {
    const buffer = Buffer.from(text);
    return buffer.toString('base64');
  }

  public static decryptBase64(text) {
    const buff = Buffer.from(text, 'base64');
    return buff.toString('utf8');
  }
}
