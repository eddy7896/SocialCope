import { FastifyInstance } from "fastify";
import * as nodesDb from "../db/nodes";

export async function nodeRoutes(app: FastifyInstance) {
  // GET /projects/:projectId/nodes
  app.get<{ Params: { projectId: string } }>(
    "/",
    { onRequest: [app.authenticate] },
    async (request) => {
      const nodes = await nodesDb.listNodes(request.params.projectId);
      return nodes;
    }
  );

  // POST /projects/:projectId/nodes
  app.post<{ Body: any; Params: { projectId: string } }>(
    "/",
    { onRequest: [app.authenticate] },
    async (request, reply) => {
      const { type, semanticRole, label, properties, position, size, parentId } = request.body;
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
    { onRequest: [app.authenticate] },
    async (request, reply) => {
      const node = await nodesDb.updateNode(request.params.nodeId, request.body);
      return reply.status(node ? 200 : 404).send(node || { error: "Not found" });
    }
  );

  // DELETE /projects/:projectId/nodes/:nodeId
  app.delete<{ Params: { projectId: string; nodeId: string } }>(
    "/:nodeId",
    { onRequest: [app.authenticate] },
    async (request, reply) => {
      const success = await nodesDb.deleteNode(request.params.nodeId);
      return reply.status(success ? 200 : 404).send({ success });
    }
  );
}
