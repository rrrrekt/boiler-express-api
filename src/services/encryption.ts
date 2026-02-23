import bcrypt from 'bcrypt';
import crypto from 'crypto';

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
}

export const encryption = new EncryptionService();
