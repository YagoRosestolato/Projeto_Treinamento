import { Router } from "express";
import { getRepository } from "typeorm";

import TecnicosController from "../app/controllers/TecnicosController";
import Tecnicos from "../app/models/Tecnicos";

const tecnicosRouter = Router();

tecnicosRouter.post("/", async (request, response) => {
  try {
    const { nome, matricula, password } = request.body;

    const tecnicosController = new TecnicosController();

    const user = await tecnicosController.store({
      nome,
      matricula,
      password,
    });

    delete user.password;
    return response.json(user);
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});
tecnicosRouter.get("/", async (request, response) => {
  const tecnicosRepositorio = getRepository(Tecnicos);
  const user = await tecnicosRepositorio.find();

  return response.json(user);
});

tecnicosRouter.get("/:id", async (request, response) => {
  const tecnicosRepositorio = getRepository(Tecnicos);
  const { id } = request.params;
  const user = await tecnicosRepositorio.findOne(id);
  return response.json(user);
});

tecnicosRouter.delete("/:id", async (request, response) => {
  const tecnicosRepositorio = getRepository(Tecnicos);
  const { id } = request.params;
  await tecnicosRepositorio.delete(id);
  return response.send();
});

export default tecnicosRouter;
