import { Router } from "express";
import SessionsUsuariosController from "../app/controllers/SessionsController";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  try {
    const { matricula, password } = request.body;
    const sessionscontroller = new SessionsUsuariosController();
    const { user, token } = await sessionscontroller.store({
      matricula,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});

export default sessionsRouter;
