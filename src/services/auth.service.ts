import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { users, refreshTokens } from '../db/schema';
import { env } from '../config/env';
import { AppError } from '../utils/errors';
import type { JwtPayload } from '../middleware/auth';
import type { StringValue } from 'ms';

export async function register(email: string, password: string) {
  const existing = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (existing) throw new AppError(409, 'Email already registered', 'EMAIL_TAKEN');

  const passwordHash = await bcrypt.hash(password, env.BCRYPT_ROUNDS);
  const [user] = await db.insert(users).values({ email, passwordHash }).returning();
  if (!user) throw new AppError(500, 'Failed to create user');

  const accessToken = signAccessToken(user.id, user.role);
  const { token: refreshToken } = await createRefreshToken(user.id);
  return { user: { id: user.id, email: user.email, role: user.role }, accessToken, refreshToken };
}

export async function login(email: string, password: string) {
  const user = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (!user || !user.isActive) throw new AppError(401, 'Invalid credentials', 'INVALID_CREDENTIALS');

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new AppError(401, 'Invalid credentials', 'INVALID_CREDENTIALS');

  const accessToken = signAccessToken(user.id, user.role);
  const { token: refreshToken } = await createRefreshToken(user.id);
  return { user: { id: user.id, email: user.email, role: user.role }, accessToken, refreshToken };
}

export async function refresh(token: string) {
  const record = await db.query.refreshTokens.findFirst({
    where: eq(refreshTokens.token, token),
    with: { user: true },
  });
  if (!record || record.expiresAt < new Date()) {
    throw new AppError(401, 'Invalid or expired refresh token', 'TOKEN_INVALID');
  }

  await db.delete(refreshTokens).where(eq(refreshTokens.token, token));
  const accessToken = signAccessToken(record.user.id, record.user.role);
  const { token: newRefreshToken } = await createRefreshToken(record.user.id);
  return { accessToken, refreshToken: newRefreshToken };
}

export async function logout(token: string) {
  await db.delete(refreshTokens).where(eq(refreshTokens.token, token));
}

function signAccessToken(userId: string, role: string): string {
  return jwt.sign(
    { sub: userId, role } as Omit<JwtPayload, 'iat' | 'exp'>,
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN as StringValue },
  ) as string;
}

async function createRefreshToken(userId: string) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  const [record] = await db.insert(refreshTokens).values({ userId, token, expiresAt }).returning();
  if (!record) throw new AppError(500, 'Failed to create refresh token');
  return record;
}
