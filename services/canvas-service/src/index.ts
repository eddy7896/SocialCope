import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import { projectRoutes } from "./routes/projects";
import { nodeRoutes } from "./routes/nodes";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-prod";
const PORT = parseInt(process.env.PORT || "3002", 10);
const HOST = "0.0.0.0";

async function start() {
  const app = Fastify({
    logger: { level: process.env.LOG_LEVEL || "info" },
  });

  await app.register(fastifyJwt, { secret: JWT_SECRET });
  await app.register(fastifyCors);

  app.decorate("authenticate", async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.status(401).send({ error: "Unauthorized" });
    }
  });

  app.get("/health", async () => ({ status: "ok", service: "canvas-service" }));

  await app.register(projectRoutes, { prefix: "/projects" });

  app.register(
    async (app) => {
      await app.register(nodeRoutes, { prefix: "/nodes" });
    },
    { prefix: "/projects/:projectId" }
  );

  try {
    await app.listen({ port: PORT, host: HOST });
    app.log.info(`Canvas service listening on ${HOST}:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
