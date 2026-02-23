import bcrypt from 'bcrypt';
import crypto from 'crypto';

export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

export class EncryptionService {
  private readonly SALT_ROUNDS = 10;

  /**
   * Hash a plain password securely using bcrypt
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Verify a plain password against a hash
   */
  async comparePassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }

  /**
   * Generate a random cryptographically strong token (hex)
   * Useful for API keys, reset tokens, etc.
   */
  generateToken(bytes = 32): string {
    return crypto.randomBytes(bytes).toString('hex');
  }

  /**
   * Generate a random 6-digit numeric code (e.g. for 2FA/Email verification)
   */
  generateCode(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  // ─── Asymmetric Crypto (Signing & Encryption) ──────────────────────

  /**
   * Generate a generic RSA keypair for signing and encryption
   */
  generateKeyPair(): KeyPair {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });
    return { publicKey, privateKey };
  }

  /**
   * Sign data with a private key (prevents forgery)
   */
  signData(data: string, privateKey: string): string {
    const sign = crypto.createSign('SHA256');
    sign.update(data);
    sign.end();
    return sign.sign(privateKey, 'base64');
  }

  /**
   * Verify signature with a public key (proves origin & integrity)
   */
  verifySignature(data: string, signature: string, publicKey: string): boolean {
    const verify = crypto.createVerify('SHA256');
    verify.update(data);
    verify.end();
    return verify.verify(publicKey, signature, 'base64');
  }

  /**
   * Encrypt data for a specific recipient (using their Public Key)
   * Prevents eavesdropping.
   */
  encryptAsymmetric(data: string, publicKey: string): string {
    const buffer = Buffer.from(data, 'utf8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
  }

  /**
   * Decrypt data meant for you (using your Private Key)
   */
  decryptAsymmetric(encryptedBase64: string, privateKey: string): string {
    const buffer = Buffer.from(encryptedBase64, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString('utf8');
  }
}

export const encryption = new EncryptionService();
