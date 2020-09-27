import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("funcionarios")
class Funcionarios {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  avatar: string;
}
export default Funcionarios;
