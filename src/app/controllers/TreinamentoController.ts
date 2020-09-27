import { getRepository } from "typeorm";

import Treinamento from "../models/Treinamentos";
import Cursos from "../models/Cursos";

interface Request {
  id_curso: string;
  id_funcionario: string;
  nome: string;
  carga_horaria: string;
}

class TreinamentoController {
  public async store({
    id_curso: string,
    id_funcionario,
    nome,
    carga_horaria,
  }: Request): Promise<Treinamento> {
    const treinamentoRepository = getRepository(Treinamento);

    const verificarCurso = await treinamentoRepository.findOne({
      where: { id: id_curso },
    });
    if (verificarCurso) {
      throw new Error("ID do curso ja cadastrado");
    }

    const treinamento = treinamentoRepository.create({
      id_curso,
      id_funcionario,
      nome,
      carga_horaria,
    });
    await treinamentoRepository.save(treinamento);
    return treinamento;
  }
}

export default TreinamentoController;
