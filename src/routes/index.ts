import { Router } from "express";
import cursosRouter from "./cursos.routes";
import funcionariosRouter from "./funcionario.routes";
import sessionsRouter from "./sessions.routes";

import tecnicosRouter from "./tecnicos.routes";
import treinamentoRouter from "./treinamentos.routes";

const routes = Router();

routes.use("/tecnicos", tecnicosRouter);
routes.use("/cursos", cursosRouter);
routes.use("/funcionarios", funcionariosRouter);
routes.use("/treinamentos", treinamentoRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/avatar", funcionariosRouter);

export default routes;
