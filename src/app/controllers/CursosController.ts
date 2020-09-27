import { getRepository } from "typeorm";
import Cursos from "../models/Cursos";

interface Request {
  nome: string;
  carga_horaria: string;
}

class CursosController {
  public async store({ nome, carga_horaria }: Request): Promise<Cursos> {
    const cursosRepository = getRepository(Cursos);

    const verificarCadastroCurso = await cursosRepository.findOne({
      where: { nome },
    });
    if (verificarCadastroCurso) {
      throw new Error("Nome ja cadastrado nesse curso");
    }
    const cursos = cursosRepository.create({
      nome,
      carga_horaria,
    });
    await cursosRepository.save(cursos);
    return cursos;
  }
}

export default CursosController;
