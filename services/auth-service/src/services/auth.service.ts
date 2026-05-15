import bcrypt from 'bcrypt';
import { sign, verify, SignOptions } from 'jsonwebtoken';

const BCRYPT_ROUNDS = 12;
const JWT_SECRET: string = process.env.JWT_SECRET || 'dev-secret-change-in-prod';
const JWT_EXPIRY: string = process.env.JWT_EXPIRY || '7d';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(userId: string, email: string): string {
  const options: SignOptions = { expiresIn: JWT_EXPIRY };
  return sign({ userId, email }, JWT_SECRET, options);
}

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    const decoded = verify(token, JWT_SECRET) as { userId: string; email: string };
    return decoded;
  } catch (error) {
    return null;
  }
}
