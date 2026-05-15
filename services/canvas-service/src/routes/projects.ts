import { FastifyInstance } from "fastify";
import * as projectsDb from "../db/projects";

export async function projectRoutes(app: FastifyInstance) {
  // GET /projects - list projects
  app.get("/", { onRequest: [app.authenticate] }, async (request: any) => {
    const projects = await projectsDb.listProjects(request.user.userId);
    return projects;
  });

  // POST /projects - create project
  app.post<{ Body: { name: string; description?: string } }>(
    "/",
    { onRequest: [app.authenticate] },
    async (request: any, reply) => {
      const { name, description } = request.body;
      const project = await projectsDb.createProject(request.user.userId, name, description);
      return reply.status(201).send(project);
    }
  );

  // GET /projects/:id - get project with nodes
  app.get<{ Params: { id: string } }>(
    "/:id",
    { onRequest: [app.authenticate] },
    async (request) => {
      const project = await projectsDb.getProject(request.params.id);
      if (!project) return { error: "Not found" };
      return project;
    }
  );

  // DELETE /projects/:id
  app.delete<{ Params: { id: string } }>(
    "/:id",
    { onRequest: [app.authenticate] },
    async (request, reply) => {
      const success = await projectsDb.deleteProject(request.params.id);
      return reply.status(success ? 200 : 404).send({ success });
    }
  );
}
