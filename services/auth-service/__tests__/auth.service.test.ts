import * as authService from '../src/services/auth.service';

describe('AuthService', () => {
  it('should hash password', async () => {
    const password = 'test-password-123';
    const hash = await authService.hashPassword(password);
    expect(hash).not.toBe(password);
    expect(hash.length).toBeGreaterThan(10);
  });

  it('should compare password with hash', async () => {
    const password = 'test-password-123';
    const hash = await authService.hashPassword(password);
    const isValid = await authService.comparePassword(password, hash);
    expect(isValid).toBe(true);
  });

  it('should reject incorrect password', async () => {
    const password = 'test-password-123';
    const hash = await authService.hashPassword(password);
    const isValid = await authService.comparePassword('wrong-password', hash);
    expect(isValid).toBe(false);
  });

  it('should sign and verify JWT token', () => {
    const userId = 'test-user-id';
    const email = 'test@example.com';
    const token = authService.signToken(userId, email);
    expect(token).toBeDefined();
    expect(token.split('.').length).toBe(3); // JWT has 3 parts

    const decoded = authService.verifyToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe(userId);
    expect(decoded?.email).toBe(email);
  });

  it('should return null for invalid token', () => {
    const decoded = authService.verifyToken('invalid.token.here');
    expect(decoded).toBeNull();
  });
});
