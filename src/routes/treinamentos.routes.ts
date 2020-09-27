import { getRepository } from "typeorm";

import { Router } from "express";

import Treinamento from "../app/controllers/TreinamentoController";
import Treinamento from "../app/models/Treinamentos";

const treinamentoRouter = Router();

treinamentoRouter.post("/", async (request, response) => {
  try {
    const { id_funcionario, nome, carga_horaria } = request.body;

    const treinamentoController = new TreinamentoController();

    const user = await treinamentoController.store({
      id_funcionario,
      nome,
      carga_horaria,
    });
    return response.json(user);
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});
treinamentoRouter.get("/", async (request, response) => {
  const treinamentoRepositorio = getRepository(Treinamento);
  const user = await treinamentoRepositorio.find();

  return response.json(user);
});

treinamentoRouter.delete("/:id", async (request, response) => {
  const treinamentoRepositorio = getRepository(Treinamento);
  const { id } = request.params;
  await treinamentoRepositorio.delete(id);

  return response.send();
});

export default treinamentoRouter;
