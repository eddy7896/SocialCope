import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import httpProxy from '@fastify/http-proxy';
import { SERVICES } from './config';
import { authMiddleware } from './middleware/auth';

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

async function start() {
  const app = Fastify({
    logger: { level: process.env.LOG_LEVEL || 'info' },
  });

  await app.register(fastifyCors);

  // Health check
  app.get('/health', async () => ({ status: 'ok', service: 'gateway-service' }));

  // Auth routes (no auth required for register/login)
  app.register(httpProxy, {
    upstream: SERVICES.auth,
    prefix: '/auth',
  });

  // Projects routes (auth required)
  app.register(httpProxy, {
    upstream: SERVICES.canvas,
    prefix: '/projects',
    onRequest: [authMiddleware],
  });

  try {
    await app.listen({ port: PORT, host: HOST });
    app.log.info(`Gateway service listening on ${HOST}:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
