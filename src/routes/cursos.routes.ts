import { Router } from "express";
import { getRepository } from "typeorm";

import CursosController from "../app/controllers/CursosController";
import Cursos from "../app/models/Cursos";

const cursosRouter = Router();

cursosRouter.post("/", async (request, response) => {
  try {
    const { nome, carga_horaria } = request.body;

    const cursosController = new CursosController();

    const user = await cursosController.store({
      nome,
      carga_horaria,
    });
    return response.json(user);
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});
cursosRouter.get("/", async (request, response) => {
  const cursosRepositorio = getRepository(Cursos);
  const user = await cursosRepositorio.find();

  return response.json(user);
});

cursosRouter.get("/:id", async (request, response) => {
  const cursosrepositorio = getRepository(Cursos);
  const { id } = request.params;
  const user = await cursosrepositorio.findOne(id);
  return response.json(user);
});

cursosRouter.delete("/:id", async (request, response) => {
  const cursosRepositorio = getRepository(Cursos);
  const { id } = request.params;
  await cursosRepositorio.delete(id);
  return response.send();
});

export default cursosRouter;
