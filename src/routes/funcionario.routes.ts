import { Router } from "express";
import { getRepository } from "typeorm";

import multer from "multer";
import uploadConfig from "../config/upload";
import avatarFuncionariosController from "../app/controllers/FuncionariosController";
import FuncionariosController from "../app/controllers/FuncionariosController";
import Funcionarios from "../app/models/Funcionarios";
import ensureAuthenticated from "../middleawares/ensureAuthenticated";

const funcionariosRouter = Router();

const upload = multer(uploadConfig);

funcionariosRouter.post("/", ensureAuthenticated, async (request, response) => {
  try {
    const { nome, email, avatar } = request.body;

    const funcionariosController = new FuncionariosController();

    const user = await funcionariosController.store({
      nome,
      email,
      avatar,
    });
    return response.json(user);
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});
funcionariosRouter.get("/", ensureAuthenticated, async (request, response) => {
  const funcionariosRepositorio = getRepository(Funcionarios);
  const user = await funcionariosRepositorio.find();

  return response.json(user);
});

funcionariosRouter.get(
  "/:id",
  ensureAuthenticated,
  async (request, response) => {
    const funcionariosRepositorio = getRepository(Funcionarios);
    const { id } = request.params;
    const user = await funcionariosRepositorio.findOne(id);
    return response.json(user);
  }
);

funcionariosRouter.delete(
  "/:id",
  ensureAuthenticated,
  async (request, response) => {
    const funcionarioRepositorio = getRepository(Funcionarios);
    const { id } = request.params;
    await funcionarioRepositorio.delete(id);
    return response.send();
  }
);

funcionariosRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    try {
      const avatarFuncionariosController = new AvatarFuncionariosController();
      const func = await avatarFuncionariosController.update({
        func_id: request.query,
        avatarFileName: request.file.filename,
      });
      console.log(request.file);
      return response.json(func);
    } catch (erro) {
      return response.status(400).json({ error: erro.message });
    }
  }
);
export default funcionariosRouter;
