import { FastifyInstance } from 'fastify';
import * as authService from '../services/auth.service';
import * as usersDb from '../db/users';
import { RegisterSchema, LoginSchema } from '../schemas/auth.schema';

export async function authRoutes(app: FastifyInstance) {
  // Register
  app.post<{ Body: { email: string; password: string } }>('/register', async (request, reply) => {
    try {
      const { email, password } = RegisterSchema.parse(request.body);

      // Check if user exists
      const existingUser = await usersDb.findByEmail(email);
      if (existingUser) {
        return reply.status(409).send({ error: 'User already exists' });
      }

      // Hash password
      const passwordHash = await authService.hashPassword(password);

      // Create user
      const user = await usersDb.createUser(email, passwordHash);

      return reply.status(201).send({
        id: user.id,
        email: user.email,
      });
    } catch (error: any) {
      app.log.error(error);
      return reply.status(400).send({ error: error.message });
    }
  });

  // Login
  app.post<{ Body: { email: string; password: string } }>('/login', async (request, reply) => {
    try {
      const { email, password } = LoginSchema.parse(request.body);

      // Find user
      const user = await usersDb.findByEmail(email);
      if (!user) {
        return reply.status(401).send({ error: 'Invalid credentials' });
      }

      // Check password
      const validPassword = await authService.comparePassword(password, user.password_hash);
      if (!validPassword) {
        return reply.status(401).send({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = authService.signToken(user.id, user.email);

      return reply.send({
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error: any) {
      app.log.error(error);
      return reply.status(400).send({ error: error.message });
    }
  });

  // Get current user (requires auth)
  app.get<{ Reply: any }>('/me', { onRequest: [app.authenticate] }, async (request, reply) => {
    try {
      const user = await usersDb.findById((request.user as any).userId);
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }

      return reply.send({
        id: user.id,
        email: user.email,
      });
    } catch (error: any) {
      app.log.error(error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Health check
  app.get('/health', async () => {
    return { status: 'ok', service: 'auth-service' };
  });
}
