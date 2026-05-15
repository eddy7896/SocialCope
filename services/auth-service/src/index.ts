import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import { authRoutes } from './routes/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-prod';
const PORT = parseInt(process.env.PORT || '3003', 10);
const HOST = '0.0.0.0';

async function start() {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
    },
  });

  // Register plugins
  await app.register(fastifyJwt, { secret: JWT_SECRET });
  await app.register(fastifyCors);

  // Decorate app with authenticate method
  app.decorate('authenticate', async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.status(401).send({ error: 'Unauthorized' });
    }
  });

  // Register routes
  await app.register(authRoutes, { prefix: '/auth' });

  // Start server
  try {
    await app.listen({ port: PORT, host: HOST });
    app.log.info(`Auth service listening on ${HOST}:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
