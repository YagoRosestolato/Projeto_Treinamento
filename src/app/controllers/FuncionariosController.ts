import { getRepository } from "typeorm";
import Funcionarios from "../models/Funcionarios";

interface Request {
  nome: string;
  email: string;
  avatar: string;
}

class FuncionariosController {
  public async store({ nome, email, avatar }: Request): Promise<Funcionarios> {
    const funcionariosRepository = getRepository(Funcionarios);

    const verificaFuncionarioExiste = await funcionariosRepository.findOne({
      where: { email },
    });
    if (verificaFuncionarioExiste) {
      throw new Error("Email ja cadastrado");
    }
    const funcionario = funcionariosRepository.create({
      nome,
      email,
      avatar,
    });
    await funcionariosRepository.save(funcionario);
    return funcionario;
  }
}
export default FuncionariosController;
