import Fastify from 'fastify';

const PORT = parseInt(process.env.PORT || '3008', 10);
const HOST = '0.0.0.0';

async function start() {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
    },
  });

  app.get('/health', async () => {
    return { status: 'ok', service: 'notification-service' };
  });

  await app.listen({ port: PORT, host: HOST });
  console.log(`Notification service running on ${HOST}:${PORT}`);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
