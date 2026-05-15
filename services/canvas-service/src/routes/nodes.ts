import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import * as nodesDb from "../db/nodes";

async function authRequired(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.status(401).send({ error: "Unauthorized" });
  }
}

export async function nodeRoutes(app: FastifyInstance) {
  // GET /projects/:projectId/nodes
  app.get<{ Params: { projectId: string } }>(
    "/",
    { preHandler: authRequired },
    async (request) => {
      const nodes = await nodesDb.listNodes(request.params.projectId);
      return nodes;
    }
  );

  // POST /projects/:projectId/nodes
  app.post<{ Body: any; Params: { projectId: string } }>(
    "/",
    { preHandler: authRequired },
    async (request, reply) => {
      const { type, semanticRole, label, properties, position, size, parentId } = request.body as any;
      const node = await nodesDb.createNode(
        request.params.projectId,
        type,
        semanticRole,
        label,
        properties,
        position,
        size,
        parentId
      );
      return reply.status(201).send(node);
    }
  );

  // PATCH /projects/:projectId/nodes/:nodeId
  app.patch<{ Body: any; Params: { projectId: string; nodeId: string } }>(
    "/:nodeId",
    { preHandler: authRequired },
    async (request, reply) => {
      const node = await nodesDb.updateNode(request.params.nodeId, request.body as any);
      return reply.status(node ? 200 : 404).send(node || { error: "Not found" });
    }
  );

  // DELETE /projects/:projectId/nodes/:nodeId
  app.delete<{ Params: { projectId: string; nodeId: string } }>(
    "/:nodeId",
    { preHandler: authRequired },
    async (request, reply) => {
      const success = await nodesDb.deleteNode(request.params.nodeId);
      return reply.status(success ? 200 : 404).send({ success });
    }
  );
}
