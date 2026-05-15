import { FastifyRequest, FastifyReply } from 'fastify';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    (request as any).user = decoded;
  } catch (error) {
    return reply.status(401).send({ error: 'Invalid token' });
  }
}
