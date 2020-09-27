import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";
import Funcionarios from "../models/Funcionarios";
import uploadConfig from "../../config/upload";

interface Request {
  func_id: string;
  avatarFileName: string;
}

class AvatarFuncionariosController {
  public async update({
    func_id,
    avatarFileName,
  }: Request): Promise<Funcionarios> {
    const funcionariosRepository = getRepository(Funcionarios);
    const func = await funcionariosRepository.findOne(func_id);
    if (!func) {
      throw new Error("Funcionario nao existe");
    }
    if (func.avatar) {
      const funcAvatarFilePath = path.join(uploadConfig.directory, func.avatar);
      const funcAvatarFileExists = await fs.promises.stat(funcAvatarFilePath);
      if (funcAvatarFileExists) {
        await fs.promises.unlink(funcAvatarFilePath);
      }
    }
    func.avatar = avatarFileName;
    await funcionariosRepository.save(func);
    return func;
  }
}

export default AvatarFuncionariosController;
