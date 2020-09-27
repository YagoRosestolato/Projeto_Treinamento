import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Tecnicos from "./Tecnicos";

@Entity("Treinamentos")
class Treinamentos {
  @PrimaryGeneratedColumn()
  id_curso: string;

  @ManyToOne(() => Tecnicos)
  @JoinColumn({ name: "id_funcionario" })
  id_funcionario: Tecnicos;

  @Column()
  nome: string;

  @Column()
  carga_horaria: string;
}

export default Treinamentos;
